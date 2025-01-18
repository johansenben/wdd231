let mode = "grid";
const cardList = document.querySelector("#card-list");

const membershipTiers = {
    1: "Member",
    2: "Silver",
    3: "Gold"
}

async function getMemberData() {
    const res = await fetch("data/members.json");
    const data = await res.json();

    return data.members;
}

async function refreshList(mode) {
    const members = await getMemberData();
    
    cardList.innerHTML = '';
    members.forEach(member => {
        cardList.innerHTML += `
            <div class="member-card">
                <h3>${member.name}</h3>
                <p>Address: ${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.url}">${member.url}</a></p>
                <img src="${member.icon}" alt="${member.name} Icon" loading="lazy">
                <p>Membership Tier: ${membershipTiers[member.membership_level]}
            </div>
        `
    });
}

refreshList(mode);


document.querySelector("#list-mode").addEventListener("click", (e) => {
    cardList.classList.remove("grid-on");
});
document.querySelector("#grid-mode").addEventListener("click", (e) => {
    cardList.classList.add("grid-on");
});
