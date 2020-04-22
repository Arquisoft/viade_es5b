package computerdatabase

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PruebaCrearCuenta extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map("Accept" -> "*/*")



	val scn = scenario("PruebaCrearCuenta")
		.exec(http("PruebaCrearCuenta_0")
			.get("/")
			.headers(headers_0))
		.exec(http("PruebaCrearCuenta_1")
			.get("/viade_es5b/static/js/bundle.js")
			.headers(headers_1))
		.exec(http("PruebaCrearCuenta_2")
			.get("/viade_es5b/static/js/0.chunk.js")
			.headers(headers_1))
		.exec(http("PruebaCrearCuenta_3")
			.get("/viade_es5b/static/js/main.chunk.js")
			.headers(headers_1))
		.pause(3)
		.exec(http("PruebaCrearCuenta_4")
			.get("/viade_es5b/img/inrupt.svg"))
		.exec(http("PruebaCrearCuenta_5")
			.get("/viade_es5b/img/community.png"))
		.exec(http("PruebaCrearCuenta_6")
			.get("/viade_es5b/img/server.png"))
		.exec(http("PruebaCrearCuenta_7")
			.get("/img/background-pattern.svg"))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}