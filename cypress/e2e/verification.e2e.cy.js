const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTI0ZjZiOTFjMWNjNzRlYmQ3ODU1NSIsImlhdCI6MTY4NzMxMDE5OSwiZXhwIjoxNjg3Mzk2NTk5fQ._3jyfqeFizuBZToQFbqr-NZsp6l8unDKqAtZj_yVhUo";

const URL = Cypress.config().baseUrl;

describe("Verification E2E", () => {
  it("Verification incorrect code not valid", () => {
    cy.visit(`${URL}/`, {
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
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit(`${URL}/`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", TOKEN);
      },
    });

    cy.url().should("include", "/verify");
    cy.get('input[id="verify-code"]').type("asd123");
    cy.get('button[type="submit"]').click();
    //cy.contains("Verification successful").should("be.visible");
    cy.get("div")
      .find(".q-notification")
      .should("be.visible")
      .and("contain.text", "Verification successful");

    cy.url().should("eq", `${URL}/`);
  });

  it("Verification not necessary", () => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });

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
