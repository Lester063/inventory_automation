import { item } from "../pagereferences/item.js";
var itemname=null;
var itemcode=null;
var itemqty=null;
var itemprice=null;
var newItemName='lester123';
var newItemIndex=null;
class Item{
    navigateItemPage(){
        cy.get(item.itemLink).click({force:true});
    }
    checkItems(){
        cy.get(item.tableItem).each(($index)=>{
            cy.get($index).should('be.visible');
        });
    }
    navigateItemAddItemPage(){
        cy.get(item.itemLink).click({force:true});
        cy.get(item.addItemButton).click({force:true});
    }
    inputItemDetails(itemName,itemCode,itemQuantity,itemPrice){
        itemname=itemName;
        itemcode=itemCode;
        itemqty=itemQuantity;
        itemprice=itemPrice;
        cy.get(item.itemName).clear().type(itemName);
        cy.get(item.itemCode).clear().type(itemCode);
        cy.get(item.itemQuantity).clear().type(itemQuantity);
        cy.get(item.itemPrice).clear().type(itemPrice);
    }
    clickSubmit(){
        cy.get(item.addItemSubmit).click({force:true});
    }
    checkAddedItem(){
        cy.get(item.tableItem).eq(1).contains(itemname);
    }
    assertItemPage(){
        cy.url().should('eq', 'http://127.0.0.1:8000/item')
    }
    assertItemAddedMessage(){
        cy.contains(item.itemAddedMessage).should('be.visible');
    }
    getNewItemIndex(){
        cy.get(item.tableItem).each(($el,index)=>{
            var x=$el.text().trim();
            if(x.includes(itemname)){
                newItemIndex=index;
            }
            
        });
    }
    deleteAddedItem(){
        //cy.get('tbody > tr').eq(1).contains('Delete').click({force:true});
        cy.get(item.tableItem).each(($el,index)=>{
            var x=$el.text().trim();
            if(x.includes(itemname)){
                cy.get(item.redButton).eq(index-1).click({force:true});
            }
            
        });
    }

    clickAddItem(){
        cy.get(item.addItemButton).click({force:true});
    }
    clickEditItem(){//puting -1 because of the header of table(eg. Action)
        cy.contains('Edit').eq(newItemIndex-1).click({force:true});
    }
    newItemDetails(){
        cy.get(item.itemName).clear().type(newItemName);
        itemname=newItemName;
    }
    assertItemEditMessage(){
        cy.contains(item.itemEditMessage).should('be.visible');
    }
    assertEditedItem(){
        cy.get(item.tableItem).eq(1).contains(itemname);
    }
}
export default Item