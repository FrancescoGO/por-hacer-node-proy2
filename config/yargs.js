
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const parametrosListar = {
   default: 'todos',
   alias: 'p',
   desc: 'Parámetro de búsqueda: completado, nocompletado, todos'
}

const argv = require('yargs')
             .command('crear','Crear un elemento por hacer', {
                descripcion
             })
             .command('actualizar','Actualiza el estado completado de una tarea', {
                descripcion,
                completado
             })
             .command('borrar','Elimina una tarea', {
                descripcion
             })
             .command('listar','Listar todas las tareas o según parámetros', {
               parametros: parametrosListar
             })
             .help()
             .argv;

module.exports = {
    argv
}