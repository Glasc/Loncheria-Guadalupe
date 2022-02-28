import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

import { useRef, useState, useEffect } from "react";
import { Grid, VStack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
} from "@firebase/firestore";
import db from "../../../firebase/firebaseConfig";
import { format } from "date-fns";

interface ModalRegisterProps {}

export const ModalRegister: React.FC<ModalRegisterProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstInput = useRef<any>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleEmail = (e: any) => setEmail(e.target.value);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleName = (e: any) => setName(e.target.value);
  const handleAddress = (e: any) => setAddress(e.target.value);
  const handlePhoneNumber = (e: any) => setPhoneNumber(e.target.value);

  const auth = getAuth();

  const initialDatabaseValues = async ({ uid, formValues }: any) => {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, uid), {});

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      carrito: [],
      orders: {
        byId: {},
        allIds: [],
      },
      pedidos: [],
      userInfo: {
        data: {
          address: formValues.address,
          name: formValues.name,
          telephoneNumber: formValues.phoneNumber,
        },
      },
    });

    // const date = format(new Date(), 'ddMMyyyy').toString()
    // const salesRef = doc(db, 'sales', date)
    // const prevResponse = await getDoc(salesRef)
    // const prevData = prevResponse.data()
    // const prevUsersRegistered = prevData!.prevUsersRegistered

    // await updateDoc(salesRef, {
    //   ...prevData,
    //   prevUsersRegistered: prevUsersRegistered + 1,
    // })

    const salesRef = doc(db, "usersRegisteredCount", "count");
    const prevResponse = await getDoc(salesRef);
    const prevData = prevResponse.data();
    const prevUsersRegistered = prevData!.usersRegistered;

    await updateDoc(salesRef, {
      usersRegistered: prevUsersRegistered + 1,
    });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered user: ", user);
        initialDatabaseValues({
          uid: user.uid,
          formValues: { name, address, phoneNumber },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ocured: ", errorCode, errorMessage);
      });
  };

  return (
    <div style={{ width: "100%", color: "black" }}>
      <Button
        color="white"
        colorScheme="brand"
        variant="outline"
        size="md"
        w="100%"
        onClick={onOpen}
      >
        Registrarse
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={firstInput}
      >
        <ModalOverlay />
        <ModalContent color="white" bg="#342C2B">
          <ModalHeader>Registrarse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <VStack spacing={4}>
                <FormControl id="email" autoComplete="off">
                  <FormLabel>Correo</FormLabel>
                  <Input
                    border="none"
                    backgroundColor="#473f3e"
                    type="email"
                    ref={firstInput}
                    value={email}
                    onChange={handleEmail}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    border="none"
                    backgroundColor="#473f3e"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                  />
                  <FormHelperText color="#bfb4b3">Mayor a 8 caracteres.</FormHelperText>
                </FormControl>
                <FormControl id="nombre">
                  <FormLabel>Nombre de pila</FormLabel>
                  <Input
                    border="none"
                    backgroundColor="#473f3e"
                    type="text"
                    value={name}
                    onChange={handleName}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    border="none"
                    backgroundColor="#473f3e"
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl id="address">
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    border="none"
                    backgroundColor="#473f3e"
                    type="text"
                    value={address}
                    onChange={handleAddress}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <Grid
                  templateColumns={"repeat(auto-fit, minmax(175px, 1fr))"}
                  gap="1em"
                  alignItems="center"
                  w="100%"
                >
                  <Button colorScheme="teal" onClick={handleRegister}>
                    Registrase
                  </Button>
                  {/* <Button
                    color='white'
                    variant='solid'
                    size='md'
                    onClick={onOpen}
                    width='100%'
                  >
                    Continuar con Google
                  </Button> */}
                </Grid>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
