import React from "react";
import { BskyAgent } from "@atproto/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [agent, setAgent] = React.useState(null);

  // define login function
  const login = async (email, password) => {
    try {
      await agent.login({ identifier: email, password });
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("sessionData");
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  // check if user is logged in
  React.useEffect(() => {
    if (isLoading) {
      const initializeAgent = async () => {
        const bskyAgent = new BskyAgent({
          service: "https://bsky.social/",
          persistSession: async (evt, sess) => {
            if (sess) {
              await AsyncStorage.setItem("sessionData", JSON.stringify(sess));
            }
          },
        });
        const storedSessionData = await AsyncStorage.getItem("sessionData");
        if (storedSessionData) {
          const sessionData = JSON.parse(storedSessionData);
          await bskyAgent.resumeSession(sessionData);
          console.debug("🔐 Resumed Session | Welcome back!");
        }
        setAgent(bskyAgent);
        setIsLoading(false);
      };
      initializeAgent();
      console.debug("🔐 Auth Initialized...");
    }
  }, [isLoading]);

  return (
    <AuthContext.Provider
      value={{
        agent,
        login,
        logout,
        isLoading,
        isAuthenticated: agent?.session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
