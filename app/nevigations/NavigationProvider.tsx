// import React, { createContext, useContext, useState } from "react";

// interface AuthContextType {
//     isAuthenticated: boolean;
//     setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function useAuth() {
//     return useContext(AuthContext);
// }

// import { ReactNode } from "react";

// export default function NavigationProvider({ children }: { children: ReactNode }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
