import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPO from '../../../objects/login.cy.js';
import supplierPO from '../../../objects/supplier.cy.js';
import mysalesPO from '../../../objects/mysales.cy.js';
const login = new loginPO();
const supplier = new supplierPO();
const mysales = new mysalesPO();
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

// Given('I am logged in as an Admin',()=>{

// });
When('I click the My Sales link',()=>{
    mysales.navigateToMySales();
});
Then('I should be navigated to My Sales page',()=>{
    mysales.assertMySalesPage();
    mysales.assertMySalesHeader();
});


//Scenario: I should be able to add My Sales
Given('I navigated to My Sales page',()=>{
    mysales.navigateToMySales();
});
Given('I click the Add Sales button',()=>{
    mysales.triggerAddSalesBtn();
    mysales.assertAddSalesPage();
});
When('I enter the details needed {} {} {}',(buyerName, item, qty)=>{
    mysales.enterAddSalesDetails(buyerName, item, qty);
});
When('I click the Submit button',()=>{
    mysales.triggerSubmitBtn();
});
Then('the My Sales should be added successfully',()=>{
    mysales.getAddedMySalesIndex();
    mysales.assertAddedMySales();

    mysales.deleteAddedMySales();
})
