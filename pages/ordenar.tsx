import React, { useEffect, useState } from 'react'
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import styles from '../styles/Ordenar.module.scss'
import { Layout } from '../components/Layout'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { Select } from '@chakra-ui/select'
import { LightMode } from '@chakra-ui/color-mode'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Box, Flex, Grid, Stack } from '@chakra-ui/layout'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from '@firebase/firestore'
import db, { auth } from '../firebase/firebaseConfig'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { onAuthStateChanged } from '@firebase/auth'

import {
  getCartItems,
  selectUID,
  selectCartItems,
  setUserID,
  addCartItem,
  getCartTotal,
  selectCartTotal,
} from '../redux/authSlice'
import { CartItems, ProductTypes } from '../shared/types'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useOrder } from '../hooks/useOrder'
import { useProfile } from '../hooks/useProfile'
import { useCart } from '../hooks/useCart'

// addCartItem({
//   newCartItem: {
//     ingredients: ['Lechuga, Jitomate'],
//     sectionName: 'Tortas',
//     variantName: 'Panela',
//     quantity: 3,
//     id: new Date().valueOf(),
//   },
//   uid: UID,
// })

interface OrdenarProps {}

const Ordenar: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ recipes, initialSelection }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const dispatch = useAppDispatch()

    const [currSelection, setCurrSelection] = useState<string>(initialSelection)
    const [ingredients, setIngredients] = useState([])
    const [variants, setVariants] = useState([])
    const UID: any = useAppSelector(selectUID)
    const cartItems: CartItems | [] = useAppSelector(selectCartItems)
    const [quantityValue, setQuantityValue] = useState<number>(1)
    const [sectionValue, setSectionValue] = useState<string>('')
    const total = useAppSelector(selectCartTotal)
    const { setOrder, isLoading } = useOrder({ uid: UID })
    const { cartItemList }: any = useCart({ uid: UID })
    const { initialInputs, getInitialInputs } = useProfile({ uid: UID })

    const [checkedItems, setCheckedItems] = useState<
      { currIngredient: string; checked: boolean }[]
    >([{ currIngredient: '', checked: false }])

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUserID(user.uid))
        }
      })
      if (initialInputs) return
      getInitialInputs()
    }, [dispatch, getInitialInputs, initialInputs])

    useEffect(() => {
      ;(async () => {
        if (cartItems.length > 0) {
          const itemm: any = cartItems.filter(
            (currItem: any, idx: number) => {
              if (idx === 0) {
                return currItem
              }
            }
          )
          await dispatch(getCartTotal({ uid: UID }))
          // TODO:
          // setCurrSelection(cartItemList[0].sectionName)
        }
      })()
    }, [cartItems, dispatch, UID])

    useEffect(() => {
      if (!currSelection) return
      setIngredients(
        recipes.find(
          (currRecipe: any) => currRecipe.sectionName === currSelection
        ).ingredients
      )
    }, [currSelection])

    useEffect(() => {
      if (!currSelection) return
      const variantTemp: any | undefined = recipes
        .find(
          (currRecipe: any) => currRecipe.sectionName === currSelection
        )
        .variants.map((currVariant: any) => {
          return currVariant.name
        })
      setVariants(variantTemp)
    }, [currSelection])

    // const [cartItems, setCartItems] = useState([])

    useEffect(() => {
      if (!ingredients) return

      setCheckedItems(
        ingredients.map((currIngredient) => {
          return {
            currIngredient,
            checked: true,
          }
        })
      )
    }, [ingredients])

    useEffect(() => {
      if (!UID) return
      dispatch(getCartItems({ uid: UID }))
    }, [UID, dispatch])

    const handleAddToCart = async () => {
      if (!currSelection || !UID) return

      const cartSectionSelection = currSelection
      const cartVariantSelection = sectionValue

      const docRef = collection(db, 'recipes')
      const docs: any = await getDocs(docRef)

      let recipesArr: {}[] = []

      docs.forEach((doc: any) => {
        const { sectionName, variants, ingredients } = doc.data()
        recipesArr.push(doc.data())
      })

      recipesArr = recipesArr.filter((currRecipe: any) => {
        const cartRecipe = cartSectionSelection.toUpperCase()
        const menuRecipe = currRecipe.sectionName.toUpperCase()

        if (menuRecipe !== cartRecipe) return false
        return true
      })

      let result = 0

      recipesArr.forEach((element: any) => {
        element.variants.map((curr: any) => {
          if (curr.name === cartVariantSelection) {
            result = curr.price
          }
        })
      })

      const newCartItem: CartItems = {
        ingredients: checkedItems
          .filter((currItem) => currItem.checked === true)
          .map((currIngredientItem) => {
            return currIngredientItem.currIngredient
          }),
        sectionName: currSelection,
        variantName: sectionValue,
        quantity: quantityValue,
        id: new Date().valueOf(),
        price: result * quantityValue,
      }

      if (sectionValue === '') return

      await dispatch(addCartItem({ newCartItem, uid: UID }))
      dispatch(getCartItems({ uid: UID }))
    }

    return (
      <Layout>
        <NavbarAuth />
        <main className={styles.main}>
          <LightMode>
            <div className={styles.selectionAside}>
              <Select
                bg='white'
                borderColor='white'
                color='black'
                mb={5}
                fontSize='lg'
                isRequired
                title={'selector'}
                onClick={(e: any) => {
                  setCurrSelection(e.target.value)
                }}
              >
                {recipes.map(
                  (
                    currRecipe: { sectionName: string; id: string },
                    idx: number
                  ) => {
                    return (
                      <option
                        value={currRecipe.sectionName}
                        key={currRecipe.id}
                      >
                        {currRecipe.sectionName}
                      </option>
                    )
                  }
                )}
              </Select>

              <section className={styles.category}>
                {currSelection && <h2>Elige tu {currSelection}</h2>}
                <RadioGroup
                  defaultValue='1'
                  my={4}
                  fontSize={9}
                  onChange={(value) => setSectionValue(value)}
                >
                  <Stack spacing={3} direction='column' fontSize='20px'>
                    {variants.map((currVariant: string, idx: number) => {
                      return (
                        <Radio
                          colorScheme='green'
                          value={currVariant}
                          name='dishes'
                          key={idx}
                        >
                          {currVariant}
                        </Radio>
                      )
                    })}
                  </Stack>
                </RadioGroup>
              </section>

              <section className={styles.category}>
                <h2>Ingredientes</h2>
                <Stack spacing={3} direction='column' my={4}>
                  {ingredients.map((currIngredient: any, idx: number) => {
                    return (
                      <Checkbox
                        colorScheme='green'
                        defaultIsChecked
                        key={idx + 1}
                        // isChecked={checkedItems[idx].checked}
                        onChange={(e: any) =>
                          setCheckedItems(
                            [...checkedItems].map((item) => {
                              if (item.currIngredient === currIngredient) {
                                item.checked = e.target.checked
                              }
                              return item
                            }) || null
                          )
                        }
                      >
                        {currIngredient}
                      </Checkbox>
                    )
                  })}
                </Stack>
              </section>
              <section className={styles.category}>
                <Flex alignItems='center' gridGap={3} userSelect='none'>
                  <h2 style={{ marginRight: '0.5em' }}>Cantidad:</h2>
                  <MinusIcon
                    bg='white'
                    color='black'
                    borderRadius='15px'
                    padding={1}
                    h={8}
                    w={8}
                    cursor='pointer'
                    onClick={() =>
                      setQuantityValue((prev) =>
                        prev > 1 ? prev - 1 : prev
                      )
                    }
                  />

                  <div
                    style={{
                      width: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <h2>{quantityValue}</h2>
                  </div>
                  <AddIcon
                    bg='white'
                    color='black'
                    borderRadius='15px'
                    padding={1}
                    h={8}
                    w={8}
                    cursor='pointer'
                    onClick={() => setQuantityValue((prev) => prev + 1)}
                  />
                </Flex>
              </section>
              <Button
                onClick={handleAddToCart}
                color='white'
                colorScheme='blue'
                variant='solid'
                size='md'
                w='100%'
                my={5}
              >
                Añadir al carrito
              </Button>
            </div>
          </LightMode>

          <section className={styles.cart}>
            {cartItems &&
              cartItems.map(
                (
                  currItem: {
                    ingredients: string[]
                    sectionName: string
                    variantName: string
                    quantity: number
                    id: number
                  },
                  idx: number
                ) => {
                  const {
                    ingredients,
                    sectionName,
                    variantName,
                    quantity,
                    id,
                  } = currItem
                  return (
                    <div className={styles.description} key={id}>
                      {quantity > 1 ? (
                        <p className={styles.descriptionTitle}>
                          {quantity} {sectionName}s ({variantName})
                        </p>
                      ) : (
                        <p className={styles.descriptionTitle}>
                          {quantity} {sectionName} ({variantName})
                        </p>
                      )}
                      <p className={styles.descriptionDetails}>
                        {ingredients.map(
                          (currIngredient: string, idx: number) => {
                            if (idx === ingredients.length - 1) {
                              return (
                                <span key={idx}>{currIngredient}</span>
                              )
                            }
                            return (
                              <span key={idx}>{currIngredient}, </span>
                            )
                          }
                        )}
                      </p>
                    </div>
                  )
                }
              )}
            <hr />
            <h2>Total: ${total} MXN</h2>
            <Button
              color='white'
              colorScheme='brand'
              variant='solid'
              size='lg'
              w='100%'
              onClick={async () => {
                await setOrder({ cartItems, total })
                await dispatch(getCartItems({ uid: UID }))
                await dispatch(getCartTotal({ uid: UID }))
              }}
            >
              Aceptar
            </Button>
          </section>
        </main>
      </Layout>
    )
  }

export const getStaticProps: GetStaticProps = async () => {
  const docRef = collection(db, 'recipes')
  const docs = await getDocs(docRef)
  let recipes: ProductTypes[] = []
  let variants: any = []
  let ingredients: any = []

  docs.forEach((doc) => {
    const { sectionName, variants, ingredients } = doc.data()

    recipes.push({ sectionName, variants, ingredients, id: doc.id })
  })

  if (recipes.length < 1) return { notFound: true }

  const collectionRef = collection(db, 'recipes')
  const collectionDocs = await getDocs(collectionRef)
  const [first] = collectionDocs.docs

  const initialSelection = first.data().sectionName

  if (!initialSelection) return { notFound: true }

  return {
    props: {
      recipes,
      initialSelection,
    },
    revalidate: 3,
  }
}

export default Ordenar
