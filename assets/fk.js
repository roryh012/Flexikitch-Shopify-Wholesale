class Flexikitch {
    constructor(isWholesale = 'no') {
      this.modal = document.querySelector('.fk-modal');
      if(this.modal) {
        this.modalContent = this.modal.querySelector('.fk-modal__content');
      }
      this.isWholesale = (isWholesale === 'yes') ? true : false;
      // Check and set site state
      this.checkSiteState();
      // Add wholesale menu item if needed
      this.addWholesaleMenuItem();
    }


    productEnquire(button) {
      const productId = button.getAttribute('data-pid');
      const productName = button.getAttribute('data-name');
      const productUrl = button.getAttribute('data-url');
      const productSku = button.getAttribute('data-sku');
      const productImg = button.getAttribute('data-img');

      this.modal.querySelector('.fkw-product-img').setAttribute('src', productImg);

      // Set the values in the modal
      this.modal.querySelector('#p_id').value = productId;
      this.modal.querySelector('#p_name').value = productName;
      this.modal.querySelector('#p_sku').value = productSku;
      this.modal.querySelector('#p_url').value = productUrl;
      this.modal.querySelector('#p_img').value = productImg;
      this.modal.querySelector('.fkw-product-title').textContent = productName;
      this.modal.querySelector('.fkw-product-sku').textContent = productSku;

      // Fade in the modal
      this.showModal();
    }

    showModal() {
      this.modal.style.display = 'flex';
      setTimeout(() => {
        this.modal.style.opacity = '1';
      }, 10); // Start the opacity transition slightly after display change
    }

    closeModal() {
      this.modal.style.opacity = '0';
      setTimeout(() => {
        this.modal.style.display = 'none';
      }, 300); // Match the timeout with the CSS transition duration
    }

    toggleFlexiownForm(activeState) {
      var flexiownCart = document.querySelector('.fkw-cart');
      var rentalStateClass = 'rental-selected';
      var purchaseStateClass = 'purchase-selected';
      if (activeState === 'rental') {
        flexiownCart.classList.add(rentalStateClass);
        flexiownCart.classList.remove(purchaseStateClass);
      } else {
        flexiownCart.classList.add(purchaseStateClass);
        flexiownCart.classList.remove(rentalStateClass);
      }
    }
    

    checkSiteState() {
      const siteState = this.getSiteState();
      if (siteState === 'wholesale' && this.isWholesale) {
        document.body.classList.add('wholesale-state');
      } else {
        document.body.classList.remove('wholesale-state');
      }
    }

    setSiteState(state) {
      // Set state to cookies
      document.cookie = `siteState=${state};path=/;max-age=31536000`; // Expires in 1 year
      // Fallback to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('siteState', state);
      }
    }

    getSiteState() {
      // Attempt to get state from cookies
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith('siteState='));
      if (cookieValue) {
        return cookieValue.split('=')[1];
      }
      // Fallback to localStorage
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('siteState');
      }
      return null; // Default to null if no state is found
    }

    addWholesaleMenuItem() {
      var newLi = document.createElement('li');
      newLi.className = 'nav-bar__item';
      var newAnchor = document.createElement('a');
      newAnchor.href = '#';
      newAnchor.id = 'fk-wholesale-switch';
      newAnchor.className = 'nav-bar__link link';
      newAnchor.setAttribute('onclick', 'window._fk.switchToWholesale();');
      newAnchor.textContent = 'Wholesale Portal';
      newLi.appendChild(newAnchor);
      var ulMenu = document.querySelector('.nav-bar__linklist');
      ulMenu.appendChild(newLi);
    }
    switchToWholesale() {
      if(!this.isWholesale){
        document.querySelector('#account-popover').setAttribute('aria-hidden', 'false');
        document.querySelector('.popover__legend').textContent = 'Please login to access the wholesale portal';
        return;
      }
      this.setSiteState('wholesale');
      document.body.classList.add('wholesale-state');
      location.href = '/pages/wholesale'
      document.querySelector('.header__logo-link').href = '/pages/wholesale';
    }

    switchToMain() {
      this.setSiteState('main');
      document.body.classList.remove('wholesale-state');
      location.href = '/'
      // update .header__logo-link href
      document.querySelector('.header__logo-link').href = '/';
    }

    updatePaymentOption(optionId, button = null) {
      try{
        console.log(optionId, button)
        document.querySelectorAll('.payment-option-content').forEach(content => {
          content.style.display = 'none';
        });
        if(optionId === 'credit-card') {
          // document.getElementById('dynamic-shipping-section').style.display = 'none';
          document.getElementById('dynamic-payment-section').style.display = 'none';
          document.querySelector('#flexirent-credit-card').style.display = 'flex';
          this.toggleFlexiownForm('purchase');
          if(button) {
            document.querySelectorAll('.payment-option-button').forEach(button => {
              button.classList.remove('selected');
            });
            button.classList.add('selected');
          }
          return;
        }else{
          // document.getElementById('dynamic-shipping-section').style.display = 'block';
          document.getElementById('dynamic-payment-section').style.display = 'block';
          document.querySelector('#flexirent-credit-card').style.display = 'none';

        }
        document.getElementById(`${optionId}-content`).style.display = 'flex';
        const dynamicSection = document.getElementById('dynamic-payment-section');
        dynamicSection.querySelector('.collapsible-content').style.display = 'flex';
        const arrow = dynamicSection.querySelector('.collapsible-arrow');
        arrow.classList.replace('down', 'up');
        if(button) {
          document.querySelectorAll('.payment-option-button').forEach(button => {
            button.classList.remove('selected');
          });
          button.classList.add('selected');
          dynamicSection.querySelector('.collapsible-header').textContent = button.textContent;
          dynamicSection.querySelector('.collapsible-header').appendChild(arrow);
        }
        if(optionId === 'flexirent' || optionId === 'charge-through-rent') {
          this.toggleFlexiownForm('rental');
        }else {
          this.toggleFlexiownForm('purchase');
        }
      }catch(e){
        console.error('Error updating payment option', e);
      }
    }
  

   initCollapsibleSections() {
    try {
      document.querySelectorAll('.collapsible-header').forEach(header => {
        let arrow = document.createElement('span');
        arrow.className = 'collapsible-arrow up';
        header.appendChild(arrow);
        header.addEventListener('click', function() {
          let content = this.nextElementSibling;
          let arrow = this.querySelector('.collapsible-arrow');
          let parent = this.closest('.collapsible-section');
          console.log('content.style.display', content.style.display)
          if (content.style.display === "flex") {
            content.style.display = "none";
            arrow.classList.replace('up', 'down');
            parent.classList.remove('open');
          } else {
            content.style.display = "flex";
            arrow.classList.replace('down', 'up');
            parent.classList.add('open');
          }
        });
      });
    } catch (error) {
      console.error('Error initializing collapsible sections', error);
    }
  }

  initPaymentOptionButtons() {
      document.querySelectorAll('.payment-option-button').forEach(button => {
        button.addEventListener('click', (e) => {
          const optionId = e.target.getAttribute('data-option');
          this.updatePaymentOption(optionId, button);
        });
      });
  }
  initCustomerDetails(email, firstName, lastName, phone) {
    try {
      document.querySelectorAll('.fkw-form').forEach(form => {
        // update by input name
        (form.querySelector('input[name="email"]') != null) ? form.querySelector('input[name="email"]').value = email : null;
        (form.querySelector('input[name="first-name"]') != null) ? form.querySelector('input[name="first-name"]').value = firstName : null;
        (form.querySelector('input[name="last-name"]') != null) ? form.querySelector('input[name="last-name"]').value = lastName : null;
        (form.querySelector('input[name="phone"]') != null) ? form.querySelector('input[name="phone"]').value = phone : null;
      });
    } catch (error) {
      console.error('Error initializing customer details', error);
    }
  }

  initFormSubmissions() {
    try{
      document.querySelectorAll('.fkw-form').forEach(form => {
          form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
      });
    } catch (error) {
      console.error('Error initializing form submissions', error);
    }
  }

  async handleFormSubmit(e, form) {
      e.preventDefault(); // Prevent form from submitting immediately
      
      try {
          const cartData = await fetch('/cart.js');
          const cartJson = await cartData.json();
          const cartString = JSON.stringify(cartJson);
          
          // Check if the hidden input already exists, if not create it
          let inCartInput = form.querySelector('input[name="in_cart"]');
          if (!inCartInput) {
              inCartInput = document.createElement('input');
              inCartInput.type = 'hidden';
              inCartInput.name = 'in_cart';
              form.appendChild(inCartInput);
          }
          
          inCartInput.value = cartString; // Set the Shopify cart data as the value
          
          // Modify the form's action URL here if needed before submitting
          // form.action = "/endpoint-here"; // Update this to your actual endpoint
          // form.submit(); // Submit the form
      } catch (error) {
          console.error("Error fetching cart data:", error);
          // Handle the error (maybe display a message to the user)
      }
  }



}
