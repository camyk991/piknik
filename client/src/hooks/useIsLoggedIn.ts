import { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { UserInfoType } from "../API";

export const useIsLoggedIn = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserInfoType>();

  useEffect(() => {
    const rawStoredData = localStorage.getItem('user'); 
    const userStoredData = rawStoredData ? JSON.parse(rawStoredData) : null;

		if (userStoredData && userStoredData.token) {
			const user = jwt(userStoredData.token)

			if (!user) {
				localStorage.removeItem('user')
        setLoggedIn(false);
			} else {
        setLoggedIn(true);
        setUserData(userStoredData);
        console.log(userStoredData)
      }

		} else {
      setLoggedIn(false);
    }
  }, [])

  return {loggedIn, setLoggedIn, userData, setUserData};
}