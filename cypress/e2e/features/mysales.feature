#Admin
Feature: My Sales

    Scenario: I should be able to navigate to My Sales page

        Given I am logged in as an Admin
        When I click the My Sales link
        Then I should be navigated to My Sales page

    Scenario Outline: I should be able to add My Sales

        Given I am logged in as an Admin
        And I navigated to My Sales page
        And I click the Add Sales button
        When I enter the details needed <buyerName> <item> <qty>
        And I click the Submit button
        Then a message Added sales successfully should be displayed
        And the My Sales should be added successfully

        Examples:
            | buyerName | item | qty |
            | Test      | Test | 1   |

    Scenario Outline: I should be able to edit existing My Sales

        Given I am logged in as an Admin
        And I navigated to My Sales page
        And the user has existing My Sales, <buyerName> <item> <qty>
        When I click the edit button of the sales
        And I made a changes on the details, <newQty>
        And I click the Submit button
        Then the my sales details should be updated successfully

        Examples:
            | buyerName | item | qty | newQty |
            | Test      | Test | 1   | 2      |

    # Scenario Outline: I should be able to search existing My Sales

    #     Given I am logged in as an Admin
    #     And I navigated to My Sales page
    #     And the user has existing My Sales, <buyerName> <item> <qty>
    #     When I search for the item, <buyerName>
    #     Then the table should be filtered based on the data i entered, <buyerName>
    #     Examples:
    #         | buyerName | item | qty | searchData |
    #         | Test      | Test | 1   | Test       |

    Scenario Outline: I should be able to see the sales breakdown of My Sales

        Given I am logged in as an Admin
        And I navigated to My Sales page
        And the user has existing My Sales, <buyerName> <item> <qty>
        When I click the Sales Breakdown link of the My Sales
        Then I should be navigated to the breakdown page

        Examples:
            | buyerName | item | qty | newQty |
            | Test      | Test | 1   | 2      |

    Scenario Outline: Newly created My Sales should be visible in Sales page

        Given I am logged in as an Admin
        And I navigated to My Sales page
        And the user has existing My Sales, <buyerName> <item> <qty>
        When I navigated to Sales page
        Then I should see the code of newly created My Sales

        Examples:
            | buyerName | item | qty | newQty |
            | Test      | Test | 1   | 2      |
