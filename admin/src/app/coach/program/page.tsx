import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { getListAthlete, getListProgramFromCoach, getUser } from "@/app/utils/fetchAuth";
import ProgramCard from "./components/CardProgram";
import CreateProgramForm from "./components/CreateProgramForm";

const Program = async () => {
  const userConnected = await getUser();
  const listProgrammes = await getListProgramFromCoach(userConnected?.user_id ?? "");
  const listAthlete = await getListAthlete(userConnected?.user_id ?? "");

  if (!userConnected) {
    return <Text>Vous avez été déconnecté</Text>;
  }

  if (!listProgrammes) {
    return <Text>Vous n&apos;avez pas de programmes d&apos;entraînement.</Text>;
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW='6xl' mx='auto'>
      <Box mb={10} textAlign='center'>
        <Heading size='xl'>Programmes d&apos;entrainement</Heading>
        <Text color='gray.500' mt={2}>
          Gérez vos athlètes et programmes d&apos;entraînement
        </Text>
      </Box>

      <Tabs variant='soft-rounded' colorScheme='teal' isFitted>
        <TabList mb={6}>
          <Tab>Visualiser les programmes</Tab>
          <Tab>Nouveau Programme</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProgramCard program={listProgrammes} />
          </TabPanel>
          <TabPanel>
            <CreateProgramForm userConnect={userConnected} listAthlete={listAthlete} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Program;
