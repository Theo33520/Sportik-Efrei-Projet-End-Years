'use client';

import { Box, HStack } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getUser } from '../utils/user';
import SidebarDashboard from "@/app/component/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const toast = useToast();
    const user = getUser();


    const handleLogout = async () => {
        try {
            toast({
                title: "Déconnecté",
                description: "Vous avez été déconnecté",
                status: "info",
                duration: 1500,
                isClosable: true,
            });
            router.push('/');
        } catch (e) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la déconnexion.",
                status: "error",
                duration: 1500,
                isClosable: true,
            });
            console.error(e);
        }
    };

    return (
        <HStack height='100vh' align='stretch'>
            {user && (
                <Box w='250px'>
                    <SidebarDashboard
                        isOpen={true}
                        firstname={user?.firstname}
                        lastname={user?.lastname}
                        onLogout={handleLogout}
                    />

                </Box>
            )}
            <Box
                flex='1'
                bg='gray.50'
                p={8}
                overflowY='auto'
            >
                {children}
            </Box>
        </HStack>
    );
}
