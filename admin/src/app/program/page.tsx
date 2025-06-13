import {
  Box,
  Button,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  Link,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Eye, FileDown } from "lucide-react";

const programs = [
  {
    title: "Programme Musculation - Juin 2025",
    description: "Programme détaillé de musculation pour le mois de juin",
    pages: 12,
    updatedAt: "01/06/2025",
    size: "2.4 MB",
    viewUrl: "/view/musculation-juin-2025",
    downloadUrl: "/pdfs/musculation-juin-2025.pdf",
  },
  {
    title: "Plan Cardio - Juin 2025",
    description: "Programme d'entraînement cardio pour le mois de juin",
    pages: 8,
    updatedAt: "01/06/2025",
    size: "1.8 MB",
    viewUrl: "/view/cardio-juin-2025",
    downloadUrl: "/pdfs/cardio-juin-2025.pdf",
  },
  // Ajoute les autres programmes ici...
];

const ProgramCard = ({ program }) => (
  <Box
    borderWidth='1px'
    borderRadius='md'
    p={4}
    bg='white'
    shadow='sm'
    w='full'
  >
    <Stack spacing={2}>
      <Heading size='sm'>{program.title}</Heading>
      <Text fontSize='sm' color='gray.600'>
        {program.description}
      </Text>
      <HStack spacing={4} fontSize='sm' color='gray.500'>
        <Text>{program.pages} pages</Text>
        <Text>•</Text>
        <Text>Mis à jour le {program.updatedAt}</Text>
        <Text>•</Text>
        <Text>{program.size}</Text>
      </HStack>
      <HStack justifyContent='flex-end'>
        <Link href={program.viewUrl}>
          <Button leftIcon={<Eye size={16} />} size='sm' variant='outline'>
            Voir
          </Button>
        </Link>
        <Link href={program.downloadUrl} isExternal>
          <Button
            leftIcon={<FileDown size={16} />}
            size='sm'
            colorScheme='green'
          >
            Télécharger
          </Button>
        </Link>
      </HStack>
    </Stack>
  </Box>
);

const ProgramList = () => (
  <Box p={6}>
    <Heading size='lg' mb={4}>
      Tous les Programmes
    </Heading>
    <Grid templateColumns='1fr' gap={4}>
      {programs.map((p) => (
        <ProgramCard key={p.title} program={p} />
      ))}
    </Grid>
  </Box>
);

export default ProgramList;
