Feature: Living in England or Wales for the last 12 months

  Background:
    Given I create a new user and login
    And I've completed all questions correctly to get to the jurisdiction section
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    Then the page should include "Have you been living in England or Wales for the last 12 months?"

  @nightly
  Scenario: Error when not answering Have you been living in England or Wales for the last 12 months?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Have not lived in England or Wales for the last 12 months
    And I select "No"
    When I click "Continue"
    Then the page should include "Your domicile"

  Scenario: They have been living in England/Wales for the last 12 months
    And I select "Yes"
    And I click "Continue"
    Then the page should include "You can use English or Welsh courts"
