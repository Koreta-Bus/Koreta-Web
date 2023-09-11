const useFirebaselogin = () => {
  const loginWithDefaultCredentials = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;

      if (user) {
        const idToken = await user.getIdToken();
        console.log("Login successful. ID Token:", idToken);
        return true;
      } else {
        console.error("User not found.");
        return false;
      }
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  // Function to update password
  const updatePassword = async (newPassword) => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updatePassword(newPassword);
        console.log("Password updated successfully.");
        return true;
      } else {
        console.error("User not found.");
        return false;
      }
    } catch (error) {
      console.error("Password Update Error:", error);
      return false;
    }
  };

  return {
    loginWithDefaultCredentials,
    updatePassword,
  };
};
