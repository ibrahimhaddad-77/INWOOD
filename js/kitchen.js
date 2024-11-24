fetch("js/all-products.json")
  .then((response) => response.json())
  .then((data) => {
    const kitchenroomProducts = data.kitchenRooms;
    displayProducts(kitchenroomProducts, "kitchen");
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayProducts(products, kitchen) {
  const productsDiv = document.getElementById(kitchen);
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-12", "col-md-6", "col-lg-4");
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productDiv.appendChild(productCard);
    productCard.setAttribute("data-id", product.id);
    productCard.setAttribute("data-name", product.title);
    productCard.setAttribute("data-price", product.price);
    productCard.setAttribute("data-image", product.img);
    productCard.setAttribute("data-description", product.desc);
    productCard.innerHTML = `
          <span class="discount">${product.disc}</span>
          <button class="add-to-favorites"><i class="fa-solid fa-heart"></i></button>          <div class="image">
            <a href="#">
              <img class="img-fluid" src="${product.img}" alt="${product.title}" />
            </a>
          </div>
          <div class="desc">
            <div class="info">
              <h6>${product.title}</h6>
              <p class="price">$${product.price}</p>
            </div>
            <button class="add-to-cart">
            <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
      `;

    productsDiv.appendChild(productDiv);

    // Attach event listeners
    productCard
      .querySelector(".add-to-cart")
      .addEventListener("click", () => addToCart(getProductInfo(productCard)));
    productCard
      .querySelector(".add-to-favorites")
      .addEventListener("click", () =>
        addToFavorites(getProductInfo(productCard))
      );
  });
}
