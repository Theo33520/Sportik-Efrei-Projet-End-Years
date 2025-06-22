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
import { getListAthlete, getUser } from "@/app/utils/fetchAuth";
import { UserDto } from "../../../../../api/src/generated/typing";
import CreateAthleteForm from "./components/FormCreation";
import AthleteList from "./components/AthleteList";

const MyAthlete = async () => {
  const userConnected = await getUser();
  const listAthletes = (await getListAthlete(
    userConnected?.user_id ?? "",
  )) as UserDto[];



  return (
      <Box p={{ base: 4, md: 8 }} maxW='6xl' mx='auto'>
        <Box mb={10} textAlign='center'>
          <Heading size='xl'>Mes Athlètes</Heading>
          <Text color='gray.500' mt={2}>
            Gérez vos athlètes et suivez leurs performances ici.
          </Text>
        </Box>

        <Tabs variant='soft-rounded' colorScheme='teal' isFitted>
          <TabList mb={6}>
            <Tab>Gérer mes athlètes</Tab>
            <Tab>Créer un athlète</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AthleteList athletes={listAthletes}/>
            </TabPanel>

            <TabPanel>
              {userConnected && <CreateAthleteForm user={userConnected} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
};

export default MyAthlete;