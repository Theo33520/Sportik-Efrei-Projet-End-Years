import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { Edit, Save } from "lucide-react";
import { getUser } from "../utils/fetchAuth";
import { updateUserAction } from "../actions/updateProfilForm";

const Profil = async () => {
  const user = await getUser();

  return (
    <Box p={6}>
      <Box mb={6}>
        <Heading size='lg'>Profil</Heading>
        <Text color='gray.500'>
          Gérez vos informations personnelles et préférences
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
        <Box
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          p={4}
          bg='white'
          shadow='sm'
        >
          <VStack spacing={4} textAlign='center'>
            <Box position='relative'>
              <Avatar
                size='xl'
                name={`${user.firstname}`}
                src='/placeholder.svg'
              />
              <IconButton
                aria-label='Modifier la photo'
                icon={<Edit size={16} />}
                size='sm'
                variant='outline'
                rounded='full'
                position='absolute'
                bottom={0}
                right={0}
              />
            </Box>
            <Heading size='md'>
              {user.firstname} {user.lastname}
            </Heading>

            <Divider />

            <Stack spacing={2} w='full' fontSize='sm'>
              <InfoRow label='Email' value={user.email} />
              <InfoRow label='Prénom' value={user.firstname} />
              <InfoRow label='Nom' value={user.lastname} />
              <InfoRow label='Club' value={user.clubName} />
            </Stack>
          </VStack>
        </Box>

        <Box
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          p={4}
          bg='white'
          shadow='sm'
        >
          <Tabs variant='enclosed' colorScheme='teal'>
            <TabList>
              <Tab>Informations</Tab>
            </TabList>

            <TabPanels mt={4}>
              <TabPanel>
                <form action={updateUserAction}>
                  <Stack spacing={4}>
                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      <FormField
                        label='Prénom'
                        name='firstname'
                        defaultValue={user.firstname}
                      />
                      <FormField
                        label='Nom'
                        name='lastname'
                        defaultValue={user.lastname}
                      />
                    </Grid>
                    <FormField
                      label='Email'
                      name='email'
                      defaultValue={user.email}
                    />
                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                    </Grid>
                    <Button
                      colorScheme='teal'
                      leftIcon={<Save size={16} />}
                      type='submit'
                    >
                      Enregistrer les modifications
                    </Button>
                  </Stack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  );
};

export default Profil;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box display='flex' justifyContent='space-between' color='gray.600'>
    <Text>{label}:</Text>
    <Text fontWeight='medium'>{value}</Text>
  </Box>
);

const FormField = ({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input name={name} defaultValue={defaultValue} type={type} />
  </FormControl>
);
