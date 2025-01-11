const courseWork = [
    {
        "name": "",
        "description": ""
    },
    {
        "name": "",
        "description": ""
    },
    {
        "name": "",
        "description": ""
    }
];

const courseWorkList = document.querySelector("#course-work-list");

courseWork.forEach((assignment) => {
    courseWorkList.innerHTML += `<li>${assignment.name}</li>`
});