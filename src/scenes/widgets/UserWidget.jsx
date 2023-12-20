import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Delete,
  CancelRounded,
  CheckCircleOutline,
} from "@mui/icons-material";
import { setUsers } from "state";
import { Box, Typography, Divider, useTheme, IconButton, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserWidget = ({ userId, picturePath,isUsers }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [open, setOpen] = useState(false);
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

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    status,
    friends,
  } = user;

  const saveStatus = async (status) =>{
    const response = await fetch(
      `${url}/users/status/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: status }),
      }
    );
    toast.success("User status updated successfully")
    const updatedUser = await response.json();
    dispatch(setUsers({ updatedUser }));
  }

  const deleteEvent = async (status) =>{
    const response = await fetch(
      `${url}/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );
    toast.error("User deleted from system");
    const updatedUser = await response.json();
    dispatch(setUsers({ updatedUser }));
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    // Handle the confirmation logic here
    deleteEvent();
    setOpen(false);
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
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
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends && friends.length} friends</Typography>
            {isUsers ? (<Typography color={medium}>Status: {status}</Typography>) : ""}
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />
  {isUsers ? (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "4rem",
      padding: "0.2rem 2rem ",
      backgroundColor: palette.background.default,
      borderRadius: "0.75rem",
      marginTop: "0.7rem",
    }}
  >
    <IconButton onClick={handleClickOpen}>
      <Delete color="error" fontSize="large" sx={iconStyles} />
    </IconButton>
    <IconButton onClick={() =>saveStatus("rejected")}>
      <CancelRounded color="error" fontSize="large" sx={iconStyles} />
    </IconButton>
    <IconButton onClick={() =>saveStatus("approved")}>
      <CheckCircleOutline
        color="success"
        fontSize="large"
        sx={iconStyles}
      />
    </IconButton>
  </Box>
  ) : (<>
   {/* SECOND ROW */}
   <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
  </>)}
  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation Prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};
const iconStyles = {
  transition: "transform 0.2s, borderRadius 0.2s",
  "&:hover": {
    transform: "scale(1.1)", // Adjust the scale factor as needed for your hover effect
    borderRadius: "50%", // This makes the icon round on hover
  },
};
export default UserWidget;
