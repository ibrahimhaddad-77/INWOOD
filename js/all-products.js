// Fetch data from the JSON file
fetch("js/all-products.json")
  .then((response) => response.json())
  .then((data) => {
    const allProducts = [
      ...data.bedRooms,
      ...data.diningRooms,
      ...data.workspaceRooms,
      ...data.kitchenRooms,
    ];

    // Display all products
    displayProducts(allProducts);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to display all products
function displayProducts(products) {
  const allProductsDiv = document.getElementById("all-products");
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
      
    // Attach event listeners
    productCard
      .querySelector(".add-to-cart")
      .addEventListener("click", () => addToCart(getProductInfo(productCard)));
    productCard
      .querySelector(".add-to-favorites")
      .addEventListener("click", () => addToFavorites(getProductInfo(productCard)));

    // Append the product to the all-products container
    allProductsDiv.appendChild(productDiv);
  });
}
