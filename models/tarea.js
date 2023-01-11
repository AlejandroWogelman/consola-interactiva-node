import { v4 as uuidv4 } from "uuid";

export class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.desc = desc;
    this.id = uuidv4();
  }
}
