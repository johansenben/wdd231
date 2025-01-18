const currentYear = document.querySelector("#current-year");
const today = new Date();
currentYear.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#last-modified");
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;