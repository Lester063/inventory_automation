import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPO from '../../../objects/login.cy.js';
const login = new loginPO();
import itemPO from '../../../objects/item.cy.js';
const item = new itemPO();
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
Given('I am logged in as an Admin',()=>{
    cy.visit('http://127.0.0.1:8000/login');
    login.enterCredentials('lester@gmail.com','qwerty123');
    login.clickLogin();
});
When('I navigated to Item',()=>{
    item.navigateItemPage();
});
Then('I should see all my items',()=>{
    item.checkItems()
});

/*
Given('I am logged in as an Admin',()=>{
    cy.visit('http://127.0.0.1:8000/login');
    login.enterCredentials('lester@gmail.com','qwerty123');
    login.clickLogin();
});
*/
Given('I navigated to Item > Add Item',()=>{
    item.navigateItemAddItemPage();
});
When('I enter the item details',()=>{
    item.inputItemDetails('lester','L1','5','20');
});
When('I click the submit button',()=>{
    item.clickSubmit();
});
Then('I will be navigated to Item page',()=>{
    item.assertItemPage();
})
Then('I should see a message Item successfully added',()=>{
    item.assertItemAddedMessage();
})
Then('the item should be added to my item list',()=>{
    item.checkAddedItem();
    item.deleteAddedItem();
});
//should be able to edit
/*
Given('I am logged in as an Admin',()=>{
    cy.visit('http://127.0.0.1:8000/login');
    login.enterCredentials('lester@gmail.com','qwerty123');
    login.clickLogin();
});
When('I navigated to Item',()=>{
    item.navigateItemPage();
});
*/
When('the user has existing item',()=>{
    item.clickAddItem();
    item.inputItemDetails('lester','L1','5','20');
    item.clickSubmit();
    item.assertItemPage();
    item.assertItemAddedMessage();
});
When('I edit the item',()=>{
    item.clickEditItem();
    item.newItemDetails();
    item.clickSubmit();
});
/*this is step duplicate --let's just comment it
Then('I will be navigated to Item page',()=>{
    item.assertItemPage();
});
*/
Then('I should see a success message',()=>{
    item.assertItemEditMessage();
});
Then('the item data should be updated',()=>{
    item.assertEditedItem();
    item.deleteAddedItem();
})