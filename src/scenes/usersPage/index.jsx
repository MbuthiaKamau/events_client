import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UsersWidget from "scenes/widgets/UsersWidget";
import UserWidget from "scenes/widgets/UserWidget";

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const url= "https://events-cnio.onrender.com";
  const getUser = async () => {
    const response = await fetch(`${url}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? "-2rem" : "2rem"}
        >
          <Box m="2rem 0" />
          <UsersWidget userId={userId} isProfile = "true" />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersPage;
