import React, {ReactElement} from "react";

import {IUser} from "./types";

type UserProps = {
  user: IUser
}

const User = ({user:{firstName, lastName}}: UserProps): ReactElement =>
  <div>
    <span>First name: </span><span>{firstName}</span><br/>
    <span>Last name: </span><span>{lastName}</span><br/>
  </div>;

export default User;
