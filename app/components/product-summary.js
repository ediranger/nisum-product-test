/**
 * WebComponent: <product-summary>
 * 
 * A custom component to render the product item from the product list.
 * It includes the image, title, price while rendering. 
 */
class ProductSummary extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
  
        // create product summary wrapper and header element
        const productSummaryWrapper = document.createElement('article');
        productSummaryWrapper.setAttribute('class', 'product-wrap');

        const productHeading = document.createElement('header');
        productHeading.setAttribute('class', 'summary-heading');
        
        // create product title element
        const productTitle = document.createElement('h2');
        productTitle.textContent = this.getAttribute('data-name');
        productTitle.setAttribute('class', 'summary-title');

        // create product image element
        const productImage = document.createElement('img');
        productImage.setAttribute('src', this.getAttribute('data-img'));

        // create product summary element
        const productShortSummary = document.createElement('p');
        productShortSummary.setAttribute('class', 'product-summary');
        productShortSummary.textContent = this.getAttribute('data-short-summary');

        // create product summary element
        const productPrice = document.createElement('p');
        productPrice.setAttribute('class', 'product-price');
        productPrice.innerHTML = '<strong>Product Price: ' + this.getAttribute('data-price') + '</strong>';

        // append elements in product heading wrapper
        productHeading.appendChild(productImage);
        productHeading.appendChild(productTitle);

        // append product heading wrapper to productWrapper
        productSummaryWrapper.appendChild(productHeading);
        productSummaryWrapper.appendChild(productShortSummary);
        productSummaryWrapper.appendChild(productPrice);

        this.appendChild(productSummaryWrapper);

    }
  }
  customElements.define('product-summary', ProductSummary);