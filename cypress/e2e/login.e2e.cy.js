describe("Login E2E", () => {
	it("Login incorrect", () => {
		cy.visit("http://3.89.221.7/login");
		cy.get('input[id="login-email"]').type("john@example.com");
		cy.get('input[id="login-password"]').type("john@example.com");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "invalid credentials");
	});

	it("Login incorrect by Email", () => {
		cy.visit("http://3.89.221.7/login");
		cy.get('input[id="login-email"]').type("nicolas@gmail.c");
		cy.get('input[id="login-password"]').type("2aSsword95%");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "email is required and must be a valid email");
	});


	it("Correct login", () => {
		cy.visit("http://3.89.221.7/login");
		cy.get('input[type="email"]').type("john@example.com");
		cy.get('input[type="password"]').type("2aSsword95%");
		cy.get('button[type="submit"]').click();

		cy.on("url:changed", () => {
			cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		});
	});
});
