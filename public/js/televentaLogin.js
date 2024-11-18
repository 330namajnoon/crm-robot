
async function televentaLogin() {
    const televentaCountry = document.getElementById("televentaCountry");
    const televentaBase = document.getElementById("televentaBase");

    try {
        const searchParams = new URLSearchParams();
        searchParams.append("base", televentaBase.value);

        const response = await fetch(`${window.env.SERVER_URL}/v2/televenta/login/${televentaCountry.value}?${searchParams.toString()}`, {method: "get", headers: window.env.HEADERS});
        const data = await response.json();
        if (response.status !== 200) throw data;
        return data.data;
    } catch (error) {
        throw error
    }
}

export default televentaLogin;