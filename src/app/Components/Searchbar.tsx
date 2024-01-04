"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Book } from "../API Data/book";
import AudioDuration from "./audio";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";

function Searchbar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book[]>([]);
  const dispatch = useDispatch();

  async function searchResults() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
    );
    console.log(data);
    setBook(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    if (search.trim() === "") {
      setBook([]);
      return;
    }

    searchResults();
  }, [search]);

  const handleClick = () => {
    if (search) {
      searchResults();
    }
  };

  const handleOpen = () => {
    dispatch(toggleSidebar());
  };

  const handleClear = () => {
    console.log("Clearing search");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearch("");

    setBook([]);
  };

  return (
    <>
      <div className="search__background">
        <div className="search__wrapper">
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  type="search"
                  placeholder="Search for books"
                  className="searchbar"
                  onChange={(e) => setSearch(e.target.value)}
                  ref={inputRef}
                />
                {search.trim() === "" ? (
                  <button className="search__btn" onClick={handleClick}>
                    <AiOutlineSearch />
                  </button>
                ) : (
                  <button
                    className="search__btn close__btn"
                    onClick={handleClear}
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>
            </div>
          </div>
          <button onClick={handleOpen}>
            <MdOutlineMenu className="sidebar__menu" />
          </button>
        </div>

        {search.trim() !== "" && (
          <div className="search__results">
            {book.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                {loading ? (
                  <div className="skeleton  search__results--skeleton"></div>
                ) : (
                  <div className="search__book--container">
                    <figure className="audio__book--img--wrapper">
                      <Image
                        className="audio__book--img"
                        src={book.imageLink}
                        width={80}
                        height={80}
                        alt={""}
                      />
                    </figure>
                    <div className="search__book--details">
                      <h3 className="search__book--title">{book.title}</h3>
                      <p className="search__book--author">{book.author}</p>
                      <div className="book__time">
                        <BiTime />
                        <AudioDuration
                          audioLink={book.audioLink}
                          showDurationTime={true}
                          showCurrentTime={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Searchbar;
