import './css/index.css';
import { expandTable, reduceTable } from './js/html-builder.js';
import { term_cuadrado_cubo, term_lineal_cuadrado, lineal, constante } from './js/lagrange.js';
import { Polinomio } from './js/polinomio.js';

let numero_datos = 3,
    valores = document.querySelector( '.valores' ),
    polinomio = document.querySelector( '.polinomio' ),
    consultas = document.querySelector( '.consultas' );

/**
 * @function - Recolecta los datos ingresados por el usuario en la tabla de registros
 * @returns { number[] } - Matriz de datos
 */
const getData = () => {
    const xFields = document.querySelector( '.x' ).childNodes,
          yFields = document.querySelector( '.y' ).childNodes;
    let datos = [ [], [] ];
    for( const field of xFields ) if( field.nodeName === 'INPUT' ) datos[ 0 ].push( +( field.value ) );
    for( const field of yFields ) if( field.nodeName === 'INPUT' ) datos[ 1 ].push( +( field.value ) );
    return datos;
};

/**
 * @function - Recolecta los datos ingresados por el usuario en la sección de consultas
 * @returns { number[] } - Vector de consultas
 */
const getValues = () => valores.value.split( ' ' ).map( element => +( element ) );

/**
 * @function - Función que internamente utiliza las funciones getValues y getData, posteriormente hace uso de la clase
 * Polinomio y los metodos de Lagrange para obtener el Polinomio resultado asi como el valor de las consultas
 */
const computeResult = () => {
    let datos = getData(),
        fun = undefined;
    const numberStyle = new Intl.NumberFormat( 'es-MX', { style: 'decimal', maximumFractionDigits: 4 } );
    if( numero_datos === 3 ) 
        fun = new Polinomio( [ term_cuadrado_cubo( datos, numero_datos ), term_lineal_cuadrado( datos, numero_datos ), constante( datos, numero_datos ) ] )
    else
        fun = new Polinomio( [ term_cuadrado_cubo( datos, numero_datos ), term_lineal_cuadrado( datos, numero_datos ), lineal( datos, numero_datos ), constante( datos, numero_datos ) ] )
    polinomio.innerText = 'Función: ' + fun.toString();
    if( valores.value.length > 0 ){
        let resultado = 'Consultas: ';
        for( const consulta of getValues() ) resultado += numberStyle.format( fun.evaluar( consulta ) ) + '  ';
        consultas.innerText = resultado;
    }
    else consultas.innerText = '';
};

/**
 * @function - Limpia la sección de consultas, tabla de registros y la seccion de resultados
 */
const cleanFields = () => {
    const fields = document.querySelectorAll( 'input[type="number"]' );
    for (const field of fields) field.value = '';
    valores.value = '';
    polinomio.innerText = 'Función:';
    consultas.innerText = 'Consultas:';
};

/**
 * @function - Al cambiar el elemento select de valor este método reajusta la longitud de la tabla de registros
 * @param { event } changeEvent - Argumento enviado por el evento 'change'
 */
const createTable = ( changeEvent ) => {
    numero_datos = +( changeEvent.target.value );
    if( numero_datos === 3 ) reduceTable();
    else expandTable();
};

document.querySelector( '.mode' ).addEventListener( 'change', createTable );
document.querySelector( '.clean' ).addEventListener( 'click', cleanFields );
document.querySelector( '.compute' ).addEventListener( 'click', computeResult );
