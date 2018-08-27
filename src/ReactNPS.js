import { Component } from 'react';
import ReactNPSValidators from './Validators';

const sandbox = 'https://sandbox.nps.com.ar/sdk/v1/NPS.js';
const implementation = 'https://implementacion.nps.com.ar/sdk/v1/NPS.js';
const production = 'https://services2.nps.com.ar/sdk/v1/NPS.js';

class ReactNPS extends Component {

    constructor(props, context) {
        super(props, context);
        let self = this;


        this.state = {
            ...props,
            npsValidator: new ReactNPSValidators()
        };

        const script = document.createElement('script');
        if(props.env === 'sandbox')
            script.src = sandbox;

        if(props.env === 'implementation')
            script.src = implementation;

        if(props.env === 'production')
            script.src = production;


        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        setTimeout(() => {
            if(props.session && props.session !== ''){
                self.setClientSession(props.session);
            }
            if(props.merchant && props.merchant !== ''){
                self.setMerchantID(props.merchant)
            }
            if(props.fingerprint && props.fingerprint !== ''){
                self.setUseDeviceFingerPrint(props.fingerprint)
            }
            if(props.expDate && props.expDate !== ''){
                self.setExpDateFormat(props.expDate)
            }
            if(props.language && props.language !== ''){
                self.setLanguage(props.language)
            }
        },2000);

        this.setClientSession = this.setClientSession.bind(this);
        this.getClientSession = this.getClientSession.bind(this);

        this.setMerchantID = this.setMerchantID.bind(this);

        this.setUseDeviceFingerPrint = this.setUseDeviceFingerPrint.bind(this);

        this.setExpDateFormat = this.setExpDateFormat.bind(this);
        this.getExpDateFormat = this.getExpDateFormat.bind(this);

        this.getIINDetails = this.getIINDetails.bind(this);

        this.setAmount = this.setAmount.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setCurrency = this.setCurrency.bind(this);

        this.setLanguage = this.setLanguage.bind(this);
        this.setTranslationDictionary = this.setTranslationDictionary.bind(this);

        this.createPaymentMethodToken = this.createPaymentMethodToken.bind(this);
        this.recachePaymentMethodToken = this.recachePaymentMethodToken.bind(this);
        this.retrivePaymentMethodToken = this.retrivePaymentMethodToken.bind(this);
        this.getInstallmentsOptions = this.getInstallmentsOptions.bind(this);

        this.cardValidator = this.cardValidator.bind(this);
    }

    setClientSession(data){
        window.NPS.setClientSession(data)
    }

    getClientSession(){
        return window.NPS.getClientSession();
    }

    setMerchantID(data){
        window.NPS.setMerchantId(data);
    }

    setUseDeviceFingerPrint(data){
        window.NPS.setUseDeviceFingerPrint(data);
    }

    setExpDateFormat(data){
        window.NPS.setExpDateFormat(data);
    }

    getExpDateFormat(){
        return window.NPS.getExpDateFormat;
    }

    setLanguage(lang){
        window.NPS.setLanguage(lang);
    }

    setTranslationDictionary(lang,dictionary){
        window.NPS.setTranslationDictionary(lang,dictionary);
    }

    getIINDetails(data){
        return window.NPS.getIINDetails(data);
    }

    setAmount(data){
        window.NPS.setAmount(data);
    }
    setCountry(data){
        window.NPS.setCountry(data);
    }
    setCurrency(data){
        window.NPS.setCurrency(data);
    }

    createPaymentMethodToken(data){

        let validate = this.state.npsValidator.validateCreateToken(data);
        let npsValidate = this.cardValidator(data);

        if(validate.length || npsValidate){
            return validate || 'There is an error in the data, please verify and try again';
        }else{
            let result = {};
            let error = {};

            window.NPS.paymentMethodToken.create(data, (data) => result = data, (data) => error = data);

            return {
                result: result,
                error: error
            };
        }
    }

    recachePaymentMethodToken(data){
        let validate = this.state.npsValidator.validateCreateToken(data);

        if(validate.length){
            return validate;
        }else{
            let result = {};
            let error = {};

            window.NPS.paymentMethodToken.recache(data, (data) => result = data, (data) => error = data);

            return {
                result: result,
                error: error
            };
        }
    }

    retrivePaymentMethodToken(data){
        let result = {};
        let error = {};

        window.NPS.paymentMethodToken.retrieve(data, (data) => result = data, (data) => error = data);

        return {
            result: result,
            error: error
        };
    }

    getInstallmentsOptions(data){
        let result = {};
        result = window.NPS.card.getInstallmentsOptions(data.token, data.product, data.payments);

        return {
            result: result
        };
    }


    cardValidator(data){
        return window.NPS.card.validateHolderName(data.holder_name) ||
                window.NPS.card.validateNumber(data.number) ||
                window.NPS.card.validateExpirationDate(data.exp_month, data.exp_year) ||
                window.NPS.card.validateSecurityCode(data.security_code)
    }
}

export default ReactNPS;
