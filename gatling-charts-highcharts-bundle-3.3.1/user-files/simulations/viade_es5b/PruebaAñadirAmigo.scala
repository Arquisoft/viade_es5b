package viade_es5b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PruebaAñadirAmigo extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map("If-None-Match" -> """W/"f2fb82-xi770ARvF9mJNc/C9S9KP9oECvA"""")

	val headers_1 = Map("If-None-Match" -> """W/"5bf47-ikTvqZw7tPZHkFqXCt/lqOk8GbE"""")

	val headers_2 = Map("If-None-Match" -> """W/"39bda-wavS+3Bu5Q9112glPTfSvZ4R6T8"""")

	val headers_3 = Map("If-None-Match" -> """W/"e4536c-SpoORa+kY+8Y6JBy6H+ZKU3QQkg"""")

	val headers_4 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-None-Match" -> """W/"a3e-AnfbrcfazmnwlfKdCBuPqjvjg6k"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_5 = Map("If-None-Match" -> """W/"7cc6-x4NbkmGzr0X8QdYy/odqYe+ado0"""")



	val scn = scenario("PruebaAñadirAmigo")
		.exec(http("PruebaAñadirAmigo_0")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_1")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaAñadirAmigo_2")
			.get("/viade_es5b/static/js/main.chunk.js.map")
			.headers(headers_2))
		.pause(146 milliseconds)
		.exec(http("PruebaAñadirAmigo_3")
			.get("/viade_es5b/static/js/0.chunk.js.map")
			.headers(headers_3))
		.pause(1)
		.exec(http("PruebaAñadirAmigo_4")
			.get("/")
			.headers(headers_4))
		.exec(http("PruebaAñadirAmigo_5")
			.get("/viade_es5b/static/js/bundle.js")
			.headers(headers_5))
		.exec(http("PruebaAñadirAmigo_6")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_7")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.pause(12)
		.exec(http("PruebaAñadirAmigo_8")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_9")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaAñadirAmigo_10")
			.get("/viade_es5b/static/js/main.chunk.js.map")
			.headers(headers_2))
		.pause(117 milliseconds)
		.exec(http("PruebaAñadirAmigo_11")
			.get("/viade_es5b/static/js/0.chunk.js.map")
			.headers(headers_3))
		.pause(9)
		.exec(http("PruebaAñadirAmigo_12")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaAñadirAmigo_13")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_14")
			.get("/viade_es5b/static/js/main.chunk.js.map")
			.headers(headers_2))
		.pause(193 milliseconds)
		.exec(http("PruebaAñadirAmigo_15")
			.get("/viade_es5b/static/js/0.chunk.js.map")
			.headers(headers_3))
		.pause(9)
		.exec(http("PruebaAñadirAmigo_16")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaAñadirAmigo_17")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_18")
			.get("/viade_es5b/static/js/main.chunk.js.map")
			.headers(headers_2))
		.pause(167 milliseconds)
		.exec(http("PruebaAñadirAmigo_19")
			.get("/viade_es5b/static/js/0.chunk.js.map")
			.headers(headers_3))
		.pause(9)
		.exec(http("PruebaAñadirAmigo_20")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_0))
		.exec(http("PruebaAñadirAmigo_21")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaAñadirAmigo_22")
			.get("/viade_es5b/static/js/main.chunk.js.map")
			.headers(headers_2))
		.pause(141 milliseconds)
		.exec(http("PruebaAñadirAmigo_23")
			.get("/viade_es5b/static/js/0.chunk.js.map")
			.headers(headers_3))

	setUp(scn.inject(rampUsers(50)during(60 seconds))).protocols(httpProtocol)
}