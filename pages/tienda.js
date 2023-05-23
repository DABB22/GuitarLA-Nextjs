import Layout from "../components/layout"
import Guitarra from "../components/guitarra"
import styles from '../styles/grid.module.css'

export default function Tienda({guitarras}) {

  return (
    <Layout
      title={'Tienda Virtual'}
      description="Tienda virtual, venta de guitarras, instrumentos, GuitarLA"
    >
        <main className="contenedor">
            <h1 className="heading">Nuestra Colección</h1>

            <div className={styles.grid}>
              {guitarras?.map(guitarra => (
                  <Guitarra
                      key={guitarra.id}
                      guitarra={guitarra.attributes}
                  />
              ))}
            </div>
        </main>
    </Layout>
  )
}



//* estas funciones solo se pueden usar en la carpeta de pages.
//*------------------------------------------------------------

//? Esta funcion se exporta y al exportala la hacemos disponible en este mismo componente.
// export async function getStaticProps() {
//     const respuesta = await fetch(`http://127.0.0.1:4000/api/guitarras?populate=imagen`)
//     // const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guitarras?populate=imagen`)
//     const {data: guitarras} = await respuesta.json() 
//     console.log(guitarras)
//     //* este return siempre tiene que retornar props
//     return {
//       props: {
//         guitarras //? como se nombre aqui es como lo vamos a leer en los props en el componente
//       }
//     }
// }


//? Esta funcion se exporta y al exportala la hacemos disponible en este mismo componente.
export async function getServerSideProps() {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?populate=imagen`)
    const {data: guitarras} = await respuesta.json() 
    // console.log(guitarras)
    
    //* este return siempre tiene que retornar props
    return {
      props: {
        guitarras //? como se nombre aqui es como lo vamos a leer en los props en el componente
      }
    }
}