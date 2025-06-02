import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { getUser } from "@/app/utils/user";
import { Activity, Calendar, Clock, TrendingUp } from "lucide-react";

const activity = [
  {
    date: "Aujourd'hui",
    activity: "Course à pied",
    duration: "30 min",
    intensity: "Modérée",
  },
  {
    date: "Hier",
    activity: "Musculation",
    duration: "45 min",
    intensity: "Intense",
  },
  {
    date: "20 Mai",
    activity: "Natation",
    duration: "1h",
    intensity: "Modérée",
  },
  { date: "18 Mai", activity: "Yoga", duration: "45 min", intensity: "Légère" },
  {
    date: "15 Mai",
    activity: "Vélo",
    duration: "1h 30min",
    intensity: "Intense",
  },
];

const objectifs = [
  { goal: "Courir 20km par semaine", progress: 65 },
  { goal: "3 séances de musculation", progress: 33 },
  { goal: "Perdre 5kg", progress: 40 },
  { goal: "Améliorer l'endurance", progress: 80 },
];

export default async function UserDashboardPage() {
  const user_data = await getUser();

  return (
    <Box p={6}>
      <Box mb={6}>
        <Heading as='h1' size='lg'>
          Tableau de bord
        </Heading>
        <Text color='gray.500'>
          Bienvenue sur votre tableau de bord Sportika
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Card>
          <CardHeader pb={2}>
            <Flex justify='space-between' align='center'>
              <Text fontSize='sm' fontWeight='medium'>
                Séances complétées
              </Text>
              <Activity size={16} color='gray' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize='2xl' fontWeight='bold'>
              {user_data?.sessionsCompleted ?? "0"}
            </Text>
            <Text fontSize='xs' color='gray.500'>
              +2 depuis la semaine dernière
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader pb={2}>
            <Flex justify='space-between' align='center'>
              <Text fontSize='sm' fontWeight='medium'>
                Temps d'entraînement
              </Text>
              <Clock size={16} color='gray' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize='2xl' fontWeight='bold'>
              {user_data?.trainingTime ?? "0"} h
            </Text>
            <Text fontSize='xs' color='gray.500'>
              +45min depuis la semaine dernière
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader pb={2}>
            <Flex justify='space-between' align='center'>
              <Text fontSize='sm' fontWeight='medium'>
                Progression
              </Text>
              <TrendingUp size={16} color='gray' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize='2xl' fontWeight='bold'>
              {user_data?.progression ?? "0"}%
            </Text>
            <Text fontSize='xs' color='gray.500'>
              Depuis le mois dernier
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader pb={2}>
            <Flex justify='space-between' align='center'>
              <Text fontSize='sm' fontWeight='medium'>
                Prochaine séance
              </Text>
              <Calendar size={16} color='gray' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize='2xl' fontWeight='bold'>
              {user_data?.nextSessionDate ?? "Aucune séance prévue"}
            </Text>
            <Text fontSize='xs' color='gray.500'>
              10:00 - Musculation
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
        <Card>
          <CardHeader>
            <Heading size='sm'>Activités récentes</Heading>
            <Text fontSize='sm' color='gray.500'>
              Vos 5 dernières activités sportives
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              {activity.map((item, index) => (
                <HStack key={index} align='start'>
                  <Box p={2} bg='green.100' rounded='full'>
                    <Activity size={16} color='#38A169' />
                  </Box>
                  <Box>
                    <Text fontWeight='medium'>{item.activity}</Text>
                    <Text fontSize='sm' color='gray.500'>
                      {item.date} • {item.duration} • {item.intensity}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size='sm'>Objectifs</Heading>
            <Text fontSize='sm' color='gray.500'>
              Progression vers vos objectifs
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              {objectifs.map((item, index) => (
                <Box key={index}>
                  <Flex justify='space-between' mb={1}>
                    <Text fontSize='sm' fontWeight='medium'>
                      {item.goal}
                    </Text>
                    <Text fontSize='sm' fontWeight='medium'>
                      {item.progress}%
                    </Text>
                  </Flex>
                  <Progress
                    value={item.progress}
                    size='sm'
                    colorScheme='green'
                    rounded='full'
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
