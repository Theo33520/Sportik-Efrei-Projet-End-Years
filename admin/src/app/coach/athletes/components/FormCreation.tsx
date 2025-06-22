"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  VStack,
  GridItem,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserDto } from "../../../../../../api/src/generated/typing";

export interface CreateAthleteDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  clubId: string;
  phoneNumber?: string;
  Age?: number | null;
  height?: number | null;
  weight?: number | null;
  address?: string;
}

const CreateAthleteForm = ({ user }: { user: UserDto }) => {
  const toast = useToast();
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const domain = email.slice(atIndex + 1);
    setIsEmailValid(domain === "gmail.com");
  } else {
    setIsEmailValid(true);
  }
}, [email]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid) {
      toast({
        title: "Email invalide",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    const payload: CreateAthleteDto = {
      firstname,
      lastname,
      email,
      password,
      clubId: user.clubId,
      phoneNumber,
      Age: age ? parseInt(age) : null,
      height: height ? parseInt(height) : null,
      weight: weight ? parseInt(weight) : null,
      address,
    };

    try {
      const res = await fetch("/api/coach/create/athlete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      toast({
        title: "Athlète créé avec succès !",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAge("");
      setHeight("");
      setWeight("");
      setAddress("");

      router.refresh();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de créer l’athlète.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      p={6}
      borderWidth='1px'
      borderRadius='xl'
      shadow='md'
    >
      <VStack spacing={6} align='stretch'>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Prénom</FormLabel>
            <Input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={email.includes("@") && !isEmailValid}
          >
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder="example@sportik.eu"
            />
            {email.includes("@") && !isEmailValid && (
              <FormErrorMessage>
                L&apos;adresse email doit être une adresse Gmail.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Numéro de téléphone</FormLabel>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+33 6 12 34 56 78"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Âge</FormLabel>
            <Input
              type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Taille (cm)</FormLabel>
            <Input
              type='number'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder='180cm'
            />
          </FormControl>

          <FormControl>
            <FormLabel>Poids (kg)</FormLabel>
            <Input
              type='number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder='72kg'
            />
          </FormControl>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Adresse</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Rue de l'Athlète, Paris, France"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel>Club</FormLabel>
              <Select defaultValue={String(user.clubId)}>
                <option value={String(user.clubId)}>{user.clubName}</option>
              </Select>
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <Divider />

        <Button
          type='submit'
          colorScheme='teal'
          size='lg'
          alignSelf='flex-end'
          isLoading={loading}
          isDisabled={!isEmailValid}
        >
          Créer l’athlète
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateAthleteForm;
