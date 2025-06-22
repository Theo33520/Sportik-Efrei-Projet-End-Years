"use client";

import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  FormLabel,
  Checkbox,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserDto } from "../../../../../../api/src/generated/typing";

const CreateCompetitionForm = ({
  userConnect,
  listAthlete,
}: {
  userConnect: UserDto;
  listAthlete: UserDto[];
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const toast = useToast();

  const toggleUserAssign = (userId: string) => {
    setAssignedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const competitionData = {
      title,
      location,
      date,
      coach: userConnect.user_id,
      users: assignedUsers,
    };

    try {
      const res = await fetch("/api/coach/create/competition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(competitionData),
      });

      if (!res.ok) {
        throw new Error("Failed to create competition");
      }

      toast({
        title: "Succès",
        description: "Compétition créée avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Optionally reset form
      setTitle("");
      setLocation("");
      setDate("");
      setAssignedUsers([]);
    } catch (error) {
      console.error("Error creating competition:", error);

      toast({
        title: "Erreur",
        description: "Échec de la création de la compétition",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={6} borderWidth={1} borderRadius='lg' boxShadow='md' bg='white'>
        <Heading as='h2' size='lg' mb={4}>
          Créer une nouvelle compétition
        </Heading>
        <Text mb={6} color='gray.600'>
          Remplissez les informations pour organiser une compétition.
        </Text>

        <VStack spacing={4} align='stretch'>
          <Box>
            <FormLabel>Titre</FormLabel>
            <Input
              placeholder='Nom de la compétition'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel>Lieu</FormLabel>
            <Input
              placeholder='Lieu de la compétition'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel>Date</FormLabel>
            <Input
              type='datetime-local'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Box>

          <Divider />

          <Heading size='md'>Participants</Heading>
          <VStack align='start'>
            {listAthlete.map((u) => (
              <Checkbox
                key={u.user_id}
                isChecked={assignedUsers.includes(u.user_id)}
                onChange={() => toggleUserAssign(u.user_id)}
              >
                {`${u.lastname.charAt(0).toUpperCase() + u.lastname.slice(1)} ${
                  u.firstname.charAt(0).toUpperCase() + u.firstname.slice(1)
                }`}
              </Checkbox>
            ))}
          </VStack>

          <Divider />

          <Button
            type='submit'
            mt={6}
            colorScheme='teal'
            size='md'
            alignSelf='start'
          >
            Créer la compétition
          </Button>
        </VStack>
      </Box>
    </form>
  );
};

export default CreateCompetitionForm;
