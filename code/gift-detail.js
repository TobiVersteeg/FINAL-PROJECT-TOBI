document.addEventListener('DOMContentLoaded', () => {
    const giftDetail = JSON.parse(localStorage.getItem('giftDetail'));

    if (giftDetail) {
        document.getElementById('gift-image').src = giftDetail.image;
        document.getElementById('gift-name').textContent = giftDetail.name;
        document.getElementById('gift-description').textContent = giftDetail.description;
        document.getElementById('gift-price').textContent = `€${giftDetail.price.toFixed(2)}`;
        document.getElementById('gift-categories').textContent = `Categories: ${giftDetail.categories.join(', ')}`;
        document.getElementById('gift-link').href = giftDetail.links;
    } else {
        window.location.href = 'index.html';
    }
});
