// components/layout/SidebarClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Sidebar from "@/app/component/layout/Sidebar";
import SidebarDashboard from "@/app/component/layout/Sidebar";

export default function SidebarClient({
                                          user,
                                      }: {
    user: { firstname: string; lastname: string };
}) {
    const router = useRouter();
    const toast = useToast();

    const handleLogout = async () => {
        try {
            toast({
                title: "Déconnecté",
                description: "Vous avez été déconnecté",
                status: "info",
                duration: 1500,
                isClosable: true,
            });
            router.push("/");
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la déconnexion.",
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <SidebarDashboard
            isOpen={true}
            firstname={user?.firstname}
            lastname={user?.lastname}
            onLogout={handleLogout}
        />
    );
}
