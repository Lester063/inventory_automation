import { mysales } from "../pagereferences/mysales.js";
var buyerName = null;
var mySalesGlobal = {
    buyerName: null,
    mysalesCode: null,
}
var nextDay = null;
class MySales {
    navigateToMySales() {
        cy.get(mysales.navbar).contains('My Sales').click({ force: true });
    }

    navigateToSales() {
        cy.get(mysales.navbar).contains('Sales').click({ force: true });
    }

    assertMySalesPage() {
        cy.url().should('eq', 'http://127.0.0.1:8000/mysales')
    }

    assertMySalesHeader() {
        cy.contains('My Sales').should('be.visible');
    }

    triggerAddSalesBtn() {
        cy.get(mysales.btnBlue).contains('Add Sales').click({ force: true });
    }

    assertAddSalesPage() {
        cy.contains('Add Sales').should('be.visible');
    }

    enterAddSalesDetails(buyerName, item, qty) {
        mySalesGlobal.buyerName = buyerName;
        cy.get(mysales.addSalesBuyerName).clear().type(buyerName);
        cy.get(mysales.addSalesItemName).select(item);
        cy.get(mysales.addSalesItemQuantity).clear().type(qty);

        cy.task('setDataStorage', mySalesGlobal)
    }

    triggerSubmitBtn() {
        cy.get(mysales.btnBlue).contains('Submit').click({ force: true });
    }

    getAddedMySalesIndex() {
        cy.task('getDataStorage').then((dataStored) => {
            cy.get(mysales.buyerNameColumn).each(($el, index) => {
                var name = $el.text();
                if (name.includes(dataStored.buyerName)) {
                    cy.log('Found: ' + name);
                    cy.task('setMySalesIndex', index);
                    cy.log('index ' + index)
                    cy.get(mysales.mysalesCodeColumn).eq(index).invoke('text').then((code) => {
                        mySalesGlobal.mysalesCode = code;
                        cy.log('Code: ' + code);
                        cy.task('setDataStorage', mySalesGlobal);
                    })

                }
            });
        });
    }

    assertAddedMySales() {
        cy.task('getMySalesIndex').then((mysalesIndex) => {
            cy.task('getDataStorage').then((dataStored) => {
                cy.get(mysales.buyerNameColumn).eq(mysalesIndex).contains(dataStored.buyerName);
            });
        });
    }

    deleteAddedMySales() {
        cy.task('getMySalesIndex').then((mysalesIndex) => {
            cy.get(mysales.btnRed).contains('Delete').eq(mysalesIndex).click({ force: true });
        });
    }

    assertSuccessMessage() {
        cy.get(mysales.alertSuccess).contains('Added sales successfully');
    }

    clickEditNewlyCreatedMySales() {
        cy.task('getMySalesIndex').then((mysalesIndex) => {
            cy.get(mysales.btnBlue).contains('Edit').eq(mysalesIndex).click({ force: true });
        });
    }

    editEnterNewDetails(newQty) {
        cy.get(mysales.addSalesItemQuantity).clear().type(newQty);
    }

    assertUpdateMessage() {
        cy.get(mysales.alertSuccess).should('be.exist').contains('Updated Sales Successfully.');
    }

    buyerNameSearchInput(buyerName) {
        cy.get(mysales.buyerNameFilter).clear().type(buyerName)
    }

    assertFilteredMySalesTable(buyerName) {
        cy.get(mysales.buyerNameColumn).each(($el) => {
            cy.get($el).should('contains', buyerName)
        })
    }

    // getToSearchDate() {
    //     cy.get(mysales.toDateSearch).invoke('val').then((text) => {
    //         var date = text.split('-');
    //         var year = parseInt(date[0]);
    //         var month = parseInt(date[1]);
    //         var day = parseInt(date[2]);
    //         var x = day + 1;
    //         nextDay = year + '-' + month + '-' + day + 1;
    //         cy.log(date)
    //         cy.log(text);
    //         cy.log(year + '-' + month + '-' + x)
    //     });
    // }

    // selectToSearchNextDay() {
    //     // cy.get(mysales.toDateSearch).click({force:true});
    //     // cy.get(mysales.toDateSearch).contains(toString(nextDay)).click({force:true});
    //     cy.get(mysales.toDateSearch).invoke('removeAttr', 'type').type(toString(nextDay))
    //     cy.log(nextDay);
    // }


    clickSalesBreakdown() {
        cy.task('getMySalesIndex').then((mysalesIndex) => {
            cy.contains('Sales Breakdown').eq(mysalesIndex).click({ force: true });
        });
    }

    assertSalesBreakdown() {
        cy.task('getDataStorage').then((dataStored) => {
            cy.contains(dataStored.buyerName).should('be.visible');
        });
    }

    //assert in Sales Page
    assertMySalesCode() {
        if (cy.url().should('eq', 'http://127.0.0.1:8000/sales')) {
            cy.task('getDataStorage').then((dataStored) => {
                cy.get(mysales.salesPageCodeColumn).eq(0).should('have.text', dataStored.mysalesCode);
            });
        }
    }
}

export default MySales