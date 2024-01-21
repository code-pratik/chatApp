

import{ LoginPage }from "../pages/Login/login";
import PathConstants from "./pathConstents";


export default function routes() {
  const   {LOGIN,SIGNUP} = PathConstants
  return [
    {
        path:"*",
        element: "",
    },
    {
      path: LOGIN,
      element: <LoginPage />,
    },
    {
      path: SIGNUP,
      element: <LoginPage />,
    },
   
  ];
}
