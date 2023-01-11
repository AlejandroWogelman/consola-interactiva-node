import "colors";
import { guardarDB, leerDb } from "./helpers/guardarArchivo.js";

import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoCheckList,
  pause1,
} from "./helpers/inquirer.js";
import { mostrarMenu, pausa } from "./helpers/mensajes.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDb = leerDb();

  if (tareasDb) {
    // Establecer tareas

    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    //Imprimir menu

    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);

        break;
      case "6":
        //Sin el await se vuelve a contruir el menu principal ya que no hay pausa
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }
    guardarDB(tareas.listadoArr);

    await pause1();
  } while (opt !== "0");
};

main();
