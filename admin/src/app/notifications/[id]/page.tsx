"use client";
import { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Avatar,
  Input,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const initialConversations = {
  1: {
    name: "Alice",
    color: "blue.500",
    messages: [
      {
        type: "received",
        text: "🎯 Nouveau défi : Termine 5 exercices en moins de 30 minutes !",
        time: "09:30",
      },
    ],
  },
  2: {
    name: "Bob",
    color: "orange.400",
    messages: [
      {
        type: "sent",
        text: "🏆 Félicitations ! Tu as gagné la compétition du mois !",
        time: "18:45",
      },
    ],
  },
};

export default function Notification() {
  const [conversationsData, setConversationsData] =
    useState(initialConversations);
  const [activeId, setActiveId] = useState("1");
  const [inputMsg, setInputMsg] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newConvName, setNewConvName] = useState("");

  const conv = conversationsData[activeId];

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedConv = { ...conv };
    updatedConv.messages = [
      ...updatedConv.messages,
      { type: "sent", text: inputMsg.trim(), time: timeStr },
    ];

    setConversationsData((prev) => ({
      ...prev,
      [activeId]: updatedConv,
    }));

    setInputMsg("");
  };

  const addNewConversation = () => {
    if (!newConvName.trim()) return;

    // Créer un nouvel ID unique
    const newId = (
      Math.max(...Object.keys(conversationsData).map(Number)) + 1
    ).toString();

    const colors = [
      "teal.400",
      "pink.400",
      "purple.500",
      "cyan.400",
      "orange.400",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newConversation = {
      name: newConvName.trim(),
      color: randomColor,
      messages: [],
    };

    setConversationsData((prev) => ({
      ...prev,
      [newId]: newConversation,
    }));

    setActiveId(newId);
    setNewConvName("");
    onClose();
  };

  return (
    <>
    
<Flex
  h='100%'
  w='100%'
  border='1px'
  borderColor='gray.200'
  borderRadius='lg'
  bg='white'
  overflow='hidden'
>
        <VStack
          w='280px'
          borderRight='1px'
          borderColor='gray.200'
          spacing={0}
          overflowY='auto'

        >
          <Box
            p='4'
            w='full'
            borderBottom='1px'
            borderColor='gray.100'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Heading size='md'>Conversations</Heading>
            <Button size='sm' colorScheme='blue' onClick={onOpen}>
              + Nouveau
            </Button>
          </Box>
          {Object.entries(conversationsData).map(([id, c]) => {
            const lastMsg = c.messages[c.messages.length - 1];
            const isActive = id === activeId;

            return (
              <HStack
                key={id}
                w='full'
                p='3'
                spacing={3}
                cursor='pointer'
                bg={isActive ? "gray.100" : "white"}
                _hover={{ bg: "gray.50" }}
                onClick={() => setActiveId(id)}
              >
                <Avatar name={c.name} bg={c.color} />
                <Box flex='1' overflow='hidden'>
                  <Text fontWeight='semibold' isTruncated>
                    {c.name}
                  </Text>
                  <Text fontSize='sm' color='gray.500' isTruncated>
                    {lastMsg?.text || "Pas encore de messages"}
                  </Text>
                </Box>
                <Text fontSize='xs' color='gray.400' whiteSpace='nowrap'>
                  {lastMsg?.time || ""}
                </Text>
              </HStack>
            );
          })}
        </VStack>

        {/* Colonne Conversation */}
        <Flex direction='column' flex='1' bg='gray.50'>
          <Box p='4' bg='white' borderBottom='1px' borderColor='gray.200'>
            <Heading size='md'>{conv.name}</Heading>
          </Box>

          <Box
            flex='1'
            p='4'
            overflowY='auto'
            display='flex'
            flexDirection='column'
            gap='3'
            bg='gray.50'
          >
            {conv.messages.length === 0 && (
              <Text color='gray.500' textAlign='center' mt='10'>
                Pas encore de messages. Démarre la conversation !
              </Text>
            )}
            {conv.messages.map((msg, i) => (
              <Box
                key={i}
                alignSelf={msg.type === "sent" ? "flex-end" : "flex-start"}
                bg={msg.type === "sent" ? "blue.500" : "white"}
                color={msg.type === "sent" ? "white" : "black"}
                px='4'
                py='3'
                borderRadius='xl'
                maxW='70%'
                boxShadow={msg.type === "sent" ? "md" : "sm"}
                borderBottomRightRadius={msg.type === "sent" ? "6px" : "22px"}
                borderBottomLeftRadius={msg.type === "sent" ? "22px" : "6px"}
                borderTopRightRadius='22px'
                borderTopLeftRadius='22px'
              >
                <Text>{msg.text}</Text>
                <Text
                  fontSize='xs'
                  mt='1'
                  textAlign='right'
                  color={msg.type === "sent" ? "blue.200" : "gray.400"}
                >
                  {msg.time}
                </Text>
              </Box>
            ))}
          </Box>

          <HStack p='4' bg='white' borderTop='1px' borderColor='gray.200'>
            <Input
              placeholder='Écrire un message...'
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputMsg.trim() !== "") {
                  sendMessage();
                }
              }}
            />
            <Button
              colorScheme='blue'
              onClick={sendMessage}
              isDisabled={inputMsg.trim() === ""}
            >
              Envoyer
            </Button>
          </HStack>
        </Flex>
      </Flex>

      {/* Modal pour nouvelle conversation */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Nom du contact'
              value={newConvName}
              onChange={(e) => setNewConvName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newConvName.trim() !== "") {
                  addNewConversation();
                }
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              colorScheme='blue'
              onClick={addNewConversation}
              isDisabled={newConvName.trim() === ""}
            >
              Ajouter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
