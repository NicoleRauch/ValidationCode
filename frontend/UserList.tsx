import {useQuery} from "@tanstack/react-query";
import React, {ReactElement} from "react";
import {object, ZodError} from "zod";

import User from "./User";
import {fetchUsers} from "./backendCalls";


const UserList = (): ReactElement => {
  const {data: users, isError, error} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData: []
  });

  console.log("users: ", users);

  if(isError){
    return <div>{(error as ZodError).issues.map(m => <div>{m.message}, at {m.path.join(".")}</div>)}</div>
  }

  return <ul>
    {users.map(user => <li key={"userlist_" + user.firstName + user.lastName}><User user={user}/></li>)}
  </ul>;
};

export default UserList;
