"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import headerImg from "../public/assets/pricing-top2.png";
import { HiDocumentText } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import app, { auth } from "../../../firebase";
import usePremiumStatus from "../stripe/userPremiumStatus";
import { createCheckoutSession } from "../stripe/createCheckoutSession";


function Sales() {
  const [showAnswers, setShowAnswers] = useState([false, false, false, false]);
  const [flipArrows, setFlipArrows] = useState([false, false, false, false]);
  const [dotActive, setDotActive] = useState(null);
  const [greenBorder, setGreenBorder] = useState(null);
  const [user, setUser] = useState(null);
  const userIsPremium = usePremiumStatus(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((customer) => {
      setUser(customer);
    });

    return () => unsubscribe();
  }, []);

  const toggleAnswer = (index: string | number) => {
    const updatedAnswers = [...showAnswers];
    updatedAnswers[index] = !updatedAnswers[index];
    setShowAnswers(updatedAnswers);

    const updatedFlipArrows = [...flipArrows];
    updatedFlipArrows[index] = !updatedFlipArrows[index];
    setFlipArrows(updatedFlipArrows);
  };

  const handleDot = (index) => {
    if (index === dotActive) {
    } else {
      setDotActive(index);
      setGreenBorder(index);
    }
  };

  const handleCheckout = async () => {
    console.log("Handle checkout clicked");
    if (user) {
      console.log("User exists:", user);

      try {
        const isMonthly = dotActive === 1;

        const checkoutSessionUrl = await createCheckoutSession(app, isMonthly);

        window.location.href = checkoutSessionUrl;
      } catch (error) {
        console.error("Error creating checkout session:", error.message);
      }
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <>
      <section id="plans">
        <div className="plans__background">
          <h1 className="plans__title">
            Get unlimited access to many amazing books to read
          </h1>
          <h5 className="plans__sub-title">
            Turn ordinary moments into amazing learning opportunities
          </h5>
          <figure className="plans__img--wrapper">
            <Image src={headerImg} alt="" className="plans__img" />
          </figure>
        </div>
        <div className="container">
          <div className="row">
            <div className="plan__features--wrapper">
              <div className="plan__feature">
                <figure className="plan__feature-icon--wrapper">
                  <HiDocumentText className="plan__feature-icon" />
                </figure>
                <p className="plan__feature--text">
                  <span className="bold">Key ideas in few min </span>
                  with many books to read
                </p>
              </div>
              <div className="plan__feature">
                <figure className="plan__feature-icon--wrapper">
                  <RiPlantFill className="plan__feature-icon" />
                </figure>
                <p className="plan__feature--text">
                  <span className="bold">3 million </span> people growing with
                  Summarist everyday
                </p>
              </div>
              <div className="plan__feature">
                <figure className="plan__feature-icon--wrapper">
                  <FaHandshake className="plan__feature-icon" />
                </figure>
                <p className="plan__feature--text">
                  <span className="bold">Precise recommendations </span>
                  collections curated by experts
                </p>
              </div>
            </div>
            <div className="plan__choice">
              <h1 className="plan__choice--title">
                Choose the plan that fits you
              </h1>
              <div
                className={`plan__choice--yearly ${
                  greenBorder === 0 ? "active--border" : ""
                }`}
                onClick={() => handleDot(0)}
              >
                <div className="plan__card--circle">
                  <div
                    className={`plan__card--empty ${
                      dotActive === 0 ? "plan__card--dot" : ""
                    }`}
                  ></div>
                </div>
                <div className="plan__card--wrapper">
                  <h4 className="plan__card--title">Premium Plus Yearly</h4>
                  <h3 className="plan__card--price">$99.99/year</h3>
                  <p className="plan__card--text">7-day free trial included</p>
                </div>
              </div>
              <div className="seperator">
                <div className="plan__border--line"></div>
                <div className="optional">or</div>
                <div className="plan__border--line"></div>
              </div>
              <div
                className={`plan__choice--yearly ${
                  greenBorder ? "active--border" : ""
                }`}
                onClick={() => handleDot(1)}
              >
                <div className="plan__card--circle">
                  <div
                    className={`plan__card--empty ${
                      dotActive === 1 ? "plan__card--dot" : ""
                    }`}
                  ></div>
                </div>
                <div className="plan__card--wrapper">
                  <h4 className="plan__card--title">Premium Monthly</h4>
                  <h3 className="plan__card--price">$9.99/month</h3>
                  <p className="plan__card--text">No trial included</p>
                </div>
              </div>
            </div>
            <div className="plan__card--btn--wrapper">
              <button
                className="plan__choice--btn"
                onClick={() => handleCheckout(user.uid)}
              >
                {dotActive === 1
                  ? "Start your first month"
                  : "Start your free 7 day trial"}
              </button>
              <p className="plan__choice--gurantee">
                {dotActive === 1
                  ? "30-day money back guarantee, no questions asked."
                  : "Cancel your trial at any time before it ends, and you won’t be charged."}
              </p>
            </div>
            <div className="plan__questions">
              <div className="plan__question">
                <div
                  className="plan__question--wrapper"
                  onClick={() => toggleAnswer(0)}
                >
                  <h1 className="plan__question--title">
                    How does the free 7-day trial work?
                  </h1>
                  <IoIosArrowDown
                    className={`plan__arrow--icon ${
                      flipArrows[0] ? "plan__arrow--icon--rotate" : ""
                    }`}
                  />
                </div>

                <p
                  className={`plan__question--answer ${
                    showAnswers[0] ? "active" : ""
                  }`}
                >
                  Begin your complimentary 7-day trial with a Summarist annual
                  membership. You are under no obligation to continue your
                  subscription, and you will only be billed when the trial
                  period expires. With Premium access, you can learn at your own
                  pace and as frequently as you desire, and you may terminate
                  your subscription prior to the conclusion of the 7-day free
                  trial.
                </p>
              </div>
              <div className="plan__question">
                <div
                  className="plan__question--wrapper"
                  onClick={() => toggleAnswer(1)}
                >
                  <h1 className="plan__question--title">
                    Can I switch subscriptions from monthly to yearly, or yearly
                    to monthly?
                  </h1>
                  <IoIosArrowDown
                    className={`plan__arrow--icon ${
                      flipArrows[1] ? "plan__arrow--icon--rotate" : ""
                    }`}
                  />
                </div>
                <p
                  className={`plan__question--answer ${
                    showAnswers[1] ? "active" : ""
                  }`}
                >
                  While an annual plan is active, it is not feasible to switch
                  to a monthly plan. However, once the current month ends,
                  transitioning from a monthly plan to an annual plan is an
                  option.
                </p>
              </div>
              <div className="plan__question">
                <div
                  className="plan__question--wrapper"
                  onClick={() => toggleAnswer(2)}
                >
                  <h1 className="plan__question--title">
                    What's included in the Premium plan?
                  </h1>
                  <IoIosArrowDown
                    className={`plan__arrow--icon ${
                      flipArrows[2] ? "plan__arrow--icon--rotate" : ""
                    }`}
                  />
                </div>
                <p
                  className={`plan__question--answer ${
                    showAnswers[2] ? "active" : ""
                  }`}
                >
                  Premium membership provides you with the ultimate Summarist
                  experience, including unrestricted entry to many best-selling
                  books high-quality audio, the ability to download titles for
                  offline reading, and the option to send your reads to your
                  Kindle.
                </p>
              </div>
              <div className="plan__question">
                <div
                  className="plan__question--wrapper"
                  onClick={() => toggleAnswer(3)}
                >
                  <h1 className="plan__question--title">
                    Can I cancel during my trial or subscription?
                  </h1>
                  <IoIosArrowDown
                    className={`plan__arrow--icon ${
                      flipArrows[3] ? "plan__arrow--icon--rotate" : ""
                    }`}
                  />
                </div>
                <p
                  className={`plan__question--answer ${
                    showAnswers[3] ? "active" : ""
                  }`}
                >
                  You will not be charged if you cancel your trial before its
                  conclusion. While you will not have complete access to the
                  entire Summarist library, you can still expand your knowledge
                  with one curated book per day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="plans__footer">
        <div className="container">
          <div className="row">
            <div className="footer__wrapper">
              <div className="footer__block">
                <h4 className="footer__link--title">Actions</h4>
                <a href="" className="footer__link">
                  Summarist Magazine
                </a>
                <a href="" className="footer__link">
                  Cancel Subscription
                </a>
                <a href="" className="footer__link">
                  Help
                </a>
                <a href="" className="footer__link">
                  Contact us
                </a>
              </div>
              <div className="footer__block">
                <h4 className="footer__link--title">Useful Links</h4>
                <a href="" className="footer__link">
                  Pricing
                </a>
                <a href="" className="footer__link">
                  Summarist Business
                </a>
                <a href="" className="footer__link">
                  Gift Cards
                </a>
                <a href="" className="footer__link">
                  Authors & Publishers
                </a>
              </div>
              <div className="footer__block">
                <h4 className="footer__link--title">Company</h4>
                <a href="" className="footer__link">
                  About
                </a>
                <a href="" className="footer__link">
                  Careers
                </a>
                <a href="" className="footer__link">
                  Partners
                </a>
                <a href="" className="footer__link">
                  Code of Conduct
                </a>
              </div>
              <div className="footer__block">
                <h4 className="footer__link--title">Other</h4>
                <a href="" className="footer__link">
                  Sitemap
                </a>
                <a href="" className="footer__link">
                  Legal Notice
                </a>
                <a href="" className="footer__link">
                  Terms of Service
                </a>
                <a href="" className="footer__link">
                  Privacy Policies
                </a>
              </div>
            </div>
            <div className="footer__copyright--wrapper">
              <h3 className="footer__copyright">Copyright © 2023 Summarist</h3>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Sales;
