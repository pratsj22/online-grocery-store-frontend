
const swiper = new Swiper('.swiper', {
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	loop: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});


let cart = document.querySelector('.cart');
let cartlogo = document.querySelector('.cart-logo');
let closecart = document.querySelector('#close-cart');

cartlogo.onclick = () => {
	cart.classList.toggle('active')
}
closecart.onclick = () => {
	cart.classList.toggle('active')
}
// cart working js
if (document.readyState == 'loading') {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

function ready() {
	updatetotal();
	// Reomve Items From Cart
	var removeCartButtons = document.getElementsByClassName('cart-remove')
	console.log(removeCartButtons)
	for (var i = 0; i < removeCartButtons.length; i++) {
		var button = removeCartButtons[i]
		button.addEventListener('click', removeCartItem)
		updatetotal();
	}
	// Quantity Changes
	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
		updatetotal();
	}
	// Add To Cart

	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}
	// Buy order
	const buy=document.querySelector(".btn-buy");
	buy.addEventListener("click",buy_order);
}
function updatetotal() {
	update();
}
function update() {
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		var price = parseFloat(priceElement.innerText.replace("₹", ""));
		var quantity = quantityElement.value;
		total += price * quantity;
		total = Math.round(total * 100) / 100;
		document.getElementsByClassName("total-price")[0].innerText = "₹" + total;
		
	}
}

// Reomve Items From Cart

function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}
// Quantity Changes

function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updatetotal();
}

// Add To cart
let itemsAdded=[];
function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement.parentElement.parentElement;
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
	var price = shopProducts.getElementsByClassName('price')[0].innerText;
	var productImg = shopProducts.children[0].src;
	console.log(title, price, productImg);
	let newToAdd = {
		title,
		price,
		productImg,
	};
	if (itemsAdded.find(el => el.title == newToAdd.title)) {
		alert("You have already add this item to cart");
		return;
	}
	else{
		itemsAdded.push(newToAdd);
	}
	let cartBoxElement = CartBoxComponent(title, price, productImg);
	let newNode = document.createElement("div");
	newNode.innerHTML = cartBoxElement;
	const cartContent = cart.querySelector(".cart-content")
	cartContent.appendChild(newNode);
	newNode
		.getElementsByClassName("cart-remove")[0]
		.addEventListener("click", removeCartItem);
	newNode
		.getElementsByClassName("cart-quantity")[0]
		.addEventListener("change", quantityChanged);
	updatetotal();
}

function CartBoxComponent(title, price, productImg) {
	return `
			<div class="cart-box">
				<img src="${productImg}">
				<div class="detail-box">
					<div class="cart-product-title">
					${title}
					</div>
					<div class="cart-price">${price}</div>
					<input type="number" value="1" class="cart-quantity">
				</div>
				<i class="fa fa-trash cart-remove" aria-hidden="true"></i>
			</div>
			`
}
function buy_order() {
	if (itemsAdded.length<=0) {
		alert("No Products added yet!! \nPlease add a product first");
		return;
	}
	const cartContent= cart.querySelector(".cart-content")
	cartContent.innerHTML="";
	alert("Your order is placed successfully")
	itemsAdded=[];
	updatetotal();
}