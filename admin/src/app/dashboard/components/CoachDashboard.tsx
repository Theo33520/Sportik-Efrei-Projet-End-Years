"use client";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Activity, Clock, Timer } from "lucide-react";
import { IconType } from "react-icons/lib";
import Image from "next/image"; // ✅ Import de l'image

interface CoachDashboardProps {
  coachSummary: {
    clubName: string;
    atheleteCount: number;
    nextCompetionName: string | null;
    nextCompetionLocation: string | null;
  };
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  extra,
}: {
  title: string;
  value: string | number;
  icon: IconType;
  color: string;
  extra?: string;
}) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const iconColor = useColorModeValue(`${color}.500`, `${color}.300`);

  return (
    <Card bg={bg} boxShadow='md' borderRadius='xl'>
      <CardHeader pb={2}>
        <Flex justify='space-between' align='center'>
          <Text fontSize='sm' fontWeight='medium' color='gray.500'>
            {title}
          </Text>
          <Icon as={icon} boxSize={5} color={iconColor} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize='3xl' fontWeight='bold'>
          {value}
        </Text>
        {extra && (
          <Text fontSize='sm' color='gray.500' mt={1}>
            {extra}
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

export default function CoachDashboard({ coachSummary }: CoachDashboardProps) {
  return (
    <Box p={{ base: 4, md: 6 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <StatCard
          title="Nombre d'athlètes"
          value={coachSummary?.atheleteCount ?? 0}
          icon={Activity}
          color='teal'
        />
        <StatCard
          title='Votre Club'
          value={coachSummary?.clubName ?? "Non défini"}
          icon={Clock}
          color='purple'
        />
        <StatCard
          title='Prochaine compétition'
          value={coachSummary?.nextCompetionName ?? "Non définie"}
          icon={Timer}
          color='orange'
          extra={
            coachSummary?.nextCompetionLocation
              ? `Lieu: ${coachSummary.nextCompetionLocation}`
              : "Lieu non défini"
          }
        />
      </SimpleGrid>

      <Box mt={12}>
        <Flex justify='center' align='center'>
          <Box mr={200}>
            <Image
              src='/logo.png'
              alt='Logo Sportika'
              width={250}
              height={160}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
