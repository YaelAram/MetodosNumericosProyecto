/**
 * @class - Clase que permite evaluar y obtner String formateado de un polinomio de grado n
 */
export class Polinomio{
    /**
     * @function - Constructor de la clase donde se inicializan los coeficientes de cada termino
     * @param { number[] } coeficientes - Colección de coeficientes
     */
    constructor( coeficientes ){
        this.coeficientes = coeficientes;
        if( Math.abs( this.coeficientes[ 0 ] ) < 1e-6 )
            this.coeficientes.shift()
    }

    /**
     * @function - Función que nos permite evaluar el polinomio de grado n a partir del valor recibido
     * @param { number } x - Valor con el cual se evalua el polinomio
     * @returns { number } - Resultado de la evaluación
     */
    evaluar( x ){
        let potencia = ( this.coeficientes.length - 1 ),
            resultado = 0.0;
        for( let i  = 0 ; i<this.coeficientes.length ; i++ )
            resultado += ( this.coeficientes[ i ] * ( x ** ( potencia - i ) ) );
        return resultado;
    }

    /**
     * @function - Nos permite representar el polinomio como en una formula matematica
     * @returns { string } - Representacion escrita de un polinomio
     */
    toString(){
        let potencia = ( this.coeficientes.length - 1 ),
            resultado = '',
            super_indices = [ '²', '³', '⁴' ];
        for ( let index  = 0 ; index<this.coeficientes.length ; index++ ){
            let coeficiente = this.coeficientes[ index ];
            if( coeficiente != 0.0 ){
                let signo = ( index == 0 && coeficiente > 0 ) ? '' : ( coeficiente > 0 ) ? '+' : '-',
                    constante = ( Math.abs( coeficiente ) != 1.0 ) ? Math.abs( coeficiente ) : '',
                    incognita = ( ( potencia - index ) > 1 ) ? `x${ super_indices[ potencia - index - 2 ] }` : 
                                ( ( potencia - index ) == 1 ) ? 'x' : '';
                resultado += `${ signo } ${ constante }${ incognita } `;
            }
        }
        return resultado;
    }
}
