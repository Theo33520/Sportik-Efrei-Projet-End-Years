"use client";

import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  IconButton,
  FormLabel,
  Checkbox,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { UserDto } from "../../../../../../api/src/generated/typing";


interface Exercise {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const CreateProgramForm = ({ userConnect, listAthlete }: { userConnect: UserDto, listAthlete: UserDto[] }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const programData = {
      title: programName,
      description: programDescription,
      coach: userConnect.user_id,
      athletes: assignedUsers,
      training: exercises,
    };

    try {
      const res = await fetch("/api/coach/create/program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(programData),
      });
      if (!res.ok) {
        throw new Error("Failed to create program");
      }
      toast({
        title: "Succès",
        description: "Programme créé avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {

      toast({
        title: "Erreur",
        description: "Échec de la création du programme",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error creating program:", error);
      return;
    }

  };


  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", description: "", startDate: "", endDate: "" },
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };



  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string,
  ) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };


  const toggleUserAssign = (userId: string) => {
    setAssignedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box p={6} borderWidth={1} borderRadius='lg' boxShadow='md' bg='white'>
        <Heading as='h2' size='lg' mb={4}>
          Créer un nouveau programme
        </Heading>
        <Text mb={6} color='gray.600'>
          Remplissez les informations pour créer un programme
          d&apos;entraînement.
        </Text>

        <VStack spacing={4} align='stretch'>
          <Box>
            <FormLabel>Nom du programme</FormLabel>
            <Input placeholder='Nom du programme'
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel>Description</FormLabel>

            <Textarea placeholder='Description du programme'
            value={programDescription}
            onChange={(e) => setProgramDescription(e.target.value)}
            />
          </Box>

          <Divider />

          <HStack justify='space-between'>
            <Heading size='md'>Exercices</Heading>
            <Button
              leftIcon={<Plus />}
              onClick={handleAddExercise}
              size='sm'
              colorScheme='teal'
            >
              Ajouter un exercice
            </Button>
          </HStack>

          {exercises.map((exercise, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius='md'
              bg='gray.50'
            >
              <HStack justify='space-between' mb={2}>
                <Heading size='sm'>Exercice {index + 1}</Heading>
                <IconButton
                  icon={<Trash2 />}
                  size='sm'
                  aria-label="Supprimer l'exercice"
                  colorScheme='red'
                  variant='ghost'
                  onClick={() => handleRemoveExercise(index)}
                />
              </HStack>

              <VStack spacing={3} align='stretch'>
                <Input
                  placeholder="Nom de l'exercice"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, "name", e.target.value)
                  }
                />
                <Textarea
                  placeholder='Description'
                  value={exercise.description}
                  onChange={(e) =>
                    handleExerciseChange(index, "description", e.target.value)
                  }
                />
                <HStack>
                  <Input
                    type='datetime-local'
                    placeholder='Date et heure de début'
                    value={exercise.startDate}
                    onChange={(e) =>
                      handleExerciseChange(index, "startDate", e.target.value)
                    }
                  />
                  <Input
                    type='datetime-local'
                    placeholder='Date et heure de fin'
                    value={exercise.endDate}
                    onChange={(e) =>
                      handleExerciseChange(index, "endDate", e.target.value)
                    }
                  />
                </HStack>
              </VStack>
            </Box>
          ))}

          <Divider />

          <Heading size='md' mt={4}>
            Assigner à des athlètes
          </Heading>
          <VStack align='start'>
            {listAthlete.map((u) => (
              <Checkbox
                key={u.user_id}
                isChecked={assignedUsers.includes(u.user_id)}
                onChange={() => toggleUserAssign(u.user_id)}
              >
                {`${u.lastname.charAt(0).toUpperCase() + u.lastname.slice(1)} ${
                  u.firstname.charAt(0).toUpperCase() + u.firstname.slice(1)
                }`}{" "}
              </Checkbox>
            ))}
          </VStack>

          <Divider />

          <Button type="submit" mt={6} colorScheme='teal' size='md' alignSelf='start'>
            Créer le programme
          </Button>
        </VStack>
      </Box>
    </form>
  );
};

export default CreateProgramForm;
