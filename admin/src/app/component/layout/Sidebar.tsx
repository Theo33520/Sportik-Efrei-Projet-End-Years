"use client";

import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  Avatar,
} from "@chakra-ui/react";
import {
  Dumbbell,
  Home,
  Dumbbell as TrainingIcon,
  User,
  LogOut,
  ShieldCheck,
  Users,
  Trophy,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useUserRole } from "@/lib/hooks/useUserRole";

interface SideBarProps {
  isOpen: boolean;
  firstname: string;
  lastname: string;
  onLogout: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItemsByRole: Record<string, NavItem[]> = {
  ATHLETE: [
    { name: "Tableau de bord", path: "/dashboard", icon: Home },
    { name: "Entraînement", path: "/program", icon: TrainingIcon },
    { name: "Profil", path: "/profil", icon: User },
    { name: "Compétitions", path: "/competitions", icon: Trophy },
  ],
  COACH: [
    { name: "Tableau de bord", path: "/dashboard", icon: Home },
    { name: "Entraînement", path: "/coach/program", icon: TrainingIcon },
    { name: "Profil", path: "/profil", icon: User },
    { name: "Mes Athlètes", path: "/coach/athletes", icon: Users },
    { name: "Compétitions", path: "/coach/competitions", icon: Trophy },
  ],
  ADMINISTRATOR: [
    { name: "Tableau de bord", path: "/dashboard", icon: Home },
    { name: "Profil", path: "/profil", icon: User },
    { name: "Admin", path: "/admin", icon: ShieldCheck },
  ],
};


export default function SidebarDashboard({
  isOpen,
  firstname,
  lastname,
  onLogout,
}: SideBarProps) {
  const pathname = usePathname();
  const { userRole } = useUserRole();

  if (!isOpen) return null;

  const isActive = (path: string) => pathname === path;
  const navItems = userRole ? navItemsByRole[userRole] || [] : [];

  return (
    <Flex direction='column' bg='white' w='64' h='100vh' boxShadow='md'>
      {/* Header */}
      <Box p={5} borderBottom='1px solid' borderColor='gray.200'>
        <Flex align='center' gap={3} mb={4}>
          <Dumbbell size={22} color='#1A365D' />
          <Text fontSize='xl' fontWeight='bold' color='green.800'>
            Sportik
          </Text>
        </Flex>
      </Box>

      {/* Navigation */}
      <VStack align='stretch' spacing={1} p={4} flex='1' overflowY='auto'>
        {navItems.map((item) => (
          <ChakraLink
            as={NextLink}
            href={item.path}
            key={item.path}
            display='flex'
            alignItems='center'
            gap={3}
            px={3}
            py={2}
            borderRadius='md'
            fontWeight='medium'
            color={isActive(item.path) ? "green.1000" : "gray.600"}
            bg={isActive(item.path) ? "#B2F5EA" : "transparent"}
            _hover={{
              bg: "gray.100",
              textDecoration: "none",
              color: "blue.800",
            }}
            transition='all 0.2s'
          >
            <Icon as={item.icon} w={5} h={5} />
            <Text fontSize='sm'>{item.name}</Text>
          </ChakraLink>
        ))}
      </VStack>

      {/* Footer */}
      <Box p={4} borderTop='1px solid' borderColor='gray.200'>
        <Flex align='center' gap={3}>
          <Avatar name={`${firstname} ${lastname}`} size='sm' />
          <Box flex='1'>
            <Text fontSize='sm' fontWeight='medium'>
              {firstname} {lastname}
            </Text>
            <Text fontSize='xs' color='gray.500'>
              {userRole ? `Rôle : ${userRole}` : "Chargement..."}
            </Text>
            <Button
              variant='ghost'
              size='xs'
              colorScheme='red'
              leftIcon={<LogOut size={14} />}
              mt={1}
              onClick={onLogout}
              _hover={{ bg: "red.50" }}
            >
              Déconnexion
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
