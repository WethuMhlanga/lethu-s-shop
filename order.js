let cart = [];

/* Update the Cart Display */
function updateCartDisplay() {
  const cartTableBody = document.querySelector("#cart-table tbody");
  cartTableBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>R${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" style="width: 60px;">
      </td>
      <td>R${itemTotal.toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
    `;
    cartTableBody.appendChild(row);
  });

  document.getElementById("cart-total").textContent = `R${total.toFixed(2)}`;

  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", function() {
      const idx = this.getAttribute("data-index");
      const newQty = parseInt(this.value);
      if (newQty < 1) {
        this.value = cart[idx].quantity;
        return;
      }
      cart[idx].quantity = newQty;
      updateCartDisplay();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const idx = this.getAttribute("data-index");
      cart.splice(idx, 1);
      updateCartDisplay();
    });
  });
}

/* "Add to Cart" Button Listener */
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
  button.addEventListener("click", function() {
    const productCard = this.closest(".product-card");
    const id = productCard.getAttribute("data-id");
    const name = productCard.getAttribute("data-name");
    const price = parseFloat(productCard.getAttribute("data-price"));

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
    alert(`${name} has been added to your cart.`);
  });
});

/* Proceed to Checkout Button */
document.getElementById("checkout-btn").addEventListener("click", function() {
  document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
});

/* Order Form Submission */
document.getElementById("order-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty. Please add some products before placing an order.");
    return;
  }

  const customerName = document.getElementById("customer-name").value.trim();
  const customerEmail = document.getElementById("customer-email").value.trim();
  const customerPhone = document.getElementById("customer-phone").value.trim();
  const customerAddress = document.getElementById("customer-address").value.trim();

  if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
    alert("Please fill in all required fields.");
    return;
  }

  const orderData = {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    items: cart,
    total: document.getElementById("cart-total").textContent,
    orderDate: new Date().toLocaleString()
  };

  try {
    const response = await fetch('https://sheetdb.io/api/v1/95a066i0a6zer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [orderData] })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");
      document.getElementById("order-form").reset();
      document.getElementById("order-confirmation").style.display = "block";
      cart = [];
      updateCartDisplay();
    } else {
      alert(result.error || "Error placing order.");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Error placing order. Please try again.");
  }
});
