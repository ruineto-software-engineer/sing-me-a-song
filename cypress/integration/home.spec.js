/// <reference types="cypress" />

import recommendationBodyFactory from './factories/recommendationBodyFactory.js';

describe("Home page tests", () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it("should register a recommendation successfully", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.contains(recommendation.name);

    cy.end();
  });

  it("should return an alert when registering an existing recommendation", () => {
    recommendationBodyFactory();

    cy.alertTest();

    cy.end();
  });

  it("should return an alert when registering an invalid recommendation", () => {
    cy.get('button').click();

    cy.visit("http://localhost:3000/");

    cy.alertTest();

    cy.end();
  });

  it("should increase recommendation counter", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.increaseTest(recommendation);

    cy.end();
  });

  it("should decrease recommendation counter", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.decreaseTest(recommendation);

    cy.end();
  });

  it("should exclude the recommendation by decreasing the counter 5 times", () => {
    const recommendation = recommendationBodyFactory();

    cy.createRecommendationTest(recommendation);

    cy.deleteTest(recommendation);

    cy.contains("No recommendations yet! Create your own :)");
  
    cy.end();
  });
});