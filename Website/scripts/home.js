import getDataFetch from "../helpers/getData.js";
import { printCards } from "../modules/printCards.js";
const urlProperties = "http://localhost:3000/products";
import postDataFetch from "../helpers/postData.js";
const urlFavorites = "http://localhost:3000/favorites";
let properties = [];
const propertiesContainer = document.querySelector(".products_container");
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    window.location.href = 'index.html';
} else {
    if (user.role === 'admin') {
        document.getElementById('admin-link').style.display = 'inline';
    }
}
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

document.addEventListener("DOMContentLoaded", async () => {
    sessionStorage.removeItem("propertyDetails");
    sessionStorage.removeItem("editProperty");
  
    try {
      properties = await getDataFetch(urlProperties);
      console.log(properties);
  
      printCards(propertiesContainer, properties);
    } catch (error) {
      console.log(error);
    }
  });

  document.addEventListener("click", async (event) => {
  const { target } = event;
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
  if (target.classList.contains("favorite")) {
    const idFavorite = target.name;

    const favoriteProperty = await getDataFetch(
      `${urlProperties}/${idFavorite}`
    );
    console.log("favorite"+favoriteProperty)
    favoriteProperty.userId = currentUserId;
    favoriteProperty.productId = idFavorite;
    favoriteProperty.id = Math.floor(Math.random() *130);

    if (Object.entries(favoriteProperty).length) {
      await postDataFetch(urlFavorites, favoriteProperty);
    }
  }
});