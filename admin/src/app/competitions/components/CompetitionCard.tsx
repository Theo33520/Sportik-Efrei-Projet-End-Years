"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Heading,
  Badge,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import {
  Trophy,
  MapPin,
  Calendar,
} from "lucide-react";
import { AthleteDto } from "../../../../../api/src/generated/typing";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const CompetitionCard = ({ competition }: { competition: AthleteDto }) => {
  const upcomingCompetitions = competition.competitions.filter(
    (c) => new Date(c.date) >= new Date(),
  );

  if (upcomingCompetitions.length === 0) {
    return (
      <Box
        p={6}
        borderRadius='2xl'
        bg='white'
        border='1px solid'
        borderColor='gray.200'
        boxShadow='md'
        w='100%'
        textAlign='center'
      >
        <Heading size='lg' color='gray.600' mb={3}>
          Aucune compétition à venir
        </Heading>
        <Text color='gray.500'>
          Restez à l’écoute, de nouvelles compétitions seront bientôt annoncées.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      borderRadius='2xl'
      bg='white'
      border='1px solid'
      borderColor='gray.200'
      boxShadow='md'
      transition='all 0.3s ease'
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.03)",
        cursor: "pointer",
      }}
      w='100%'
    >
      {/* Header */}
      <HStack justify='space-between' mb={5}>
        <HStack spacing={3}>
          <Icon as={Trophy} w={6} h={6} color='red.500' />
          <Heading size='lg' color='gray.800' letterSpacing='wide'>
            Compétitions à venir
          </Heading>
        </HStack>
        <Badge
          colorScheme='red'
          fontWeight='bold'
          fontSize='0.75rem'
          px={3}
          py={1}
          borderRadius='full'
          letterSpacing='wider'
        >
          {upcomingCompetitions.length}
        </Badge>
      </HStack>

      <Divider mb={6} />

      <VStack align='stretch' spacing={5}>
        {upcomingCompetitions.map((c, i) => (
          <Box
            key={i}
            p={5}
            bg='gray.50'
            borderRadius='lg'
            border='1px solid'
            borderColor='gray.200'
            boxShadow='sm'
            _hover={{ bg: "gray.100" }}
          >
            <Heading size='md' color='red.600' mb={3}>
              {c.title}
            </Heading>
            <HStack spacing={4} color='gray.600' fontSize='sm' mb={1}>
              <Icon as={MapPin} />
              <Tooltip label='Lieu de la compétition' aria-label='Lieu tooltip'>
                <Text>{c.location}</Text>
              </Tooltip>
            </HStack>
            <HStack spacing={4} color='gray.600' fontSize='sm'>
              <Icon as={Calendar} />
              <Tooltip label='Date et heure' aria-label='Date tooltip'>
                <Text>{formatDate(c.date)}</Text>
              </Tooltip>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CompetitionCard;