// auth.js
const apiurl = "http://92.255.79.122:9999/api/v1/auth";

// Функция регистрации (если нужна)
async function register(login, email, password) {
    const res = await fetch(`${apiurl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, email, password })
    });
    return await res.json();
}

// Функция входа
async function login(login, password) {
    try {
        const res = await fetch(`${apiurl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }) 
        });

        const data = await res.json();
        return data; // { access_token: "..." } при успешном входе
    } catch (e) {
        console.error("Ошибка при входе:", e);
        return null;
    }
}

export { register, login };
