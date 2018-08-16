import React, { Component } from 'react';
import ReactNPS from '../ReactNPS';
import './App.css';

class CreateToken extends Component {

    constructor(props, context) {
        super(props, context);
        let ReactNPSData = new ReactNPS({
            env: 'sandbox',
            session: 'sxlZSOtthPZZ5VrJNi5HZhW6lUYNeGc6enDS4NgJtlIfTAFTwVrdSX9eadIuH57q',
            merchant: 'psp_test',
            fingerprint: false,
            expDate: 'MMYY'
        });

        this.state = {
            ReactNPS: ReactNPSData,
            result: {}
        };
        this.sendData = this.sendData.bind(this);
    }

    sendData(){
        let PaymentMethodTokenParams = {
            card: {
                holder_name: "John Smith",
                number: "4507990000000010",
                exp_month: "01",
                exp_year: "2019",
                security_code: "123",
            },
            billing: { // optional
                person: { // optional
                    firstname: "John",  // mandatory
                    middlename: "Jay", // optional
                    lastname: "Smith", // optional
                    phonenumber1: "4123-1234", // optional
                    phonenumber2: "4123-1234", // optional
                    gender: "M", // optional
                    birthday: "1987-01-01", // optional
                    nationality: "ARG", // optional
                    idtype: "500", // optional
                    idnumber: "500" // optional
                },
                address: { // optional
                    street: "Fakestreet", // mandatory
                    housenumber: "999", // mandatory
                    city: "Fakecity", // mandatory
                    country: "ARG", // mandatory
                    zip: "1234", // optional
                    state: "Fakestate", // optional
                    addinfo: "Fakeinfo", // optional
                }
            }
        };

        let createToken = this.state.ReactNPS.createPaymentMethodToken(PaymentMethodTokenParams);
        this.setState({
            result: createToken
        });
    }



    render() {
        return (
            <div className="App">
                <button onClick={() => this.sendData() }>Send Request</button>
                <pre>
                  {
                      JSON.stringify(this.state.result,null,2)
                  }
              </pre>
            </div>
        );
    }
}

export default CreateToken;
