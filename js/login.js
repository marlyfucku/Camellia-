import { login } from "./auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login_or_email = document.getElementById("login_or_email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!login_or_email || !password) {
        alert("Заполните все поля!");
        return;
    }

    const res = await login(login_or_email, password);

    if (res && res.access_token) {
        alert("Вход успешен!");
        window.location.href = "./index.html";
    } else {
        alert("Ошибка при входе! Проверьте данные.");
    }
});
