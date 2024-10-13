import CarritoContext from '../context/CarritoContext'
import { useContext, useState, useEffect } from 'react'
// Props validation
import PropTypes from 'prop-types'

const ItemCarrito = ({ producto, calcularTotal }) => {
    const { eliminarProductoDelCarritoContext, ModificarCantidadDeProducto } = useContext(CarritoContext)
    const [cantidad, setCantidad] = useState(producto.cantidad)

    useEffect(() => {
        setCantidad(producto.cantidad);
    }, [producto.cantidad]);

    const handleEliminar = (id) => {
        eliminarProductoDelCarritoContext(id)
        calcularTotal()
    }

    const handleModificarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad > 0) {
            ModificarCantidadDeProducto(id, nuevaCantidad)
            setCantidad(nuevaCantidad)
            calcularTotal()
        }
    }

    return (
        <tr>
            <td>
                <img src={producto.foto} alt={producto.nombre} width="50px" />
            </td>
            <td>{producto.nombre}</td>
            <td>{cantidad}</td>
            <td>{producto.precio}</td>
            <td>
                <div className='acciones'>
                    <div className='modificar-cantidad'>
                        <button className="btn-modificar dec" onClick={() => handleModificarCantidad(producto.id, cantidad - 1)}>-</button>
                        <p>{cantidad}</p>
                        <button className="btn-modificar inc" onClick={() => handleModificarCantidad(producto.id, cantidad + 1)}>+</button>

                    </div>

                    <button className="btn-eliminar" onClick={() => handleEliminar(producto.id)}>
                        <img src="/iconos/eliminar.svg" alt="Boton_eliminar" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

ItemCarrito.propTypes = {
    producto: PropTypes.object.isRequired,
    calcularTotal: PropTypes.func.isRequired
}

export default ItemCarrito
