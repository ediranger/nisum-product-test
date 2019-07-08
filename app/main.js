
/**
 * ProductService - helper service to get rest data from using http call
 */
class ProductService {

    constructor() {}

    // method to get the product list and convert it to json
    getProducts() {
        return fetch('/product_api.json')
                .then(response => response.json());
    }

}

/**
 * Product Util - Utility service helps while rendering the carousal and product item.
 */
class ProductUtil {

    // method to render product list
    renderList(list) {
        let productListHtml = '';

        // iterate over complete list and show all the products.
        // it uses web component (product-summary) to render the product item.
        list.forEach((element, index) => {
            productListHtml += ['<product-summary onclick="showCarousal('+index+');" class="col-12 col-sm-6 col-lg-4" data-name="',
                    element.name, '" data-short-summary="',
                    element.messages.join(' '), '" ', 
                    ' data-img="', element.hero.href ,'"',
                    ' data-price="', element.priceRange.selling.high,
                    '"></product-summary>'].join('');
        });
        document.querySelector('#product-list').innerHTML = productListHtml;
    };

    // method to render the image carousal
    renderCarousal(images) {
        const imageOuterWidth = 94;
        const imageContainer = document.querySelector('#product-image-list').querySelector('.image-wrap');
        imageContainer.innerHTML = '';

        // iterate over the images and create image tag for thumbnails
        images.forEach((element) => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', element.href);
            imgElement.addEventListener('click', () => {
                document.querySelector('#main-image').setAttribute('src', element.href);
            })
            imageContainer.appendChild(imgElement);
        });

        // first image as default selected image
        if (images && images.length) {
            document.querySelector('.image-wrap').style.width = (images.length * imageOuterWidth) + 'px';
            document.querySelector('#main-image').setAttribute('src', images[0].href);
        }
    }

}



//------ main implementation

let products = [];
let productService = new ProductService();
let productUtil = new ProductUtil();

// product item click event handler
const showCarousal = (arrayIndex) => {
    if (arrayIndex > -1 && arrayIndex < (products.length - 1)) {
        productUtil.renderCarousal(products[arrayIndex].images);
    }

    // show the overlay and carousal wrapper
    document.querySelector('#product-image-list').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
}

// overlay element click event handler
const closeCarousal = () => {
    document.querySelector('#product-image-list').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
}

// get products using products api.
productService.getProducts()
    .then(response => {
        if (!!response && !!response.groups  && response.groups.length) {
            products = response.groups;

            // render the product items
            productUtil.renderList(products);
        }
    });