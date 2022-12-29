Feature: Supplier

    Scenario: I should be able to navigate to Supplier

        Given I am logged in as an Admin
        When I click the Supplier link
        Then I should be navigated to Supplier page
    
    Scenario: I should see all the existing suppliers on the table

        Given I am logged in as an Admin
        When I click the Supplier link
        Then I should see all the supplier on the table

    Scenario Outline: I should be able to add new supplier

        Given I am logged in as an Admin
        And I click the Supplier link
        And I click the Add Supplier
        When I entered the supplier details, <supplierName>, <address>, <emailAddress>, <contactNumber>
        And I click the supplier submit button
        Then a new supplier should be added on the table

        Examples:
        |supplierName|address|emailAddress  |contactNumber|
        |test        |test 51|test@gmail.com|09212483577  |

    Scenario Outline: I should be able to edit the details of existing supplier

        Given I am logged in as an Admin
        And I click the Supplier link
        And the user has existing supplier, <existingName>, <existingAddress>, <existingEmail>, <existingContact>
        When I edit the existing supplier, <existingName>
        And I entered the suppliers new details, <supplierName>, <address>, <emailAddress>, <contactNumber>
        And I click the supplier update button
        Then the supplier details should be updated

        Examples:
        |existingName|existingAddress|existingEmail    |existingContact|supplierName|address|emailAddress  |contactNumber|
        |test        |testtest       |testttt@gmail.com|09212483577    |test51      |test 51|test@gmail.com|09212483577  |

    Scenario Outline: I should be able to see the item restock by  the Suppliers

        Given I am logged in as an Admin
        And I click the Supplier link
        When I click the view link of the supplier, <supplierName>
        Then I should see all the item restocked by the supplier

        Examples:
        |supplierName|
        |Dominic Manaloto Inc.|


