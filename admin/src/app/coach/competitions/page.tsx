import { Box, Text, Heading, Tab, TabList, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import {
  getListAthlete,
  getListCompetitionFromCoach,
  getUser,
} from "@/app/utils/fetchAuth";
import CreateCompetitionForm from "./components/CreateCompetitionForm";
import CompetitionCard from "./components/CompetitionCard";

const Competitions = async () => {
  const userConnected = await getUser();
  const listAthlete = await getListAthlete(userConnected?.user_id ?? "");
  const listCompetitions = await getListCompetitionFromCoach(userConnected?.user_id ?? "");
  if (!userConnected) {
    return <Text>Vous avez été déconnecté</Text>;
  }
  return (
    <Box p={{ base: 4, md: 8 }} maxW='6xl' mx='auto'>
      <Box mb={10} textAlign='center'>
        <Heading size='xl'>Compétitions</Heading>
        <Text color='gray.500' mt={2}>
          Gérez les compétions de vos athlete;
        </Text>
      </Box>

      <Tabs variant='soft-rounded' colorScheme='teal' isFitted>
        <TabList mb={6}>
          <Tab>Visualiser les compétitions</Tab>
          <Tab>Nouvelle Compétitions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CompetitionCard competition={listCompetitions} />
          </TabPanel>
          <TabPanel>
            <CreateCompetitionForm
              userConnect={userConnected}
              listAthlete={listAthlete}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Competitions;
