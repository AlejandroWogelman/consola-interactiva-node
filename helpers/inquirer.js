import inquirer from "inquirer";
import "colors";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".green} Completar tarea(s)`,
      },
      { value: "6", name: `${"6".green} Borrar tarea` },
      {
        value: "0",
        name: `${"0".green} Salir`,
      },
    ],
  },
];

export const pause1 = async () => {
  console.log("\n");
  const resp = await inquirer.prompt([
    {
      type: "input",
      name: "continuar",
      message: `Presione ${"ENTER".green} para coontinuar `,
    },
  ]);

  return resp;
};

export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

export const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("= Seleccione una opción =".white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

export const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map(({ id, desc }, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: id,
      name: `${idx} ${desc}`,
    };
  });
  choices.unshift({
    value: 0,
    name: "0. ".green + "Salir",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

export const confirmar = async (mensaje) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: mensaje,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map(({ id, desc, completadoEn }, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: id,
      name: `${idx} ${desc}`,
      checked: completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
