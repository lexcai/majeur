import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/themes/mui-base-components/ProTip";
import Link from "../src/themes/mui-base-components/Link";
import Copyright from "../src/themes/mui-base-components/Copyright";

export default function Index() {
  // make a landing home page here with a button to go to the sign-in page
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome to the Home Page
        </Typography>
        <Link href="/ui/sign-up" color="secondary">
          Go to the sign-up page
        </Link>
        <ProTip />
        <Link href="/ui/sign-in" color="secondary">
          Go to the sign-in page
        </Link>
        <ProTip />
        <Link href="/ui/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Link href="/ui/landing" color="secondary">
          Go to the landing page
        </Link>
        <ProTip />
      </Box>
    </Container>
  );
}
