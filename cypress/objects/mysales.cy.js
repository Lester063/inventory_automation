import { mysales } from "../pagereferences/mysales.js";
var buyerName=null;
class MySales{
    navigateToMySales(){
        cy.get(mysales.navbar).contains('My Sales').click({force:true});
    }
    assertMySalesPage(){
        cy.url().should('eq','http://127.0.0.1:8000/mysales')
    }
    
    assertMySalesHeader(){
        cy.contains('My Sales').should('be.visible');
    }

    triggerAddSalesBtn(){
        cy.get(mysales.btnBlue).contains('Add Sales').click({force:true});
    }

    assertAddSalesPage(){
        cy.contains('Add Sales').should('be.visible');
    }

    enterAddSalesDetails(buyerName, item, qty){
        buyerName=buyerName;
        cy.get(mysales.addSalesBuyerName).clear().type(buyerName);
        cy.get(mysales.addSalesItemName).select(item);
        cy.get(mysales.addSalesItemQuantity).clear().type(qty);

        cy.task('setDataStorage', buyerName)
    }

    triggerSubmitBtn(){
        cy.get(mysales.btnBlue).contains('Submit').click({force:true});
    }

    getAddedMySalesIndex(){
        cy.task('getDataStorage').then((dataStored)=>{
            cy.get(mysales.buyerNameColumn).each(($el,index)=>{
                var name=$el.text();
                if(name.includes(dataStored)){
                    cy.log('Found: '+name);
                    cy.task('setMySalesIndex',index);
                    cy.log('index '+index)
                }
            });
        });
    }
    
    assertAddedMySales(){
        cy.task('getMySalesIndex').then((itemIndex)=>{
            cy.task('getDataStorage').then((dataStored)=>{
                cy.get(mysales.buyerNameColumn).eq(itemIndex).contains(dataStored);
            });
        });
    }

    deleteAddedMySales(){
        cy.task('getMySalesIndex').then((itemIndex)=>{
            cy.get(mysales.btnRed).contains('Delete').eq(itemIndex).click({force:true});
        })
    }

}

export default MySales