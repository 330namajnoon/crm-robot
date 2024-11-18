function loading(value = true) {
    const loading = document.getElementById("loading");
    if (value) {
        loading.classList.add("active");
    } else {
        loading.classList.remove("active");
    }
}

export default loading;