const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < 100) {
        topBar.style.top = '0';
    } else {
        topBar.style.top = '-100px';
    }
});