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

//app state
const state = {
  currentProductImageIndex: 0,
};

//event listeners
openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

previousImageButton.addEventListener("click", goPrevProductImage);
nextImageButton.addEventListener("click", goNextProductImage);

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
 *
 */
function goPrevProductImage() {}

/**
 *
 */
function goNextProductImage() {}
