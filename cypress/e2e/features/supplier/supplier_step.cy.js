import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPO from '../../../objects/login.cy.js';
import supplierPO from '../../../objects/supplier.cy.js';
const login = new loginPO();
const supplier = new supplierPO();
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

// Given('I am logged in as an Admin',()=>{

// });
When('I click the Supplier link',()=>{
    supplier.navigateSupplierPage();
});
Then('I should be navigated to Supplier page',()=>{
    supplier.assertSuppliersPage();
    supplier.assertSupplierHeader();
});

//I should see all the existing suppliers on the table
Then('I should see all the supplier on the table',()=>{
    supplier.assertSuppliers();
});

//I should be able to add new supplier
Given('I click the Add Supplier',()=>{
    supplier.navigateToAddSupplier();
});
When('I entered the supplier details, {}, {}, {}, {}',(supplierName,address,emailAddress,contactNumber)=>{
    supplier.inputSupplierDetails(supplierName,address,emailAddress,contactNumber);
});
When('I click the supplier submit button',()=>{
    supplier.supplierSubmitButton();
});
Then('a new supplier should be added on the table',()=>{
    supplier.getSupplierIndex();
    supplier.assertNewSupplier();
    supplier.deleteSupplier();
});


//I should be able to edit the details of existing supplier
Given('the user has existing supplier, {}, {}, {}, {}',(existingName,existingAddress,existingEmail,existingContact)=>{
    supplier.navigateToAddSupplier();
    supplier.inputSupplierDetails(existingName,existingAddress,existingEmail,existingContact);
    supplier.supplierSubmitButton();
    supplier.getSupplierIndex();
});
When('I edit the existing supplier, {}',(existingName)=>{
    supplier.clickEditShift();
});
When('I entered the suppliers new details, {}, {}, {}, {}',(supplierName,address,emailAddress,contactNumber)=>{
    supplier.inputSupplierDetails(supplierName,address,emailAddress,contactNumber);
});
When('I click the supplier update button',()=>{
    supplier.supplierUpdateButton();
});
Then('the supplier details should be updated',()=>{
    supplier.getSupplierIndex();
    supplier.assertNewSupplier();
});

//I should be able to see the item restock by  the Suppliers --precondition, there should be a supplier and should have an item supplied
When('I click the view link of the supplier, {}',(supplierName)=>{
    //need to create new indexsetter or update the getSupplierIndex
    supplier.passingName(supplierName);
    supplier.getSupplierIndex();
    supplier.itemViewSold();
});
Then('I should see all the item restocked by the supplier',()=>{
    supplier.assertSuppliedItemBySupplier();
});