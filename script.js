//select elements
//aside menu related elements - mobile and tablet
const asideMenu = document.getElementById("aside-menu");
const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");

//background filter
const backgroundFilter = document.getElementById("background-filter");

//mobile/tablet image slider related elements
const previousImageButton = document.getElementById("image-prev-button");
const nextImageButton = document.getElementById("image-next-button");
const productImages = document.querySelectorAll(".product-image-container");

//pricing
const discountedPrice = document.getElementById("discounted-price");
const originalPrice = document.getElementById("original-price");
const addToCartForm = document.getElementById("add-to-cart-form");
const decreaseQuantityButton = document.getElementById("minus-button");
const quantityLabel = document.getElementById("quantity-label");
const increaseQuantityButton = document.getElementById("plus-button");

//cart
const toggleCartButton = document.getElementById("cart-button");
const cartIconQuantity = document.getElementById("product-quantity");
const cartModal = document.getElementById("cart-modal");
const cartCheckoutForm = document.getElementById("cart-checkout-form");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartItemQuantity = document.getElementById("cart-item-quantity");
const cartItemTotalPrice = document.getElementById("cart-item-total-price");
const deleteCartItemButton = document.getElementById("delete-cart-item-button");

//app state
const state = {
  currentProductImageIndex: 0,
  productQuantity: 1,
  originalPrice: 250,
  showCartModal: false,
  unitPrice: 125,
};

//event listeners
openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

previousImageButton.addEventListener("click", goPrevProductImage);
nextImageButton.addEventListener("click", goNextProductImage);

decreaseQuantityButton.addEventListener("click", decreaseQuantity);
increaseQuantityButton.addEventListener("click", increaseQuantity);
addToCartForm.addEventListener("submit", submitQuantity);

toggleCartButton.addEventListener("click", toggleCartModal);
deleteCartItemButton.addEventListener("click", emptyCart);
cartCheckoutForm.addEventListener("submit", submitCheckout);

//callback functions
/**
 * function to open navigation menu and display background filter
 * runs only on mobile and tablet devices when clicked on the open menu button
 * adds aside-menu--open class to the navigation menu, increases width
 * adds background-filter--open class to the background filter, increases height
 */
function openMenu() {
  asideMenu.classList.add("aside-menu--open");
  backgroundFilter.classList.add("background-filter--open");
}

/**
 * function to close the navigation menu and hide the background filter
 * runs only on mobile and tablet devices when clicked on the close menu button
 * removes aside-menu--open class to the navigation menu, reduces width to 0
 * removes background-filter--open class to the background filter, reduces height to 0
 */
function closeMenu() {
  asideMenu.classList.remove("aside-menu--open");
  backgroundFilter.classList.remove("background-filter--open");
}

/**
 * function to display the previous image
 */
function goPrevProductImage() {
  //if the currentProductImage index reaches zero -> currentProduct image index = productImages (node list) .length - 1
  if (state.currentProductImageIndex === 0) {
    state.currentProductImageIndex = productImages.length - 1;
  } else {
    //decrease the currentProductImageIndex by one
    state.currentProductImageIndex--;
  }

  //distribute the sliding classes after the index update
  slideProductImages();
}

/**
 * function to display the next image
 */
function goNextProductImage() {
  //increase the currentProductIndex
  state.currentProductImageIndex =
    (state.currentProductImageIndex + 1) % productImages.length;

  //distribute the sliding classes after the index update
  slideProductImages();
}

/**
 * function to distribute the productImages classes
 * loop over the node list
 * give the images product-image-container--prev class if their indexes are smaller than the current index
 * give the current image product-image-container--curr class
 * give the images product-image-container--next class if their indexes are bigger than the current index
 */
function slideProductImages() {
  for (let i = 0; i < productImages.length; i++) {
    if (i < state.currentProductImageIndex) {
      //remove the current class if contains
      productImages[i].classList.remove("product-image-container--curr");

      //remove the next class if contains
      productImages[i].classList.remove("product-image-container--next");

      //add the previous class
      productImages[i].classList.add("product-image-container--prev");

      //jump to the next iteration
      continue;
    }

    if (i > state.currentProductImageIndex) {
      //remove the current class if contains
      productImages[i].classList.remove("product-image-container--curr");

      //remove the previous class if contains
      productImages[i].classList.remove("product-image-container--prev");

      //add the next class
      productImages[i].classList.add("product-image-container--next");

      //jump to the next iteration
      continue;
    }

    if (i === state.currentProductImageIndex) {
      //remove the previous class if contains
      productImages[i].classList.remove("product-image-container--prev");

      //remove the next class
      productImages[i].classList.remove("product-image-container--next");

      //add the current class if contains
      productImages[i].classList.add("product-image-container--curr");

      //jump to the next iteration
      continue;
    }
  }
}

/**
 * function to increase the quantity of the product
 */
function increaseQuantity() {
  //increase the state.productQuantity
  state.productQuantity++;

  //display the product quantity on the label
  updateProductQuantity();
}

/**
 * function to decrease the quantity of the product
 */
function decreaseQuantity() {
  //if state.productQuantity is one, do nothing
  if (state.productQuantity === 1) return;

  //decrease the product quantity
  state.productQuantity--;

  //display the product quantity on the label
  updateProductQuantity();
}

/**
 * function to update the product quantity after the state is updated
 * update the label inner text with the state.productQuantity
 * update the prices (discounted and the original) accordingly to the product quantity and the discount rate
 * display the updated prices
 * display the current product quantity on the cart icon if there is at least one
 */
function updateProductQuantity() {
  //get original price value as a number and multiplate it with the product quantity
  //protect the original (base) price to calculate the new price correctly
  //original price example: "$250.00"
  state.originalPrice =
    state.originalPrice || parseFloat(originalPrice.innerText.slice(1));

  displayProductQuantity();
}

/**
 * function to display the product quantity
 * updates the product quantity fields using the related state values
 */
function displayProductQuantity() {
  //display the quantity
  quantityLabel.innerText = state.productQuantity;

  //display the price fields in the same format
  originalPrice.innerText = `$${(
    state.originalPrice * state.productQuantity
  ).toFixed(2)}`;

  //unit price is the already discounted price - for this app 125
  discountedPrice.innerText = `$${(
    state.unitPrice * state.productQuantity
  ).toFixed(2)}`;
}

/**
 * function to submit the quantity of the product
 * add current item to the cart
 * update the realated cart fields
 * @param event - form submit event
 */
function submitQuantity(event) {
  //omit page reaload
  event.preventDefault();

  //if the product quantity is zero throw an error
  if (!state.productQuantity) {
    throw new Error(
      "An unexpected error occured! Can not access the product quantity."
    );
  }

  //hide the empty cart message - stop displaying it
  emptyCartMessage.classList.add("hidden");

  //update the checkout form fields
  cartItemQuantity.innerText = state.productQuantity;
  cartItemTotalPrice.innerText = `$${state.unitPrice * state.productQuantity}`;

  //show the cart checkout form - start displaying it
  cartCheckoutForm.classList.remove("hidden");
}

/**
 * function to open and close the cart modal
 */
function toggleCartModal() {
  if (state.showCartModal) {
    //close the modal
    cartModal.close();
  } else {
    //open the modal
    cartModal.show();
  }

  //toggle the state value
  state.showCartModal = !state.showCartModal;
}

/**
 * function to empty the cart
 * hide the checkout form
 * display the empty cart message
 */
function emptyCart() {
  cartCheckoutForm.classList.add("hidden");
  emptyCartMessage.classList.remove("hidden");
}

/**
 * function to submit the checkout form
 * empty the cart
 * reset the app state
 * re-display the product quantity
 */
function submitCheckout() {
  emptyCart();

  state.currentProductImageIndex = 0;
  state.productQuantity = 1;
  state.originalPrice = 250;
  state.showCartModal = false;
  state.unitPrice = 125;

  displayProductQuantity();
}
