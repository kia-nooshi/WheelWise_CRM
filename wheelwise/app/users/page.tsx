'use client'

import { signOut } from "next-auth/react";
import Button from "../components/Button";

const Users = () => {
  return (
    <div>
      THIS IS USER PAGE 
      <Button onClick={() => signOut()} type="submit">Log out</Button>
    </div>
   );
}

export default Users;