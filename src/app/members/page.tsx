import { getAllMembers } from "@/lib/db";
import { MemberDetails } from "@/types/member-details";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import Grid from "@mui/material/Grid2";

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ p: 2 }}>
        Members
      </Typography>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, height: "80vh" }}>
        <Grid container spacing={2}>
          {members.map((member: MemberDetails) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={member.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.first_name} {member.last_name}
                  </Typography>

                  <Stack spacing={1}>
                    <Typography color="text.secondary">
                      {member.school_email}
                    </Typography>

                    <Divider />

                    {member.officer_roles.length > 0 && (
                      <>
                        <Typography variant="subtitle2">
                          Leadership Roles
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {member.officer_roles.map((role) => (
                            <Chip
                              key={role.name}
                              label={role.name}
                              color="primary"
                              size="small"
                            />
                          ))}
                        </Stack>
                      </>
                    )}

                    {member.divisions.length > 0 && (
                      <>
                        <Typography variant="subtitle2">Divisions</Typography>
                        <Stack direction="row" spacing={1}>
                          {member.divisions.map((div) => (
                            <Chip
                              key={div.name}
                              label={div.name}
                              color="secondary"
                              size="small"
                            />
                          ))}
                        </Stack>
                      </>
                    )}

                    <Typography variant="body2">
                      Joined:{" "}
                      {format(new Date(member.date_joined), "MMM dd, yyyy")}
                    </Typography>
                    <Typography variant="body2">
                      Graduating:{" "}
                      {format(new Date(member.graduation_year), "yyyy")}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
