Feature: Add route in viade

	Scenario: We want to add a route in viade_es5b
		Given Authorization from login
		When We add route with form
		Then I check route was added