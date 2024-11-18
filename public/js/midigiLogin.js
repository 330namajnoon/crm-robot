
async function midigiLogin() {
    const midigiLoginCountry = document.getElementById("midigiLoginCountry");
    const midigiLoginPhoneNumber = document.getElementById("midigiLoginPhoneNumber");
    const midigiLoginClientId = document.getElementById("midigiLoginClientId");
    const midigiLoginBase = document.getElementById("midigiLoginBase");
    const midigiLoginEmail = document.getElementById("midigiLoginEmail");
    const midigiLoginDocumentNumber = document.getElementById("midigiLoginDocumentNumber");
    const midigiLoginContractId = document.getElementById("midigiLoginContractId");

    try {
        const searchParams = new URLSearchParams();
        searchParams.append("phoneNumber", midigiLoginPhoneNumber.value);
        searchParams.append("clientId", midigiLoginClientId.value);
        searchParams.append("base", midigiLoginBase.value);
        searchParams.append("email", midigiLoginEmail.value);
        searchParams.append("documentNumber", midigiLoginDocumentNumber.value);
        searchParams.append("contractId", midigiLoginContractId.value);

        const response = await fetch(`${window.env.SERVER_URL}/v2/midigi/login/${midigiLoginCountry.value}?${searchParams.toString()}`, {method: "get", headers: window.env.HEADERS});
        const data = await response.json();
        if (response.status !== 200) throw data;
        return data.data;
    } catch (error) {
        throw error
    }
}

export default midigiLogin;