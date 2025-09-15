const addButtons = document.querySelectorAll('.btn-add');

addButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const product = btn.closest('.product__info');
    const productData = {
      title: product.querySelector('h1').textContent,
      price: parseFloat(product.querySelector('.price').textContent.replace('$','')),
      img: document.querySelector('.product__main').src,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.title === productData.title);
    if(existing) {
      existing.quantity += 1;
    } else {
      cart.push(productData);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setTimeout(() => {
      window.location.href = 'cart.html';
    }, 100);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("username");
  if (user) {
    document.getElementById("userName").textContent = "👤 " + user;
  }
});
