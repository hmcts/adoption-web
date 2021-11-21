Feature: Footer Links

  Background:
    Given I login
    When I go to '/your-details'
    Then the page should include "Who are you applying to divorce?"

  @nightly
  Scenario: Load the footer links
    When I click "Accessibility statement"
    Then the page should include "We want as many people as possible to be able to use this website"
    Given I go to "/your-details"
    When I click "Privacy policy"
    Then the page should include "This privacy policy explains why we collect your personal data"
    Given I go to "/your-details"
    When I click "Terms and conditions"
    Then the page should include "This page explains this service’s terms of use"
    Given I go to "/your-details"
    When I click "Cookies"
    Then the page should include "A cookie is a small piece of data that’s stored on your computer"
    Given I go to "/your-details"
    When I click "Accessibility statement"
    Then the page should include "We want as many people as possible to be able to use this website"
