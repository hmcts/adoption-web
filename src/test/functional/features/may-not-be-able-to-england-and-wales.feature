Feature: May not be able to get a divorce in England and Wales

  Background:
    Given I login
    When I go to '/you-may-not-be-able-to-england-and-wales'
    Then the page should include "You may not be able to get a divorce in England and Wales"

  Scenario: Check how you're legally connected again
    When I click "Check how you’re legally connected to England or Wales again"
    Then I go to '/check-jurisdiction'

  Scenario: Exit the service
    When I select "Exit this service"
    Then I go to '/logout'

  Scenario: Clicking Back takes them to the "Where your lives are based" page
    When I click "Back"
    Then I go to '/where-your-lives-are-based'
