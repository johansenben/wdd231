let menuOpen = false;
document.querySelector("#hamburger-btn").addEventListener("click", (e) => {
    menuOpen = !menuOpen;
    document.querySelector("#header-nav").classList.toggle("open");
});