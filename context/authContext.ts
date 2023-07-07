import { createContext } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
});

// export default AuthContext;
export const AuthProvider = AuthContext.Provider;

export default AuthProvider;
