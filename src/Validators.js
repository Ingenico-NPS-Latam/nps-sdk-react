import {Component} from "react";

class ReactNPSValidators extends Component {

    constructor(props, context) {
        super(props, context);
        this.validateCreateToken = this.validateCreateToken.bind(this);

    }


    validateCreateToken(data){
        let errors = [];

        if(!data.card && !data.cards){
            errors.push('No card object present');
        }else{
            if(data.card){
                if(data.card.payment_method_id){
                    if(data.card.payment_method_id === ''){
                        errors.push('Payment method token is required');
                    }
                }else{
                    if(!data.card.number || data.card.number === ''){
                        errors.push('Card number is required');
                    }
                    if(!data.card.holder_name || data.card.holder_name === ''){
                        errors.push('Card holder name is required');
                    }
                    if(!data.card.exp_month || data.card.exp_month === ''){
                        errors.push('Card expiring month is required');
                    }
                    if(!data.card.exp_year || data.card.exp_year === ''){
                        errors.push('Card expiring year is required');
                    }
                }
                if(!data.card.security_code || data.card.security_code === ''){
                    errors.push('Card security code is required');
                }
            }
            if(data.cards){
                data.cards.forEach((card,index) => {
                    if (!card.number || card.number === '') {
                        errors.push('Card '+index+' number is required');
                    }
                    if (!card.holder_name || card.holder_name === '') {
                        errors.push('Card '+index+' holder name is required');
                    }
                    if (!card.exp_month || card.exp_month === '') {
                        errors.push('Card '+index+' expiring month is required');
                    }
                    if (!card.exp_year || card.exp_year === '') {
                        errors.push('Card '+index+' expiring year is required');
                    }
                    if (!card.security_code || card.security_code === '') {
                        errors.push('Card '+index+' security code is required');
                    }
                });
            }
        }


        if(data.billing){
            if(data.billing.person){
                if(!data.billing.person.firstname || data.billing.person.firstname === ''){
                    errors.push('The billing name is required');
                }
            }
            if(data.billing.address){
                if(!data.billing.address.street || data.billing.address.street === ''){
                    errors.push('Billing street address is required');
                }
                if(!data.billing.address.housenumber || data.billing.address.housenumber === ''){
                    errors.push('Billing house number address is required');
                }
                if(!data.billing.address.city || data.billing.address.city === ''){
                    errors.push('Billing city address is required');
                }
                if(!data.billing.address.country || data.billing.address.country === ''){
                    errors.push('Billing country is required');
                }
            }
        }

        return errors
    }


}

export default ReactNPSValidators;