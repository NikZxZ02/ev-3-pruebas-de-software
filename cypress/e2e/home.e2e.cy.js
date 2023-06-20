describe("Home E2E", () => {
	it("Home correct", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.visit("http://3.89.221.7/");

		cy.get(".user-name").should("have.text", "John Doe");
		cy.get(".user-rut").should("have.text", "22.222****");
		cy.get(".user-email").should("have.text", "john@example.com");
	});

	it("Home incorrect", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.visit("http://3.89.221.7/");

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please enter your credentials");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/login?login_error=1`);
		});
	});
});
