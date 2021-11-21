Feature: Can use English or Welsh courts

  Background:
    Given I login
    When I've completed all questions correctly to get to the jurisdiction section
    Then I go to '/check-jurisdiction'
    And I click "Continue"

  Scenario: A Applicant1 and Applicant2 are habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: B Applicant1 and Applicant2 were last habitually resident in England and Wales, neither habitually resident
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you were last 'habitually resident' and one of you still lives here"
    And the page should include "Read more about habitual residence"

  @nightly
  Scenario: B Applicant1 and Applicant2 were last habitually resident in England and Wales, Applicant1 habitually resident
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you were last 'habitually resident' and one of you still lives here"
    And the page should include "Read more about habitual residence"

  Scenario: C The Applicant2 habitually resides in England and Wales (mixed sex marriage)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because your husband is 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: D Applicant1 is habitually resident in England and Wales and has been for 12 months
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are 'habitually resident' and have lived here for at least 12 months"
    And the page should include "Read more about habitual residence"

  Scenario: F Applicant1 and Applicant2 are both domiciled in England and Wales, Applicant1 habitually resident (mixed sex marriage)
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'domiciled' in England or Wales."
    And the page should include "Read more about domicile"

  @nightly
  Scenario: F Applicant1 and Applicant2 are both domiciled in England and Wales, neither habitually resident (mixed sex marriage)
    Given I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because both of you are 'domiciled' in England or Wales."
    And the page should include "Read more about domicile"

  Scenario: G residual jurisdiction applies (Applicant1 resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Are the Applicant and Respondent registered as civil partners of each other in England or Wales or, in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case."
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "the courts of England and Wales have jurisdiction on a residual basis"

  @nightly
  Scenario: G residual jurisdiction applies (Applicant1 not resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Are the Applicant and Respondent registered as civil partners of each other in England or Wales or, in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case."
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "the courts of England and Wales have jurisdiction on a residual basis"

  @nightly
  Scenario: F Applicant1 and Applicant2 domiciled (Applicant1 resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: F Applicant1 and Applicant2 domiciled (Applicant1 not resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: F, B Applicant1 and Applicant2 domiciled and both last habitually resident (Applicant1 not resident, same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: F, C Applicant1 and Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: F, C, B Applicant1 and Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "both you and your husband are domiciled"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  Scenario: H, E, B Applicant1 domiciled, Applicant1 habitually resident for 6 months and both last habitually resident
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you’re domiciled and habitually resident and have lived here for at least 6 months"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: H, E Applicant1 domiciled and Applicant1 habitually resident for 6 months
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you’re domiciled and habitually resident and have lived here for at least 6 months"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: H, B Applicant1 domiciled and both last habitually resident
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: H Applicant1 domiciled (Applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "Read more about your connections"

  Scenario: I Applicant2 domiciled (Applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: I Applicant2 domiciled (Applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: I, B Applicant2 domiciled and both last habitually resident (Applicant1 resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: I, B Applicant2 domiciled and both last habitually resident (Applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: I, C Applicant2 domiciled and Applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: I, B, C Applicant2 domiciled, Applicant2 habitually resident and both last habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "No" for "Is your domicile in England or Wales?"
    And I select "Yes" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "your husband is domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: B, H Applicant1 domiciled and both last habitually resident
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: B, H, C Applicant1 domiciled, both last habitually resident and Applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "Yes"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "you and your husband were both last habitually resident and one of you still lives here"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: H Applicant1 domiciled (Applicant1 not resident)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    When I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "Read more about your connections"

  @nightly
  Scenario: H, C Applicant1 domiciled and Applicant2 habitually resident (same sex couple)
    Given I go to '/your-details'
    And the page should include "Who are you applying to divorce?"
    And I clear the form
    And I select "My husband"
    And I select "We were a same-sex couple when we got married"
    And I click "Continue"
    And I go to '/where-your-lives-are-based'
    And I select "No" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    And I select "Yes" for "Is your domicile in England or Wales?"
    And I select "No" for "Is your husband’s domicile in England or Wales?"
    And I click "Continue"
    And I select "No"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "you are domiciled in England or Wales"
    And the page should include "your husband is habitually resident"
    And the page should include "Read more about your connections"

  Scenario: J Applicant1 habitually resides in England and Wales (joint application)
    Given I've said I'm applying as a joint application
    And I go to '/where-your-lives-are-based'
    And I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "No" for "Is your husband’s life mainly based in England or Wales?"
    When I click "Continue"
    Then the page should include "You can use English or Welsh courts to get a divorce"
    And the page should include "Your answers indicate that you can apply for a divorce in England and Wales because you are 'habitually resident'"
    And the page should include "Read more about habitual residence"

  Scenario: Clicking Back takes them to the start of the jurisdiction flow
    Given I select "Yes" for "Is your life mainly based in England or Wales?"
    And I select "Yes" for "Is your husband’s life mainly based in England or Wales?"
    And I click "Continue"
    When I click "Back"
    Then the page should include "Check if you can get a divorce in England and Wales"
