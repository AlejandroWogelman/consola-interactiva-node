import { Tarea } from "./tarea.js";

export class Tareas {
  // _ privado
  _listado = {};
  //como una propiedad
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((list) => {
      const tarea = this._listado[list];
      listado.push(tarea);
    });
    //ERA LO MISMO UN OBJECT.VALUES!

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  crearTarea(descrip = "") {
    const tarea = new Tarea(descrip);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
  }

  listadoCompleto() {
    Object.values(this._listado).forEach(({ completadoEn, desc }, index) => {
      const idx = `${index + 1}.`.green;
      const status = completadoEn ? "Completado".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      //Lo agrega por referencia (objeto)
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((el) => {
      if (!ids.includes(el.id)) {
        const tarea = this._listado[el.id];
        tarea.completadoEn = null;
      }
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 1;
    this.listadoArr.forEach(({ completadoEn, desc }) => {
      const idx = `${contador}`.green;
      const status = completadoEn ? "Completado".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(`${idx} ${desc} :: ${status}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${idx} ${desc} :: ${status}`);
        }
      }
    });
  }
}
