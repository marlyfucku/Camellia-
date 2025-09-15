document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const login_or_email = document.getElementById("login_or_email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login_or_email, password }),
    });

    if (!response.ok) {
      alert("Ошибка входа. Проверьте данные.");
      return;
    }

    const data = await response.json();

    // сохраняем токен и логин
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("username", login_or_email);

    // редирект на главную
    window.location.href = "index.html";
  } catch (err) {
    console.error("Ошибка:", err);
    alert("Ошибка соединения с сервером.");
  }
});
