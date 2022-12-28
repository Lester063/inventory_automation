import { item } from "../pagereferences/item.js";
var itemname=null;
var itemcode=null;
var itemqty=null;
var itemprice=null;
var newItemName='lester123';
var newItemIndex=null;

var itemrestockQuantity=null;
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
        cy.log(itemqty);
        cy.task('setDataStorage',itemQuantity);
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
            var x=$el.text();
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
    clickReStockItem(){//puting -1 because of the header of table(eg. Action)
        cy.contains('ReStock').eq(newItemIndex-1).click({force:true});
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

    selectSupplier(supplier){
        cy.get(item.selectOptionSupplier).select(supplier);
    }
    restockEnterQuantity(restockQuantity){
        itemrestockQuantity=restockQuantity;
        cy.get(item.restockQuantity).clear().type(restockQuantity);
    }
    restockPrice(restockPrice){
        cy.get(item.restockPrice).clear().type(restockPrice);
    }
    itemReStock(){
        cy.get(item.btnGeneral).contains('Re-Stock').click({force:true});
    }
    assertQuantityRestocked(){
        var totalQty;
        cy.task('getDataStorage').then((dataStored)=>{
            totalQty=parseInt(itemrestockQuantity)+parseInt(dataStored);
            cy.log('Previous stock: '+dataStored);
            cy.log('We added stock: '+itemrestockQuantity);
            cy.log('Total stock: '+totalQty);
            cy.get(item.tableItemTD).eq(2).each(($el)=>{
                cy.get($el).eq(newItemIndex-1).should('have.text',totalQty);
            })
        })
    }
    assertReStockSuccess(){
        cy.get(item.alertMessage).contains('ReStock Successfully');
    }
    //thru item name --it may fail if there are an item that has same name
    getItemIndex(itemName){
        cy.get(item.tableItem).each(($el,index)=>{
            var text=$el.text();
            if(text.includes(itemName)){
                cy.log(text);
                cy.log('index: '+index);
                cy.task('setItemIndex',index);
                cy.get($el).eq(0).should('contains.text',itemName)
            }
        })
    }
    itemViewSold(){
        cy.task('getItemIndex').then((itemIndex)=>{
            cy.get(item.tableItem).eq(itemIndex).contains('View').click({force:true});
        })
    }
    assertSoldItem(){
        cy.get(item.tableItem).each(($el)=>{
            cy.get($el).should('be.exist');
        })
    }
}
export default Item