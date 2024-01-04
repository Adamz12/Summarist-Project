import { useEffect, useState } from "react";
import { auth, auth } from "../../../firebase";
import isUserPremium from "./isUserPremium"; 

export default function usePremiumStatus(user: auth.User | null) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    console.log("User ID:", user?.uid);
    const checkPremiumStatus = async () => {
      if (user) {
        const isPremium = await isUserPremium(user);
        console.log("Is Premium:", isPremium);
        setPremiumStatus(isPremium);
      }
    };

    checkPremiumStatus();
  }, [user]);

  return premiumStatus;
}
