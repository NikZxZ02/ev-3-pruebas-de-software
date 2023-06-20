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

	it("Register correct", () => {
		cy.visit(`${Cypress.config().baseUrl}/register`);

		cy.get('input[id="register-email"]').type("emailtest@ufromail.cl");
		cy.get('input[id="register-name"]').type("Nico");
        cy.get('input[id="register-rut"]').type("6561262-3");
        cy.get('input[aria-label="Password"]').type("2aSsword95%");
        cy.get('input[aria-label="Confirm the password"]').type("2aSsword95%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please login");
        cy.url().should("include", "/login");
	});

    it("Register correct 2", () => {
		cy.visit(`${Cypress.config().baseUrl}/register`);

		cy.get('input[id="register-email"]').type("testemail@ufromail.cl");
		cy.get('input[id="register-name"]').type("Nico");
        cy.get('input[id="register-rut"]').type("20740437-3");
        cy.get('input[aria-label="Password"]').type("2aSsword95%");
        cy.get('input[aria-label="Confirm the password"]').type("2aSsword95%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please login");
        cy.url().should("include", "/login");
	});

    it("Register incorrect by email alredy exists", () => {
		cy.visit(`${Cypress.config().baseUrl}/register`);

		cy.get('input[id="register-email"]').type("emailtest@ufromail.cl");
		cy.get('input[id="register-name"]').type("Nico");
        cy.get('input[id="register-rut"]').type("19972287-5");
        cy.get('input[aria-label="Password"]').type("2aSsword95%");
        cy.get('input[aria-label="Confirm the password"]').type("2aSsword95%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "email already exists");
	});

    it("Register incorrect by rut alredy exists", () => {
		cy.visit(`${Cypress.config().baseUrl}/register`);

		cy.get('input[id="register-email"]').type("email@ufromail.cl");
		cy.get('input[id="register-name"]').type("Nico");
        cy.get('input[id="register-rut"]').type("6561262-3");
        cy.get('input[aria-label="Password"]').type("2aSsword95%");
        cy.get('input[aria-label="Confirm the password"]').type("2aSsword95%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the rut already exists");
	});
});
