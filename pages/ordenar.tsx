import React, { useEffect } from 'react'
import { NextPage } from 'next'
import styles from '../styles/Ordenar.module.scss'
import { Layout } from '../components/Layout'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { Select } from '@chakra-ui/select'
import { LightMode } from '@chakra-ui/color-mode'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { doc, updateDoc, getDoc } from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
import { useAppDispatch } from '../redux/hooks'
import { modifyRecipe, addVariant, modifyVariant } from '../redux/recipeSlice';

interface OrdenarProps {}

const Ordenar: NextPage<OrdenarProps> = ({}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    
    // ((async () => { 
    //   const docRef = doc(db, 'recipes', 'WnkOEIKmaRJVamINIGm2')
    //   const da = await getDoc(docRef)

    //   console.log(da.data().variants) 
    // }))()

  }, [dispatch])

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
              placeholder='Platillos'
              mb={5}
              fontSize='lg'
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>

            <section className={styles.category}>
              <h2>Elige tu torta</h2>
              <RadioGroup defaultValue='1' my={4} fontSize={9}>
                <Stack spacing={3} direction='column' fontSize='20px'>
                  <Radio colorScheme='green' value='1'>
                    Pierna
                  </Radio>
                  <Radio colorScheme='green' value='0'>
                    Panela
                  </Radio>
                  <Radio colorScheme='green' value='0'>
                    Jamón
                  </Radio>
                  <Radio colorScheme='green' value='0'>
                    Cubana
                  </Radio>
                </Stack>
              </RadioGroup>
            </section>

            <section className={styles.category}>
              <h2>Ingredientes</h2>
              <Stack spacing={3} direction='column' my={4}>
                <Checkbox colorScheme='green' defaultIsChecked>
                  Lechuga
                </Checkbox>
                <Checkbox colorScheme='green' defaultIsChecked>
                  Jitomate
                </Checkbox>
                <Checkbox colorScheme='green' defaultIsChecked>
                  Cebolla
                </Checkbox>
                <Checkbox colorScheme='green' defaultIsChecked>
                  Mayonesa
                </Checkbox>
              </Stack>
            </section>
          </div>
        </LightMode>

        <section className={styles.cart}>
          <h2>Carrito</h2>
          <div className={styles.description}>
            <p className={styles.descriptionTitle}>
              2 Quesadillas Sincronizadas
            </p>
            <p className={styles.descriptionDetails}>Con todo</p>
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionTitle}>
              2 Quesadillas Sincronizadas
            </p>
            <p className={styles.descriptionDetails}>Con todo</p>
          </div>
          <hr />
          <h2>Total: $250 MXN</h2>
          <Button
            color='white'
            colorScheme='brand'
            variant='solid'
            size='lg'
            w='100%'
          >
            Aceptar
          </Button>
        </section>
      </main>
    </Layout>
  )
}

export default Ordenar
