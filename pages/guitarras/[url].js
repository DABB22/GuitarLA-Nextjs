
import { useState } from "react"
import Image from "next/future/image"
import styles from '../../styles/guitarras.module.css'
import Layout from "../../components/layout"

export default function Producto({guitarra, agregarCarrito}) {

    const [cantidad, setCantidad] = useState(0)
    const { nombre, descripcion, imagen, precio } = guitarra[0].attributes

    const handleSubmit = e => {
        e.preventDefault()
        if(cantidad < 1){
            alert('Cantidad no válida')
            return
        }
        const guitarraSeleccionadaObj = { // objeto con los datos de la guitarra seleccionada para evitar hacer consultas repetitivas
            id: guitarra[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }
        agregarCarrito(guitarraSeleccionadaObj)
    }

    return (
        <Layout
            title={`Guitarra ${nombre}`}
        >
            <div className={styles.guitarra}>
                <Image src={imagen.data.attributes.url} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>

                    <form 
                        className={styles.formulario}
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="cantidad">Cantidad</label>

                        <select 
                            id="cantidad"
                            onChange={ e => setCantidad(+e.target.value)}
                        >
                            <option value="0">--Seleccione cantidad--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <input type="submit" value='Agregar al carrito' />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

//* Esta dos fucniones se usan en conjunto cuando hacemos uso de routing dinamico para generar paginas

export async function getStaticPaths() {

    //? como en esa ocasion requerimos es identificar los paths no hacemos uso de la ruta completa de la api para la consulta ya que no es necesario la imagen para la información que requerimos.

    // const respuesta = await fetch(`${process.env.API_URL}/guitarras`)
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras`)
    const { data } = await respuesta.json()

    const paths = data.map(guitarra => ({
        params: {
            url: guitarra.attributes.url
        }
    }))

    //? se requiere siempre retornar los paths y un fallback
    return {
        paths, 
        fallback: false // te genera una pag 404 cuando está en false este fallback
    }
}

export async function getStaticProps({params: { url }}) {

//     //? aqui en esta función se van a pasar automaticamente una serie de datos lo podemos capturar lo con cualquier nombre entre los parentesis de la función y mostrarlos en consola 

    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    const { data: guitarra } = await respuesta.json()
    return {
        props: {
            guitarra
        }
    }
}

// export async function getServerSideProps({query: { url }}) {
//     const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
//     const { data: guitarra } = await respuesta.json()
//     return {
//         props: {
//             guitarra
//         }
//     }
// }