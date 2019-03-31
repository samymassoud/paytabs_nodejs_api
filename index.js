/**
 * @description Paytabs rest api integration for nodejs
 * @author Samy Massoud <samymassoud@gmail.com>
 */
//Used for http requests
const axios = require('axios');
//Use it to stringify formdata
const qs = require('qs');

/**
 * @description Create the payment page
 * Please pass all required information based on Paytabs documentation and your requirements
 */
exports.createPayPage = (objData, callback) => {
    _sendPost('https://www.paytabs.com/apiv2/create_pay_page',objData,callback);
}

/**
 * @description Validate Your secret key
 */
exports.validateSecretKey = (objData,callback)=>{
    _sendPost('https://www.paytabs.com/apiv2/validate_secret_key',objData,callback);
}

/**
 * Verify the Payment was done successfully
 */
exports.verifyPayment = ((objData,callback)=>{
    _sendPost('https://www.paytabs.com/apiv2/verify_payment',objData,callback);
});

function _sendPost(url,objData,callback){
    axios.post(url, qs.stringify(objData))
    .then((res) => {
        callback(res.data);
    }).catch((error) => {
        //This error will happen catch exceptions
        callback({ 'response_code:': 400, 'result': error.errno });
    });
}