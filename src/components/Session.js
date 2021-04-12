import * as Cookies from "js-cookie";
import React from 'react';
export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 1 });
};
export const setName = (name) => {
  Cookies.remove("name");
  Cookies.set("name", name, { expires: 1 });
};
export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");
  if (sessionCookie === undefined) {
    return undefined;
  } else {
    return sessionCookie;
  }
};
export const getName = () => {
  const name = Cookies.get("name");
  if (name === undefined) {
    return undefined;
  } else {
    return name;
  }
};
export const SessionContext = React.createContext(getSessionCookie())