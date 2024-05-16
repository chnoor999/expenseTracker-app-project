import { useCallback, useState } from "react";
import { AuthLogin } from "../../hooks/auth";
import { useAuthContext } from "../../store/Auth-Context";

import AuthContent from "../../components/auth/AuthContent";
import LoadingOverLay from "../../components/UI/LoadingOverLay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

export default function LoginScreen() {
  const { authenticate } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTryAgain = useCallback(() => {
    setError("");
  }, []);

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      setIsLoading(true);
      const data = await AuthLogin({ email, password });
      authenticate(data);
    } catch (error) {
      switch (error.response.data.error.message) {
        case "INVALID_LOGIN_CREDENTIALS":
          setError("Invalid email or password. Please try again.");
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
          setError("Too many login attempts. Please try again later.");
          break;
        case "USER_DISABLED":
          setError("Your account has been disabled.");
          break;
        default:
          setError("An unexpected error occurred during login");
      }
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return <ErrorOverlay message={error} onTryAgain={handleTryAgain} />;
  }

  if (isLoading) {
    return <LoadingOverLay message={"Logging in"} />;
  }

  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}
