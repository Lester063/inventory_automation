import { supplier } from "../pagereferences/supplier.js";
import { item } from "../pagereferences/item.js";
var objectSupplierName=null;
var objectSupplierIndex=null;
class Supplier{
    navigateSupplierPage(){
        cy.get(supplier.supplierLink).click({force:true});
    }
    assertSuppliersPage(){
        cy.url().should('eq', 'http://127.0.0.1:8000/suppliers')
    }
    assertSupplierHeader(){
        cy.contains('Suppliers').should('be.visible');
    }
    assertSuppliers(){
        cy.get(supplier.suppliersTR).each(($el,index)=>{
            if(index>0){
                cy.get($el).should('be.visible');
            }
        })
    }
    navigateToAddSupplier(){
        cy.get(item.btnGeneral).contains('Add Supplier').click({force:true});
    }
    passingName(supplierName){
        objectSupplierName=supplierName;
    }
    inputSupplierDetails(supplierName,address,emailAddress,contactNumber){
        objectSupplierName=supplierName;
        cy.get(supplier.inputSupplierName).clear().type(supplierName);
        cy.get(supplier.inputSupplierAddress).clear().type(address);
        cy.get(supplier.inputSupplierEmailAddress).clear().type(emailAddress);
        cy.get(supplier.inputSupplierContactNumber).clear().type(contactNumber);
    }
    supplierSubmitButton(){
        cy.get(item.btnGeneral).contains('Submit').click({force:true});
    }
    getSupplierIndex(){
        cy.get('tbody > tr').each(($el,index)=>{
            var text=$el.text();
            if(text.includes(objectSupplierName)){
                objectSupplierIndex=parseInt(index);
                cy.task('setSupplierIndex',index);
                cy.log(text);
                cy.log('eqweq '+index)
            }
        })
    }
    deleteSupplier(){
        cy.task('getSupplierIndex').then((supplierIndex)=>{
            cy.contains('Delete').eq(supplierIndex-1).click({force:true});
        })
    }
    assertNewSupplier(){
        cy.task('getSupplierIndex').then((supplierIndex)=>{
            cy.get(supplier.supplierNameTable).eq(supplierIndex-1).should('have.text',objectSupplierName);
        })
    }
    clickEditShift(){
        cy.task('getSupplierIndex').then((supplierIndex)=>{
            cy.contains('Edit').eq(supplierIndex-1).click({force:true});
        })
    }
    supplierUpdateButton(){
        cy.get(item.btnGeneral).contains('Update').click({force:true});
    }
    itemViewSold(){
        cy.task('getSupplierIndex').then((supplierIndex)=>{
            cy.get(item.tableItem).eq(supplierIndex).contains('View').click({force:true});
        })
    }
    assertSuppliedItemBySupplier(){
        cy.get(supplier.supplierNameTable).each(($el)=>{
            cy.get($el).should('be.exist');
        })
    }
}

export default Supplier