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
import { ProgramDto } from "../../../../../../api/src/generated/typing";
import { Info, ClipboardList, User, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProgramCard = ({ program }: { program: ProgramDto[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProgram, setSelectedProgram] = useState<ProgramDto | null>(
    null,
  );

  const router = useRouter();
  const handleOpen = (p: ProgramDto) => {
    setSelectedProgram(p);
    onOpen();
  };

  const handleDelete = async (p: ProgramDto) => {
    try {
      await fetch(`/api/coach/delete/program/${p.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };
  

  return (
    <>
      <VStack spacing={6} align='stretch'>
        {program.map((p) => (
          <Box
            key={p.id}
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
            onClick={() => handleOpen(p)}
          >
            <HStack position='absolute' top={4} right={4} spacing={2}>
              <Badge
                colorScheme='teal'
                fontSize='0.7rem'
                px={2}
                py={0.5}
                borderRadius='md'
              >
                Programme
              </Badge>
              <Icon
                as={Trash2}
                w={4}
                h={4}
                color='red.500'
                _hover={{ color: "red.700", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(p);
                }}
              />
            </HStack>

            <HStack spacing={2} mb={3}>
              <Icon as={ClipboardList} w={5} h={5} color='teal.500' />
              <Heading size='md' color='gray.700'>
                {p.title}
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
              <HStack align='start'>
                <Icon as={Info} w={4} h={4} color='gray.500' mt={1} />
                <Text fontSize='sm' color='gray.700'>
                  {p.description}
                </Text>
              </HStack>
            </Box>

            <Divider mb={3} />

            <HStack spacing={4}>
              <Tag size='md' colorScheme='purple' variant='subtle'>
                <HStack spacing={1}>
                  <Icon as={User} w={4} h={4} />
                  <Text fontSize='xs'>
                    Athlètes Assignés: {p.countAthletes}
                  </Text>
                </HStack>
              </Tag>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Détails du programme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProgram && (
              <>
                <Heading size='md' mb={2}>
                  {selectedProgram.title}
                </Heading>
                <Text mb={4} color='gray.700'>
                  {selectedProgram.description}
                </Text>

                <Divider mb={4} />
                <VStack align='start' spacing={4}>
                  {selectedProgram.trainings?.map((training, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg='gray.50'
                      borderRadius='md'
                      w='full'
                      border='1px solid'
                      borderColor='gray.200'
                    >
                      <Heading size='sm' mb={1} color='blue.600'>
                        {training.name}
                      </Heading>
                      <Text fontSize='sm' color='gray.700'>
                        {training.description}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProgramCard;
