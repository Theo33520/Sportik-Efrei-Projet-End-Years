"use client";

import { Divider, Text, VStack, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/core/client";
import { PerformanceDto } from "@sportik/api/dist/src/generated/typing";
import { memo } from "react";
import { useParams } from "next/navigation"; // App Router

const Performance = () => {
  const params = useParams();
  const userId = params?.id as string;

  const { data: performances } = useQuery<PerformanceDto[]>({
    queryKey: ["performance", userId],
    queryFn: () => api.performance.getAllPerformancesByUserId(userId),
    enabled: !!userId,
  });

  return (
    <Box>
      <VStack align='start' spacing={4}>
        <Text fontSize='2xl' fontWeight='bold'>
          Performance
        </Text>
        <Divider />
      </VStack>

      <VStack align='stretch' spacing={4} py={6}>
        {performances?.map((perf, index) => (
          <Box
            key={index}
            p={4}
            shadow='md'
            borderWidth='1px'
            borderRadius='md'
          >
            <Text fontWeight='bold'>Performance #{index + 1}</Text>
            <Divider my={2} />
            <Text>Date: {new Date(perf.date).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default memo(Performance);
