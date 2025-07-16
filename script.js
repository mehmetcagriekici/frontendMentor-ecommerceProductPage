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
  ".product-thumbnail-button"
);
const desktopThumbnailImages = document.querySelectorAll(
  ".product-thumbnail-image"
);

//lightbox
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxPreviousImageButton = document.getElementById(
  "image-prev-button--lightbox"
);
const lightboxNextImageButton = document.getElementById(
  "image-next-button--lightbox"
);
const closeLightboxButton = document.getElementById("close-lightbox-button");
const lightboxMainImage = document.getElementById("lightbox-main-image");
const lightboxThumbnailsList = document.getElementById(
  "lightbox-thumbnails-list"
);

//app state
const state = {
  currentProductImageIndex: 0,
  productQuantity: 1,
  originalPrice: 250,
  showCartModal: false,
  unitPrice: 125,
};

//init
document.addEventListener("load", init);

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

//click event on the buttons with event delegation
desktopThumbnailsList.addEventListener("click", updateShowcaseImage);

//clickevent on the desktop showcase image to open the lightbox
desktopShowcaseImage.addEventListener("click", openLightbox);
closeLightboxButton.addEventListener("click", closeLightbox);

/**
 * init function, initiates the components
 */
function init() {}

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

  //distribute the sliding classes after the index update for mobile and tablets
  slideProductImages();
}

/**
 * function to display the next image
 */
function goNextProductImage() {
  //increase the currentProductIndex
  state.currentProductImageIndex =
    (state.currentProductImageIndex + 1) % productImages.length;

  //distribute the sliding classes after the index update for mobile and tablets
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

  state.currentProductImageIndex = 0;
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
 * function to change the current showcase image on desktops using event delegation on the thumbnails list
 * @param event - click event on the thumbnails list
 */
function updateShowcaseImage(event) {
  //guard clause for the elements except for images
  if (event.target.tagName !== "IMG") return;

  //get the clicked thumbnail id
  //example: product-thumbnail-desktop-image-1
  const currentThumbnailIndex = event.target.id.slice(-1);

  //update the current showcase image src and alt
  desktopShowcaseImage.setAttribute(
    "src",
    `./images/image-product-${currentThumbnailIndex}.jpg`
  );

  desktopShowcaseImage.setAttribute(
    "alt",
    `product image ${currentThumbnailIndex}`
  );

  //update the thumbnail (button and the image) classes
  //loop over the thumbnils
  for (let i = 0; i < desktopThumbnailButtons.length; i++) {
    //currentThumbnailIndex starts at one
    if (i === currentThumbnailIndex - 1) {
      //give active class to the selected thumbnail
      desktopThumbnailButtons[i].classList.add(
        "product-thumbnail-button--active"
      );

      //give active class to the selected image
      desktopThumbnailImages[i].classList.add(
        "product-thumbnail-image--active"
      );
    } else {
      //remove the active classes
      desktopThumbnailButtons[i].classList.remove(
        "product-thumbnail-button--active"
      );

      desktopThumbnailImages[i].classList.remove(
        "product-thumbnail-image--active"
      );
    }
  }
}

/**
 * function to open the lightbox modal
 */
function openLightbox() {
  //open the background filter
  backgroundFilter.classList.add("background-filter--open");

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

//Components
//repeatedly used HTML components

/**
 * ThumbnailsList component is used on the desktop and the desktop lightbox
 */
function ThumbnailsList() {
  return `
    <!--thumbnails list-->
    <ul class="thumbnails-list" id="desktop-thumbnails-list">
      <!--desktop thumbnail element-->
      <li class="product-thumbnail">
        <button
          class="product-thumbnail-buttoproduct-thumbnail-button--active"
          id="product-thumbnail-desktop-button-1"
          type="button"
        >
          <img
            src="./images/image-product-1-thumbnail.jpg"
            alt="product 1 thumbnail"
            id="product-thumbnail-desktop-image-1"
            class="product-thumbnail-imagproduct-thumbnail-image--active"
          />
        </button>
      </li>

      <!--desktop thumbnail element-->
      <li class="product-thumbnail">
        <button
          class="product-thumbnail-button"
          id="product-thumbnail-desktop-button-2"
          type="button"
        >
          <img
            src="./images/image-product-2-thumbnail.jpg"
            alt="product 2 thumbnail"
            id="product-thumbnail-desktop-image-2"
            class="product-thumbnail-image"
           />
        </button>
      </li>

      <!--desktop thumbnail element-->
      <li class="product-thumbnail">
        <button
          class="product-thumbnail-button"
          id="product-thumbnail-desktop-button-3"
          type="button"
        >
          <img
            src="./images/image-product-3-thumbnail.jpg"
            alt="product 3 thumbnail"
            id="product-thumbnail-image-3"
            class="product-thumbnail-desktop-image"
          />
        </button>
      </li>

      <!--desktop thumbnail element-->
      <li class="product-thumbnail">
        <button
          class="product-thumbnail-button"
          id="product-thumbnail-desktop-button-4"
          type="button"
        >
          <img
            src="./images/image-product-4-thumbnail.jpg"
            alt="product 4 thumbnail"
            id="product-thumbnail-desktop-image-4"
            class="product-thumbnail-image"
          />
        </button>
      </li>
    </ul>
  `;
}

/**
 * NavigationList component used on the header on the desktop and on the aside menu on mobile and tablets
 * Totally presentational on this app
 */
function NavigationList() {
  return `
    <!--navigation list-->
    <ul class="navigation-list">
      <!--navigation item-->
      <li class="navigation-item">
        <a href="#" id="header-nav-link-collections">Collections</a>
      </li>

      <!--navigation item-->
      <li class="navigation-item">
        <a href="#" id="header-nav-link-men">Men</a>
      </li>

      <!--navigation item-->
      <li class="navigation-item">
        <a href="#" id="header-nav-link-women">Women</a>
      </li>

      <!--navigation item-->
      <li class="navigation-item">
        <a href="#" id="header-nav-link-about">About</a>
      </li>

      <!--navigation item-->
      <li class="navigation-item">
        <a href="#" id="header-nav-link-contact">Contact</a>
      </li>
    </ul>
  `;
}

/**
 * NavigationArrows component is used on mobile and tablets as the main image slider, and used on desktop on lightbox image slider
 * positioned absoulute and centered vertically to the parent element
 */
function NavigationArrows() {
  return `
    <!--navigation arrows-->
    <div
      class="navigation-arrows"
      role="group"
      aria-label="navigation-arrows-container"
    >
      <!--navigation previous arrow-->
      <button
        type="button"
        id="image-prev-button"
        class="navigation-arrows-button"
      >
        <span
           class="navigation-arrows-button-iconavigation-arrows-button-icon--previous"
           role="img"
           aria-label="previous-button-icon"
        >
         </span>
       </button>

      <!--navigation next arrow-->
      <button
        type="button"
        id="image-next-button"
        class="navigation-arrows-button"
      >
        <span
          class="navigation-arrows-button-iconavigation-arrows-button-icon--next"
          role="img"
          aria-label="next-button-icon"
        >
        </span>
      </button>
    </div>
  `;
}
