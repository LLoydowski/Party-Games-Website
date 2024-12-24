const nav = document.querySelector("nav");
const blur = document.querySelector(".blurPanel");

//0.13019218846869188 FULL
//0.050216986980781156 SMALL

nav.addEventListener("transitionstart", (e) => {
    nav.classList.remove("textInvisible");
});

nav.addEventListener("transitionend", (e) => {
    if (pixelsToViewWidth(nav.clientWidth) < 0.07) {
        nav.classList.add("textInvisible");
    }
});

function pixelsToViewWidth(pixels) {
    return pixels / window.innerWidth;
}
