Feature: Add friend in viade

	Scenario: We want to add a friend in viade_es5b
		Given Authorization from login
		When We add a friend in the app
		Then I check friend was added