Feature: Living in England or Wales for the last 6 months

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-six-months"
    And the page should include "Have you been living in England or Wales for the last 6 months?"

  @nightly
  Scenario: Error when not answering Have you been living in England or Wales for the last 6 months?
    Given I clear the form
    When I click "Continue"
    Then the page should include "There was a problem"

  Scenario: Have not lived in England or Wales for the last 6 months?
    And I select "No"
    When I click "Continue"
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"

  Scenario: They confirm that they have lived in England/Wales for the last 6 months
    And I select "Yes"
    And I click "Continue"
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"
