import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false ,isMe = false}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role) || "";
  const me = useSelector((state) => state.user?._id);
  const url= "https://events-cnio.onrender.com";

  const getPosts = async () => {
    const response = await fetch(`${url}/events`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data={};

    if(role === "admin"){
       data = await response.json();
    }else{
       const dat = await response.json();
       data = dat.filter(post => post.status === 'approved');
    }
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${url}/events/${userId}/events`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) &&  posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          venue,
          date,
          time,
          status,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            status={status}
            venue={venue}
            date={date}
            role={role}
            isMe = {(me === userId) ? true : false}
            isProfile={isProfile}
            time={time}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />

        )
      )}
    </>
  );
};

export default PostsWidget;
