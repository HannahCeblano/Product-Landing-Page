
// 1. Initialize Cart from Memory
let cart = JSON.parse(localStorage.getItem('flowerShopCart')) || [];

// 2. DOM Elements
const cartCountDisplay = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const totalPriceDisplay = document.getElementById('total-price');

// 3. Add to Cart Logic
function addToCart(event) {
    const btn = event.target;
    
    // Get info from the card
    const name = btn.getAttribute('data-name') || "Special Bouquet";
    const priceText = btn.parentElement.querySelector('p').innerText;
    const price = parseInt(priceText.replace(' PHP', ''));

    // Add to array
    cart.push({ name: name, price: price });
    
    saveAndUpdate();

    // Visual Feedback
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
    }, 1000);
}

// 4. Save to LocalStorage and Refresh UI
function saveAndUpdate() {
    localStorage.setItem('flowerShopCart', JSON.stringify(cart));
    
    // Update Count
    if (cartCountDisplay) cartCountDisplay.innerText = cart.length;
    
    // Update Modal List
    if (cartItemsList) {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
            cartItemsList.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.price} PHP</span>
                </div>
            `;
        });
        totalPriceDisplay.innerText = total;
    }
}

// 5. Modal Controls
document.getElementById('cart-status').onclick = () => {
    cartModal.style.display = "block";
};

document.querySelector('.close-modal').onclick = () => {
    cartModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == cartModal) cartModal.style.display = "none";
};

// 6. Clear Cart
function clearCart() {
    cart = [];
    saveAndUpdate();
}

// 7. Event Listeners
document.querySelectorAll('.add-btn, #hero-buy-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Run on load
saveAndUpdate();