import { TeamWithMembers } from "@/lib/schema";
import { getAllTeamsWithMembers } from "@/lib/db";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";

export const revalidate = 15;

export default async function TeamsPage() {
  const teams = await getAllTeamsWithMembers();

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        Competitive Teams
      </Typography>
      <Grid container spacing={3}>
        {teams.map((team: TeamWithMembers) => (
          <Grid item xs={12} key={team.id}>
            <Paper className="p-4">
              <Typography variant="h5" className="mb-2">
                {team.name}
              </Typography>
              <Typography variant="body1" className="mb-4">
                {team.description}
              </Typography>
              <Typography variant="h6" className="mb-2">
                Team Members
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {team.members.map((member) => (
                  <Chip
                    key={`${team.id}-${member.id}`}
                    label={`${member.first_name} ${member.last_name} (${member.team_role})`}
                    variant="outlined"
                    className="mb-1"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
