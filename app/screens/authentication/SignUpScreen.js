import { useCallback, useState } from "react";
import { AuthSignup } from "../../hooks/auth";
import { useAuthContext } from "../../store/Auth-Context";

import LoadingOverLay from "../../components/UI/LoadingOverLay";
import AuthContent from "../../components/auth/AuthContent";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

export default function SignUpScreen() {
  const { addToken, addUserId, addUserEmail, addExpiredTime, addRefreshToken } =
    useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTryAgain = useCallback(() => {
    setError("");
  }, []);

  const handleSignup = useCallback(async ({ email, password }) => {
    const timeOfExpire = Date.now() + 3600 * 1000;

    try {
      setIsLoading(true);
      const data = await AuthSignup({ email, password });
      addToken(data.idToken);
      addUserId(data.localId);
      addUserEmail(data.email);
      addExpiredTime(timeOfExpire);
      addRefreshToken(data.refreshToken);
    } catch (error) {
      switch (error.response.data.error.message) {
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          setError("Too many signup attempts. Please try again later.");
          break;
        case "EMAIL_EXISTS":
          setError(
            "This email is already in use. Please use a different email."
          );
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
    return <LoadingOverLay message={"Signing up"} />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
}
