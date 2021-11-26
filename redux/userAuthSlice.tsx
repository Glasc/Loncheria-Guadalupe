import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CounterStateProps {
  value: number
}

// Define the initial state using that type
const initialState: CounterStateProps = {
  value: 0,
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    userData: {},
    initialized: false
  },
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
})

export const { increment, decrement, incrementByAmount } =
  userAuthSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default userAuthSlice.reducer
