import { mysales } from "../pagereferences/mysales.js";
const moment = require('moment');
var mySalesGlobal = {
    buyerName: null,
    mysalesCode: null,
}
var tommorow = null;
var yesterday = null;
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

    assertFilteredMySalesTable(buyerName) {
        cy.get(mysales.buyerNameColumn).each(($el) => {
            cy.get($el).should('contains', buyerName)
        })
    }
    
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

    getCurrentDate() {
        var today = moment();
        var tom = moment(today).add(5, 'days');
        var yester = moment(today).add(-5, 'days');
        tommorow = tom.format("YYYY-MM-DD");
        yesterday = yester.format("YYYY-MM-DD");
        cy.log('Tommorow '+tommorow);
        cy.log('Today '+today.format("YYYY-MM-DD"));
    }

    selectToDate(buyerName) {
        cy.get(mysales.fromDateSearch).type(yesterday);
        cy.get(mysales.toDateSearch).type(tommorow);
        cy.get(mysales.buyerNameFilter).clear().type(buyerName)
        mySalesGlobal.buyerName = buyerName;
    }

    assertFilteredMySales() {
        cy.get(mysales.buyerNameColumn).each(($el) => {
            cy.get($el).should('contain',mySalesGlobal.buyerName);
        })
    }
}  

export default MySales