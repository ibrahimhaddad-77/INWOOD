// Function to display cart products in a table with quantities
function displayCart() {
  const cartTableBody = document.querySelector("#cart-items");
  cartTableBody.innerHTML = ""; // Clear previous entries
  if (cart.length === 0) {
    cartTableBody.innerHTML =
      '<tr><td colspan="6">Your cart is empty.</td></tr>';
    return;
  }

  cart.forEach((product) => {
    const row = document.createElement("tr");
    // Calculate total price based on quantity
    let priceString = product.price;
    const totalPrice =
      parseFloat(priceString.replace(/[^0-9.]/g, "")) * product.quantity;
    row.innerHTML = `
            <td><img src="${product.image}" alt="${
      product.name
    }" width="50"></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>
                <input type="number" min="1" value="${
                  product.quantity
                }" class="product-quantity" data-id="${product.id}">
            </td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td>
                <button class="remove-from-cart" data-id="${
                  product.id
                }">Remove</button>
            </td>
        `;

    cartTableBody.appendChild(row);
  });

  // Add event listeners for removing items from the cart
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    });
  });

  // Add event listeners for updating quantities
  document.querySelectorAll(".product-quantity").forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = e.target.getAttribute("data-id");
      const newQuantity = parseInt(e.target.value);
      updateProductQuantity(productId, newQuantity);
    });
  });
  // Update total cost after displaying the cart
  updateTotalCost();
}
// Function to update product quantity in cart
function updateProductQuantity(productId, newQuantity) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    displayCart(); // Refresh the cart table
    updateCartCount(); // Update cart count in the header
  }
}

// Function to remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  displayCart(); // Refresh the cart table
  updateCartCount(); // Update cart count in the header
  updateTotalCost();
}
// Function to calculate and update total cost
function updateTotalCost() {
  let totalCost = 0;
  cart.forEach((product) => {
    let priceString = product.price;
    totalCost +=
      parseFloat(priceString.replace(/[^0-9.]/g, "")) * product.quantity;
  });
  document.getElementById("total-amount").textContent = totalCost.toFixed(2);
}
// Function to update cart count in header
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}
//payment method
let btnBuy = document.getElementById("btn-buy-now");
btnBuy.addEventListener("click", () => {
  let containerAll = document.querySelector(".container-All");
  if (containerAll.style.display === "none") {
    containerAll.style.display = "block";
  } else {
    containerAll.style.display = "none";
  }
});

let emailId = document.querySelector("#email-id");
var divAlert = document.getElementById("alert");
divAlert.style.display = "none";

function ValidateName() {
  var regEx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (regEx.test(emailId.value) === true) {
    divAlert.style.display = "none";
  } else {
    divAlert.style.display = "block";
    divAlert.innerHTML = `<p>Email is not valid</p>`;
  }
}
