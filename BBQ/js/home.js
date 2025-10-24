var product = [{
    id: 1,
    img: 'img/BTS.png',
    name: 'BBQ T-shirt',
    price: 500,
    description: 'BBQ T-shirt high quality cotton material',
    type: 'shirt'
}, {
    id: 2,
    img: 'img/hoodie.png',
    name: 'BBQ Hoodie',
    price: 800,
    description: 'Comfortable hoodie for gym',
    type: 'Hoodie'
}, {
    id: 3,
    img: 'img/sp2.png',
    name: 'BBQ Sweatpants',
    price: 600,
    description: 'Premium sweatpants',
    type: 'Sweatpants'
}, {
    id: 4,
    img: 'img/cs.png',
    name: 'BBQ Compression',
    price: 450,
    description: 'Compression shirt for workout',
    type: 'shirt'
}, {
    id: 5,
    img: 'img/whry.png',
    name: 'BBQ Whey',
    price: 1200,
    description: 'Whey protein 100%',
    type: 'Whey Protein'
}];

var cart = [];

// ฟังก์ชันโหลดตะกร้าจาก localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('bbq_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Loaded cart:', cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

// ฟังก์ชันบันทึกตะกร้าลง localStorage
function saveCart() {
    try {
        localStorage.setItem('bbq_cart', JSON.stringify(cart));
        console.log('Saved cart:', cart);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

$(document).ready(() => {
    // โหลดตะกร้าจาก localStorage ก่อน
    loadCart();
    updateCartCount();
    
    // แสดงสินค้า
    renderProducts();

    // คลิกที่สินค้าเพื่อเปิด Modal รายละเอียด
    $(document).on('click', '.product-items', function () {
        var id = parseInt($(this).data('id'));
        console.log('Clicked product ID:', id);
        var selectedProduct = product.find(p => p.id === id);
        console.log('Found product:', selectedProduct);
        if (selectedProduct) {
            showProductModal(selectedProduct);
        } else {
            console.error('Product not found!');
        }
    });

    // ปิด Modal ด้วยการคลิก Background
    $(document).on('click', '.modal-bg', function () {
        $(this).parent('.modal').hide();
    });
    
    // ปิด Modal ด้วยปุ่ม Close
    $(document).on('click', '.btn-close', function () {
        $('.modal').eq(0).hide();
    });
    
    // ปิด Modal ตะกร้าด้วยปุ่ม Cancel
    $(document).on('click', '.btn-cancel', function () {
        $('.modal').eq(1).hide();
    });

    // เพิ่มสินค้าลงตะกร้า
    $(document).on('click', '.btn-buy', function (e) {
        e.stopPropagation();
        var productId = parseInt($(this).data('product-id'));
        console.log('Adding product ID to cart:', productId);
        addToCart(productId);
        $('.modal').eq(0).hide();
    });

    // เปิดตะกร้า
    $('.nav-profile-cart').click(function () {
        showCartModal();
    });

    // ปุ่ม + / - ในตะกร้า
    $(document).on('click', '.btnc', function () {
        var action = $(this).text();
        var productId = parseInt($(this).data('product-id'));
        console.log('Update cart - Action:', action, 'Product ID:', productId);
        updateCartQuantity(productId, action);
    });

    // ปุ่ม X (Remove)
    $(document).on('click', '.btn-remove', function (e) {
        e.stopPropagation();
        var productId = parseInt($(this).data('product-id'));
        console.log('Removing product ID:', productId);
        
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        showCartModal();
    });

    // ปุ่มซื้อ (Checkout)
    $(document).on('click', '.btn-checkout', function (e) {
        e.stopPropagation();
        checkout();
    });
});

function renderProducts() {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div class="product-items ${product[i].type}" data-id="${product[i].id}">
                    <img class="product-img" src="${product[i].img}" alt="${product[i].name}">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1.2vw;">${product[i].price} THB</p>
                </div>`;
    }
    $("#productlist").html(html);
}

function showProductModal(product) {
    var modal = $('.modal').eq(0);
    modal.find('.modaldesc-img').attr('src', product.img);
    modal.find('.modaldesc-detail p').eq(0).text(product.name);
    modal.find('.modaldesc-detail p').eq(1).text(product.price + ' THB');
    modal.find('.modaldesc-detail p').eq(2).text(product.description);
    modal.find('.btn-buy').attr('data-product-id', product.id);
    modal.show();
}

function addToCart(productId) {
    console.log('addToCart called with ID:', productId, 'Type:', typeof productId);

    // หาสินค้าที่มี ID ตรงกัน
    var existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
        console.log('Increased quantity for:', existingItem.name, '→', existingItem.quantity);
    } else {
        var productData = product.find(p => p.id === productId);
        if (productData) {
            var newItem = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                img: productData.img,
                quantity: 1
            };
            cart.push(newItem);
            console.log('Added new item to cart:', newItem);
        } else {
            console.error('Product not found with ID:', productId);
            alert('Error: Product not found!');
            return;
        }
    }
    
    saveCart();
    updateCartCount();
    alert('Product has been added to cart!');
    console.log('Current cart:', cart);
}

function updateCartCount() {
    var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cartcount').text(totalItems);
    console.log('Cart count updated:', totalItems);
}

function showCartModal() {
    var modal = $('.modal').eq(1);
    var cartHtml = '';
    var total = 0;

    // ===== DEBUG: แสดงข้อมูล cart =====
    console.log('=== Opening Cart ===');
    console.log('Cart items:', cart);
    console.log('Number of items:', cart.length);
    console.log('Cart JSON:', JSON.stringify(cart, null, 2));
    // ==================================

    if (cart.length === 0) {
        cartHtml = '<p style="text-align: center; color: gray; padding: 20px;">Your cart is empty.</p>';
        $('.btn-checkout').prop('disabled', true);
    } else {
        $('.btn-checkout').prop('disabled', false);

        // วนลูปแสดงสินค้าทั้งหมดในตะกร้า
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            console.log(`Building HTML for item ${i + 1}:`, item.name);

            cartHtml += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="cart-img">
                    <div class="cart-detail">
                        <p class="cart-name">${item.name}</p>
                        <p class="cart-price">${item.price.toLocaleString()} THB x ${item.quantity}</p>
                        <p class="cart-subtotal">Subtotal: <b>${itemTotal.toLocaleString()} THB</b></p>
                        <div class="cart-quantity-control">
                            <button class="btnc" data-product-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="btnc" data-product-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="btnc btn-remove" data-product-id="${item.id}">X</button>
                </div>
            `;
        }
        
        console.log('Total items processed:', cart.length);
        console.log('CartHTML length:', cartHtml.length);
        
        // แสดงราคารวม
        cartHtml += `
            <div style="border-top: 2px solid #000; padding-top: 15px; margin-top: 15px;">
                <p style="font-size: 1.5vw; font-weight: bold; text-align: right;">
                    Total: ${total.toLocaleString()} THB
                </p>
            </div>`;
    }

    console.log('Setting HTML to modal...');
    modal.find('.cartlist').html(cartHtml);
    console.log('Modal HTML set. Items in DOM:', modal.find('.cart-item').length);
    modal.show();
}

function updateCartQuantity(productId, action) {
    console.log('updateCartQuantity - ID:', productId, 'Action:', action);

    var item = cart.find(item => item.id === productId);

    if (!item) {
        console.error('Item not found in cart with ID:', productId);
        return;
    }

    if (action === '+') {
        item.quantity++;
        console.log('Increased quantity:', item.name, '→', item.quantity);
    } else if (action === '-') {
        item.quantity--;
        console.log('Decreased quantity:', item.name, '→', item.quantity);
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
            console.log('Removed item from cart:', item.name);
        }
    }
    
    saveCart();
    updateCartCount();
    showCartModal();
}

function checkout() {
    if (cart.length === 0) {
        alert('Empty Basket!');
        return;
    }

    var total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    var itemsList = cart.map(item => `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} THB`).join('\n');
    
    var confirmMsg = `Order Summary:\n\n${itemsList}\n\nTotal: ${total.toLocaleString()} THB\n\nConfirm purchase?`;
    
    if (confirm(confirmMsg)) {
        alert('Payment successful!\n\nThank you for using our service!');
        console.log('Checkout completed. Clearing cart...');
        
        cart = []; 
        saveCart(); 
        updateCartCount();
        $('.modal').hide();
        
        console.log('Cart cleared and saved to localStorage');
    } else {
        console.log('Checkout cancelled by user');
    }
}

// ฟังก์ชันเคลียร์ตะกร้า (สำหรับ debug)
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    console.log('Cart cleared manually!');
    alert('Cart has been cleared!');
}