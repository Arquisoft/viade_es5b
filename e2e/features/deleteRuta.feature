Feature: Delete route

	Scenario: We want to delete route into Viade_es5b
		Given The route list page
		When We press 'eliminar'
		Then I expect to be delete on route list