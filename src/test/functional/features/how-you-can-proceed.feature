Feature: How you can proceed

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/how-you-can-proceed"
    Then the page should include "How to proceed with your divorce"
    And the page should include "I have another email address or postal address for my husband"
    And the page should include "I have their email address but not their postal address"
    And the page should include "I need to search government records for my husband's postal address"
    And the page should include "I think my husband is receiving the application but is choosing not to respond"
    And the page should include "I have evidence that my husband has received the application, but will not or cannot respond"
    And the page should include "I've tried every possible way of delivering the application"

  Scenario: Reviewing their contact details
    When I click "Review your contact details"
    Then the page URL should be "check-contact-details"
