export const getToken = async () => {
  try {
    const token = await localStorage.getItem("Token");
    if (token) {
      // console.log("Retrieved Token:", token);
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const setToken = async (userToken) => {
  await localStorage.setItem("Token", userToken);
};
