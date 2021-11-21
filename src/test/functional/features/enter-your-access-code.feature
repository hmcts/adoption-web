Feature: Enter your access code

  Scenario: They have entered the correct case reference
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"
    And I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    Then the page should include "You need to review your joint application"

  @nightly
  Scenario: They have entered an incorrect case reference
    Given I login
    And I go to "/applicant2/enter-your-access-code"
    And I clear the form
    And I select "Your reference number"
    And I type "1234123412341234"
    And I select "Your access code"
    When I type "QWERTY45"
    And I click "Continue"
    Then the page should include "You have entered the wrong reference number"

  @nightly
  Scenario: They have not entered their case reference
    Given I login
    And I go to "/applicant2/enter-your-access-code"
    And I clear the form
    And I select "Your access code"
    When I type "QWERTY45"
    And I click "Continue"
    Then the page should include "You have not entered a reference number"

  @nightly
  Scenario: They have not entered their access code
    Given I login
    And I go to "/applicant2/enter-your-access-code"
    And I clear the form
    And I select "Your reference number"
    When I type "1234123412341234"
    And I click "Continue"
    Then the page should include "You have not entered an access code"

  @nightly
  Scenario: They have not filled in any of the form
    Given I login
    And I go to "/applicant2/enter-your-access-code"
    And I clear the form
    When I click "Continue"
    Then the page should include "You have not entered"
