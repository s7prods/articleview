document.querySelectorAll('[data-nav-action]').forEach(el => {
    el.addEventListener('click', () => history.go(+el.dataset.navAction));
});