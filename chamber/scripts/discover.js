const lastVisit = localStorage.getItem("last-visit") ?? null;
const time = Date.now();
const sinceLastVisit = !lastVisit ? null : Math.floor((parseInt(time) / (1000 * 60 * 60 * 24)) - (parseInt(lastVisit) / (1000 * 60 * 60 * 24)));
document.querySelector(".last-visit").textContent = 
    sinceLastVisit == null ? "Welcome! Let us know if you have any questions." : 
    sinceLastVisit == 0 ? "Back so soon! Awesome!" :
    sinceLastVisit == 1 ? "You last visited 1 day ago." :
    `You last visited ${sinceLastVisit} days ago.`;

localStorage.setItem("last-visit", time);

const items = document.querySelector(".discover-items");
const addItems = async () => {
    const res = await fetch("data/discover.json");
    const data = await res.json();

    data.items.forEach(item => {
        items.innerHTML += `
            <div class="card">
                <h2>${item.title}</h2>
                <figure>
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                </figure>
                <p><b>Address/Location:</b> ${item.address}</p>
                <p>${item.description}</p>
                <button class="${item.classname}-btn">Learn More</button>
            </div>
        `;
    });
    data.items.forEach(item => {
        items.querySelector(`.${item.classname}-btn`).addEventListener("click", e => {
            const modal = document.querySelector(".learn-more-modal");
            modal.innerHTML = `
                <div class="container">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <button id="close-modal">close</button>
                </div>
            `;
            modal.showModal();
            modal.querySelector("#close-modal").addEventListener("click", e => {
                modal.close();
            });
        });
    });
}

addItems();