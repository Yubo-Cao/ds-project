import { CompetitiveTeam } from "@/db/schema";
import { getAllTeams } from "@/lib/db";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default async function TeamsPage() {
  const teams = await getAllTeams();

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        Competitive Teams
      </Typography>
      <Paper className="p-4">
        <List>
          {teams.map((t: CompetitiveTeam) => (
            <ListItem key={t.id} className="flex flex-col items-start">
              <Typography variant="h6">{t.name}</Typography>
              <ListItemText primary={t.description} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
