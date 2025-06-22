"use client";

import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import bgImage from "./assets/loginPage/bg.png";
import logo from "./assets/loginPage/logo.png";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = `/dashboard`;
      } else {
        toast({
          title: "Échec de connexion",
          description: "Email ou mot de passe invalide",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <Box
      minH='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
      backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage.src})`}
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        width='50%'
        p={8}
        color='white'
      >
        <Box position='absolute' top={4}>
          <img src={logo.src} alt='Logo' width='200' height='200' />
        </Box>

        <Box bg='transparent' p={8} rounded='xl' width='full' maxW='md'>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Heading
                as='h1'
                fontSize='2xl'
                fontFamily='DM Sans, sans-serif'
                fontWeight='bold'
              >
                Connectez-vous
              </Heading>

              <FormControl id='email' isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputLeftElement>
                  <Input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder='Email'
                  />
                </InputGroup>
              </FormControl>

              <FormControl id='password' isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FontAwesomeIcon icon={faLock} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder='Mot de passe'
                  />
                  <InputRightElement width='3rem'>
                    <Button
                      h='1.5rem'
                      size='sm'
                      onClick={() => setShowPassword(!showPassword)}
                      variant='ghost'
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <ViewOffIcon color='white' />
                      ) : (
                        <ViewIcon color='white' />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={2}>
                <Button
                  type='submit'
                  bg='#41b49f'
                  color='white'
                  fontWeight='bold'
                  isDisabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner size='sm' color='white' />
                  ) : (
                    "Connexion"
                  )}
                </Button>
              </Stack>

              <Stack direction='row' justify='space-between'>
                <Link color='teal.300' fontSize='sm'>
                  Mot de passe oublié?
                </Link>
                <Link color='teal.300' fontSize='sm'>
                  Crée un compte
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Box>

      <Box
        width='50%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        p={8}
        color='white'
        textAlign='center'
      >
        <Stack spacing={4}>
          <Heading as='h2' fontSize='3xl' fontWeight='bold'>
            Sportik une expérience sportive combinants expertise et technologies
          </Heading>
        </Stack>
      </Box>
    </Box>
  );
}
