Feature: Item

    Scenario: I should be able to view my items

        Given I am logged in as an Admin
        When I navigated to Item
        Then I should see all my items

    Scenario Outline: I should be able to add Item

        Given I am logged in as an Admin
        And I navigated to Item > Add Item
        When I enter the item details, <itemName> <itemCode> <itemQuantity> <itemPrice>
        And I click the submit button
        Then I will be navigated to Item page
        And I should see a message Item successfully added
        And the item should be added to my item list

        Examples:
        |itemName   |itemCode   |itemQuantity   |itemPrice|
        |lester     |L1         |5              |20       |

    Scenario Outline: I should be able to edit the item

        Given I am logged in as an Admin
        When I navigated to Item
        And the user has existing item, <itemName> <itemCode> <itemQuantity> <itemPrice>
        And I edit the item
        Then I will be navigated to Item page
        And I should see a success message
        And the item data should be updated

        Examples:
        |itemName   |itemCode   |itemQuantity   |itemPrice|
        |lester     |L1         |5              |20       |

    Scenario Outline: I should be able to re-stock my item

        Given I am logged in as an Admin
        And I navigated to Item
        And the user has existing item, <itemName> <itemCode> <itemQuantity> <itemPrice>
        And I click the ReStock button
        When I select a supplier, <supplier>
        And I enter a quantity, <restockQuantity>
        And I enter the restock price, <restockPrice>
        And I click the Re-Stock button
        Then the quantity of the item should increase
        And the success message is displayed

        Examples:
        |itemName   |itemCode   |itemQuantity   |itemPrice|supplier|restockQuantity|restockPrice|
        |lester     |L1         |2              |20       |1       |5              |200         |

    Scenario Outline: I should see all the sales on a particular item

        Given I am logged in as an Admin
        And I navigated to Item
        And the admin has existing item, <itemName>
        When I click the view link of the item, <itemName>
        Then I should see all the sales of that item

        Examples:
        |itemName|
        |Test|
        
