import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPO from '../../../objects/login.cy.js';
const login = new loginPO();
import itemPO from '../../../objects/item.cy.js';
const item = new itemPO();
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

//I should be able to add Item
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


//I should be able to edit the item
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
When('I enter the item details, {} {} {} {}',(itemName,itemCode,itemQuantity,itemPrice)=>{
    item.inputItemDetails(itemName,itemCode,itemQuantity,itemPrice);
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
//I should be able to re-stock my item
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
When('the user has existing item, {} {} {} {}',(itemName,itemCode,itemQuantity,itemPrice)=>{
    item.clickAddItem();
    item.inputItemDetails(itemName,itemCode,itemQuantity,itemPrice);
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
});


//I should be able to re-stock my item
Given('I click the ReStock button',()=>{
    item.getNewItemIndex();
    item.clickReStockItem();
});
When('I select a supplier, {}',(supplier)=>{
    item.selectSupplier(supplier);
});
When('I enter a quantity, {}',(restockQuantity)=>{
    item.restockEnterQuantity(restockQuantity);
});
When('I enter the restock price, {}',(restockPrice)=>{
    item.restockPrice(restockPrice);
});
When('I click the Re-Stock button',()=>{
    item.itemReStock();
});
Then('the quantity of the item should increase',()=>{
    item.assertQuantityRestocked();
});
Then('the success message is displayed',()=>{
    item.assertReStockSuccess();
    item.deleteAddedItem();
});


//I should see all the sales on a particular item
Given('the admin has existing item, {}',(itemName)=>{
    item.getItemIndex(itemName);
})
When('I click the view link of the item, {}',(itemName)=>{
    item.itemViewSold();
});
Then('I should see all the sales of that item',()=>{
    item.assertSoldItem();
})
