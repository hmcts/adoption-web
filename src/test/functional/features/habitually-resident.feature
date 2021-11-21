Feature: Habitually Resident

  Background:
    Given I login
    And I've completed all questions correctly to get to the jurisdiction section
    When I go to '/habitually-resident-england-wales'
    Then the page should include "Were you both last habitually resident in England or Wales and does one of you still live here?"

  # Scenario: Was not last habitually resident in England or Wales and is same sex
  # Tested in can-use-english-or-welsh-courts.feature: G Eligible for Residual Jurisdiction

  @nightly
  Scenario: Was not last habitually resident in England or Wales and is not same sex
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"
    Given I clear the form
    Given I select "My husband"
    And I click "Continue"
    When I go to '/where-your-lives-are-based'
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"

  Scenario: Was last habitually resident in England or Wales and does one of you still live here?
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts"
