import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";

const Admin = () => (
  <Box p={6}>
    <Box mb={6}>
      <Heading as='h1' size='lg'>
        Espace réservé aux administrateurs
      </Heading>
    </Box>
    <Tabs>
      <TabList>
        <Tab>Utilisateurs</Tab>
        <Tab>Créer des utilisateurs</Tab>
      </TabList>

      <TabPanels>
        {/* Onglet Utilisateurs */}
        <TabPanel>
          <Heading as='h2' size='md' mb={4}>
            Liste des utilisateurs
          </Heading>
          {/* Ajoutez ici la liste des utilisateurs */}
          <Box>
            <p>Aucun utilisateur pour le moment.</p>
          </Box>
        </TabPanel>

        {/* Onglet Créer des utilisateurs */}
        <TabPanel>
          <Heading as='h2' size='md' mb={4}>
            Créer un utilisateur
          </Heading>
          {/* Ajoutez ici un formulaire ou des actions pour créer un utilisateur */}
          <Button colorScheme='teal'>Créer un nouvel utilisateur</Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default Admin;
