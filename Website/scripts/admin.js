const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user || user.role !== 'admin') {
    window.location.href = 'home.html'; 
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});


document.getElementById('create-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-img').value;
    const statusMessage = document.getElementById('status-message');

    const newProduct = { name, description, price, image, createdAt: new Date().toISOString() };
    
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });

    if (response.ok) {
        statusMessage.textContent = `Product "${name}" created successfully!`;
        document.getElementById('create-product-form').reset();
    } else {
        statusMessage.textContent = 'Failed to create product.';
    }
});