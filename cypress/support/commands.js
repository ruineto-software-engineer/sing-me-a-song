// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createRecommendation', () => {
  const music = {
    name: "Falamansa - Xote dos Milagres",
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
  }

  cy.visit("http://localhost:3000/");

  cy.get('input[placeholder="Name"]').type(music.name);
  cy.get('input[placeholder="https://youtu.be/..."]').type(music.youtubeLink);

  cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendations");

  cy.get('button').click();

  cy.wait("@createRecommendations");
});

Cypress.Commands.add("reset", () => {
  cy.request("POST", "http://localhost:5000/recommendations/reset", {});
});

Cypress.Commands.add("seed", () => {
  cy.request("POST", "http://localhost:5000/recommendations/seed", {});
})