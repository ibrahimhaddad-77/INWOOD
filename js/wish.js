function displayFavorites() {
  const favoritesTableBody = document.querySelector("#FavoriteContainer");
  favoritesTableBody.innerHTML = ""; // Clear previous entries

  if (favorites.length === 0) {
    favoritesTableBody.innerHTML =
      '<tr><td colspan="5">Your favorites list is empty.</td></tr>';
    return;
  }

  favorites.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.name}</td>
            <td><button class="remove-from-favorites" data-id="${product.id}">Remove</button></td>
        `;

    favoritesTableBody.appendChild(row);
  });

  // Add event listeners for removing items from favorites
  document.querySelectorAll(".remove-from-favorites").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeFromFavorites(productId);
    });
  });
}
// Function to remove product from favorites
function removeFromFavorites(productId) {
  favorites = favorites.filter((product) => product.id !== productId);
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
  displayFavorites(); // Refresh the favorites table
  updateFavoritesCount(); // Update favorites count in the header
}
// Function to update favorites count in header
function updateFavoritesCount() {
  document.getElementById("favorite-count").textContent = favorites.length;
}
