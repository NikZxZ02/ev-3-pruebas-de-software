const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTIzMTgwOTFjMWNjNzRlYmQ3ODJjZCIsImlhdCI6MTY4NzMwMjUzOCwiZXhwIjoxNjg3Mzg4OTM4fQ.n9jovDEsczdyqJVjMbJuyOGBFGHYPvldO7sbeiioKgc";

const URL = Cypress.config().baseUrl;

describe("Verification E2E", () => {
  it("Verification incorrect code not valid", () => {
    cy.visit(`${URL}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", TOKEN);
      },
    });

    cy.url().should("include", "/verify");
    cy.get('input[id="verify-code"]').type("asd124");
    cy.get('button[type="submit"]').click();
    cy.contains("the code is not valid").should("be.visible");
  });

  it("Correct verification", () => {
    cy.visit(`${URL}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", TOKEN);
      },
    });

    cy.url().should("include", "/verify");
    cy.get('input[id="verify-code"]').type("asd123");
    cy.get('button[type="submit"]').click();
    cy.contains("Verification successful").should("be.visible");

    cy.url().should("eq", `${URL}/`);
  });

  it("Verification not necessary", () => {
    cy.visit(`${URL}/verify?verify_error=1`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", TOKEN);
      },
    });

    cy.url().should("include", "/verify");
    cy.get('input[id="verify-code"]').type("asd123");
    cy.get('button[type="submit"]').click();
    cy.contains("the user is already verified").should("be.visible");
    cy.url().should("eq", `${URL}/`);
  });
});
