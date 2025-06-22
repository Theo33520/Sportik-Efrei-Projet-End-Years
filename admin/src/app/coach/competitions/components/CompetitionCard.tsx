"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Heading,
  Tag,
  Badge,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Calendar, MapPin, Users, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompetitionDto } from "../../../../../../api/src/generated/typing";

const CompetitionCard = ({
  competition,
}: {
  competition: CompetitionDto[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompetition, setSelectedCompetition] =
    useState<CompetitionDto | null>(null);
  const router = useRouter();

  const handleOpen = (c: CompetitionDto) => {
    setSelectedCompetition(c);
    onOpen();
  };

  const handleDelete = async (c: CompetitionDto) => {
    try {
      await fetch(`/api/coach/delete/competition/${c.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting competition:", error);
    }
  };

  return (
    <>
      <VStack spacing={6} align='stretch'>
        {competition.map((c) => (
          <Box
            key={c.id}
            p={6}
            borderRadius='xl'
            bg='gray.50'
            border='1px solid'
            borderColor='gray.200'
            boxShadow='sm'
            transition='all 0.2s ease-in-out'
            _hover={{
              boxShadow: "lg",
              transform: "scale(1.015)",
              cursor: "pointer",
            }}
            position='relative'
            onClick={() => handleOpen(c)}
          >
            <HStack position='absolute' top={4} right={4} spacing={2}>
              <Badge
                colorScheme='red'
                fontSize='0.7rem'
                px={2}
                py={0.5}
                borderRadius='md'
              >
                Compétition
              </Badge>
              <Icon
                as={Trash2}
                w={4}
                h={4}
                color='red.500'
                _hover={{ color: "red.700", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(c);
                }}
              />
            </HStack>

            <HStack spacing={2} mb={3}>
              <Icon as={Calendar} w={5} h={5} color='red.500' />
              <Heading size='md' color='gray.700'>
                {c.title}
              </Heading>
            </HStack>

            <Box
              bg='white'
              p={4}
              borderRadius='md'
              border='1px solid'
              borderColor='gray.100'
              mb={3}
            >
              <HStack align='start' spacing={2}>
                <Icon as={MapPin} w={4} h={4} color='gray.500' mt={1} />
                <Text fontSize='sm' color='gray.700'>
                  {c.location}
                </Text>
              </HStack>
            </Box>

            <Divider mb={3} />

            <HStack spacing={4}>
              <Tag size='md' colorScheme='blue' variant='subtle'>
                <HStack spacing={1}>
                  <Icon as={Users} w={4} h={4} />
                  <Text fontSize='xs'>Participants: {c.users.length}</Text>
                </HStack>
              </Tag>
              <Tag size='md' colorScheme='gray' variant='subtle'>
                <Text fontSize='xs'>
                  Date: {new Date(c.date).toLocaleDateString("fr-FR")}
                </Text>
              </Tag>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Détails de la compétition</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCompetition && (
              <>
                <Heading size='md' mb={2}>
                  {selectedCompetition.title}
                </Heading>
                <Text color='gray.600' mb={2}>
                  📍 {selectedCompetition.location}
                </Text>
                <Text color='gray.600' mb={4}>
                  📅{" "}
                  {new Date(selectedCompetition.date).toLocaleString("fr-FR")}
                </Text>

                <Divider mb={4} />
                <Text fontSize='sm' color='gray.700'>
                  Nombre de participants: {selectedCompetition.users.length}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompetitionCard;
