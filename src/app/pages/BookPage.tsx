import axios from "axios";
import React, { useEffect, useState } from "react";
import { Book } from "../API Data/book";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AudioDuration from "../Components/audio";
import Image from "next/image";
import { MdOutlineStarBorder } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SlBookOpen } from "react-icons/sl";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  closeLoginModal,
  openSignUpModal,
  closeSignUpModal,
} from "../redux/modalSlice";
import LoginModal from "../Components/LoginModal";
import SignupModal from "../Components/SignupModal";

interface RootState {
  emailLoginRef: {
    emailLoginRef: string;
  };
  modals: {
    isLoginModalOpen: boolean;
    isSignUpModalOpen: boolean;
  };
}

function BookPage() {
  const [book, setBook] = useState<Book | null>(null); 
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector(
    (state: { emailLoginRef: { emailLoginRef: string } }) =>
      state.emailLoginRef.emailLoginRef
  );
  const { isLoginModalOpen, isSignUpModalOpen } = useSelector(
    (state: RootState) => state.modals
  );
  const dispatch = useDispatch();

  async function getBookPage() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    console.log(data);
    setBook(data);
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    if (id) {
      getBookPage();
    }
  }, [id]);

  const routingPlayer = () => {
    router.push(`/player/${book?.id}`);
  };

  const handleLogin = () => {
    dispatch(openLoginModal());
  };

  const handleCloseLogin = () => {
    dispatch(closeLoginModal());
  };

  const handleSignUp = () => {
    dispatch(openSignUpModal());
  };

  const handleCloseSignUp = () => {
    dispatch(closeSignUpModal());
  };

  return (
    <section className="book__page">
      <div className="container">
        <div className="row">
          {book && (
            <div className="book__page--wrapper">
              <div className="book__page--content" key={book.id}>
                {loading ? (
                  <div className="skeleton book__page-title__skeleton"></div>
                ) : (
                  <h1 className="book__page--title">{book.title}</h1>
                )}

                {loading ? (
                  <div className="skeleton book__page-author__skeleton"></div>
                ) : (
                  <h6 className="book__page--author">{book.author}</h6>
                )}

                {loading ? (
                  <div className="skeleton  book-subtitle__skeleton"></div>
                ) : (
                  <h5 className="book__page--sub-title">{book.subTitle}</h5>
                )}

                {loading ? (
                  <div className="skeleton  book__page-details__skeleton"></div>
                ) : (
                  <div className="book__page--details--wrapper">
                    <div className="book__page--detail">
                      <div className="book__page--icon">
                        <div className="book__page--icon--wrapper">
                          <MdOutlineStarBorder className="icon" />
                        </div>
                        {book.averageRating} ({book.totalRating} ratings)
                      </div>
                    </div>
                    <div className="book__page--detail">
                      <div className="book__page--icon">
                        <div className="book__page--icon--wrapper">
                          <BiTime className="icon" />
                        </div>
                        <AudioDuration
                          audioLink={book.audioLink}
                          showDurationTime={true}
                        />
                      </div>
                    </div>
                    <div className="book__page--detail">
                      <div className="book__page--icon">
                        <div className="book__page--icon--wrapper">
                          <HiOutlineMicrophone className="icon" />
                        </div>
                        {book.type}
                      </div>
                    </div>
                    <div className="book__page--detail">
                      <div className="book__page--icon">
                        <div className="book__page--icon--wrapper">
                          <HiOutlineLightBulb className="icon" />
                        </div>
                        {book.keyIdeas} Key Ideas
                      </div>
                    </div>
                  </div>
                )}

                {isLoginModalOpen && (
                  <LoginModal
                    isLoginModalOpen={isLoginModalOpen}
                    closeLoginModal={handleCloseLogin}
                    openSignUpModal={handleSignUp}
                  />
                )}

                {isSignUpModalOpen && (
                  <SignupModal
                    isSignUpModalOpen={isSignUpModalOpen}
                    closeSignUpModal={handleCloseSignUp}
                    openLoginModal={handleLogin}
                  />
                )}

                {loading ? (
                  <div className="skeleton  book__page-btns__skeleton"></div>
                ) : (
                  <div className="book__page--btns--wrapper">
                    <button
                      className="book__page--btn"
                      onClick={
                        userEmail ? () => routingPlayer() : () => handleLogin()
                      }
                    >
                      <div className="book__page--icon--book-open">
                        <SlBookOpen className="icon" />
                      </div>
                      Read
                    </button>
                    <button
                      className="book__page--btn"
                      onClick={
                        userEmail ? () => routingPlayer() : () => handleLogin()
                      }
                    >
                      <div className="book__page--icon--microphone">
                        <HiOutlineMicrophone className="icon" />
                      </div>
                      Listen
                    </button>
                  </div>
                )}

                {loading ? (
                  <div className="skeleton  book__mark__skeleton"></div>
                ) : (
                  <div className="book__mark">
                    <div className="book__page--icon">
                      <div className="book__page--icon--wrapper">
                        <IoBookmarkOutline className="icon" />
                      </div>
                      <h6 className="book__page--library--title">
                        Add title to My Library
                      </h6>
                    </div>
                  </div>
                )}

                <div className="book__page--description">
                  {loading ? (
                    <div className="skeleton book__page-description__skeleton"></div>
                  ) : (
                    <>
                      <h4 className="book__description--sub-title">
                        What's it about?
                      </h4>
                      <div className="book__tags--wrapper">
                        {book.tags && book.tags.length > 0 ? (
                          <div className="book__tag">{book.tags[0]}</div>
                        ) : null}
                        {book.tags && book.tags.length > 0 ? (
                          <div className="book__tag">{book.tags[1]}</div>
                        ) : null}
                      </div>
                    </>
                  )}
                  {loading ? (
                    <div className="skeleton book__page-text__skeleton"></div>
                  ) : (
                    <p className="book__despriction--text">
                      {book.bookDescription}
                    </p>
                  )}

                  {loading ? (
                    <div className="skeleton book__page-text__skeleton"></div>
                  ) : (
                    <>
                      <h4 className="book__description--sub-title">
                        About the author?
                      </h4>
                      <p className="book__author--text">
                        {book.authorDescription}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="book__img--content">
                <figure className="book__page--img--wrapper">
                  {loading ? (
                    <div className="skeleton book__page-img__skeleton"></div>
                  ) : (
                    <Image
                      className="book__page--img"
                      src={book.imageLink}
                      width={300}
                      height={300}
                      alt={""}
                    />
                  )}
                </figure>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookPage;
