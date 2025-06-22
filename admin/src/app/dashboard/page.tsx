import { Box, Heading, Text } from "@chakra-ui/react";
import { getSummaryCoach, getUser, getUserSummary } from "@/app/utils/fetchAuth";
import AthleteDashboard from "./components/AtheleteDashboard";
import CoachDashboard from "./components/CoachDashboard";


export default async function UserDashboardPage() {
  const user_data = await getUser();
  const userSummary = user_data?.user_id
    ? await getUserSummary(user_data.user_id)
    : null;
  const coachSummary = user_data?.user_id
    ? await getSummaryCoach(user_data.user_id)
    : null;

  console.log("coachSummary", coachSummary);
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

      {user_data?.role === "COACH" ? (
        coachSummary ? (
          coachSummary ? (
            <CoachDashboard coachSummary={coachSummary} />
          ) : null
        ) : null
      ) : userSummary ? (
        <AthleteDashboard userSummary={userSummary} />
      ) : null}
    </Box>
  );
}
