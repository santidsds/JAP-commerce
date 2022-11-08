const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const myAppURL = "http://localhost:3000/products/";

let wantedSection = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE

const postData = async (product) => {
  try {
    const response = await fetch(myAppURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const json = await response.json();
    console.log(JSON.stringify(json));
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

const deleteData = async (id) => {
  try {
    const response = await fetch(myAppURL+id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      
    });
    const json = await response.json();
    console.log(JSON.stringify(json));
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

const deleteAllData = async () => {
  try {
    const response = await fetch(myAppURL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      
    });
    const json = await response.json();
    console.log(JSON.stringify(json));
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}