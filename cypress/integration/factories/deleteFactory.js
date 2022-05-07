export default function deleteFactory(music) {
  Cypress._.times(6, (k) => {
    cy.contains(music.name).get('article').within(() => {
      cy.get('svg:last-of-type').click();
    });
  });
}