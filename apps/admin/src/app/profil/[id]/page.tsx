'use client'

import {
    Avatar,
    AvatarBadge,
    Divider,
    Text,
    HStack,
    VStack,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Input,
    FormControl,
    FormLabel,
    Button,
    useToast
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/app/core/client";
import { useParams } from "next/navigation";
import { capitalize } from "@/app/utils/capitalize";
import { UserProfileDto } from "@sportik/api/dist/src/generated/typing";
import { useState, useEffect } from "react";

const Profil = () => {
    const params = useParams();
    const toast = useToast();
    const { data: user, isLoading, error } = useQuery<UserProfileDto>({
        queryKey: ['user', params.id],
        queryFn: () => api.user.getUserByIdToProfil(params.id as string),
    });

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
        }
    }, [user]);

    const mutation = useMutation({
        mutationFn: async () => {
            const userData = {
                firstname,
                lastname,
                email,
            };

            await api.user.updateUser(params.id as string, userData);
        },
        onSuccess: () => {
            toast({
                title: 'Informations mises à jour',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la mise à jour des informations.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });


    const handleSave = () => {
        mutation.mutate();
    };

    return (
        <VStack align="start" spacing={4}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Profil</Tab>
                    <Tab>Paramètres</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">
                                {user ? capitalize(user.firstname) + ' ' + capitalize(user.lastname) : 'Chargement...'}
                            </Text>
                            <Divider />
                            <HStack spacing={4} align="center">
                                <Avatar>
                                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                                </Avatar>
                                {user && (
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="xl" fontWeight="bold">
                                            {capitalize(user.firstname)} {capitalize(user.lastname)}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                                    </VStack>
                                )}
                            </HStack>

                            <Divider />
                            <VStack align="start" spacing={2}>
                                <Text fontSize="lg" fontWeight="bold">Détails du profil</Text>
                                <Text><strong>Nom complet:</strong> {user ? capitalize(user.firstname) + ' ' + capitalize(user.lastname) : 'Chargement...'}</Text>
                                <Text><strong>Type d'utilisateur:</strong> {user?.role || 'Non spécifié'}</Text>
                                <Text><strong>Rôle utilisateur:</strong> {user?.role || 'Non spécifié'}</Text>
                            </VStack>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack align="start" spacing={6}>
                            <Text fontSize="xl" fontWeight="bold" color="gray.700">Modifiez vos informations</Text>

                            <HStack spacing={6} width="full">
                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">
                                        Prénom<Text as="span" color="red.500"> *</Text>
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        placeholder="Prénom"
                                        size="sm"
                                        bg="gray.50"
                                        _hover={{ bg: "gray.100" }}
                                        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">
                                        Nom de famille<Text as="span" color="red.500"> *</Text>
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Nom de Famille"
                                        size="sm"
                                        bg="gray.50"
                                        _hover={{ bg: "gray.100" }}
                                        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                                    />
                                </FormControl>
                            </HStack>

                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">
                                    Email<Text as="span" color="red.500"> *</Text>
                                </FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    size="sm"
                                    required
                                    bg="gray.50"
                                    _hover={{ bg: "gray.100" }}
                                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                                />
                            </FormControl>

                            <HStack spacing={4} mt={6}>
                                <Button bg="#41b49f" padding={4} size="sm" width="full" color="white" _hover={{ bg: "#41b48f" }} onClick={handleSave}>
                                    Enregistrer
                                </Button>
                                <Button variant="outline" size="sm" width="full" _hover={{ bg: "gray.200" }}>
                                    Annuler
                                </Button>
                            </HStack>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default Profil;
