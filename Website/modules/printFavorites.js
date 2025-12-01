export const printFavorites = (container, array) => {
  container.innerHTML = "";
  array.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.innerHTML = `

        <img
          src="${product.image}"
          alt="Ice cream image"
        />
  
      <p>${product.name}</p>
      <p>Price: $ ${product.price}</p>
			<p>Description: ${product.description}</p>	
        `;

      container.appendChild(article);
  });
};