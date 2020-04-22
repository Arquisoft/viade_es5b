Feature: Share route

	Scenario: We want to share a route
		Given The page of List Routes
		When We share a route
		Then We check that the route has been shared 