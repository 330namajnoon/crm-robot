
async function login() {
    try {
        const response = await fetch(`${window.env.SERVER_URL}/v2/auth`, {method: "get", headers: window.env.HEADERS});
        const data = await response.json(); 
        return data;
    } catch (error) {
        throw error
    }
}

export default login;