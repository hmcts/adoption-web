Feature: Hub page

  Background: Logged in for hub page
    Given I create a new user and login
    And I've already completed the form using the fixture "jointApplicant1CompleteCase"

  Scenario: Applicant 1 confirms receipt
    Given I set the case state to "Holding"
    And I go to "/"
    Then the page URL should be "/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."

  Scenario: Applicant 2 confirms receipt
    When I go to "/"
    And I click "Send for review"
    Then the page URL should be "/application-sent-for-review"
    And I enter my valid case reference and valid access code
    And I set the case state to "Holding"
    And I go to "/"
    Then the page URL should be "/applicant2/hub-page"
    Then the page should include "Your application for divorce has been submitted and checked by court staff."
    And the page should include "Confirm receipt"
    When I click "Confirm receipt"
    Then the page should include "You have confirmed receipt of the divorce application"
    And the page should include "The next step is to apply for a 'conditional order'."

