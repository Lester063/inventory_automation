Feature: Item

Scenario: I should be able to view my items

Given I am logged in as an Admin
When I navigated to Item
Then I should see all my items

Scenario: I should be able to add Item

Given I am logged in as an Admin
And I navigated to Item > Add Item
When I enter the item details
And I click the submit button
Then I will be navigated to Item page
And I should see a message Item successfully added
And the item should be added to my item list
