#Admin
Feature: My Sales

    Scenario: I should be able to navigate to My Sales page

        Given I am logged in as an Admin
        When I click the My Sales link
        Then I should be navigated to My Sales page

    Scenario: I should be able to add My Sales

        Given I am logged in as an Admin
        And I navigated to My Sales page
        And I click the Add Sales button
        When I enter the details needed <buyerName> <item> <qty>
        And I click the Submit button
        Then the My Sales should be added successfully

        Examples:
            | buyerName | item | qty |
            | Test      | Test | 1   |