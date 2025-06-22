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
import { ClipboardList, Info } from "lucide-react";
import { useState } from "react";
import { AthleteDto } from "../../../../../api/src/generated/typing";


const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const ProgramCard = ({ program }: { program: AthleteDto }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProgram, setSelectedProgram] = useState<AthleteDto | null>(
    null,
  );

  const handleOpen = () => {
    setSelectedProgram(program);
    onOpen();
  };

  return (
    <>
      <Box
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
        onClick={handleOpen}
      >
        <HStack justify='space-between' mb={3}>
          <HStack spacing={2}>
            <Icon as={ClipboardList} w={5} h={5} color='teal.500' />
            <Heading size='md' color='gray.700'>
              {program.programTitle}
            </Heading>
          </HStack>
          <Badge
            colorScheme='teal'
            fontSize='0.7rem'
            px={2}
            py={0.5}
            borderRadius='md'
          >
            Programme
          </Badge>
        </HStack>

        <Box
          bg='white'
          p={4}
          borderRadius='md'
          border='1px solid'
          borderColor='gray.100'
          mb={3}
        >
          <HStack align='start'>
            <Icon as={Info} w={4} h={4} color='gray.500' mt={1} />
            <Text fontSize='sm' color='gray.700'>
              {program.programDescription || "Aucun descriptif disponible."}
            </Text>
          </HStack>
        </Box>

        <Divider mb={3} />

        <Tag size='md' colorScheme='purple' variant='subtle'>
          {program.trainings.length} entraînements
        </Tag>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent borderRadius='xl'>
          <ModalHeader>Détails du programme</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedProgram && (
              <VStack align='stretch' spacing={4}>
                <Heading size='sm'>Entraînements</Heading>
                {selectedProgram.trainings.length > 0 ? (
                  selectedProgram.trainings.map((t, i) => (
                    <Box
                      key={i}
                      p={4}
                      bg='gray.50'
                      borderRadius='md'
                      border='1px solid'
                      borderColor='gray.200'
                    >
                      <Heading size='sm' color='blue.600' mb={1}>
                        {t.name}
                      </Heading>
                      <Text fontSize='sm' color='gray.600'>
                        {formatDate(t.startDate)} → {formatDate(t.endDate)}
                      </Text>
                      {t.description && (
                        <Text fontSize='sm' color='gray.700' mt={2}>
                          {t.description}
                        </Text>
                      )}
                    </Box>
                  ))
                ) : (
                  <Text fontSize='sm' color='gray.500'>
                    Aucun entraînement.
                  </Text>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProgramCard;
