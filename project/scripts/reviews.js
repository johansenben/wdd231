
const reviewStars = {}
const averageStars = {}

let loadedData;
let booksList = [];
let authorsList = [];
let seriesList = [];

const displayBookData = (data, bookfilter = (books) => books) => {
    const booksElement = document.querySelector("#books");
    booksElement.innerHTML = '';
    const books = bookfilter(data.books);
    for (let book in books) {
        const id = booksList.indexOf(book);
        booksElement.innerHTML += `
            <div class="card card-${id}">
                <h3>${book}</h3>
                ${data.books[book].series ? `<p><b>Series:</b> ${data.books[book].series}</p><p><b>Book Number:</b> ${data.books[book].book_number_in_series}</p>` : ''}
                <p><b>Author:</b> ${data.books[book].author}</p>
                <img src="${data.books[book].image || "images/missing-image.svg"}" alt="${book}" loading="lazy">
                <p><b>Average Stars:</b> ${averageStars[book].toFixed(2)}</p>
                <div class="stars" style="--stars:${averageStars[book].toFixed(2)}">
                    <div class="full-stars"></div>
                    <div class="empty-stars"></div>
                </div>
                <button id="reviews-btn-${id}">See Reviews</button>
            </dv>
        `;
    }
    for (let book in books) {
        const id = booksList.indexOf(book);
        document.querySelector(`#reviews-btn-${id}`).addEventListener("click", (e) => {
            const modal = document.querySelector(".reviews-modal");
            let reviewHTML = '';
            data.reviews.filter((review) => review.book == book).forEach((review) => {console.log(review, review.stars)
                reviewHTML += `
                    <li>
                        <p class="reviewer">${review.reviewer}</p>
                        <p>${review.review}</p>
                        <div class="stars" style="--stars:${review.stars}">
                            <div class="full-stars"></div>
                            <div class="empty-stars"></div>
                        </div>
                    </li>
                `;
            });
            modal.innerHTML = `
                <div class="container">
                    <h3>${book}</h3>
                    <ul>${reviewHTML}</ul>
                    <button id="close-modal">Close</button>
                </div>
            `;
            modal.showModal();
            modal.querySelector("#close-modal").addEventListener("click", (e) => {
                modal.close();
            });
        });
    }
}

const processData = async () => {
    try {
        const res = await fetch("data/reviews.json");
        const data = (await res.json());
        for (let review of data.reviews) {
            if (!reviewStars[review.book])
                reviewStars[review.book] = {stars: review.stars, count: 1}
            else {
                reviewStars[review.book].stars += review.stars;
                reviewStars[review.book].count += 1;
            }
        }
        for (let book in reviewStars) 
            averageStars[book] = reviewStars[book].stars / reviewStars[book].count;

        for (let book in data.books) {
            if (!booksList.includes(book))
                booksList.push(book);
            if (!authorsList.includes(data.books[book].author))
                authorsList.push(data.books[book].author);
            if (data.books[book].series && !seriesList.includes(data.books[book].series))
                seriesList.push(data.books[book].series);
        }
        loadedData = data;
        displayBookData(data);
    } catch (error) {
        console.error("Error in loading data!" + error);
    }
}

processData();

document.querySelector("#filter-all").addEventListener("change", (e) => {
    if (e.target.checked) {
        document.querySelector("#filter-select").innerHTML = '';
        displayBookData(loadedData);
    }
});
document.querySelector("#filter-author").addEventListener("change", (e) => {
    if (e.target.checked) {
        let html = '<select name="author-select" id="author-select">';
        html += "<option selected disabled>Select an author</option>"
        authorsList.forEach((author) => {
            html += `<option value="${author}">${author}</option>`
        });
        html += "</select>";
        document.querySelector("#filter-select").innerHTML = html;
        document.querySelector("#author-select").addEventListener("change", (e) => {
            const author = e.target.value;
            if (author)
                displayBookData(loadedData, (books) => Object.fromEntries(Object.entries(books).filter(([title, data]) => data.author == author)));
        });
    }
});
document.querySelector("#filter-series").addEventListener("change", (e) => {
    if (e.target.checked) {
        let html = '<select name="series-select" id="series-select">';
        html += "<option selected disabled>Select a series</option>"
        seriesList.forEach((series) => {
            html += `<option value="${series}">${series}</option>`
        });
        html += "</select>";
        document.querySelector("#filter-select").innerHTML = html;
        document.querySelector("#series-select").addEventListener("change", (e) => {
            const series = e.target.value;
            if (series)
                displayBookData(loadedData, (books) => Object.fromEntries(Object.entries(books).filter(([title, data]) => data.series == series)));
        });
    }
});
