import { Box, Heading, Text } from "@chakra-ui/react";
import {
  getSummaryCoach,
  getUser,
  getUserSummary,
} from "@/app/utils/fetchAuth";
import AthleteDashboard from "./components/AtheleteDashboard";
import CoachDashboard from "./components/CoachDashboard";
import AdminDashboard from "./components/AdminDashboard";


export default async function UserDashboardPage() {
  const user_data = await getUser();

  const userId = user_data?.user_id;
  const role = user_data?.role;

  const [userSummary, coachSummary] = await Promise.all([
    role === "ATHLETE" && userId ? getUserSummary(userId) : null,
    role === "COACH" && userId ? getSummaryCoach(userId) : null,
  ]);

  return (
    <Box p={6}>
      <Box mb={6}>
        <Heading as='h1' size='lg'>
          Tableau de bord
        </Heading>
        <Text color='gray.500'>
          Bienvenue sur votre tableau de bord Sportika
        </Text>
      </Box>

      {role === "COACH" && coachSummary && (
        <CoachDashboard coachSummary={coachSummary} />
      )}

      {role === "ATHLETE" && userSummary && (
        <AthleteDashboard userSummary={userSummary} />
      )}

      {role === "ADMINISTRATOR" && <AdminDashboard />}
    </Box>
  );
}
