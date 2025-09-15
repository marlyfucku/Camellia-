import { register } from "./auth.js";

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = document.querySelector("input[type=text]").value;
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;

    try {
        const res = await register(login, email, password);
        if(res){
            alert("Регистрация успешна!");
            window.location.href = "login.html";
        } else {
            alert("Ошибка при регистрации!");
        }
    } catch (err) {
        console.error(err);
        alert("Ошибка при регистрации!");
    }
});
