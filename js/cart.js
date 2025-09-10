// cart.js

const cartContainer = document.getElementById('cart-items');
const clearBtn = document.getElementById('clear-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let subtotal = 0;

// Функция для рендера корзины
function renderCart() {
  cartContainer.innerHTML = '';
  subtotal = 0;

  cart.forEach(item => {
    const totalItem = item.price * item.quantity;
    subtotal += totalItem;

    const row = document.createElement('tr');
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

  // Обновляем суммы
  document.querySelector('.cart__summary .line span:last-child').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('.cart__summary .total span:last-child').textContent = `$${subtotal.toFixed(2)}`;
}

// Изначальный рендер
renderCart();

// Очистка корзины
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('cart'); // удаляем корзину из LocalStorage
  cart = [];
  renderCart(); // обновляем таблицу
});
