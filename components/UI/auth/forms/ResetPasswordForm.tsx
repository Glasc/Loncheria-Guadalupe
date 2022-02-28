import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useRef, useState } from "react";
import { Flex, Grid, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig";

const ResetPasswordForm: React.FC<any> = ({ setToggleRecoverPassword }) => {
  const [email, setEmail] = useState<string>("");

  const handleEmail = (e: any) => setEmail(e.target.value);
  const firstInput = useRef<any>();

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error has occured: ", errorCode, errorMessage);
      });
  };

  return (
    <form>
      <VStack spacing={4}>
        <Flex
          fontSize="1.1rem"
          cursor="pointer"
          spacing={4}
          justifyContent="start"
          align="center"
          onClick={() => setToggleRecoverPassword((prev: any) => !prev)}
          w="100%"
        >
          <ArrowBackIcon h={6} w={6} mr="2" />
          <h2 style={{ textDecoration: "underline" }}>Volver</h2>
        </Flex>
        <FormControl id="email" autoComplete="off">
          <FormLabel>Correo</FormLabel>
          <Input
            border=""
            backgroundColor="#473f3e"
            type="email"
            ref={firstInput}
            value={email}
            onChange={handleEmail}
          />
        </FormControl>
        <Grid
          templateColumns={"repeat(auto-fit, minmax(175px, 1fr))"}
          gap="1em"
          alignItems="center"
          w="100%"
        >
          <Button colorScheme="teal" onClick={handleReset}>
            Recuperar contraseña
          </Button>
        </Grid>
      </VStack>
    </form>
  );
};

export default ResetPasswordForm;
