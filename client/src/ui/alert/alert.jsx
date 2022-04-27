import { Alert, Container } from "@mui/material";

export function AlertInfo({ title, type = "error" }) {
  return (
    <Container maxWidth="sm">
      <Alert severity={type}>{title}</Alert>
    </Container>
  );
}
