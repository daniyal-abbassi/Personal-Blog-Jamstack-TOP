import { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "./hooks/useUser";

// Create Context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: true, // Add loading to default value
  error: null,   // Add error to default value
});

// Custom Provider
export const MyProvider = ({ children }) => {
  const { loading, error, user, setUser, isAuthenticated, setIsAuthenticated } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node,
};

// export default MyProvider;