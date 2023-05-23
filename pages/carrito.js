

import Image from "next/future/image"
import {useState, useEffect} from 'react'
import styles from '../styles/carrito.module.css'
import Layout from '../components/layout'

function Carrito({carrito, actualizarCantidad, eliminarProducto}) {

    const [total, setTotal] = useState(0)

    useEffect(()=>{
      const calcularTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0)
      setTotal(calcularTotal)
    }, [carrito])
    
  return (
    <Layout title='Carrito de Compras'>
        <main>
            
            <h1 className='heading'>Carrito</h1>

            <div className={styles.contenido}>
                <div className={styles.carrito}>
                    
                    <h2>Artículos</h2>

                    {carrito.length === 0 ? 'Carrito vacío': (
                        carrito.map( producto => (

                            <div key={producto.id} className={styles.producto}>

                                <div>
                                    <Image width={300} height={400} src={producto.imagen} 
                                        alt={`imagen ${producto.nombre}`}
                                    />
                                </div>

                                <div>
                                    <p className={styles.nombre}>{producto.nombre}</p>
                                    <div className={styles.cantidad}>
                                    <p>Cantidad: </p>
                                    
                                    <select
                                        className={styles.select}
                                        onChange={e => actualizarCantidad({
                                        id: producto.id,
                                        cantidad: e.target.value
                                        })
                                        }
                                        value={producto.cantidad}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    </div>

                                    <p className={styles.precio}>$<span>{producto.precio}</span></p>
                                    <p className={styles.subtotal}>SubTotal: <span>{producto.cantidad * producto.precio}</span></p>
                                </div>
                                <button
                                    className={styles.eliminar}
                                    onClick={() => eliminarProducto(producto.id)}
                                >X</button>
                            </div>
                        ))
                    )}

                </div>  

                <aside className={styles.resumen}>
                    <h3>Resumen del Pedido</h3>
                    <p>Total a Pagar: {total}</p>
                </aside>

            </div>
        </main>
    </Layout>
  )
}

export default Carrito