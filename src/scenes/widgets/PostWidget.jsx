import {
  CancelRounded,
  ChatBubbleOutlineOutlined,
  CheckCircleOutline,
  Delete,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost,setPosts } from "state";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  venue,
  date,
  status,
  isProfile,
  isMe,
  time,
  role,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [open, setOpen] = useState(false);
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
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id);
  const isLiked = true; // Boolean(likes[loggedInUserId]);
  const likeCount = 10; //Object.keys(likes).length;


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const url= "https://events-cnio.onrender.com";

  const patchLike = async () => {
    const response = await fetch(
      `${url}/events/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const saveStatus = async (status) =>{
    const response = await fetch(
      `${url}/events/${postId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: status }),
      }
    );
    toast.success("Event status changed suceessfully");
    const posts = await response.json();
    dispatch(setPosts({ posts }));
  }

  const deleteEvent = async (status) =>{
    const response = await fetch(
      `${url}/events/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );

    toast.error("Event Deleted successfully");
    const posts = await response.json();
    dispatch(setPosts({ posts }));
  }

 

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        isProfile={isProfile}
        status={status}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Venue: {venue}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        Status: {status}
      </Typography>

      {role && role === "admin" ? (
        <>
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
        </>
      ) : (
        <>
          {isProfile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                padding: "0.2rem 2rem ",
                backgroundColor: palette.background.default,
                borderRadius: "0.75rem",
                marginTop: "0.7rem",
              }}
            >
              <IconButton>
                <Delete color="error" fontSize="large" sx={iconStyles} />
              </IconButton>
            </Box>
          ) : (
            ""
          )}
        </>
      )}

      <Typography color={main} sx={{ mt: "1rem" }}>
        Date: {date.substring(0, 10)} at {time}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${url}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
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

export default PostWidget;
