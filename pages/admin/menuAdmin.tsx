import React, { useEffect } from 'react'
import { NextPage } from 'next'
import styles from '../../styles/MenuAdmin.module.scss'
import { Layout } from '../../components/Layout'
import { NavbarAuth } from '../../components/NavbarAuth/NavbarAuth'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Navbar } from '../../components/Navbar/Navbar'
import { Grid, VStack, Text, Flex } from '@chakra-ui/layout'
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import { LightMode } from '@chakra-ui/color-mode'
import { useState } from 'react'
import { useMenuModifier } from '../../hooks/useMenuModifier'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  addNewRecipe,
  addVariant,
  addIngredient,
  setMenuAdminSelectionId,
} from '../../redux/recipeSlice'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import { selectMenuAdminSelectionId } from '../../redux/recipeSlice'
import { doc, getDoc } from '@firebase/firestore'
import db from '../../firebase/firebaseConfig'

interface MenuAdminProps {}

interface ProductProps {
  productName: string
  price: number
}
interface MenuPanelProps {}

const MenuAdmin: NextPage<MenuAdminProps> = ({}) => {
  const currentSectionId: string =
    useAppSelector(selectMenuAdminSelectionId) || ''
  const [firstRecipeRequest, setFirstRecipeRequest] =
    useState<boolean>(false)

  const [recipes, setRecipes] = useState<any>('')
  console.log(recipes)

  useEffect(() => {
    const getRecipes = async () => {
      if (!currentSectionId) return
      const docRef = doc(db, 'recipes', currentSectionId)
      const docValue = await getDoc(docRef)
      const docData = docValue.data()
      setRecipes(docData)
    }

    getRecipes()
  }, [currentSectionId])

  useEffect(() => {
    const getRecipes = async () => {
      if (!currentSectionId) return
      const docRef = doc(db, 'recipes', currentSectionId)
      const docValue = await getDoc(docRef)
      const docData = docValue.data()
      setRecipes(docData)
    }

    if (currentSectionId !== '') {
      if (!firstRecipeRequest) {
        getRecipes()
        setFirstRecipeRequest(true)
      }
    }


  }, [currentSectionId, recipes, firstRecipeRequest])

  return (
    <Layout>
      <NavbarAdmin />
      <main className={styles.main}>
        <div className={styles.menuContent}>
          <h2 className={styles.headline}>Menú</h2>
          <div className={styles.section}>
            {recipes && (
              <>
                <Category
                  categoryName={recipes.sectionName}
                  id={recipes.name}
                  key={recipes.name}
                />
                {recipes.variants.map((currVariant: any, idx: any) => {
                  return (
                    <Product
                      productName={currVariant.name}
                      price={currVariant.price}
                      key={idx}
                    />
                  )
                })}
              </>
            )}
            {/* <Category categoryName='Torta' />
            <Product productName='Panela' price={19} /> */}
          </div>
        </div>
        <MenuPanel />
      </main>
    </Layout>
  )
}

const Category = ({ categoryName, id }: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((prev) => !prev)

  const handleEdit = () => {
    toggleEdit()
  }

  return (
    <div className={styles.categorySection}>
      {isEditing ? (
        <Input color='white' type='text' backgroundColor='#4E4342' />
      ) : (
        <h2 style={{}}>{categoryName}</h2>
      )}
      <div className={styles.iconWrapper}>
        <EditIcon w={5} h={5} cursor='pointer' onClick={handleEdit} />
        <DeleteIcon w={5} h={5} cursor='pointer' />
      </div>
    </div>
  )
}

const Product = ({ price, productName }: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((prev) => !prev)

  return (
    <div className={styles.sectionElements}>
      {isEditing ? (
        <>
          <Input
            _placeholder={{ color: 'gray.50' }}
            placeholder={productName}
            color='white'
            type='text'
            backgroundColor='#4E4342'
            border='none'
          />
          <Input
            _placeholder={{ color: 'gray.50' }}
            placeholder={'precio'}
            color='white'
            type='text'
            backgroundColor='#4E4342'
            border='none'
          />
        </>
      ) : (
        <>
          <p className={styles.product}>{productName}</p>
          <p className={styles.price}>${price}.00 MXN</p>
        </>
      )}
      <div className={styles.iconWrapper}>
        <EditIcon w={5} h={5} cursor='pointer' onClick={toggleEdit} />
        <DeleteIcon w={5} h={5} cursor='pointer' />
      </div>
    </div>
  )
}

const MenuPanel = () => {
  const dispatch = useAppDispatch()

  const {
    initialDropdownValue,
    setInitialDropdownValue,
    recipes,
    setRecipes,
    dropDownId,
    setDropDownId,
  }: any = useMenuModifier()

  const [category, setCategory] = useState('')
  const [dish, setDish] = useState('')
  const [price, setPrice] = useState('')
  const [ingredient, setIngredient] = useState('')

  useEffect(() => {
    dispatch(setMenuAdminSelectionId(dropDownId))
  }, [dispatch, dropDownId])

  const handleUploadCategory = () => {
    if (!category) return
    dispatch(
      addNewRecipe({
        ingredients: [],
        sectionName: category,
        variants: [],
        id: new Date().valueOf(),
      })
    )
    setCategory('')
    setRecipes(undefined)
  }

  const handleDishUpload = () => {
    if (!dish) return
    if (!dropDownId) return
    if (!price) return
    dispatch(
      addVariant({
        id: dropDownId,
        variantName: dish,
        price: Number(price),
      })
    )
    setDish('')
    setPrice('')
  }

  const handleIngredientUpload = () => {
    if (!dropDownId) return
    dispatch(
      addIngredient({
        ingredientName: ingredient,
        id: dropDownId,
      })
    )
    setIngredient('')
  }

  return (
    <aside className={styles.aside}>
      <form>
        <VStack spacing={4} color='white' textAlign='start'>
          <Text fontWeight='semibold' fontSize='2xl' alignSelf='start'>
            Añadir categoría
          </Text>
          <FormControl id='email' autoComplete='off' isRequired>
            <FormLabel fontWeight='normal'>Categoría</FormLabel>
            <Flex gridGap={4}>
              <Input
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                backgroundColor='#4E4342'
                border='none'
              />{' '}
              <Button
                colorScheme='brand'
                color='white'
                onClick={handleUploadCategory}
              >
                Añadir
              </Button>
            </Flex>
          </FormControl>
          <Text
            fontWeight='semibold'
            fontSize='2xl'
            alignSelf='start'
            mb={2}
          >
            Añadir platillo
          </Text>
          <LightMode>
            <Select
              bg='white'
              borderColor='white'
              color='black'
              mb={5}
              fontSize='lg'
              isRequired
              title={'selector'}
              onClick={(e: any) => {
                setDropDownId(e.target.value)
                dispatch(setMenuAdminSelectionId(''))
              }}
            >
              {recipes &&
                recipes.map(
                  (
                    currRecipe: { sectionName: string; id: string },
                    idx: number
                  ) => {
                    return (
                      <option value={currRecipe.id} key={currRecipe.id}>
                        {currRecipe.sectionName}
                      </option>
                    )
                  }
                )}
            </Select>
          </LightMode>
          <Flex gridGap={4}>
            <FormControl id='email'>
              <FormLabel>Platillo</FormLabel>
              <Input
                type='text'
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                backgroundColor='#4E4342'
                border='none'
              />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Precio</FormLabel>
              <Input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                backgroundColor='#4E4342'
                border='none'
              />
            </FormControl>
          </Flex>
          <Grid
            templateColumns={'repeat(auto-fit, minmax(175px, 1fr))'}
            gap='1em'
            alignItems='center'
            w='100%'
          >
            <Button
              onClick={handleDishUpload}
              colorScheme='brand'
              color='white'
            >
              Añadir
            </Button>
          </Grid>
          <Text fontWeight='semibold' fontSize='2xl' alignSelf='start'>
            Añadir ingrediente
          </Text>
          <FormControl id='email' autoComplete='off' isRequired>
            <FormLabel fontWeight='normal'>Ingrediente</FormLabel>
            <Flex gridGap={4}>
              <Input
                type='text'
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                backgroundColor='#4E4342'
                border='none'
              />{' '}
              <Button
                colorScheme='brand'
                color='white'
                onClick={handleIngredientUpload}
              >
                Añadir
              </Button>
            </Flex>
          </FormControl>
        </VStack>
      </form>
    </aside>
  )
}

export default MenuAdmin
