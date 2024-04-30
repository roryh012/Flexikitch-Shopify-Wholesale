// Best fit for custom scructure. e.g. <div> is main container and <a> is search item container. 
// Hides Product, See more lables and search results

class WlmThemeSearch {
    constructor() {
        var _this = this;
        if (window.wlm_local_data == undefined) {
            window.wlm_local_data = {}
        }
        _this.observeSearch();
    }
    customFind(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            var match = callback(arr[i]);
            if (match) {
                return arr[i];
                break;
            }
        }
    }
    saveWLMHideProductLocally(json) {
        if (!window.wlm_local_data.hideProductPayload) {
            window.wlm_local_data.hideProductPayload = json;
        } else if (json.products.length) {
            window.wlm_local_data.hideProductPayload.products = [].concat(
                window.wlm_local_data.hideProductPayload.products,
                json.products
            );
        }
    }
    hideShowLoader(loader) {
        try {
            if (loader) {
                document.getElementById('wlm-loader-container').style.display = "block";
            } else {
                document.getElementById('wlm-loader-container').style.display = "none";
            }
        } catch (e) {
            console.log('wlm- ',e);
        }
    }
    getHandleFromProductUrl(url = null) {
        if (url === null) {
            url = currentUrl();
        }
        const tempEl = document.createElement("a");
        tempEl.href = url;
        const matches = tempEl.pathname.match("/products/(.*)");
        return matches && matches.length > 1 && matches[1];
    }
    getProductListFromSearch() {
        var _this = this;
        const productList = [];
        if(document.querySelector('.' + window.WLM_Theme_Default_Search_List_container)===null){
            return [];
        }
        const products = document.querySelectorAll('.' + window.WLM_Theme_Default_Search_List_container);

        for (let productNode of products) {
            try {
                const productNameAnchorEl = productNode;
                if (productNameAnchorEl != null) {
                    const handle = _this.getHandleFromProductUrl(productNameAnchorEl.href);
                    productList.push(handle);
                }
            } catch (e) {
            console.log('wlm -',e);
            }

        }

        return productList;
    }
    getThemeProductsContainer() {
        return document.querySelectorAll('.' + window.WLM_Theme_Default_Search_List_container);
    }
  
    RemoveHideProducts() {
      
        var _this = this;
        let SearchProductsContainer = _this.getThemeProductsContainer();
        let products = [];
        products = _this.getProductListFromSearch();

        products.forEach(function (product) {
            var isHide = _this.customFind(window.wlm_local_data.hideProductPayload.products, function (LocalProduct) {
                return product == LocalProduct.handle;
            });
            if (isHide == undefined) {
                for (var i = 0; i < SearchProductsContainer.length; i++) {
                    let isRemoveContainer = false;
                    let aTagContainers = [];
                    try {
                        aTagContainers = SearchProductsContainer[i];
                    } catch (e) {
                        aTagContainers = [];
                        console.log(e);
                    }
                   
                        let handle = aTagContainers.href.split('/');
                        handle = handle[handle.length - 1];
                        handle = handle.split('?');
                        handle = handle[0];
                        if (product == handle) {
                            isRemoveContainer = true;
                        }
                    
                    if (isRemoveContainer) {
                        SearchProductsContainer[i].remove();
                    }
                }
            }
        });

        _this.hideShowLoader(false);
    }
  
    checkIsProductHide(handles = []) {      
     
        var _this = this;
        _this.hideShowLoader(true);
        if (!handles || !handles.length) {
            _this.hideShowLoader(false);
            return;
        }
        const filteredHandles = handles.filter((handle) => {
            if (!window.wlm_local_data.hideProductPayload) {
                return true;
            }
            if (!handle) {
                return false;
            }
            let checkHandle = _this.customFind(window.wlm_local_data.hideProductPayload.products, function (product) {
                return product.handle == handle;
            });
            if (checkHandle == undefined) {
                return true;
            } else {
                return false;
            }
        });
        if (filteredHandles.length === 0) {
            _this.RemoveHideProducts();
            return Promise.resolve();
        }
        const maxHandleLimit = 20;
        let from = 0;
        let left = filteredHandles.length;
        let to = maxHandleLimit;

        do {
            let paged = filteredHandles.slice(from, to);
            const url = `/search?view=wlm-api&handle=${paged.join(",")}`;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var json = JSON.parse(this.responseText);
                    _this.saveWLMHideProductLocally(json);
                }
            }
            xhttp.open("GET", url, false);
            xhttp.send();
            from = to;
            to += maxHandleLimit;
            left -= maxHandleLimit;
        } while (left >= 0);
        _this.RemoveHideProducts();      
    }
   
    currentUrl() {
        return window.location.toString();
    }
    observeSearch() {
        var _this = this;
        let SearchObserverTimeout = setInterval(function () {
            let SearchContainer = null;
            SearchContainer = document.querySelectorAll('.' + window.WLM_Theme_Default_Search_main_container);
            console.log('wlm - finding');
            if (SearchContainer != null) {
                console.log('wlm - found');
                clearInterval(SearchObserverTimeout);

                const observerSearch = new MutationObserver((mutations) => {
                    let products = _this.getProductListFromSearch();
                    console.log('wlm- ',products);
                  	var SearchResultsNodes = document.querySelectorAll('.' + window.WLM_Theme_Default_Search_List_container);      
                    for (var iw = 0; iw < SearchResultsNodes.length; iw++) {
                       SearchResultsNodes[iw].style.display = "none";
                     }
                    _this.checkIsProductHide(products);
                  	
                    for (iw = 0; iw < SearchResultsNodes.length; iw++) {
                      SearchResultsNodes[iw].style.display = "block";
                    }
                  	
                    if(SearchResultsNodes.length == 0){
						document.querySelector('.' + window.WLM_Theme_Default_Search_main_container).style.display = "none";
                    }else{
                      	document.querySelector('.' + window.WLM_Theme_Default_Search_main_container).style.display = "block";
                    }
                  
                });
                for (var j = 0; j < SearchContainer.length; j++) {

                    observerSearch.observe(SearchContainer[j], {
                        subtree: true,
                        childList: true,
                    });
                }
            }
        }, 100);

    }

}
var WLMThemeDefaultSearchPopup = new WlmThemeSearch();