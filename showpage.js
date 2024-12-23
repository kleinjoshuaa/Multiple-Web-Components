function showPage() {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.classList.add('hide');
    const body = document.getElementById('body');
    body.classList.remove('hide');
}

export default showPage
