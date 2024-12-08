import { Member } from "@/db/schema";
import { getAllMembers } from "@/lib/db";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        Members
      </Typography>
      <Paper className="p-4">
        <List>
          {members.map((m: Member) => (
            <ListItem key={m.id}>
              <ListItemText
                primary={`${m.first_name} ${m.last_name}`}
                secondary={m.school_email}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
