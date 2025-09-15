import { register } from "./auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Заполните все поля!");
        return;
    }

    const res = await register(name, email, password);

    if (res) {
        alert("Регистрация успешна! Проверьте почту.");
        window.location.href = "./login.html";
    } else {
        alert("Ошибка при регистрации!");
    }
});
