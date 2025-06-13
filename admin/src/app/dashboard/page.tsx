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
  Flex,
} from "@chakra-ui/react";
import { getUser, getUserSummary } from "@/app/utils/user";
import { Activity, Calendar, Clock} from "lucide-react";
import { formatDuration, formatSessionDate } from "../utils/convertHours";

export default async function UserDashboardPage() {
  const user_data = await getUser();
  const userSummary = await getUserSummary(user_data?.user_id);

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
              {userSummary.sessionCount ?? "0"}
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader pb={2}>
            <Flex justify='space-between' align='center'>
              <Text fontSize='sm' fontWeight='medium'>
                Temps d&apos;entraînement
              </Text>
              <Clock size={16} color='gray' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize='2xl' fontWeight='bold'>
              {userSummary?.totalDuration
                ? formatDuration(userSummary?.totalDuration)
                : "0"}
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
              {userSummary?.nextSession ?? "Aucune séance prévue"}
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
              {userSummary?.lastSessions.map((session: { program: { title: string }; startDate: string }, index: number) => (
                <HStack key={index} align='start'>
                  <Box p={2} bg='green.100' rounded='full'>
                    <Activity size={16} color='#38A169' />
                  </Box>
                  <Box>
                    <Text fontWeight='medium'>{session.program.title}</Text>
                    <Text fontSize='sm' color='gray.500'>
                      {formatSessionDate(session.startDate)}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}