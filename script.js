//select elements
//aside menu related elements - mobile and tablet
const asideMenu = document.getElementById("aside-menu");
const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");

//background filter
const backgroundFilter = document.getElementById("background-filter");

//mobile/tablet image slider related elements
const previousImageButton = document.getElementById("image-prev-button-screen");
const nextImageButton = document.getElementById("image-next-button-screen");
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
const cartIconQuantityContainer = document.getElementById(
  "cart-product-quantity-container"
);
const cartIconQuantity = document.getElementById("cart-product-quantity");
const cartModal = document.getElementById("cart-modal");
const cartCheckoutForm = document.getElementById("cart-checkout-form");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartItemQuantity = document.getElementById("cart-item-quantity");
const cartItemTotalPrice = document.getElementById("cart-item-total-price");
const deleteCartItemButton = document.getElementById("delete-cart-item-button");

//avatar
const avatar = document.getElementById("application-avatar");

//desktop product showcase
const desktopShowcaseImage = document.getElementById(
  "current-desktop-product-image"
);
const desktopThumbnailsList = document.getElementById(
  "desktop-thumbnails-list"
);
const desktopThumbnailButtons = document.querySelectorAll(
  ".desktop-product-thumbnail-button"
);
const desktopThumbnailImages = document.querySelectorAll(
  ".desktop-product-thumbnail-image"
);

//lightbox
const lightboxModal = document.getElementById("lightbox-modal");
const closeLightboxButton = document.getElementById("close-lightbox-button");
const lightboxPreviousImageButton = document.getElementById(
  "image-prev-button-lightbox"
);
const lightboxNextImageButton = document.getElementById(
  "image-next-button-lightbox"
);
const lightboxThumbnailsList = document.getElementById(
  "lightbox-thumbnails-list"
);
const lightboxThumbnailButtons = document.querySelectorAll(
  ".lightbox-product-thumbnail-button"
);
const lightboxThumbnailImages = document.querySelectorAll(
  ".lightbox-product-thumbnail-image"
);

//app state
const state = {
  currentImageIndex: 0,
  productQuantity: 1,
  originalPrice: 250,
  showCartModal: false,
  unitPrice: 125,
};

//event listeners
openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

lightboxPreviousImageButton.addEventListener("click", goPreviousImage);
nextImageButton.addEventListener("click", goNextImage);

previousImageButton.addEventListener("click", goPreviousImage);
lightboxNextImageButton.addEventListener("click", goNextImage);

decreaseQuantityButton.addEventListener("click", decreaseQuantity);
increaseQuantityButton.addEventListener("click", increaseQuantity);
addToCartForm.addEventListener("submit", submitQuantity);

toggleCartButton.addEventListener("click", toggleCartModal);
deleteCartItemButton.addEventListener("click", emptyCart);
cartCheckoutForm.addEventListener("submit", submitCheckout);

//click event on the thumbnails lists desktop/lightbox with event delegation for the thumbnail images
desktopThumbnailsList.addEventListener("click", swapImage);
lightboxThumbnailsList.addEventListener("click", swapImage);

//clickevent on the desktop showcase image to open the lightbox
desktopShowcaseImage.addEventListener("click", openLightbox);
closeLightboxButton.addEventListener("click", closeLightbox);

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
 * @param event - click on the arrow buttons on mobile, tablet and the desktop lightbox
 */
function goPreviousImage(event) {
  //if the currentProductImage index reaches zero -> currentProduct image index = productImages (node list) .length - 1
  if (state.currentImageIndex === 0) {
    state.currentImageIndex = productImages.length - 1;
  } else {
    //decrease the currentImageIndex by one
    state.currentImageIndex--;
  }

  //get the type of the arrow button, lightbox/screen(used on mobile and tablet)
  const arrowType = event.target.id.split("-").at(-1);

  if (arrowType === "screen") {
    //distribute the sliding classes after the index update for mobile and tablets
    slideImage();
  }

  if (arrowType === "lightbox") {
    //update the lightbox showcase image with state.currentIndex
    swapDistributor(
      state.currentImageIndex + 1, //starts at 0
      "current-lightbox-product-image",
      lightboxThumbnailButtons,
      lightboxThumbnailImages
    );
  }
}

/**
 * function to display the next image
 * @param event - click on the arrow buttons on mobile, tablet and the desktop lightbox
 */
function goNextImage(event) {
  //increase the currentProductIndex
  state.currentImageIndex =
    (state.currentImageIndex + 1) % productImages.length;

  //get the type of the arrow button, lightbox/screen(used on mobile and tablet)
  const arrowType = event.target.id.split("-").at(-1);

  if (arrowType === "screen") {
    //distribute the sliding classes after the index update for mobile and tablets
    slideImage();
  }

  if (arrowType === "lightbox") {
    //update the lightbox showcase image with state.currentIndex
    swapDistributor(
      state.currentImageIndex + 1, //starts at 0
      "current-lightbox-product-image",
      lightboxThumbnailButtons,
      lightboxThumbnailImages
    );
  }
}

/**
 * function to slide the images using navigation arrows on mobile, tablet, and the desktop lightbox
 * loop over the node list
 * give the images product-image-container--prev class if their indexes are smaller than the current index
 * give the current image product-image-container--curr class
 * give the images product-image-container--next class if their indexes are bigger than the current index
 */
function slideImage() {
  for (let i = 0; i < productImages.length; i++) {
    if (i < state.currentImageIndex) {
      //remove the current class if contains
      productImages[i].classList.remove("product-image-container--curr");

      //remove the next class if contains
      productImages[i].classList.remove("product-image-container--next");

      //add the previous class
      productImages[i].classList.add("product-image-container--prev");

      //jump to the next iteration
      continue;
    }

    if (i > state.currentImageIndex) {
      //remove the current class if contains
      productImages[i].classList.remove("product-image-container--curr");

      //remove the previous class if contains
      productImages[i].classList.remove("product-image-container--prev");

      //add the next class
      productImages[i].classList.add("product-image-container--next");

      //jump to the next iteration
      continue;
    }

    if (i === state.currentImageIndex) {
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
  cartItemQuantity.innerText =
    parseInt(cartItemQuantity.innerText) + state.productQuantity;

  cartItemTotalPrice.innerText = `$${(
    parseInt(cartItemTotalPrice.innerText.trim().slice(1)) +
    state.unitPrice * state.productQuantity
  ).toFixed(2)}`;

  cartIconQuantity.innerText =
    parseInt(cartIconQuantity.innerText) + state.productQuantity;

  //show the cart checkout form - start displaying it
  cartCheckoutForm.classList.remove("hidden");
  cartIconQuantityContainer.classList.remove("hidden");

  //add orange border to the avatar
  avatar.classList.add("application-avatar-active");

  //reset the product quantity
  state.productQuantity = 1;

  displayProductQuantity();
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
 * reset the app values
 * reset the cart
 * reset state
 */
function emptyCart() {
  //reset the cart
  cartItemQuantity.innerText = "0";
  cartItemTotalPrice.innerText = "$0";

  //reset the cart quantity icon
  cartIconQuantity.innerText = "0";

  //hide the cart formi display the empty message
  cartCheckoutForm.classList.add("hidden");
  emptyCartMessage.classList.remove("hidden");

  //hide the cart quantity icon
  cartIconQuantityContainer.classList.add("hidden");

  //remove the active class from the avatar
  avatar.classList.remove("application-avatar-active");

  //reset tbe state
  state.currentImageIndex = 0;
  state.productQuantity = 1;
  state.originalPrice = 250;
  state.showCartModal = false;
  state.unitPrice = 125;
}

/**
 * function to submit the checkout form
 * empty the cart
 * re-display the product quantity
 */
function submitCheckout() {
  emptyCart();

  displayProductQuantity();
}

/**
 * function to swap the images using thumbnails list, on desktop and the desktop lightbox
 * gets thumbnail information passes it to the swap distributor function
 * @param event - click event on the thumbnails list
 */
function swapImage(event) {
  //guard clause for the elements except for images
  if (event.target.tagName !== "IMG") return;

  //get the clicked thumbnail id
  //example desktop: product-thumbnail-desktop-1
  //example lightbox: product-thumbnail-lightbox-1
  const [currentThumbnailType, currentThumbnailIndex] = event.target.id
    .split("-")
    .slice(-2);

  //pass the desktop thumbnails images/buttons node lists
  if (currentThumbnailType === "desktop") {
    swapDistributor(
      currentThumbnailIndex,
      "current-desktop-product-image",
      desktopThumbnailButtons,
      desktopThumbnailImages
    );
  }

  //pass the lightbox thumbnails images/buttons node lists
  if (currentThumbnailType === "lightbox") {
    swapDistributor(
      currentThumbnailIndex,
      "current-lightbox-product-image",
      lightboxThumbnailButtons,
      lightboxThumbnailImages
    );
  }
}

/**
 * function to visually swap the image
 * used for desktop thumbnails and the lightbox thumbnails
 * @param currentThumbnailIndex - index of the current thumbnail image, starting from 1, provided by the swapImage function
 * @param showCaseImageId - id of the showcase image of the desktop/lightbox showcase image provided by the swapImage function
 * @param thumbnailButtons - nodelist for the buttons desktop/lightbox provided by the swapImage function depending on the current thumbnail type
 * @param thumbnailImages - nodelist for the images desktop/lightbox provided by the swapImage function depending on the current thumbnail type
 */
function swapDistributor(
  currentThumbnailIndex,
  showcaseImageId,
  thumbnailButtons,
  thumbnailImages
) {
  //select the showcaseImage using the provided id
  const showcaseImage = document.getElementById(showcaseImageId);

  //update the current showcase image src and alt
  showcaseImage.setAttribute(
    "src",
    `./images/image-product-${currentThumbnailIndex}.jpg`
  );

  showcaseImage.setAttribute("alt", `product image ${currentThumbnailIndex}`);

  //update the thumbnail (button and the image) classes
  //loop over the thumbnils
  for (let i = 0; i < thumbnailButtons.length; i++) {
    //currentThumbnailIndex starts at one
    if (i === currentThumbnailIndex - 1) {
      //give active class to the selected thumbnail
      thumbnailButtons[i].classList.add("product-thumbnail-button--active");

      //give active class to the selected image
      thumbnailImages[i].classList.add("product-thumbnail-image--active");
    } else {
      //remove the active classes
      thumbnailButtons[i].classList.remove("product-thumbnail-button--active");

      thumbnailImages[i].classList.remove("product-thumbnail-image--active");
    }
  }
}

/**
 * function to open the lightbox modal
 * @param event - click on the desktop showcase image
 */
function openLightbox(event) {
  //open the background filter
  backgroundFilter.classList.add("background-filter--open");

  //get the showcase image index from the alt value
  //example: product image 1
  const showcaseImageAltIndex = event.target.alt.slice(-1);

  //update the state.currentImageIndex for lightbox arrow navigation
  state.currentImageIndex = showcaseImageAltIndex - 1;

  //update the lighbox content with the current image
  swapDistributor(
    state.currentImageIndex + 1, //starts at 0
    "current-lightbox-product-image",
    lightboxThumbnailButtons,
    lightboxThumbnailImages
  );

  //show modal
  lightboxModal.show();

  //remove hidden class from the modal
  lightboxModal.classList.remove("hidden");
}

/**
 * function to close the lightbox modal
 */
function closeLightbox() {
  //close the background filter
  backgroundFilter.classList.remove("background-filter--open");

  //close the modal
  lightboxModal.close();

  //add hidden class to the modal
  lightboxModal.classList.add("hidden");
}
