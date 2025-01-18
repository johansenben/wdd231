document.querySelector("#hamburger-btn").addEventListener("click", (e) => {
    document.querySelector("header nav").classList.toggle("open");
});

document.querySelector("#light-dark-mode-toggle").addEventListener("click", (e) => {
    document.querySelector("body").classList.toggle("dark-mode-on");
});