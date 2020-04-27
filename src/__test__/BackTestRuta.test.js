import POD_Fake from './__mocks__/POD_Fake.js'
import Ruta from "../front-end/model/Ruta";

let r1 = new Ruta("Ruta-1", [43.534401, -5.909476], "Genial");
test("Listar rutas", () => {
    POD_Fake.añadirRuta(r1); 
  });
  