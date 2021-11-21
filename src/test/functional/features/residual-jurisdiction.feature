Feature: Residual Jurisdiction

  Background:
    Given I login
    When I go to '/are-you-eligible-for-residual-jurisdiction'
    Then the page should include "Same sex married couples"

  @nightly
  Scenario: Not eligible for residual jurisdiction
    Given I clear the form
    When I click "Continue"
    Then the page should include "You may not be able to get a divorce in England and Wales"

  Scenario: Eligible for residual jurisdiction
    Given I select "Are the Applicant and Respondent registered as civil partners of each other in England or Wales or, in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case."
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"

  # Yes scenario is covered in "can-use-english-or-welsh-courts.feature": "Scenario: G"
