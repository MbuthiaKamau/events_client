import { CancelOutlined, CheckCircleOutline, PendingOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath,isProfile,status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  _id  = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const icon = getStatusIcon(status);

  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  const url= "https://events-cnio.onrender.com";
  const patchFriend = async () => {
    const response = await fetch(
      `${url}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isProfile ? (
      <IconButton>
      {status === "approved" ?(<CheckCircleOutline color="success" fontSize="large"/>): (<>{status === "pending" ?(<PendingOutlined  color="primary" fontSize="large"/>):(<CancelOutlined color="error" fontSize="large"/>)}</>)}
  
      </IconButton>
      ) : (
        <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
      )}
      
    </FlexBetween>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'approved':
      return <CheckCircleOutline/>;
    case 'cancelled':
      return <CancelOutlined />;
    case 'pending':
      return <PendingOutlined  />;
    default:
      return null; // You can return some default icon or null for unknown status
  }
}; 



export default Friend;
