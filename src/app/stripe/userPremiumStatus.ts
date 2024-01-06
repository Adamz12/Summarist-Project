import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    console.log("User ID:", user?.uid);
    const checkPremiumStatus = async () => {
      if (user) {
        const isPremium = await isUserPremium();
        console.log("Is Premium:", isPremium);
        setPremiumStatus(isPremium);
      }
    };

    checkPremiumStatus();
  }, [user]);

  return premiumStatus;
}
