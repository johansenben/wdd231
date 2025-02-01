//add timestamp to form on page load
document.querySelector("#timestamp").value = (new Date()).toLocaleDateString("en-US");

//membership level cards and modal
const membershipLevels = {
    "non-profit": {
        level: "Non Profit",
        cost: "Free",
        description: "For Non-Profit Organizations only",
        perks: [
            "Included in the list of members on our website"
        ]
    },
    "bronze": {
        level: "Bronze",
        cost: "$50/Month",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus assumenda vel earum iste. Aliquam voluptatum culpa repudiandae suscipit eius illum?",
        perks: [
            "Included in list of members on our website",
            "Invited to some events"
        ]
    },
    "silver": {
        level: "Silver",
        cost: "$200/Month",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum voluptates vero corporis voluptas quisquam fuga consequatur ea sit doloremque inventore! Dolore dicta ipsum fugiat vitae!",
        perks: [
            "Included in list of members on our website",
            "Invited to all events",
            "Included in the spotlight on our website"
        ]
    },
    "gold": {
        level: "Gold",
        cost: "$1000/Month",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi perferendis vero rerum debitis placeat molestiae repellat eos aperiam amet exercitationem quos accusantium ratione repellendus dolorum corrupti quasi, et cumque id autem. Reiciendis dolor suscipit, nesciunt asperiores tempora impedit error esse.",
        perks: [
            "Included in list of members on our website",
            "Invited to all events",
            "Included in the spotlight on our website",
            "Given special training"
        ]
    }
};
const membershipContainer = document.querySelector(".membership-levels");
const membershipDetails = document.querySelector("#membership-level-details");
for (let level in membershipLevels) {
    membershipContainer.innerHTML += `
    <div class="membership-level" id="${level}">
        <h4>${membershipLevels[level].level}</h4>
        <button>Show More Details</button>
    </div>
    `;
}
for (let level in membershipLevels) {
    document.querySelector(`#${level} button`).addEventListener("click", (e) => {
        membershipDetails.innerHTML = `
        <div class="container">
            <p id="modal-heading">${membershipLevels[level].level}<p>
            <p><b>Cost:</b> ${membershipLevels[level].cost}</p>
            <p>${membershipLevels[level].description}</p>
            <p id="perks-heading">${membershipLevels[level].level} Members are<p>
            <ul id="perks">
            ${membershipLevels[level].perks.reduce((previous, current) => previous + `<li>${current}</li>`, '')}
            </ul>
            <button id="close-modal">Close</button>
        </div>
        `;
        membershipDetails.showModal();
        document.querySelector("#close-modal").addEventListener("click", (e) => membershipDetails.close());
    });
}