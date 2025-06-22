import { Box, Text, Heading } from "@chakra-ui/react";
import { getDataUser, getUser } from "../utils/fetchAuth";
import CompetitionCard from "./components/CompetitionCard";


const Competition = async () => {
  const user = await getUser();

  if (!user) {
    return <div>Vous avez été déconnecté</div>;
  }

  const listCompetitions = await getDataUser(user.user_id ?? "");

  return (
    <Box p={{ base: 4, md: 8 }} maxW='6xl' mx='auto'>
      <Box mb={10} textAlign='center'>
        <Heading size='xl'>Programmes d&apos;entrainement</Heading>
        <Text color='gray.500' mt={2}>
          Gérez vos athlètes et programmes d&apos;entraînement
        </Text>
      </Box>
      {listCompetitions && <CompetitionCard competition={listCompetitions} />}
    </Box>
  );
};

export default Competition;
