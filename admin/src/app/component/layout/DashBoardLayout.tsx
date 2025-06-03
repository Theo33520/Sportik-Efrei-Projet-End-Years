// components/layout/DashboardLayout.tsx
import { Box, HStack } from "@chakra-ui/react";
import SidebarClient from "@/app/component/SideBarClient";

export default function DashboardLayout({
                                            children,
                                            user
                                        }: {
    children: React.ReactNode;
    user: { firstname: string; lastname: string } | null;
}) {
    return (
        <HStack height="100vh" align="stretch">
            {user && (
                <Box w="250px">
                    <SidebarClient user={user} />
                </Box>
            )}
            <Box
                flex="1"
                bg="gray.50"
                p= {8}
                overflowY="auto"
            >
                {children}
            </Box>
        </HStack>
    );
}
