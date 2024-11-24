// testimonials users
fetch("js/testimonials.json")
  .then((result) => {
    let myData = result.json();
    return myData;
  })
  .then((testis) => {
    let testiImg = document.querySelectorAll(".testimonials .image");
    let testiDesc = document.querySelectorAll(".testimonials .desc");
    let testiJob = document.querySelectorAll(".testimonials .job-title");
    let testiName = document.querySelectorAll(".testimonials .name");
    for (t = 0; t < testiImg.length; t++) {
      let image = testiImg[t];
      let desc = testiDesc[t];
      let name = testiName[t];
      let job = testiJob[t];
      image.innerHTML += `<img src="${testis[t].img}" alt="${testis[t].name}"/>`;
      desc.textContent += testis[t].desc;
      name.textContent += testis[t].name;
      job.textContent += testis[t].job;
    }
  });

// Get the button
const backToTopBtn = document.getElementById("back-to-top-btn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    backToTopBtn.classList.add("show-back-to-top");
  } else {
    backToTopBtn.classList.remove("show-back-to-top");
  }
};

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// all-products
// fetch("js/all-products.json")
//   .then((result) => {
//     let myData = result.json();
//     return myData;
//   })
//   .then((products) => {
//     let product = document.querySelectorAll(".all-products .product");
//     let productDisc = document.querySelectorAll(
//       ".all-products .product .discount"
//     );
//     let productImg = document.querySelectorAll(".all-products .product img");
//     let productTitle = document.querySelectorAll(
//       ".all-products .product .info h3"
//     );
//     let productPrice = document.querySelectorAll(
//       ".all-products .product .info p"
//     );
//     for (p = 0; p < product.length; p++) {
//       let image = productImg[p];
//       let discount = productDisc[p];
//       let title = productTitle[p];
//       let price = productPrice[p];
//       image.src += products[p].img;
//       discount.textContent += products[p].disc;
//       title.textContent += products[p].title;
//       price.textContent += products[p].price;
//     }
//   });

fetch("js/popular-products.json")
  .then((result) => {
    let myData = result.json();
    return myData;
  })
  .then((products) => {
    let product = document.querySelectorAll(".popular-products .product");
    let productImg = document.querySelectorAll(
      ".popular-products .product img"
    );
    let productTitle = document.querySelectorAll(
      ".popular-products .product .title"
    );
    let productDesc = document.querySelectorAll(
      ".popular-products .product .description"
    );
    let productPrice = document.querySelectorAll(
      ".popular-products .product .price"
    );
    for (p = 0; p < product.length; p++) {
      product[p].setAttribute("data-id", products[p].id);
      product[p].setAttribute("data-image", products[p].img);
      product[p].setAttribute("data-name", products[p].title);
      product[p].setAttribute("data-price", products[p].price);
      let image = productImg[p];
      let title = productTitle[p];
      let desc = productDesc[p];
      let price = productPrice[p];
      image.src += products[p].img;
      title.textContent += products[p].title;
      desc.textContent += products[p].desc;
      price.textContent += products[p].price;
    }
  });

// cart
// get required Elements in every page
const cartCount = document.getElementById("cart-count");
const favoritesCount = document.getElementById("favorite-count");
const alertBox = document.getElementById("alert-box");
const alertMessage = document.getElementById("alert-message");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Display cart and favorites when the pages load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) {
    displayCart(); // Load cart data on the cart page
  }
  if (document.getElementById("FavoriteContainer")) {
    displayFavorites(); // Load favorites data on the favorites page
  }
});
// Update the number of products in the cart and favorites when the page loads.
updateCartCount();
updateFavoritesCount();

//  dd the product to the shopping cart
function addToCart(product) {
  // Check if the product already exists in the cart.
  const exists = cart.some((item) => item.id === product.id);
  if (exists) {
    showAlert("Product already in cart!", "error");
    return; // If it already exists, show a message and stop.
  }
  product.quantity = 1;
  cart.push(product);
  updateCartCount();
  saveCartToLocalStorage();
  showAlert("Product added to cart successfully!", "success");
}

// Add the product to the favorites list
function addToFavorites(product) {
  // Check if the product already exists in the favorites list.
  const exists = favorites.some((item) => item.id === product.id);
  if (exists) {
    showAlert("Product already in favorites!", "error");
    return; // If it already exists, show a message and stop.
  }

  favorites.push(product);
  updateFavoritesCount();
  saveFavoritesToLocalStorage();
  showAlert("Product added to favorites successfully!", "success");
}

// Remove the product from the shopping cart.
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  updateCartCount();
  saveCartToLocalStorage();
  showAlert("Product removed from cart", "success");
}
//  Remove the product from the favorites list.
function removeFromFavorites(productId) {
  favorites = favorites.filter((product) => product.id !== productId);
  updateFavoritesCount();
  saveFavoritesToLocalStorage();
  showAlert("Product removed from favorites", "success");
}
//  Update the number of products in the cart.
function updateCartCount() {
  cartCount.textContent = cart.length;
}

//  Update the number of products in the favorites list.
function updateFavoritesCount() {
  favoritesCount.textContent = favorites.length;
}
// Fetch product information from the card.
function getProductInfo(productCard) {
  const id = productCard.getAttribute("data-id");
  const name = productCard.getAttribute("data-name");
  const price = productCard.getAttribute("data-price");
  const image = productCard.getAttribute("data-image");
  const description = productCard.getAttribute("data-desc");
  return { id, name, price, image, description };
}
// Handle button clicks on each page
document.querySelectorAll(".product").forEach((card) => {
  const addToCartButton = card.querySelector(".add-to-cart");
  const addToFavoritesButton = card.querySelector(".add-to-favorites");
  addToCartButton.addEventListener("click", () => {
    const product = getProductInfo(card);
    addToCart(product);
  });

  addToFavoritesButton.addEventListener("click", () => {
    const product = getProductInfo(card);
    addToFavorites(product);
  });
});

// Store the shopping cart in localStorage.
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Store the shopping favorites in localStorage.
function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
// Function to display an alert
function showAlert(message, type) {
  // Customize the alert color based on the message type (success or error)
  if (type === "success") {
    alertBox.style.backgroundColor = "lightgreen";
  } else if (type === "error") {
    alertBox.style.backgroundColor = "lightcoral";
  }

  alertMessage.textContent = message; // Set the message.
  alertBox.style.display = "block"; // Show the alert box

  //Hide the alert after 3 seconds.
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}
