const xSection = document.querySelector( '.x' ),
      ySection = document.querySelector( '.y' );

/**
 * @function - Función que expande la tabla en caso de ser necesario, para poder ingresar hasta 4 registros 
 */
export const expandTable = () => {
    const div = document.createElement( 'div' );
    div.innerHTML = '<input type="number" class="x4" placeholder="Valor x4">';
    xSection.append( div.firstElementChild );
    div.innerHTML = '<input type="number" class="y4" placeholder="Valor y4">';
    ySection.append( div.firstElementChild );
};

/**
 * @function - Función que reduce la tabla en caso de ser necesario, para poder ingresar al menos 3 registros 
 */
export const reduceTable = () => {
    xSection.lastChild.remove();
    ySection.lastChild.remove();
};
