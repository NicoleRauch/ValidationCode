import {IUser, IUsers, ZUsers} from "./types";

export const postUser = (user: IUser): Promise<Response> => {
  return window.fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  });
};

export const fetchUsers = (): Promise<IUsers> =>
  window.fetch("/api/users") // load data
        .then((response) => response.json()) // parse as JSON
        .then(data => ZUsers.parse(data));

