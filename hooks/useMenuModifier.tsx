import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import db from '../firebase/firebaseConfig'
import { setMenuAdminSelectionId } from '../redux/recipeSlice'
import { ProductTypes } from '../shared/types'

interface useMenuModifierProps {
  uid: string
}

export const useMenuModifier = () => {
  const [initialDropdownValue, setInitialDropdownValue] = useState()
  const [dropDownId, setDropDownId] = useState()

  const [recipes, setRecipes] = useState()

  //recipes
  useEffect(() => {
    if (recipes !== undefined) return
    ;(async () => {
      const docRef = collection(db, 'recipes')
      const docs = await getDocs(docRef)
      let recipes: any = []

      docs.forEach((doc) => {
        const { sectionName, variants, ingredients } = doc.data()

        recipes.push({ sectionName, variants, ingredients, id: doc.id })
      })
      setRecipes(recipes)
    })()
  }, [recipes])

  // initialDropdownValue
  useEffect(() => {
    if (initialDropdownValue) return
    ;(async () => {
      const collectionRef = collection(db, 'recipes')
      const collectionDocs = await getDocs(collectionRef)
      const [first] = collectionDocs.docs
      const initialSelection = first.data().sectionName
      console.log(first.data().id)
      setDropDownId(first.data().id)
      setMenuAdminSelectionId(dropDownId)
      setInitialDropdownValue(initialSelection)
    })()
  }, [initialDropdownValue, dropDownId])

  return {
    initialDropdownValue,
    recipes,
    setInitialDropdownValue,
    setRecipes,
    dropDownId,
    setDropDownId,
  }
}
