export default function alertFactory() {
  cy.on('window:alert', (text) => {
    expect(text).to.contains('Error creating recommendation!');
  });
}