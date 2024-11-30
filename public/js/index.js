import loading from "./loading.js";
import midigiLogin from "./midigiLogin.js";
import televentaLogin from "./televentaLogin.js";

(async () => {
    const midigiLoginButton = document.getElementById("midigiLoginButton");
    const televentaButton = document.getElementById("televentaButton");
    const midigiLoginUrl = document.getElementById("midigiLoginUrl");
    const televentaUrl = document.getElementById("televentaUrl");

    try {
        midigiLoginButton.addEventListener("click", async () => {
            loading(true);
            try {
                const url = await midigiLogin();
                midigiLoginUrl.href = url;
                midigiLoginUrl.classList.add("active");
                midigiLoginUrl.click();
            } catch (error) {
                console.log(error);
            }
            loading(false);
        });
        televentaButton.addEventListener("click", async () => {
            loading(true);
            try {
                const url = await televentaLogin();
                televentaUrl.href = url;
                televentaUrl.classList.add("active");
                televentaUrl.click();
            } catch (error) {
                console.log(error);
            }
            loading(false);
        });
        fetch(`${window.env.SERVER_URL}/v2/datalist`)
            .then((response) => response.json())
            .then((data) => {
                const dataContainer = document.createElement("datalist");
                dataContainer.id = "phonesEmails";
                console.log(data);
                data.data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.value;
                    option.innerHTML = item.description;
                    dataContainer.appendChild(option);
                });
                document.body.appendChild(dataContainer);
            });
    } catch (error) {
        console.log(error);
    }
})();
