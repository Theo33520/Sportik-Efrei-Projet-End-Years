// components/RecentActivitiesCard.tsx
"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Box,
  HStack,
  VStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaRunning } from "react-icons/fa";

const recentActivities = [
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

export default function RecentActivitiesCard() {
  return (
    <Card>
      <CardHeader>
        <Heading as='h3' size='md'>
          Activités récentes
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          Vos 5 dernières activités sportives
        </Text>
      </CardHeader>
      <CardBody>
        <Stack spacing={4}>
          {recentActivities.map((item, index) => (
            <HStack key={index} align='start'>
              <Box p={2} bg='green.100' rounded='full'>
                <Icon as={FaRunning} color='green.600' boxSize={4} />
              </Box>
              <VStack align='start' spacing={0}>
                <Text fontWeight='medium' fontSize='sm'>
                  {item.activity}
                </Text>
                <Text fontSize='sm' color='gray.500'>
                  {item.date} • {item.duration} • {item.intensity}
                </Text>
              </VStack>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
