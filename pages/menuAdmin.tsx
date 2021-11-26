import React from 'react'
import { NextPage } from 'next'
import styles from '../styles/MenuAdmin.module.scss'
import { Layout } from '../components/Layout'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Navbar } from '../components/Navbar/Navbar'
import { Grid, VStack, Text } from '@chakra-ui/layout'
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import { LightMode } from '@chakra-ui/color-mode'
import { useState } from 'react'

interface MenuAdminProps {}

interface CategoryProps {
  categoryName: string
}
interface ProductProps {
  productName: string
  price: number
}
interface MenuPanelProps {}

const MenuAdmin: NextPage<MenuAdminProps> = ({}) => {
  return (
    <Layout>
      <NavbarAuth />
      <main className={styles.main}>
        <div className={styles.menuContent}>
          <h2 className={styles.headline}>Menú</h2>
          <div className={styles.section}>
            <Category categoryName='Torta' />
            <Product productName='Panela' price={19} />
          </div>
        </div>
        <MenuPanel />
      </main>
    </Layout>
  )
}

const Category: React.FC<CategoryProps> = ({ categoryName }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((prev) => !prev)

  return (
    <div className={styles.categorySection}>
      {isEditing ? (
        <Input color='white' type='text' backgroundColor='#4E4342' />
      ) : (
        <h2>{categoryName}</h2>
      )}
      <div className={styles.iconWrapper}>
        <EditIcon w={5} h={5} cursor='pointer' onClick={toggleEdit} />
        <DeleteIcon w={5} h={5} cursor='pointer' />
      </div>
    </div>
  )
}

const Product: React.FC<ProductProps> = ({ price, productName }) => {
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
          />
          <Input
            _placeholder={{ color: 'gray.50' }}
            placeholder={'precio'}
            color='white'
            type='text'
            backgroundColor='#4E4342'
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
  return (
    <aside className={styles.aside}>
      <form>
        <VStack spacing={4} color='white' textAlign='start'>
          <Text fontWeight='semibold' fontSize='2xl' alignSelf='start'>
            Añadir categoría
          </Text>
          <FormControl id='email' autoComplete='off'>
            <FormLabel fontWeight='normal'>Categoría</FormLabel>
            <Input type='text' backgroundColor='#4E4342' />
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
              placeholder='Platillos'
              mb={5}
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </LightMode>
          <FormControl id='email'>
            <FormLabel>Platillo</FormLabel>
            <Input type='text' backgroundColor='#4E4342' />
            <FormHelperText>Mayor a 8 caracteres.</FormHelperText>
          </FormControl>
          <Grid
            templateColumns={'repeat(auto-fit, minmax(175px, 1fr))'}
            gap='1em'
            alignItems='center'
            w='100%'
          >
            <Button type='submit' colorScheme='brand' color='white'>
              Aceptar
            </Button>
          </Grid>
        </VStack>
      </form>
    </aside>
  )
}

export default MenuAdmin
