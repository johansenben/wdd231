
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

const memberSpotlights = document.querySelector(".member-spotlights");
const addMemberCards = async (total) => {
    const members = await getMemberData();
    let count = 0;
    const validMemberCount = members.reduce((total, current) => current.membership_level > 1 ? total + 1 : total, 0);
    if (total > validMemberCount)
        total = validMemberCount;
    let usedIndexes = [];
    while (count < total) {
        const index = Math.floor(Math.random() * members.length);
        if (index >= members.length)
            continue; //should never happen
        if (usedIndexes.includes(index))
            continue;
        if (members[index].membership_level < 2)
            continue;
        memberSpotlights.innerHTML += `
            <div class="member-spotlight">
                <h3>${members[index].name}</h3>
                <img src="${members[index].icon}" alt="${members[index].name} Logo">
                <div class="member-data"
                    <p>Phone: ${members[index].phone}</p>
                    <p>Address: ${members[index].address}</p>
                    <p>Website: ${members[index].url}</p>
                    <p>Membership Level: ${membershipTiers[members[index].membership_level]}</p>
                </div>
            </div>
        `;
        usedIndexes.push(index);
        count++;
    }
}

addMemberCards(3);