import { useEffect, useState } from "react";
import { IUser } from "../interface";
import { internalRequest } from "../utils/request";

const useCurrentUser = () => {
  const [user, setUser] = useState<IUser>();

  const getUser = async () => {
    try {
      const res = JSON.parse(localStorage.getItem("user") ?? "");
      setUser(res);
    } catch (error) {}
  };

  const getMe = async () => {
    try {
      const res = await internalRequest.get("/users/me");
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    getMe,
  };
};

export default useCurrentUser;
