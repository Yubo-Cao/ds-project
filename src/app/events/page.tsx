import { getAllEvents } from "@/lib/db";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        Events
      </Typography>
      <Paper className="p-4">
        <List>
          {events.map((e) => (
            <ListItem key={e.id} className="flex flex-col items-start">
              <Typography variant="h6">{e.name}</Typography>
              <ListItemText
                primary={`Date: ${format(
                  new Date(e.date),
                  "PPpp"
                )} | Location: ${e.location}`}
                secondary={e.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
