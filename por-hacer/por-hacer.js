
const fs = require('fs');

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new ('No se pudo grabar', err);
      });

}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');
        
    } catch (error) {
        
        listadoPorHacer = [];

    }
    
}

let listadoPorHacer = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = (completado = 'todos') => {

    cargarDB();

    let listadoPorHacerNuevo = [];

    switch(completado) {
        case 'todos':
            return listadoPorHacer;
        case 'completado':
            listadoPorHacerNuevo = listadoPorHacer.filter(tarea => tarea.completado === true);
            return listadoPorHacerNuevo;
        case 'nocompletado':
            listadoPorHacerNuevo = listadoPorHacer.filter(tarea => tarea.completado === false);
            return listadoPorHacerNuevo;
    }

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if ( index >= 0 ) {

        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;

    } else {

       return false;

    }

}

const borrar = (descripcion) => {

    cargarDB();

    let listadoPorHacerNuevo = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);

    if ( listadoPorHacerNuevo.length !== listadoPorHacer.length ) {
        
        listadoPorHacer = listadoPorHacerNuevo;
        guardarDB();

        return true;

    } else {

        return false;

    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}