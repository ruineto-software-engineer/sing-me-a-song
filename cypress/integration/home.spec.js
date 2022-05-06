/// <reference types="cypress" />

import alertFactory from './factories/alertFactory.js';
import decreaseFactory from './factories/decreaseFactory.js';
import deleteFactory from './factories/deleteFactory.js';
import increaseFactory from './factories/increaseFactory.js';
import musicFactory from './factories/musicFactory.js';

describe("Home page tests", () => {
  it("should register a song successfully", () => {
    const music = musicFactory();

    cy.contains(music.name);

    cy.end();
  });

  it("should return an alert when registering an existing song", () => {
    musicFactory();

    alertFactory();

    cy.end();
  });

  it("should return an alert when registering an invalid song", () => {
    cy.get('button').click();

    cy.visit("http://localhost:3000/");

    alertFactory();

    cy.end();
  });

  it("should increase recommendation counter", () => {
    const music = musicFactory();

    increaseFactory(music);

    cy.end();
  });

  it("should decrease recommendation counter", () => {
    const music = musicFactory();

    decreaseFactory(music);

    cy.end();
  });

  it("must exclude the recommendation by decreasing the counter 5 times", () => {
    const music = musicFactory();

    deleteFactory(music);

    cy.contains("No recommendations yet! Create your own :)");
  
    cy.end();
  });
});