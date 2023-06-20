describe("Home E2E", () => {
	it("Home correct", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.visit(`${Cypress.config().baseUrl}/`);

		cy.get(".user-name").should("have.text", "John Doe");
		cy.get(".user-rut").should("have.text", "22.222****");
		cy.get(".user-email").should("have.text", "john@example.com");
	});

	it("Home incorrect", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.visit(`${Cypress.config().baseUrl}/`);

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please enter your credentials");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/login?login_error=1`);
		});
	});

	it("Home incorrect by user not verified", () => {
		cy.window().then((win) => {
			win.localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTE0MGM1OTFjMWNjNzRlYmQ3NzI4ZCIsImlhdCI6MTY4NzI0MDkwMywiZXhwIjoxNjg3MzI3MzAzfQ.rPyNAl5dvAXCRCY17QMMJc8S175qgiW-_r0BQFn4iIg");
		});

		cy.visit("http://3.89.221.7/");

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "You need to verify your account");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
		});
	});

	it("Obtain Rut and avatar", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.window().then((win) => {
			win.localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODhlNmI3NmZjMWE2Njg0NGU4MGFkNiIsImlhdCI6MTY4NzIzNzE4NSwiZXhwIjoxNjg3MzIzNTg1fQ.tBljOpkldX8IedaAu_PzK1F2OxVW_SZ1Jj7HxjNKCdM");
		});

		cy.visit("http://3.89.221.7/");
		cy.get('div[class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable"]').click();
		cy.get('div[id="user-rut-complete"]').should('contain', '22.222.222-2');
		//cy.get('div[class="q-avatar__content row flex-center overflow-hidden"]').contains('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9kA6yZ1SWsM6huh09Ncdej54pLfiadf_JXw&usqp=CAU');
	});

	it("Home: Blocked user", () => {
		cy.login("n.hidalgo02@ufromail.cl", "2aSsword95%");
		cy.visit(`${Cypress.config().baseUrl}/`);
		cy.get('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-red.text-white.q-btn--actionable.q-focusable.q-hoverable').click();
		cy.get('div[class="q-item__label q-item__label--caption text-caption"]').should('contain', 'This user is blocked');
	});

	it("Home: Unlock user", () => {
		cy.login("n.hidalgo02@ufromail.cl", "2aSsword95%");
		cy.visit(`${Cypress.config().baseUrl}/`);
		cy.get('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-green.text-white.q-btn--actionable.q-focusable.q-hoverable').click();
		cy.get('div[class="q-item__label q-item__label--caption text-caption"]').should('contain', 'This user is unblocked');
	});
});
