Feature: Your domicile

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/your-domicile"
    Then the page should include "Your domicile"

  Scenario: Both there domiciles are in England/Wales
    Given I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/you-can-use-english-welsh-courts"

  @nightly
  Scenario: Their domicile is in England/Wales, but both their life's are not based in England/Wales
    Given I go to "/where-your-lives-are-based"
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  @nightly
  Scenario: Their life is based in England/Wales, but their partners is not and their domicile is in England/Wales, but their partners is not
    Given I've completed all questions correctly to get to the jurisdiction section
    And I go to "/where-your-lives-are-based"
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    When I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/living-england-wales-six-months"

  @nightly
  Scenario: Their domicile is not in England/Wales, but their partners is
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  @nightly
  Scenario: Both their domiciles are not in England/Wales
    Given I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page URL should be "/habitually-resident-england-wales"

  @nightly
  Scenario: They do not indicate if their domicile is in England/Wales
    Given I clear the form
    And I click "Continue"
    Then the page should include "There was a problem"
