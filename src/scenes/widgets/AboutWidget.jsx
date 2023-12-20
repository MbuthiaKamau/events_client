import { Box, Divider, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const AboutWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  return (
    <WidgetWrapper m="2rem 0">
      <Box mt="0.5rem">
        <Typography
          variant="h4"
          color={dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          {" "}
          About Us:
        </Typography>

        <Typography color={medium} m="0.5rem 0">
          {" "}
          At eAlumni, we are driven by a shared passion for fostering lifelong
          connections among university alumni. Founded by a dedicated group of
          former students, our mission is to create a dynamic online platform
          where alumni can collaborate, organize, and actively participate in a
          myriad of engaging events.
        </Typography>
        <Typography
          variant="h4"
          color={dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Our Vision:{" "}
        </Typography>
        <Typography color={medium} m="0.5rem 0">
          We envision a space where the ties forged during university days
          endure, and alumni can seamlessly connect with each other. eAlumni is
          not just a platform; it's a virtual hub that brings together alumni
          from various walks of life, providing them with opportunities to
          network, grow professionally, and relive campus memories.
        </Typography>
        
        <Typography
          variant="h4"
          color={dark}
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Join Us at eAlumni and Rediscover the Spirit of Connection:
        </Typography>
        <Typography color={medium} m="0.5rem 0">
          Whether you're a recent graduate or a seasoned professional, eAlumni
          welcomes you to a community where shared experiences thrive. Connect
          with old friends, explore new opportunities, and make the most of the
          diverse events that await you. Together, let's build a network that
          transcends time and distance.
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default AboutWidget;
