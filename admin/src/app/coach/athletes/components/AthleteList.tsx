"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaTag,
  FaUniversity,
} from "react-icons/fa";
import { UserDto } from "../../../../../../api/src/generated/typing";

const AthleteCard = ({ athlete }: { athlete: UserDto }) => {
  return (
    <Box
      p={6}
      borderWidth='1px'
      borderRadius='xl'
      shadow='md'
      _hover={{ shadow: "lg", transform: "scale(1.02)" }}
      transition='all 0.2s ease-in-out'
    >
      <VStack align='start' spacing={2}>
        <HStack>
          <Icon as={FaUser} color='blue.500' />
          <Heading size='md'>
            {athlete.firstname} {athlete.lastname}
          </Heading>
        </HStack>

        <HStack>
          <Icon as={FaEnvelope} />
          <Text fontSize='sm'>{athlete.email}</Text>
        </HStack>

        <HStack>
          <Icon as={FaPhone} />
          <Text fontSize='sm'>{athlete.phoneNumber ?? "Non renseigné"}</Text>
        </HStack>

        <HStack>
          <Icon as={FaBirthdayCake} />
          <Text fontSize='sm'>Âge : {athlete.Age ?? "Non renseigné"}</Text>
        </HStack>

        <HStack>
          <Icon as={FaMapMarkerAlt} />
          <Text fontSize='sm'>{athlete.address ?? "Non renseigné"}</Text>
        </HStack>

        <HStack>
          <Icon as={FaTag} />
          <Text fontSize='sm'>
            Catégorie :{" "}
            <Badge colorScheme='purple'>
              {athlete.athleteCategory ?? "Non renseigné"}
            </Badge>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaUniversity} />
          <Text fontSize='sm'>{athlete.clubName ?? "Non renseigné"}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

const AthleteList = ({ athletes }: { athletes: UserDto[] }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {athletes.map((athlete) => (
        <AthleteCard key={athlete.user_id} athlete={athlete} />
      ))}
    </SimpleGrid>
  );
};

export default AthleteList;
