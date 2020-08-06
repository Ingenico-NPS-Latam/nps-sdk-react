if (!window._babelPolyfill && !global._babelPolyfill) {
    require('babel-polyfill');
}
import { Component } from 'react';
import ReactNPSValidators from './Validators';

const sandbox = 'https://sandbox.nps.com.ar/sdk/v1/NPS.js';
const implementation = 'https://implementacion.nps.com.ar/sdk/v1/NPS.js';
const production = 'https://services2.nps.com.ar/sdk/v1/NPS.js';

class ReactNPS extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            ...props,
            npsValidator: new ReactNPSValidators(),
        };

        this.loadAndInitialize();

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
        this.loadNpsScript = this.loadNpsScript.bind(this);
    }



    loadNpsScript() {
        return new Promise((resolve,reject) => {
            if(!window.NPS){
                window.NPS = {};
                const script = document.createElement('script');
                if(this.props.env === 'sandbox')
                    script.src = sandbox;

                if(this.props.env === 'implementation')
                    script.src = implementation;

                if(this.props.env === 'production')
                    script.src = production;

                script.async = false;
                document.head.appendChild(script);
            }
            setTimeout(()=>{
                resolve('Loaded');
            },1000);

        });
    }

    async loadAndInitialize() {
        let x = await this.loadNpsScript();
        if(this.props.session && this.props.session !== ''){
            this.setClientSession(this.props.session);
         }
         if(this.props.merchant && this.props.merchant !== ''){
             this.setMerchantID(this.props.merchant)
         }
         if(this.props.fingerprint && this.props.fingerprint !== ''){
             this.setUseDeviceFingerPrint(this.props.fingerprint)
         }
         if(this.props.expDate && this.props.expDate !== ''){
             this.setExpDateFormat(this.props.expDate)
         }
         if(this.props.language && this.props.language !== ''){
             this.setLanguage(this.props.language)
         }
    }

    setClientSession(data){
        this.loadNpsScript().then(() =>{
            window.NPS.setClientSession(data)
        });
    }

    getClientSession(){
        this.loadNpsScript().then(() => {
            return window.NPS.getClientSession();
        });
    }

    setMerchantID(data){
        this.loadNpsScript().then(() => {
            window.NPS.setMerchantId(data);
        });
    }

    setUseDeviceFingerPrint(data){
        this.loadNpsScript().then(() => {
            window.NPS.setUseDeviceFingerprint(data);
        });
    }

    setExpDateFormat(data){
        this.loadNpsScript().then(() => {
            window.NPS.setExpDateFormat(data);
        });
    }

    getExpDateFormat(){
        this.loadNpsScript().then(() => {
            return window.NPS.getExpDateFormat;
        });
    }

    setLanguage(lang){
        this.loadNpsScript().then(() => {
            window.NPS.setLanguage(lang);
        });
    }

    setTranslationDictionary(lang,dictionary){
        this.loadNpsScript().then(() => {
            window.NPS.setTranslationDictionary(lang, dictionary);
        });
    }

    getIINDetails(data){
        this.loadNpsScript().then(() => {
            return window.NPS.getIINDetails(data);
        });
    }

    setAmount(data){
        this.loadNpsScript().then(() => {
            window.NPS.setAmount(data);
        });
    }
    setCountry(data){
        this.loadNpsScript().then(() => {
            window.NPS.setCountry(data);
        });
    }
    setCurrency(data){
        this.loadNpsScript().then(() => {
            window.NPS.setCurrency(data);
        });
    }

    createPaymentMethodToken(data){
        return new Promise((resolve,reject) => {
            let validate = this.state.npsValidator.validateCreateToken(data);
            let npsValidate = this.cardValidator(data);
            let result = {};
            let error = {};

            if(validate.length || npsValidate){
                resolve({
                    result: result,
                    error: validate || 'There is an error in the data, please verify and try again'
                });
            }else{
                this.loadNpsScript().then(() => {
                    let apiResult = window.NPS.paymentMethodToken.create(data, (data) => result = data, (data) => error = data);
                    if(apiResult.object == 'error'){
                        error = apiResult;
                        reject({
                            result: result,
                            error: error
                        });
                    }else{
                        result = apiResult;
                        resolve({
                            result: result,
                            error: error
                        });
                    }
                });
            }
        });
    }

    recachePaymentMethodToken(data){
        return new Promise((resolve,reject) => {
            let validate = this.state.npsValidator.validateCreateToken(data);
            let result = {};
            let error = {};

            if(validate.length){
                resolve({
                    result: result,
                    error: validate || 'There is an error in the data, please verify and try again'
                });
            }else{
                this.loadNpsScript().then(() => {
                    let apiResult = window.NPS.paymentMethodToken.recache(data, (data) => result = data, (data) => error = data);
                    if(apiResult.object == 'error'){
                        error = apiResult;
                        reject({
                            result: result,
                            error: error
                        });
                    }else{
                        result = apiResult;
                        resolve({
                            result: result,
                            error: error
                        });
                    }
                });
            }
        });
    }

    retrivePaymentMethodToken(data){
        return new Promise((resolve,reject) => {
            let result = {};
            let error = {};

            this.loadNpsScript().then(() => {
                let apiResult = window.NPS.paymentMethodToken.retrieve(data, (data) => result = data, (data) => error = data);
                if(apiResult.object == 'error'){
                    error = apiResult;
                    reject({
                        result: result,
                        error: error
                    });
                }else{
                    result = apiResult;
                    resolve({
                        result: result,
                        error: error
                    });
                }
            });
        });
    }

    getInstallmentsOptions(data){
        return new Promise((resolve,reject) => {
            let result = {};
            let error = {};

            this.loadNpsScript().then(() => {
                let apiResult = window.NPS.card.getInstallmentsOptions(data.token, data.product, data.payments);
                if(apiResult.object == 'error'){
                    error = apiResult;
                    reject({
                        result: result,
                        error: error
                    });
                }else{
                    result = apiResult;
                    resolve({
                        result: result,
                        error: error
                    });
                }
            });
        });
    }


    cardValidator(data){
        return window.NPS.card.validateHolderName(data.holder_name) ||
                window.NPS.card.validateNumber(data.number) ||
                window.NPS.card.validateExpirationDate(data.exp_month, data.exp_year) ||
                window.NPS.card.validateSecurityCode(data.security_code)
    }
}

export default ReactNPS;
