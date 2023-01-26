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
Then('a message Added sales successfully should be displayed',()=>{
    mysales.assertSuccessMessage();
});
Then('the My Sales should be added successfully',()=>{
    mysales.getAddedMySalesIndex();
    mysales.assertAddedMySales();

    mysales.deleteAddedMySales();
});


//Scenario Outline: I should be able to edit existing My Sales
Given('the user has existing My Sales, {} {} {}',(buyerName,item,qty)=>{
    mysales.triggerAddSalesBtn();
    mysales.assertAddSalesPage();
    mysales.enterAddSalesDetails(buyerName, item, qty);
    mysales.triggerSubmitBtn();
    mysales.assertSuccessMessage();
    mysales.getAddedMySalesIndex();
    mysales.assertAddedMySales();
});
When('I click the edit button of the sales',()=>{
    mysales.clickEditNewlyCreatedMySales();
});
When('I made a changes on the details, {}',(newQty)=>{
    mysales.editEnterNewDetails(newQty);
});
/*
When ('I click the save button',()=>{
    
});
*/
Then('the my sales details should be updated successfully',()=>{
    mysales.assertUpdateMessage();

    mysales.deleteAddedMySales();
});

//Scenario Outline: I should be able to search existing My Sales
// When('I search for the item, {}',(buyerName)=>{
//     mysales.buyerNameSearchInput(buyerName);
//     mysales.getToSearchDate();
//     mysales.selectToSearchNextDay();
// });
// Then('the table should be filtered based on the data i entered, {}',(buyerName)=>{
//     //mysales.assertFilteredMySalesTable(buyerName);
// });