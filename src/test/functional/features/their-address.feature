Feature: Their address

  Background:
    Given I login
    And I've said I'm divorcing my husband
    When I go to "/enter-their-address"
    Then the page should include "Enter your husband’s postal address"

  Scenario: Entering their partners international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    Then the page should include "Address line 1"
    Given I select "Address line 1"
    And I type "Their line 1"
    And I select "Address line 2"
    And I type "Their line 2"
    And I select "Address line 3"
    And I type "Their line 3"
    And I select "Town or city"
    And I type "Their town"
    And I select "County, district, state or province"
    And I type "Their county"
    And I select "Postal code, zip code or area code"
    And I type "Their code"
    And I select "Country"
    And I type "Their country"
    And I click "Continue"
    Then the page URL should be "/other-court-cases"
    When I go to "/enter-their-address"
    Then the form input "Country" should be "Their country"

  @nightly
  Scenario: They haven't completed their partners international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    When I click "Continue"
    Then the page should include "You have not entered your husband’s building and street address. Enter their building and street address before continuing."
    And the page should include "You have not entered your husband’s country. Enter their country before continuing."
