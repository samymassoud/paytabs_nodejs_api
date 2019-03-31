# Paytabs Nodejs Rest API

[![N|PayTabs](https://www.paytabs.com/en/wp-content/uploads/2015/12/paytabs-logo.png)](https://dev.paytabs.com/docs/paypage.html)

[![Build Status](https://travis-ci.org/samymassoud/paytabs_nodejs_api.svg?branch=master)](https://travis-ci.org/samymassoud/paytabs_nodejs_api)

PayTabs rest API for NodeJs is a package which implements the public API for create paypage of PayTabs.
The package covers the following functions:
  - [validate_secret_key] Validate your secret key API
  - [create_pay_page] - Create PayPage API
  - [verify_payment] - Verify Payment API

# Installation
To install this package please run
> `npm i paytabs_api`

# Create PayPage
The concept behind the PayTabs rest API is to create invoice using this API and redirect your merchant to that invoice to collect the payment and here is how to do it.
```javascript
const  paytabs = require('paytabs_api');
/**
* Please refere to Paytabs Documentation to understand all variables and different payment methods https://dev.paytabs.com/docs/paypage.html
You can get your email and secret key from paytabs merchant dashboard
* https://www.paytabs.com/login/
*/
paytabs.createPayPage({
    'merchant_email':'<YOUR EMAIL>',
    'secret_key':'<YOUR SECRET KEY>',
    'currency':'USD',//change this to the required currency
    'amount':'10',//change this to the required amount
    'site_url':'<YOUR SITE URL>',//change this to reflect your site
    'title':'Order for Shoes',//Change this to reflect your order title
    'quantity':1,//Quantity of the product
    'unit_price':10, //Quantity * price must be equal to amount
    'products_per_title':'Shoes | Jeans', //Change this to your products
    'return_url':'<YOUR SITE CALLBACK URL>',//This should be your callback url
    'cc_first_name':'Samy',//Customer First Name
    'cc_last_name':'Saad',//Customer Last Name
    'cc_phone_number':'00973', //Country code
    'phone_number':'12332323', //Customer Phone
    'billing_address':'Address', //Billing Address
    'city':'Manama',//Billing City
    'state':'Manama',//Billing State
    'postal_code':'1234',//Postal Code
    'country':'BHR',//Iso 3 country code
    'email':'<CUSTOMER EMAIL>',//Customer Email
    'ip_customer':'<CUSTOMER IP>',//Pass customer IP here
    'ip_merchant':'<MERCHANT IP>',//Change this to your server IP
    'address_shipping':'Shipping',//Shipping Address
    'city_shipping':'Manama',//Shipping City
    'state_shipping':'Manama',//Shipping State
    'postal_code_shipping':'973',
    'country_shipping':'BHR',
    'other_charges':0,//Other chargs can be here
    'reference_no':1234,//Pass the order id on your system for your reference
    'msg_lang':'en',//The language for the response
    'cms_with_version':'Nodejs Lib v1',//Feel free to change this
},createPayPage);

function createPayPage(result){
    if(result.response_code == 4012){
        //Redirect your merchant to the payment link
        console.log(result.payment_url);
    }else{
        //Handle the error
        console.log(result);
    }
}
```

# Verify Payment
After the payment is done you need to verify if it was successfull or not, so in the call back url PayTabs will reply with Payment Reference and status, using this reference you can run the following code to make sure it's Paid.
``` javascript
const  paytabs = require('paytabs_api');
/**
 * Please check this Paytabs API for more information
 * https://dev.paytabs.com/docs/paypage.html#verify-payment
 */
paytabs.verifyPayment({
    'merchant_email':'<EMAIL>',
    'secret_key':'<TOKEN>',
    'payment_reference':'<PAYPAGE ID>'
},verifyPayment);

function verifyPayment(result){
    console.log(result);
}
```
# Validate Secret Key
In some cases you will need to validate your secret key, for example if you are allowing to change the secret key infromation through your website control panel, so it's better to validate it before saving. This can be achived using this API
``` javascript
const  paytabs = require('paytabs_api');
paytabs.validateSecretKey({
    'merchant_email':'<Your Email>',
    'secret_key':'<Your Secret Key>',
},validateSecretKey);

function validateSecretKey(result){
   if(result.response_code ==4000){
        //Valid
        console.log(result);
   }else{
       //Failed
        console.log(result);
   }
}
```
[create_pay_page]: <https://dev.paytabs.com/docs/paypage.html>
[validate_secret_key]: <https://dev.paytabs.com/docs/validatekey/>
[verify_payment]: <https://dev.paytabs.com/docs/paypage/#verify-payment>

# Note
You have to handle the call back URL through your application, in which PayTabs will reply to your site with the payment result and then you can call verify payment api.

That's it.
Please use the package github page to report any issue or suggestion.
