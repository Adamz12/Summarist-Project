"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../API Data/book";
import playButton from "../public/assets/play__button.webp";
import Image from "next/image";
import Link from "next/link";

function Personal() {
  const [book, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  async function getBook() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    console.log(data);
    setBooks(data);
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    getBook();
  }, []);

  return (
    <section className="personal">
      <div className="row">
        <div className="for__you--wrapper">
          {loading ? (
            <div className="skeleton for__you--title title__skeleton"></div>
          ) : (
            <h2 className="for__you--title">Selected just for you</h2>
          )}

          {book.map((book) => (
            <Link
              href={`/book/${book.id}`}
              key={book.id}
              className="book__personal"
            >
              {loading ? (
                <div className="skeleton selected__book personal__skeleton"></div>
              ) : (
                <div key={book.id} className="selected__book">
                  <div className="selected__book--sub-title">
                    {book.subTitle}
                  </div>
                  <div className="border__line--book"></div>
                  <div className="selcted__book--content">
                    <Image
                      src={book.imageLink}
                      width={140}
                      height={140}
                      alt={""}
                    />
                    <div className="selected__book--text">
                      <div className="selected__book--title">{book.title}</div>
                      <div className="selected__book--author">
                        {book.author}
                      </div>
                      <div className="selected__book--duration-wrapper">
                        <figure className="icon__wrapper">
                          <Image
                            src={playButton}
                            className="selected__book--icon"
                            alt={""}
                          />
                        </figure>
                        <div className="selected__book--duration">
                          3 mins 23 secs
                        </div>
                      </div>
                    </div>
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

export default Personal;
