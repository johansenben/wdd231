const createBookSelect = async () => {
    try {
        const res = await fetch("data/reviews.json");
        const data = (await res.json());
        const select = document.querySelector("#book-select")
        for (let book in data.books) {
            select.innerHTML += `<option value="${book}">${book} - ${data.books[book].author}</option>`
        }
    } catch (error) {
        console.error("Error in loading data!" + error);
    }
}

createBookSelect();