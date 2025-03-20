/*
 * This function is used to decorate images in the default content.
 * It adds the class 'image' and 'main' to the parent element of the image.
 * It also adds a class based on the URL path depth: 'image-level-1' for top-level pages
 * and 'image-level-2' for sub-pages.
 */
export function decorateImages() {
  const picture = document.querySelectorAll('.default-content-wrapper picture');
  
  // Determine URL path depth
  const path = window.location.pathname;
  const isTopLevel = path === '/' || path === '/index.html';
  const levelClass = isTopLevel ? 'image-level-1' : 'image-level-2';
  
  picture.forEach((item) => {
    const parentElement = item.parentElement;
    if (parentElement) {
      parentElement.classList.add('image', 'main', levelClass);
    }
  });
}
