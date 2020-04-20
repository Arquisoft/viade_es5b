Feature: Login into Viade

	Scenario: We want to login into Viade_es5b
		Given The login page
		When We press Iniciar Sesion and enter our information
		Then I expect to be on the Welcome page of ViaDe