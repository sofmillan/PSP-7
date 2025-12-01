import getDataFetch from "../helpers/getData.js";
import { printFavorites } from "../modules/printFavorites.js";

const urlFavorites = "http://localhost:3000/favorites";
const container = document.querySelector("#container");

document.addEventListener('DOMContentLoaded',async()=>{
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    const favorites = await getDataFetch(urlFavorites);
    const favoritesByUser = favorites.filter(product => product.userId == currentUserId);
    printFavorites(container, favoritesByUser);
})
