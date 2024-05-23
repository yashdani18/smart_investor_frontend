describe("template spec", () => {
  it("passes", () => {
    // cy.visit('https://example.cypress.io')
    cy.visit("http://3.144.249.164:3000/login");

    // cy.get(".login").should("exists");
    cy.contains("h6", "Username").should("exist");
    cy.contains("h6", "Password").should("exist");
  });
});
