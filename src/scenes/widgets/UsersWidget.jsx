import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "state";
import UserWidget from "./UserWidget";
import { Box } from "@mui/material";

const UsersWidget = ({ userId, isProfile = false ,isMe = false}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role) || "";
  const url= "https://events-cnio.onrender.com";

  const getUsers = async () => {
    const response = await fetch(`${url}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data={};

    if(role === "admin"){
       data = await response.json();
    }else{
       data = {};
    }
    console.log(data);
    dispatch(setUsers({ data }));
    setData(data);
  };

 

  useEffect(() => {
      getUsers();
      console.log(users);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(data) &&  data.map(
        ({
          _id,
          picturePath
          
        }) => (
          <Box
          sx={{marginBottom:"2rem"}}
          key={_id}
          >
             <UserWidget
            userId = {_id}
             picturePath = {picturePath}
             isUsers = "true"
            />
          </Box>
         

        )
      )}
    </>
  );
};

export default UsersWidget;
