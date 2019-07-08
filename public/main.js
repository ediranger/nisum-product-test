"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProductService =
/*#__PURE__*/
function () {
  function ProductService() {
    _classCallCheck(this, ProductService);
  } // constant for product service url
  // method to get the product list and convert it to json


  _createClass(ProductService, [{
    key: "getProducts",
    value: function getProducts() {
      return fetch('/product_api.json').then(function (response) {
        return response.json();
      });
    }
  }]);

  return ProductService;
}();

var ProductUtil =
/*#__PURE__*/
function () {
  function ProductUtil() {
    _classCallCheck(this, ProductUtil);
  }

  _createClass(ProductUtil, [{
    key: "renderList",
    // method to render product list
    value: function renderList(list) {
      var productListHtml = ''; // iterate over complete list and show all the products.
      // it uses web component (product-summary) to render the product item.

      list.forEach(function (element, index) {
        productListHtml += ['<product-summary onclick="showCarousal(' + index + ');" class="col-12 col-sm-6 col-lg-4" data-name="', element.name, '" data-short-summary="', element.messages.join(' '), '" ', ' data-img="', element.hero.href, '"', ' data-price="', element.priceRange.selling.high, '"></product-summary>'].join('');
      });
      document.querySelector('#product-list').innerHTML = productListHtml;
    }
  }, {
    key: "renderCarousal",
    // method to render the image carousal
    value: function renderCarousal(images) {
      var imageOuterWidth = 94;
      var imageContainer = document.querySelector('#product-image-list').querySelector('.image-wrap');
      imageContainer.innerHTML = ''; // iterate over the images and create image tag for thumbnails

      images.forEach(function (element) {
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', element.href);
        imgElement.addEventListener('click', function () {
          document.querySelector('#main-image').setAttribute('src', element.href);
        });
        imageContainer.appendChild(imgElement);
      }); // first image as default selected image

      if (images && images.length) {
        document.querySelector('.image-wrap').style.width = images.length * imageOuterWidth + 'px';
        document.querySelector('#main-image').setAttribute('src', images[0].href);
      }
    }
  }]);

  return ProductUtil;
}(); //------ main implementation


var products = [];
var productService = new ProductService();
var productUtil = new ProductUtil(); // product item click event handler

var showCarousal = function showCarousal(arrayIndex) {
  if (arrayIndex > -1 && arrayIndex < products.length - 1) {
    productUtil.renderCarousal(products[arrayIndex].images);
  } // show the overlay and carousal wrapper


  document.querySelector('#product-image-list').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
}; // overlay element click event handler


var closeCarousal = function closeCarousal() {
  document.querySelector('#product-image-list').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
}; // get products using products api.


productService.getProducts().then(function (response) {
  if (!!response && !!response.groups && response.groups.length) {
    products = response.groups; // render the product items

    productUtil.renderList(products);
  }
});