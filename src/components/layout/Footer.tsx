import { Box, Container, Grid2, Typography, IconButton, Link, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Email, Phone, LocationOn, Facebook, X, Instagram, LinkedIn } from "@mui/icons-material";
const StyledFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.background.dark,
  padding: theme.spacing(6, 0),
  color: theme.palette.text.primary,
  transition: "all 0.3s ease-in-out",
  boxShadow: "0px -3px 4px -1px rgba(0,0,0,0.2), 0px -1px 5px 0px rgba(0,0,0,0.14), 0px -4px 10px 0px rgba(0,0,0,0.12)",
  position: "relative",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.text.primary,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    color: theme.palette.primary.main
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px"
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  transition: "color 0.2s ease",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: 0,
    height: "2px",
    background: theme.palette.primary.main,
    transition: "width 0.3s ease"
  },
  "&:hover::after": {
    width: "100%"
  },
  "&:hover": {
    color: theme.palette.primary.main
  }
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateX(5px)"
  }
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are dedicated to delivering unforgettable movie experiences, blending the magic of cinema with modern convenience.
            </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Services</FooterLink>
            <FooterLink href="#">Products</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Contact Info
          </Typography>
          <ContactItem>
            <LocationOn sx={{ mr: '8px' }} />
            <Typography variant="body2">123 Business Street, NY 10001</Typography>
          </ContactItem>
          <ContactItem>
            <Phone sx={{ mr: '8px' }} />
            <Typography variant="body2">+1 234 567 8900</Typography>
          </ContactItem>
          <ContactItem>
            <Email sx={{ mr: '8px' }} />
            <Typography variant="body2">contact@example.com</Typography>
          </ContactItem>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box>
            <Tooltip title="Facebook" arrow>
              <SocialButton aria-label="facebook">
                <Facebook />
              </SocialButton>
            </Tooltip>
            <Tooltip title="X" arrow>
              <SocialButton aria-label="twitter">
                <X />
              </SocialButton>
            </Tooltip>
            <Tooltip title="Instagram" arrow>
              <SocialButton aria-label="instagram">
                <Instagram />
              </SocialButton>
            </Tooltip>
            <Tooltip title="LinkedIn" arrow>
              <SocialButton aria-label="linkedin">
                <LinkedIn />
              </SocialButton>
            </Tooltip>
          </Box>
        </Grid2>
      </Grid2>

      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid" }}>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} CinemaHub. All rights reserved.
        </Typography>
      </Box>
    </Container>
    </StyledFooter >
  );
};

export default Footer;