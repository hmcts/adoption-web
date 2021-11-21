Feature: Your address

  Background:
    Given I login
    And I've said I'm applying as a sole application
    When I go to "/enter-your-address"
    Then the page should include "Enter your postal address"

  Scenario: Successfully entering an international address
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    Then the page should include "Address line 1"
    Given I select "Address line 1"
    And I type "Example line 1"
    And I select "Address line 2"
    And I type "Example line 2"
    And I select "Address line 3"
    And I type "Example line 3"
    And I select "Town or city"
    And I type "Example town"
    And I select "County, district, state or province"
    And I type "Example county"
    And I select "Postal code, zip code or area code"
    And I type "Example code"
    And I select "Country"
    And I type "Example country"
    And I click "Continue"
    Then the page URL should be "/their-email-address"
    When I go to "/enter-your-address"
    Then the form input "Country" should be "Example country"

  @nightly
  Scenario: Error when missing a required international address field
    Given I reset the postcode lookup form
    And I click "I cannot enter a UK postcode"
    When I click "Continue"
    Then the page should include "You have not entered your building and street address. Enter your building and street address before continuing."
    And the page should include "You have not entered your country. Enter your country before continuing."

