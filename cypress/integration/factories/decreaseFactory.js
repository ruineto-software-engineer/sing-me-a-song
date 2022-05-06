export default function decreaseFactory(music){
  cy.contains(music.name).get('article').within(() => {
    cy.get('div:last-of-type').should('have.text',"0")
  });

  cy.contains(music.name).get('article').within(() => {
    cy.get('svg:last-of-type').click();
  });

  cy.reload();

  cy.contains(music.name).get('article').within(() => {
    cy.get('div:last-of-type').should('have.text',"-1")
  });
}