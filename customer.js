const params = new URLSearchParams(window.location.search);
const tableFromQR = params.get("table");

if (tableFromQR) {
  document.getElementById("tableNumber").value = tableFromQR;
}

const mainFood = [
  { name: "Phở bò", img: "https://bing.com/th?id=OSK.ac700d3f0bfe0b64ef9b85f8681a15f8" },
  { name: "Bún bò Huế", img: "https://th.bing.com/th/id/OIP._iu9kozRYB1qE0GH4ucRiwHaE8?w=274&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { name: "Cơm tấm", img: "https://th.bing.com/th/id/OIP.DPlAJBRciXLa02HvnGDFrgHaFS?w=227&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
];

const snack = [
  { name: "Chả giò", img: "https://adventure-journey.com/upload/image/ourblogs/cha-gio.jpg" },
  { name: "Khoai tây chiên", img: "https://tse2.mm.bing.net/th/id/OIP.9O3k3jmP00uX4y-1y9SLvAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" }
];

const drink = [
  { name: "7 Up", img: "https://th.bing.com/th/id/OIP.39lT2VoY105qO8tboKYRJQHaE8?w=254&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { name: "Pepsi", img: "https://th.bing.com/th/id/OIP.xPaf-GbTiXLukc9fUjkjMwHaEo?w=262&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { name: "Cà phê sữa đá", img: "https://th.bing.com/th/id/OIP.0cTek1lyYwOXn7BtRjrCGAHaE8?w=242&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
];

let cart = [];

function renderMenu(data, elementId) {
  const el = document.getElementById(elementId);
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${item.img}">
      <h4>${item.name}</h4>
      <button onclick="addToCart('${item.name}')">Thêm</button>
    `;
    el.appendChild(card);
  });
}

renderMenu(mainFood, "mainFood");
renderMenu(snack, "snack");
renderMenu(drink, "drink");

function addToCart(food) {
  const found = cart.find(i => i.food === food);
  if (found) found.quantity++;
  else cart.push({ food, quantity: 1 });
  renderCart();
}

function renderCart() {
  const cartUI = document.getElementById("cart");
  cartUI.innerHTML = "";
  cart.forEach(i => {
    const li = document.createElement("li");
    li.innerText = `${i.food} × ${i.quantity}`;
    cartUI.appendChild(li);
  });
}

function submitOrder() {
  const name = document.getElementById("customerName").value;
  const table = document.getElementById("tableNumber").value;

  fetch("http://127.0.0.1:8000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customer: name,
      table: Number(table),
      cart: cart
    })
  }).then(() => {
    alert("🎉 Đã gửi đơn đến bếp!");
    cart = [];
    renderCart();
  });
}
