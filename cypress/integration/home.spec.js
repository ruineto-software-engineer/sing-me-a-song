/// <reference types="cypress" />

describe("Home page tests", () => {
  it("should register a song successfully", () => {
    const music = {
      name: "Falamansa - Xote dos Milagres",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }

    cy.visit("http://localhost:3000/");

    cy.get('.name').type(music.name);
    cy.get('.youtubeLink').type(music.youtubeLink);
    cy.get('.submit').click();
    
    cy.contains(music.name);
  });
});