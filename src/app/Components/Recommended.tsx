"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Book } from "../API Data/book";
import AudioDuration from "./audio";
import { BiTime } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Link from "next/link";

function Recommended() {
  const [book, setBook] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(true);

  async function getRecommended() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    console.log(data);
    setBook(data);
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  setTimeout(() => {
    setBookLoading(false);
  }, 3000);

  useEffect(() => {
    getRecommended();
  }, []);

  return (
    <section className="recommended">
      <div className="row">
        {loading ? (
          <div className="skeleton for__you--title title__skeleton"></div>
        ) : (
          <h2 className="header__title">Recommended For You</h2>
        )}
        {loading ? (
          <div className="skeleton subtitle__skeleton"></div>
        ) : (
          <h6 className="sub-title">We think you'll like these</h6>
        )}
        <div className="books">
          {book.map((book) => (
            <Link
              href={`/book/${book.id}`}
              key={book.id}
              className="book__link"
            >
              {loading ? (
                <div className="skeleton book-wrapper__skeleton"></div>
              ) : (
                <>
                  {book.subscriptionRequired ? (
                    <div className="premium__sign--book">Premium</div>
                  ) : null}
                  {bookLoading ? (
                    <div className="skeleton book__skeleton"></div>
                  ) : (
                    <figure className="book__img--wrapper">
                      <Image
                        width={170}
                        height={170}
                        src={book.imageLink}
                        alt={""}
                      />
                    </figure>
                  )}
                </>
              )}
              {loading ? (
                <div className="skeleton  book__title__skeleton"></div>
              ) : (
                <div className="book__title">{book.title}</div>
              )}
              {loading ? (
                <div className="skeleton  book-author__skeleton"></div>
              ) : (
                <div className="book__author">{book.author}</div>
              )}
              {loading ? (
                <div className="skeleton  book-subtitle__skeleton"></div>
              ) : (
                <div className="book__sub-title">{book.subTitle}</div>
              )}
              {loading ? (
                <div className="skeleton  book__details--skeleton"></div>
              ) : (
                <div className="book__details">
                  <div className="book__time">
                    <BiTime />
                    <AudioDuration
                      audioLink={book.audioLink}
                      showDurationTime={true}
                    />
                  </div>
                  <div className="book__ratings">
                    <AiOutlineStar />
                    {book.averageRating}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recommended;
