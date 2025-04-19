import { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "@/hooks/useUser.js";

// Create Context
export const UserContext = createContext({
  user: null,
});

// Custom Provider
const MyProvider = ({ children }) => {
  const { loading, error, user, setUser } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node,
};

export default MyProvider;