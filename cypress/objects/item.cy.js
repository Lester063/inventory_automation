class Item{
    navigateItemPage(){
        cy.get('a[href="http://127.0.0.1:8000/item"]').click({force:true});
    }
    checkItems(){
        cy.get('tbody > tr').each(($index)=>{
            cy.get($index).should('be.visible');
        });
    }
    navigateItemAddItemPage(){
        cy.get('a[href="http://127.0.0.1:8000/item"]').click({force:true});
        cy.get('a[href="item/create"]').click({force:true});
    }
    inputItemDetails(itemName,itemCode,itemQuantity,itemPrice){
        cy.get('#item_name').clear().type(itemName);
        cy.get('#item_code').clear().type(itemCode);
        cy.get('#item_quantity').clear().type(itemQuantity);
        cy.get('#item_price').clear().type(itemPrice);
    }
    clickSubmit(){
        cy.get('button[type="submit"]').click({force:true});
    }
    checkAddedItem(){
        cy.get('tbody > tr').eq(1).contains('lester');
    }
    assertItemPage(){
        cy.url().should('eq', 'http://127.0.0.1:8000/item')
    }
    assertItemAddedMessage(){
        cy.contains('Item added successfully.').should('be.visible');
    }
    deleteAddedItem(){
        //cy.get('tbody > tr').eq(1).contains('Delete').click({force:true});
        cy.get('tbody > tr').each(($el,index)=>{
            var x=$el.text().trim();
            if(x.includes('lester')){
                cy.get('.btn-danger').eq(index-1).click({force:true});
            }
            
        });
    }
}
export default Item