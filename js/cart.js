// cart.js
(function () {
  // =====================
  // Вспомогательные функции
  // =====================
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function parsePrice(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  }

  // =====================
  // Обновление счётчика корзины в шапке
  // =====================
  function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = total;
  }

  // =====================
  // Рендер корзины на странице cart.html
  // =====================
  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return; // если мы не на странице cart.html

    const cart = getCart();
    cartContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const totalItem = item.price * item.quantity;
      subtotal += totalItem;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="cart__product">
          <img src="${item.img}" alt="${item.title}" width="80">
          <div>
            <div class="name">${item.title}</div>
            <div class="muted">Qty: ${item.quantity}</div>
          </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${totalItem.toFixed(2)}</td>
      `;
      cartContainer.appendChild(row);
    });

    // Итоги
    const lineEl = document.querySelector(
      ".cart__summary .line span:last-child"
    );
    const totalEl = document.querySelector(
      ".cart__summary .total span:last-child"
    );
    if (lineEl) lineEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  // =====================
  // Очистка корзины
  // =====================
  function attachClearCart() {
    const clearBtn = document.getElementById("clear-cart");
    if (!clearBtn) return;
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
      updateCartCount();
    });
  }

  // =====================
  // Добавление товара (кнопки .btn-add)
  // =====================
  function attachAddToCart() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-add");
      if (!btn) return;

      e.preventDefault();

      const product = btn.closest(".product__info") || document;
      const title =
        product.querySelector("h1, .title, .name")?.textContent.trim() ||
        "Product";
      const price = parsePrice(
        product.querySelector(".price")?.textContent || "0"
      );
      const img =
        product.querySelector("img")?.src ||
        document.querySelector(".product__main")?.src ||
        "";

      const newItem = { title, price, img, quantity: 1 };

      const cart = getCart();
      const existing = cart.find((item) => item.title === newItem.title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(newItem);
      }
      saveCart(cart);

      updateCartCount();

      // Перенаправление в корзину (как у тебя было)
      setTimeout(() => {
        window.location.href = "cart.html";
      }, 100);
    });
  }

  // =====================
  // Запуск после загрузки
  // =====================
  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    attachClearCart();
    attachAddToCart();
    updateCartCount();

    // Имя пользователя
    const user = localStorage.getItem("username");
    if (user) {
      const userEl = document.getElementById("userName");
      if (userEl) userEl.textContent = "👤 " + user;
    }
  });
})();
