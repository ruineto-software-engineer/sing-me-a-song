/// <reference types="cypress" />

describe("Home page tests", () => {
  it("should register a song successfully", () => {
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
    
    cy.contains(music.name);

    cy.end();
  });

  it("should return an alert when registering an existing song", () => {
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

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Error creating recommendation!');
    });

    cy.end();
  });

  it("should return an alert when registering an invalid song", () => {
    cy.get('button').click();

    cy.visit("http://localhost:3000/");

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Error creating recommendation!');
    });

    cy.end();
  });

  it("should increase recommendation counter", () => {
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

    cy.contains(music.name).get('article').within(() => {
      cy.get('div:nth-child(3)').should('have.text',"0")
    });

    cy.contains(music.name).get('article').within(() => {
      cy.get('svg:nth-child(1)').click();
    });

    cy.reload();

    cy.contains(music.name).get('article').within(() => {
      cy.get('div:nth-child(3)').should('have.text',"1")
    });

    cy.end();
  });

  it("should decrease recommendation counter", () => {
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

    cy.contains(music.name).get('article').within(() => {
      cy.get('div:nth-child(3)').should('have.text',"1")
    });

    cy.contains(music.name).get('article').within(() => {
      cy.get('svg:nth-child(2)').click();
    });

    cy.reload();

    cy.contains(music.name).get('article').within(() => {
      cy.get('div:nth-child(3)').should('have.text',"0")
    });

    cy.end();
  });
});