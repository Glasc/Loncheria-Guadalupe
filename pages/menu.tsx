import { NextPage, InferGetStaticPropsType } from 'next'
import { Navbar } from '../components/Navbar/Navbar'
import styles from '../styles/Menu.module.scss'
import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import db from '../firebase/firebaseConfig'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from '@firebase/firestore'

import { GetStaticProps } from 'next'
import { useAppDispatch } from '../redux/hooks'
import {
  addNewRecipe,
  deleteRecipe,
  deleteVariant,
} from '../redux/recipeSlice'

// TODO: Navbar should change if user is logged in

interface ProductTypes {
  sectionName: string
  variants: {
    name: string
    price: number
  }[]
}

const recipeList = [
  { sectionName: 'Torta', variants: [{ name: 'Pierna', price: '45' }] },
]

const Menu: NextPage = ({
      recipes: recipeList,
    }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isEditing, setIsEditing] = useState()

  const dispatch = useAppDispatch()

  useEffect(() => {}, [])

  return (
    <Layout>
      <Navbar />
      <div className={styles.menuContent}>
        <h2 className={styles.headline}>Menú</h2>
        {recipeList.map((currRecipe: any, idx: any) => {
          const { sectionName, variants } = currRecipe
          return (
            <Product
              sectionName={sectionName}
              variants={variants}
              key={idx}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const Product: React.FC<ProductTypes> = ({ sectionName, variants }) => {
  return (
    <div className={styles.section}>
      <h2>{sectionName}</h2>
      {variants.map((currVariants, idx) => {
        const { name, price } = currVariants
        return (
          <div className={styles.sectionElements} key={idx}>
            <p className={styles.product}>{name}</p>
            <p className={styles.price}>${price}.00 MXN</p>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getDocs(collection(db, 'recipes'))
  // const recipes = data.docs[0].data()

  const recipes = data.docs.map((doc) => {
    return {
      id: doc.id,
      sectionName: doc.data().sectionName,
      variants: doc.data().variants,
    }
  })

  if (!recipes) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recipes,
    },
  }
}

export default Menu
