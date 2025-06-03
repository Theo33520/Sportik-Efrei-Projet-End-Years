"use client"

import {
    Box,
    Flex,
    Icon,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    VStack,
    Link as ChakraLink,
    Button,
    Avatar,
} from "@chakra-ui/react"
import {
    Dumbbell,
    Home,
    Bell,
    Dumbbell as TrainingIcon,
    User,
    BarChart3,
    LogOut,
    Search,
} from "lucide-react"
import {  usePathname } from "next/navigation"
import { useState } from "react"
import NextLink from "next/link"

interface SideBarProps {
    isOpen: boolean
    firstname: string
    lastname: string
    onLogout: () => void
}

const navItems = [
    { name: "Tableau de bord", path: "/dashboard", icon: Home },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
    { name: "Entraînement", path: "/dashboard/training", icon: TrainingIcon },
    { name: "Profil", path: "/dashboard/profile", icon: User },
    { name: "Performance", path: "/dashboard/performance", icon: BarChart3 },
]

export default function SidebarDashboard({ isOpen, firstname, lastname, onLogout }: SideBarProps) {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")

    const isActive = (path: string) => pathname === path

    if (!isOpen) return null

    return (
        <Flex direction="column" bg="white" w="64" h="100vh" boxShadow="md">
            {/* Header */}
            <Box p={5} borderBottom="1px solid" borderColor="gray.200">
                <Flex align="center" gap={3} mb={4}>
                    <Dumbbell size={22} color="#1A365D" /> {/* bleu marine */}
                    <Text fontSize="xl" fontWeight="bold" color="blue.800">
                        Sportika
                    </Text>
                </Flex>

                {/* Search */}
                <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none">
                        <Search size={16} color="gray" />
                    </InputLeftElement>
                    <Input
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        pl="30px"
                        bg="gray.50"
                        _placeholder={{ color: "gray.400" }}
                        _focus={{ borderColor: "blue.400", boxShadow: "sm" }}
                    />
                </InputGroup>
            </Box>

            {/* Navigation */}
            <VStack align="stretch" spacing={1} p={4} flex="1" overflowY="auto">
                {navItems.map((item) => (
                    <ChakraLink
                        as={NextLink}
                        href={item.path}
                        key={item.path}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        px={3}
                        py={2}
                        borderRadius="md"
                        fontWeight="medium"
                        color={isActive(item.path) ? "blue.800" : "gray.600"}
                        bg={isActive(item.path) ? "blue.100" : "transparent"}
                        _hover={{
                            bg: "gray.100",
                            textDecoration: "none",
                            color: "blue.800",
                        }}
                        transition="all 0.2s"
                    >
                        <Icon as={item.icon} w={5} h={5} />
                        <Text fontSize="sm">{item.name}</Text>
                    </ChakraLink>
                ))}
            </VStack>

            {/* Footer */}
            <Box p={4} borderTop="1px solid" borderColor="gray.200">
                <Flex align="center" gap={3}>
                    <Avatar name={`${firstname} ${lastname}`} size="sm" />
                    <Box flex="1">
                        <Text fontSize="sm" fontWeight="medium">
                            {firstname} {lastname}
                        </Text>
                        <Button
                            variant="ghost"
                            size="xs"
                            colorScheme="red"
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
    )
}
