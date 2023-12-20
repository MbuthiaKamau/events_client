import {
  EditOutlined,
  DeleteOutlined,
  Add,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { toast } from "react-toastify";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [eventname, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const url= "https://events-cnio.onrender.com";
  // const neutralLight = palette.neutral.light;
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    formData.append("time",time);
    formData.append("date",date);
    formData.append("category",category);
    formData.append("venue",venue);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${url}/events`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    toast.success("Event recorded successfully.");
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setEventName("");
    setCategory("");
    setDate("");
    setTime("");
    setVenue("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Describe your event here..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isAdd && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            marginY={1}
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            <TextField
              required
              label="Event Name"
              name="name"
              sx={{ gridColumn: "span 2" }}
              onChange={(e) => setEventName(e.target.value)}
              value={eventname}
            />
            <TextField
              required
              label="Event venue"
              name="venue"
              onChange={(e) => setVenue(e.target.value)}
              value={venue}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel
                sx={{
                  backgroundColor: palette.background.alt,
                  padding: ".3rem .7rem",
                }}
              >
                Category
              </InputLabel>
              <Select
                variant="outlined"
                required
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                sx={{
                  borderRadius: "0.25rem",
                  p: "0.2rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                  },
                }}
              >
                <MenuItem value="Cumpus event">Cumpus event</MenuItem>
                <MenuItem value="Networking">Networking</MenuItem>
                <MenuItem value="Professional Development">
                  Professional Development
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              label="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              required
              label="Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              name="time"
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsAdd(!isAdd)}>
          <Add sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            New
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <></>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            borderRadius: "3rem",
            color: mediumMain,
            "&:hover": { cursor: "pointer", color: medium },
          }}
        >
          Save
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
