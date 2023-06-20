describe("Register E2E", () => {
  it("Correct register", () => {
    cy.visit("http://3.89.221.7/register");
    cy.get('input[id="register-email"]').type("test1@gmail.com");
    cy.get('input[id="register-name"]').type("Nicolas Pereira");
    cy.get('input[id="register-rut"]').type("8585889-0");
    cy.get('input[id="register-password"]').first().type("2aSsword95%");
    cy.get('input[id="register-password"]').eq(1).type("2aSsword95%");
    cy.get('button[type="submit"]').click();

    cy.contains("Please login").should("be.visible");
    cy.url().should("include", "/login");
  });
});
