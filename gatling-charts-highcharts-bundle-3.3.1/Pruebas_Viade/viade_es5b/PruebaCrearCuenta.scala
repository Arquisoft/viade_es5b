package viade_es5b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PruebaCrearCuenta extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_6 = Map("Accept" -> "image/webp,*/*")

	val headers_7 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

	val headers_12 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_13 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Accept-Encoding" -> "gzip, deflate, br")

	val headers_15 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://localhost:8443",
		"Upgrade-Insecure-Requests" -> "1")

    val uri1 = "localhost"

	val scn = scenario("PruebaCrearCuenta")
		.exec(http("PruebaCrearCuenta_0")
			.get("/")
			.headers(headers_0))
		.exec(http("PruebaCrearCuenta_1")
			.get("/viade_es5b/static/js/0.chunk.js"))
		.exec(http("PruebaCrearCuenta_2")
			.get("/viade_es5b/static/js/main.chunk.js"))
		.exec(http("PruebaCrearCuenta_3")
			.get("/viade_es5b/static/js/main.chunk.js"))
		.exec(http("PruebaCrearCuenta_4")
			.get("/viade_es5b/static/js/0.chunk.js"))
		.exec(http("PruebaCrearCuenta_5")
			.get("/viade_es5b/static/js/bundle.js"))
		.pause(4)
		.exec(http("PruebaCrearCuenta_6")
			.get("/img/background-pattern.svg")
			.headers(headers_6))
		.exec(http("PruebaCrearCuenta_7")
			.get("https://" + uri1 + ":8443/logout")
			.headers(headers_7))
		.exec(http("PruebaCrearCuenta_8")
			.get("/.well-known/solid/logout"))
		.pause(3)
		.exec(http("PruebaCrearCuenta_9")
			.get("/viade_es5b/img/inrupt.svg")
			.headers(headers_6))
		.exec(http("PruebaCrearCuenta_10")
			.get("/viade_es5b/img/community.png")
			.headers(headers_6))
		.exec(http("PruebaCrearCuenta_11")
			.get("/viade_es5b/img/server.png")
			.headers(headers_6))
		.pause(1)
		.exec(http("PruebaCrearCuenta_12")
			.get("https://" + uri1 + ":8443/authorize?scope=openid&client_id=f70370c03e9b0bc6170ef1b595702599&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdmlhZGVfZXM1Yi8jLyIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJDOEpiTk1LVndJU3RVS3BhRXowUS05Q3VzNnd0YUxqaE45UDI3eUlwQ3FVIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJycWE5bXUxNE11M0tfNUFRNzJfampXb2lIQUlxcDNVZGdBcTZuTDdPSFNGc2Y3bUpWbjBLdGc3bmdzMmpPdWNwWVFlelBXOFRIazJiZWhCZkJRNVBUQ19LSlBhMnFydFFzdW51ODctc0Z5dF8tMVlPcnNEVWs5UTY1aGFQRmJ0T0hMclV0aVRvbHdadmg4UkF6SldEZ2tlTXZ0MFg1ckFEZVlJb19Vb19YcF9JUDNnQ1V1U0g5YVRabHE2U21ydnJ2ckZzRERGNVE0Z2I5MGxfT0pfVnZpYUpGOFNQMFlGc3JiZ2ZETU5wYktiRldUd3pocUtHOTRDXzY2dkRCbGVBby1KQndhdHFiaWFhVlJDeWFkVFVKTUpnMjlkWk1xbkdqZ0NMcjVYYmhPeW5VUjVRYjJnN1lMZ1d4c0pnSUllelBCQXJ1NFplSVpRVlZyY0YwZXRNSFEifX0.&state=2UObV7Zsc0noZsr7juhIWLLZ26NrkdcbFChsLTrDntc")
			.headers(headers_12))
		.exec(http("PruebaCrearCuenta_13")
			.get("https://" + uri1 + ":8443/common/css/bootstrap.min.css")
			.headers(headers_13))
		.exec(http("PruebaCrearCuenta_14")
			.get("https://" + uri1 + ":8443/common/css/solid.css")
			.headers(headers_13))
		.pause(1)
		.exec(http("PruebaCrearCuenta_15")
			.post("https://" + uri1 + ":8443/login/password")
			.headers(headers_15)
			.formParam("username", "Ejemplo")
			.formParam("password", "asdfghjklÑ")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "f70370c03e9b0bc6170ef1b595702599")
			.formParam("redirect_uri", "http://localhost:3000/viade_es5b/#/")
			.formParam("state", "2UObV7Zsc0noZsr7juhIWLLZ26NrkdcbFChsLTrDntc")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdmlhZGVfZXM1Yi8jLyIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJDOEpiTk1LVndJU3RVS3BhRXowUS05Q3VzNnd0YUxqaE45UDI3eUlwQ3FVIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJycWE5bXUxNE11M0tfNUFRNzJfampXb2lIQUlxcDNVZGdBcTZuTDdPSFNGc2Y3bUpWbjBLdGc3bmdzMmpPdWNwWVFlelBXOFRIazJiZWhCZkJRNVBUQ19LSlBhMnFydFFzdW51ODctc0Z5dF8tMVlPcnNEVWs5UTY1aGFQRmJ0T0hMclV0aVRvbHdadmg4UkF6SldEZ2tlTXZ0MFg1ckFEZVlJb19Vb19YcF9JUDNnQ1V1U0g5YVRabHE2U21ydnJ2ckZzRERGNVE0Z2I5MGxfT0pfVnZpYUpGOFNQMFlGc3JiZ2ZETU5wYktiRldUd3pocUtHOTRDXzY2dkRCbGVBby1KQndhdHFiaWFhVlJDeWFkVFVKTUpnMjlkWk1xbkdqZ0NMcjVYYmhPeW5VUjVRYjJnN1lMZ1d4c0pnSUllelBCQXJ1NFplSVpRVlZyY0YwZXRNSFEifX0."))
		.exec(http("PruebaCrearCuenta_16")
			.get("/viade_es5b/static/js/bundle.js"))
		.exec(http("PruebaCrearCuenta_17")
			.get("/viade_es5b/static/js/main.chunk.js"))
		.exec(http("PruebaCrearCuenta_18")
			.get("/viade_es5b/static/js/0.chunk.js"))
		.pause(1)
		.exec(http("PruebaCrearCuenta_19")
			.get("/img/background-pattern.svg")
			.headers(headers_6))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}