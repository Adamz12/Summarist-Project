import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app, { auth } from "../../../firebase";
import { setEmailLoginRef } from "../redux/userSlice";
import { useRouter } from "next/navigation";
import { getPremiumStatus } from "../stripe/getPremiumStatus";
import IfLoggedOut from "./IfLoggedOut";

type Auth = {
  uid: string;
  email: string;
};

function Settings() {
  const [user, setUser] = useState<Auth | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector(
    (state: { emailLoginRef: { emailLoginRef: string } }) =>
      state.emailLoginRef.emailLoginRef
  );

  const router = useRouter();
  const dispatch = useDispatch();
  console.log(userEmail);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);

      try {
        setUser(user as Auth | null); 
        const isGoogleUser = user?.providerData.some(
          (provider) => provider.providerId === "google.com"
        );

        if (user && user.email) {
          dispatch(setEmailLoginRef(user.email));
        } else {
          dispatch(setEmailLoginRef(""));
        }

        const newPremiumStatus: boolean = user
          ? await getPremiumStatus(app)
          : false;
        setIsPremium(newPremiumStatus);
      } catch (error) {
        console.error("Error fetching premium status:", error);

        dispatch(setEmailLoginRef(""));
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const sendSalesPage = () => {
    router.push("/sales");
  };

  console.log("Is Premium:", isPremium);

  return (
    <section className="settings">
      <div className="container">
        <div className="row">
          <h1 className="settings__title">Settings</h1>
          <div className="settings__border--line"></div>
          {userEmail ? (
            <>
              <div className="settings__content">
                {loading ? (
                  <div className="skeleton  title__skeleton"></div>
                ) : (
                  <h6 className="settings__sub-title">
                    Your Subscription plan
                  </h6>
                )}
                {loading ? (
                  <div className="skeleton setting__plan--skeleton"></div>
                ) : (
                  <div className="settings__subscription--plan">
                    {!isPremium ? (
                      <>
                        <p>Basic</p>
                        <button
                          className="settings__upgrade--btn"
                          onClick={sendSalesPage}
                        >
                          Upgrade to Premium
                        </button>
                      </>
                    ) : (
                      <p>premium</p>
                    )}
                  </div>
                )}
              </div>
              <div className="settings__border--line"></div>
              <div className="settings__content">
                {loading ? (
                  <div className="skeleton  title__skeleton"></div>
                ) : (
                  <h6 className="settings__sub-title">Email</h6>
                )}
                {loading ? (
                  <div className="skeleton setting__plan--skeleton"></div>
                ) : (
                  <div className="settings__subscription--email">
                    {userEmail}
                  </div>
                )}
              </div>
            </>
          ) : (
            <IfLoggedOut />
          )}
        </div>
      </div>
    </section>
  );
}

export default Settings;
