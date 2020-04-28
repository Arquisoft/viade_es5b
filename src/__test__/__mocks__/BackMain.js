import Ruta from "../../front-end/model/Ruta";
import Hito from "../../front-end/model/Hito";
import Comentario from "../../front-end/model/Comentario";
import Persona from "../../front-end/model/Persona";
import RutaAmigo from "../../front-end/model/RutaAmigo";

export default class BackMain {
	static listarRutas () {
		let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
		let r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");

		r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
		r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

		r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
		r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

		let c1=new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien");
		c1.setAutor("Lucía", "123", "imagen");
		let c2=new Comentario("Publicado: 01/4/2020 22:41:26","Genial");

		r1.addComentario(c1);
		r1.addComentario(c2);
    
		var BDRutas2=[];
		BDRutas2 = [...BDRutas2, r1];
		BDRutas2 = [...BDRutas2, r2];
		return BDRutas2;
	}

	static añadirRuta (Ruta) {
	}

	static borrarRuta (uuid, routeName) {
	}

	static listarAmigos () {
		var amigo1 = new Persona(
			"Pedro",
			"https://pedro223.inrupt.net/profile/card#me",
			""
		);
		var amigo2 = new Persona(
			"Alex",
			"https://hamalawindows.solid.community/profile/card#me",
			""
		);
    
		var amigo3 = new Persona(
			"Lucía",
			"https://uo265060.solid.community/profile/card#me",
			""
		);
    
		var BDAmigos2=[];
		BDAmigos2 = [...BDAmigos2, amigo1];
		BDAmigos2 = [...BDAmigos2, amigo2];
		BDAmigos2 = [...BDAmigos2, amigo3];
		return BDAmigos2;
	}

	static añadirAmigo (friendWebId) {
	}

	static compartirRuta (friendWebId, rutaUUID) {
	}

	static procesarRutasCompartidas () {
	}

	static listarRutasCompartidasConmigo () {
		let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
		let r2 = new Ruta("Ruta-2", [43.361763, -5.847995], "Bien");
		let f1 = new Persona("Diego", "123", "imagen");

		r1.addHito(new Hito("Hito-r1-1", 43.531484, -5.911818));
		r1.addHito(new Hito("Hito-r1-2", 43.528935, -5.914273));

		r2.addHito(new Hito("Hito-r2-1", 43.362182, -5.84597));
		r2.addHito(new Hito("Hito-r2-2", 43.363071, -5.846447));

		let c1=new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien");
		c1.setAutor("Lucía", "123", "imagen");
		let c2=new Comentario("Publicado: 01/4/2020 22:41:26","Genial");
		c2.setAutor("Adnane", "123", "imagen2");

		r1.addComentario(c1);
		r1.addComentario(c2);

		let fr1 = new RutaAmigo(r1,f1);
		let fr2 = new RutaAmigo(r2,f1);
    
		var BDRutas3=[];
		BDRutas3 = [...BDRutas3, fr1];
		BDRutas3 = [...BDRutas3, fr2];
		return BDRutas3;
	}

	static comentarRuta (comment, routeUUID,routeOwnerWebID) {
	}

	static obtenerComentariosRuta (rutaUUID, webId) {
		return [new Comentario("Publicado: 31/3/2020 22:41:26","Muy bien").setAutor(new Persona("Lucía", "123", "imagen1")), new Comentario("Publicado: 01/4/2020 22:41:26","Genial").setAutor(new Persona("Diego", "245", "imagen2"))];
	}

	static getPersonByWebID (webID) {
	}

	static subirFicheroARuta (file, routeUUID, routeOwnerWebID) {
	}

	static obtenerFicherosRuta (rutaUUID, webId) {
		return ["url1","url2"];
	}
	static permisosAppValidos () {
	}
}
