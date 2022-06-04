import { Alert, Container } from "@mui/material";

export function AlertInfo({ title, type = "error" }) {
  return (
    <Container maxWidth="sm">
      <Alert severity={type} sx={{ margin: "0 auto", maxWidth: "423px" }}>
        {title}
      </Alert>
    </Container>
  );
}
