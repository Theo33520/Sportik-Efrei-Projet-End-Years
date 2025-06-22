"use client";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Activity, Calendar, Clock } from "lucide-react";
import { formatDuration, formatSessionDate } from "@/app/utils/convertHours";
import { TrainingSessionDto } from "../../../../../api/src/generated/typing";

interface AthleteDashboardProps {
  userSummary: {
    sessionCount: number;
    totalDuration: number;
    nextSession: string | null;
    lastSessions: TrainingSessionDto[] | null;
  };
}

const StatCard = ({
  title,
  icon,
  value,
  color = "blue.500",
}: {
  title: string;
  icon: React.ElementType;
  value: string | number;
  color?: string;
}) => (
  <Card
    border='1px solid'
    borderColor='gray.100'
    boxShadow='sm'
    rounded='2xl'
    p={4}
    bg='white'
    transition='all 0.2s'
    _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
  >
    <CardHeader pb={2}>
      <Flex justify='space-between' align='center'>
        <Text fontSize='sm' fontWeight='medium' color='gray.600'>
          {title}
        </Text>
        <Box bg={`${color}20`} p={2} rounded='full'>
          <Icon as={icon} boxSize={5} color={color} />
        </Box>
      </Flex>
    </CardHeader>
    <CardBody>
      <Text fontSize='3xl' fontWeight='bold' color='gray.800'>
        {value}
      </Text>
    </CardBody>
  </Card>
);

export default function AthleteDashboard({
  userSummary,
}: AthleteDashboardProps) {
  return (
    <Box p={{ base: 2, md: 4 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard
          title='Séances complétées'
          icon={Activity}
          value={userSummary?.sessionCount ?? 0}
          color='green.500'
        />
        <StatCard
          title="Temps d'entraînement"
          icon={Clock}
          value={
            userSummary?.totalDuration
              ? formatDuration(userSummary.totalDuration)
              : "0"
          }
          color='purple.500'
        />
        <StatCard
          title='Prochaine séance'
          icon={Calendar}
          value={userSummary?.nextSession ?? "Aucune séance prévue"}
          color='orange.500'
        />
      </SimpleGrid>

      <Box mt={10}>
        <Card
          border='1px solid'
          borderColor='gray.100'
          rounded='2xl'
          boxShadow='sm'
          p={4}
          bg='white'
        >
          <CardHeader>
            <Heading size='md' mb={1}>
              Activités récentes
            </Heading>
            <Text fontSize='sm' color='gray.500'>
              Vos 5 dernières activités sportives
            </Text>
          </CardHeader>

          <CardBody pt={0}>
            <VStack spacing={5} align='stretch'>
              {userSummary?.lastSessions?.length ? (
                userSummary.lastSessions.map((session, index) => (
                  <HStack
                    key={index}
                    spacing={4}
                    align='start'
                    borderBottom='1px solid'
                    borderColor='gray.100'
                    pb={3}
                  >
                    <Box p={2} bg='green.100' rounded='full'>
                      <Activity size={18} color='#2F855A' />
                    </Box>
                    <Box>
                      <Text
                        fontWeight='semibold'
                        fontSize='md'
                        color='gray.700'
                      >
                        {session.program?.title ?? "Programme inconnu"}
                      </Text>
                      <Text fontSize='sm' color='gray.500'>
                        {formatSessionDate(session.startDate)}
                      </Text>
                    </Box>
                  </HStack>
                ))
              ) : (
                <Text color='gray.500'>Aucune activité récente</Text>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
