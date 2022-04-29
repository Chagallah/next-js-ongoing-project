import React, { useState, useEffect } from 'react';

function Qty ( { min = 1, max = Infinity, onChangeQty, value = 1 } ) {
    const [ count, setCount ] = useState( value );

    useEffect( () => {
        value !== count && setCount( value );
    }, [ value ] )

    useEffect( () => {
        onChangeQty && onChangeQty( count );
    }, [ count ] )

    function increase () {
        setCount( Math.min( max, count + 1 ) );
    }

    function decrease () {
        setCount( Math.max( 1, count - 1 ) );
    }

    function changeCount ( e ) {
        let value = e.target.value ? parseInt( e.target.value ) : min;
        setCount( value < min ? min : value > max ? max : value );
    }

    return (
        <div className="product-single-qty">
            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                <span className="input-group-btn input-group-prepend">
                    <button className="btn btn-outline btn-down-icon bootstrap-touchspin-down" onClick={ decrease } type="button"></button>
                </span>
                <input className="horizontal-quantity form-control" type="number" min="1" max={ max } value={ count } onChange={ changeCount } />
                <span className="input-group-btn input-group-append">
                    <button className="btn btn-outline btn-up-icon bootstrap-touchspin-up" onClick={ increase } type="button"></button>
                </span>
            </div>
        </div>
    )
}

export default Qty;