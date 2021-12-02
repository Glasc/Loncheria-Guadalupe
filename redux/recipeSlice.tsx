import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import db from '../firebase/firebaseConfig'
import { ProductTypes } from '../shared/types'
import type { RootState } from './store'
import { setDoc } from '@firebase/firestore'

export const addNewRecipe = createAsyncThunk(
  'recipe/addRecipe',
  // async (userId, thunkAPI) => {
  //   const response = await userAPI.fetchById(userId)
  //   return response.data
  // }
  async (payload: ProductTypes, thunkAPI) => {
    const id = new Date().valueOf().toString()

    await setDoc(doc(db, 'recipes', id), {
      ...payload,
      id,
    })
  }
)

export const modifyRecipe = createAsyncThunk(
  'recipe/modifyRecipe',
  async (payload: { id: string; newRecipeValue: string }) => {
    const docRef = doc(db, 'recipes', `${payload.id}`)

    return await updateDoc(docRef, {
      sectionName: payload.newRecipeValue,
    })
  }
)

export const deleteRecipe = createAsyncThunk(
  'recipe/deleteRecipe',
  async (payload: { id: string }, thunkAPI) => {
    const docRef = await deleteDoc(doc(db, 'recipes', payload.id))
    return docRef
  }
)

export const addVariant = createAsyncThunk(
  'recipe/addVariant',
  async (
    payload: { id: string; variantName: string; price: number },
    thunkAPI
  ) => {
    const docRef = doc(db, 'recipes', payload.id)

    const res = await getDoc(docRef)

    const data: [] = res.data()!.variants

    await updateDoc(docRef, {
      variants: [
        ...data,
        { name: payload.variantName, price: payload.price },
      ],
    })
  }
)

export const addIngredient = createAsyncThunk(
  'recipe/addIngredient',
  async (payload: { id: string; ingredientName: string }, thunkAPI) => {
    const docRef = doc(db, 'recipes', payload.id)

    const res = await getDoc(docRef)

    const data: [] = res.data()!.ingredients

    await updateDoc(docRef, {
      ingredients: [...data, payload.ingredientName],
    })
  }
)

export const modifyVariant = createAsyncThunk(
  'recipe/modifyVariant',
  async (payload: {
    id: string
    variantName: string
    newVariantName: string
    newVariantPrice: number
  }) => {
    const docRef = doc(db, 'recipes', `${payload.id}`)

    const variantList: { name: string; price: number }[] = await (
      await getDoc(docRef)
    ).data()!.variants

    const variantTargetId: number = variantList.findIndex(
      (currTarget) => currTarget.name === payload.variantName
    )

    variantList[variantTargetId] = {
      name: payload.newVariantName,
      price: payload.newVariantPrice,
    }

    return await updateDoc(docRef, {
      variants: variantList,
    })
  }
)

export const deleteVariant = createAsyncThunk(
  'recipe/deleteVariant',
  async (payload: { id: string; fieldName: string }, thunkAPI) => {
    const docRef = doc(db, 'recipes', payload.id)
    const docSnap = await getDoc(docRef)

    const getPropertyIndex = docSnap
      .data()!
      .variants.findIndex((curr: any) => {
        if (curr.name === payload.fieldName) return true
      })

    await updateDoc(docRef, {
      variants: docSnap
        .data()!
        .variants.filter((curr: any) => curr.name !== payload.fieldName),
    })

    return ''
  }
)

export const getRecipes = createAsyncThunk(
  'auth/getRecipes',
  async (payload, thunkAPI) => {
    const docRef = collection(db, 'recipes')

    return await getDocs(docRef)
  }
)

// Define a type for the slice state
interface recipeState {
  value: number
}

// Define the initial state using that type


export const recipeSlice = createSlice({
  name: 'recipe',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    menuAdminSelectionId: "",
  },
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMenuAdminSelectionId: (state, action: PayloadAction<any>) => {
      state.menuAdminSelectionId = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(modifyRecipe.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('Successfully modified')
    })
    builder.addCase(modifyRecipe.rejected, (state, action) => {
      // Add user to the state array
      console.log('Something went bad modifying the recipe')
    })
    builder.addCase(addNewRecipe.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('Successful')
    })
    builder.addCase(addNewRecipe.rejected, (state, action) => {
      // Add user to the state array
      console.log(':(')
    })
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('Successful')
    })
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      // Add user to the state array
      console.log(':(')
    })
    builder.addCase(getRecipes.rejected, (state, action) => {
      // Add user to the state array
      const docs: any = action.payload
    })
  },
})

export const { setMenuAdminSelectionId } = recipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMenuAdminSelectionId = (state: RootState) =>
  state.recipe.menuAdminSelectionId

export default recipeSlice.reducer
