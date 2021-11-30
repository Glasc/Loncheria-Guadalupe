import { doc, getDoc, updateDoc } from '@firebase/firestore'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import db from '../firebase/firebaseConfig'
import { CartItems } from '../shared/types'
import type { RootState } from './store'

// Define a type for the slice state

export const getOrders = createAsyncThunk(
  'auth/getOrders',
  async (payload: { uid: string }, thunkAPI) => {
    const docRef = doc(db, 'users', payload.uid)
    return await (await getDoc(docRef)).data()!.pedidos
  }
)

export const getCartItems = createAsyncThunk(
  'auth/getCartItems',
  async (payload: { uid: string }, thunkAPI) => {
    const docRef = doc(db, 'users', payload.uid)
    return await (await getDoc(docRef)).data()!.carrito
  }
)
export const addCartItem = createAsyncThunk(
  'auth/addCartItem',
  async (
    payload: { newCartItem: CartItems | []; uid: string },
    thunkAPI
  ) => {
    const docRef = doc(db, 'users', payload.uid)
    const prevData = await (await getDoc(docRef)).data()!.carrito

    return await updateDoc(docRef, {
      carrito: [...prevData, payload.newCartItem],
    })
  }
)

export const getCartTotal = createAsyncThunk(
  'auth/getCartTotal',
  async (payload: { uid: string }, thunkAPI) => {
    const docRef = doc(db, 'users', payload.uid)
    return await (await getDoc(docRef)).data()!.carrito
  }
)

interface CounterStateProps {
  value: any
  uid: string | null
  orders: []
  cartItems: []
  cartTotal: number
  address: string
}

const initialState: CounterStateProps = {
  value: '',
  uid: null,
  orders: [],
  cartItems: [],
  cartTotal: 0,
  address: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload
    },
    setUserID: (state, action) => {
      state.uid = action.payload
    },
    setUserAddress: (state, action) => {
      state.address = action.payload
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getOrders.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('Successful')
      state.orders = action.payload
    }),
      builder.addCase(getCartItems.fulfilled, (state, action) => {
        // Add user to the state array
        state.cartItems = action.payload
      }),
      builder.addCase(
        getCartTotal.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          // Add user to the state array
          state.cartTotal = action.payload.reduce((acc, currElement) => {
            return acc + currElement.price
          }, 0)
        }
      )
  },
})

export const { saveUser, setUserID, setUserAddress } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const selectUID = (state: RootState) => state.auth.uid
export const selectCartItems = (state: RootState) => state.auth.cartItems
export const selectCartTotal = (state: RootState) => state.auth.cartTotal
export const selectUserAddress = (state: RootState) => state.auth.address
export const selectFirstCartListName = (state: RootState) =>
  state.auth.cartItems

export default authSlice.reducer
