Feature: Your details step

  Background:
    Given I login
    When I go to '/your-details'
    And I clear the form
    Then the page should include "Who are you applying to divorce?"
    And I expect the page title to be "Apply for a divorce - Who are you applying to divorce? - GOV.UK"
    And the page should not include "Back"

  Scenario: They're dissolving their union with their male partner
    Given I select "My husband"
    And I select "We were a same-sex couple when we got married"
    When I click "Continue"
    Then the page should include "Has your marriage irretrievably broken down (it cannot be saved)?"

  @nightly
  Scenario: They have not selected who they are applying to dissolve the union from
    Given I clear the form
    When I select "We were a same-sex couple when we got married"
    And I click "Continue"
    Then the page should include "There was a problem"
    And "We were a same-sex couple when we got married" should be ticked
