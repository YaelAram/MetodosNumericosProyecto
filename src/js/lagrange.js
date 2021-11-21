/**
 * @function - Función que retorna el termino de grado tres de un ejercicio con cuatro registros o el termino de grado dos
 * en un ejercicio con tres registros
 * @param { number[] } datos - Tabla de datos
 * @param { number } tam - Numero de registros en la tabla (3 o 4)
 * @returns { number } - Coeficiente del termino cubico o cuadratico
 */
export const term_cuadrado_cubo = ( datos, tam ) => {
    let total = 0.0,
        subtotales = [];
    for( let i = 0 ; i<tam ; i++ ){
        let subtotal = datos[ 1 ][ i ],
            semejante = datos[ 0 ][ i ];
        for( let j = 0 ; j<tam ; j++ )
            if( i != j ) subtotal *= ( ( semejante - datos[ 0 ][ j ] ) ** -1 );
        subtotales.push( subtotal );
        total += subtotal;
    }
    return total;
};

/**
 * @function - Función que retorna el termino de grado dos de un ejercicio con cuatro registros o el termino de grado uno
 * en un ejercicio con tres registros
 * @param { number[] } datos - Tabla de datos
 * @param { number } tam - Numero de registros en la tabla (3 o 4)
 * @returns { number } - Coeficiente del termino cuadrado o lineal
 */
export const term_lineal_cuadrado = ( datos, tam ) => {
    let total = 0.0;
    for( let i = 0 ; i<tam ; i++ ){
        let subtotal = datos[ 1 ][ i ],
            semejante = datos[ 0 ][ i ],
            b0_c0 = 0.0;
        for( let j = 0 ; j<tam ; j++ ){
            if( i != j ){
                b0_c0 += ( -datos[ 0 ][ j ] );
                subtotal *= ( ( semejante - datos[ 0 ][ j ] ) ** -1 );
            }
        }
        total += ( subtotal * b0_c0 );
    }        
    return total;
};

/**
 * @function - Función que retorna el termino de grado uno de un ejercicio con cuatro registros
 * @param { number[] } datos - Tabla de datos
 * @param { number } tam - Numero de registros en la tabla (4)
 * @returns { number } - Coeficiente del termino lineal
 */
export const lineal = ( datos, tam ) => {
    let total = 0.0;
    for( let i = 0 ; i<tam ; i++ ){
        let subtotal = datos[ 1 ][ i ], 
            semejante = datos[ 0 ][ i ],
            sub = [];
        for( let j = 0 ; j<tam ; j++ ){
            if( i != j ){
                sub.push( datos[ 0 ][ j ] );
                subtotal *= ( ( semejante - datos[ 0 ][ j ] ) ** -1 );
            }
        }
        total += (subtotal * delta(sub));
    }
    return total;
};

/**
 * @function - Función utilizada por función lineal para obtener parte de su resultado
 * @param { number[] } sub 
 * @returns { number }
 */
const delta = ( sub ) => ( sub[ 0 ] * sub[ 1 ] ) + ( sub[ 2 ] * ( sub[ 0 ] + sub[ 1 ] ) );

/**
 * @function - Función que retorna el termino de grado cero de un ejercicio con cuatro registros o tres registros
 * @param { number[] } datos - Tabla de datos
 * @param { number } tam - Numero de registros en la tabla (3 o 4)
 * @returns { number } - Coeficiente del termino independiente
 */
export const constante = ( datos, tam ) => {
    let total = 0.0;
    for( let i = 0 ; i<tam ; i++ ){
        let subtotal = datos[ 1 ][ i ],
            semejante = datos[ 0 ][ i ];
        for( let j = 0 ; j<tam ; j++ ){
            if( i != j ){
                subtotal *= ( -datos[ 0 ][ j ] );
                subtotal *= ( ( semejante - datos[ 0 ][ j ] ) ** -1);
            }
        }
        total += subtotal;
    }
    return total;
};
