var product = [{
    id: 1,
    img: 'img/BTS.png',
    name: 'BBQ T-shirt',
    price: 500,
    description: 'BBQ T-shirt high quality cotton material',
    type: 'shirt' 
}, {
    id: 2,
    img: 'img/BTS.png',
    name: 'BBQ Hoodie',
    price: 800,
    description: 'Comfortable hoodie for gym',
    type: 'Hoodie'
}, {
    id: 3,
    img: 'img/BTS.png',
    name: 'BBQ Sweatpants',
    price: 600,
    description: 'Premium sweatpants',
    type: 'Sweatpants'
}, {
    id: 4,
    img: 'img/BTS.png',
    name: 'BBQ Compression',
    price: 450,
    description: 'Compression shirt for workout',
    type: 'shirt'
},{
    id: 5,
    img: 'img/BTS.png',
    name: 'BBQ Whey',
    price: 1200,
    description: 'Whey protein 100%',
    type: 'Whey Protein'
}];

var cart = [];

$(document).ready(() => {
    // แสดงสินค้า
    renderProducts();
    
    // คลิกที่สินค้าเพื่อเปิด Modal รายละเอียด
    $(document).on('click', '.product-items', function() {
        var id = $(this).data('id');
        var selectedProduct = product.find(p => p.id === id);
        showProductModal(selectedProduct);
    });
    
    // ปิด Modal
    $(document).on('click', '.modal-bg, .btn:not(.btn-buy)', function() {
        $('.modal').hide();
    });
    
    // เพิ่มสินค้าลงตะกร้า
    $(document).on('click', '.btn-buy', function() {
        var productId = $(this).data('product-id');
        addToCart(productId);
        $('.modal').eq(0).hide();
    });
    
    // เปิดตะกร้า
    $('.nav-profile-cart').click(function() {
        showCartModal();
    });
    
    // ปุ่ม + / - ในตะกร้า
    $(document).on('click', '.btnc', function() {
        var action = $(this).text();
        var productId = $(this).data('product-id');
        updateCartQuantity(productId, action);
    });
    
    // ปุ่มซื้อ
    $(document).on('click', '.btn-checkout', function() {
        checkout();
    });
});

function renderProducts() {
    var html = '';
    for(let i = 0; i < product.length; i++){
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
    var existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        var productData = product.find(p => p.id === productId);
        cart.push({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            img: productData.img,
            quantity: 1
        });
    }
    
    updateCartCount();
    alert('Product has been added to cart!');
}

function updateCartCount() {
    var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cartcount').text(totalItems);
}

function showCartModal() {
    var modal = $('.modal').eq(1);
    var cartHtml = '';
    
    if (cart.length === 0) {
        cartHtml = '<p style="text-align: center; padding: 20px;">ตะกร้าว่าง</p>';
    } else {
        cart.forEach(item => {
            cartHtml += `
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">${item.name}</p>
                            <p style="font-size: 1.2vw;">${item.price} THB</p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p class="btnc" data-product-id="${item.id}">-</p>
                        <p style="margin: 0 20px">${item.quantity}</p>
                        <p class="btnc" data-product-id="${item.id}">+</p>
                    </div>
                </div>`;
        });
    }
    
    modal.find('.cartlist').html(cartHtml);
    modal.show();
}

function updateCartQuantity(productId, action) {
    var item = cart.find(item => item.id === productId);
    
    if (action === '+') {
        item.quantity++;
    } else if (action === '-') {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    
    updateCartCount();
    showCartModal();
}

function checkout() {
    if (cart.length === 0) {
        alert('Empty Basket!');
        return;
    }
    
    var total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert('Total: ' + total + ' $\nThank you for using our service.');
    cart = [];
    updateCartCount();
    $('.modal').hide();
}