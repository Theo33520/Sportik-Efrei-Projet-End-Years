
import {
  Box,
  Heading,
  Text
} from "@chakra-ui/react";


const Notifications = async () => {
  return (
    <Box p={6}>
      <Box mb={6}>
        <Heading as='h1' size='lg'>
          Notifications
        </Heading>
        <Text color='gray.500'>
          Restez informé de vos activités et mises à jour
        </Text>
      </Box>
    </Box>
  );
};

export default Notifications;