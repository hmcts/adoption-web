Feature: Where your lives are based

  Background:
    Given I create a new user and login
    And I've said I'm divorcing my husband
    When I go to "/where-your-lives-are-based"
    Then the page should include "Where your lives are based"

  Scenario: Both their life's are based in England/Wales
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/you-can-use-english-welsh-courts"

  @nightly
  Scenario: Their life is based in England/Wale, but their partners is not
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-twelve-months"

  @nightly
  Scenario: Their life is not based in England/Wales, but their partners is
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/you-can-use-english-welsh-courts"

  @nightly
  Scenario: Both their lives are not based in England/Wales
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/your-domicile"

  @nightly
  Scenario: They have not indicated where their lives are based
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
