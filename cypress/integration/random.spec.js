/// <reference types="cypress" />

describe("Random page tests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/recommendations/reset", {});
    cy.request("POST", "http://localhost:5000/recommendations/seed", {});
  });

  it("should return recommendations greater than or equal to -5", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Random").click();

    cy.url().should("equal", "http://localhost:3000/random");

    cy.get('article:first-of-type').within(() => {
      cy.get('div:last-of-type').should(($div) => {
        const text = parseInt($div.text());
      
        expect(text).to.be.greaterThan(-6);
      });
    });
  });
});