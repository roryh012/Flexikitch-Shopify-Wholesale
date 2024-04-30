/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

$('input[name="FlexiAddon"]').change(function(){
    var addonVariants = [];
    $('input[name="FlexiAddon"]:checked').each(function(index, elem) {
        addonVariants.push($(elem).val());
    });
    $('#FlexiAddons').val(JSON.stringify(addonVariants))
    var selectedPrice = 0
    var addonPrices = JSON.parse(document.getElementById('FlexiAddonsPrices').value);
    for(addonVariant of addonVariants){
        selectedPrice += addonPrices[addonVariant]
    }
    var moneyFormatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'});
    document.querySelector('.price--highlight').innerHTML = moneyFormatter.format(selectedPrice)
    var weeklyRental = (selectedPrice * 0.0545) / 4.33
    document.querySelector('.pf-rental').innerHTML = `${moneyFormatter.format(weeklyRental)}<small>per week + GST</small>`
})

function fkAddBundleToCart(){
    try {
        var addBundle = {
            items: []
        }
        $('input[name="FlexiAddon"]:checked').each(function(index, elem) {
            addBundle.items.push({
                quantity: 1,
                id: $(elem).val()
            });
        });
        $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: JSON.stringify(addBundle),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                location.href = "/cart"
            },
            error: function(errMsg) {
                alert('There was an issue adding these items. Please contact Support for assistance.')
                console.log(errMsg);
            }
        });


    } catch (error) {
        console.log(error)
    }
}

(function() {
    var REDIRECT_PATH = '/pages/finance-form?show=account';

    var selector = '#create_customer, form[action$="/account"][method="post"]',
        $form = document.querySelectorAll(selector)[0];

    if ($form) {
        console.log('* redirect to '+REDIRECT_PATH+' after account creation')
      $redirect = document.createElement('input');
      $redirect.setAttribute('name', 'return_to');
      $redirect.setAttribute('type', 'hidden');
      $redirect.value = REDIRECT_PATH;
      $form.appendChild($redirect);
    }
  })();

if(location.pathname == '/'){
    const chOpenCustomerhub = new MutationObserver((mutations, obs) => {
      try{
          if (document.getElementById('MiniHub')) {
            console.log('open mh')
              setTimeout(function(){
                  window.postMessage('OPEN_MINIHUB_WIDGET', '*');
              },500)
              obs.disconnect();
              return;
          }
      }catch(e){
          console.log(e);
          obs.disconnect();
      }
    });
    chOpenCustomerhub.observe(document, {
        childList: true,
        subtree: true
    });
}


