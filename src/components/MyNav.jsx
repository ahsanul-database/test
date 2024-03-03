import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo (1).png";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaAlignLeft } from "react-icons/fa6";

const MyNav = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "pastel"
  );
  // Toggle Dark Mode Function
  const toggleDarkMode = (e) => {
    if (e.target.checked) {
      setTheme("dim");
    } else {
      setTheme("pastel");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      document.querySelector("html").setAttribute("data-theme", localTheme);
    }
  }, [theme]);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ahsanul-database/fakeDB/main/messageforyou.json"
    )
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);
  const handleMsgShow = () => {
    let timerInterval;
    const length = message.length;
    const position = Math.floor(Math.random() * length);
    const msg = message[position];
    Swal.fire({
      html: `
       <div class="myText">
       <div style="  padding: 40px 0;
       display: flex;
       justify-content: center;">
       <img style=" height: 100px;text-align: center;
       width: 90px;" src="https://i.ibb.co/kGNSQp0/icon-coding-logo-Q976-Kx7-600-removebg-preview.png" alt="!coder" />
       </div>
        <h2 class="myText " > ${msg} </h2>
       </div>
        `,
      background: `#fff url(https://i.ibb.co/Jr6JGYJ/gradient.png)`,
      timer: 6000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {});
  };

  return (
    <div className="navbar text-black bg-blue-100 lg:px-20">
      <div className="navbar-start  ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaAlignLeft className="h-16 text-2xl"></FaAlignLeft>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                className={({ isActive }) => isActive && "text-blue-700 "}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="">
              <a>Academic</a>
              <ul className="p-2">
                <li className="hover:bg-blue-100">
                  <Link to="academic/routine">Routine</Link>
                </li>
                <li className="hover:bg-blue-100">
                  <Link to="academic/notes">Notes</Link>
                </li>
                <li className="hover:bg-blue-100">
                  <Link to="academic/tutorial">Tutorial</Link>
                </li>
                <li className="hover:bg-blue-100">
                  <Link to="academic/questionbank">Question Bank</Link>
                </li>
              </ul>
            </li>
            <li className="">
              <a>Students</a>
              <ul className="p-2">
                <li className="hover:bg-blue-200 bg-blue-100">
                  <Link to="students/profileCard">Profile</Link>
                </li>
                <li className="hover:bg-blue-100">
                  <Link to="students/idCard">ID Card</Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => isActive && "text-blue-700 "}
                to="/faculty"
              >
                Faculty
              </NavLink>
            </li>
          </ul>
        </div>
        <Link>
          <img className="h-20" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-700 navBtn" : "navBtn"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="Btn3">
            <details>
              <summary>Academic</summary>
              <ul className="p-2 bg-blue-100">
                <li className="hover:bg-blue-100">
                  <Link to="academic/routine">Routine</Link>
                </li>
                <li className="hover:bg-blue-200">
                  <Link to="academic/notes">Notes</Link>
                </li>
                <li className="hover:bg-blue-200">
                  <Link to="academic/tutorial">Tutorial</Link>
                </li>
                <li className="hover:bg-blue-200">
                  <Link to="academic/questionbank">Question Bank</Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="Btn3">
            <details>
              <summary>Students</summary>
              <ul className="p-2 bg-blue-100">
                <li className="hover:bg-blue-200">
                  <Link to="students/profileCard">Profile</Link>
                </li>
                <li className="hover:bg-blue-200">
                  <Link to="students/idCard">ID Card</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-700 navBtn" : "navBtn"
              }
              to="/faculty"
            >
              Faculty
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <button onClick={handleMsgShow} className="Btn2">
          Message{" "}
          <ChatBubbleLeftRightIcon className="h-5"></ChatBubbleLeftRightIcon>{" "}
        </button>
        <>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={toggleDarkMode}
              checked={theme === "pastel" ? false : true}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </>
      </div>
    </div>
  );
};

export default MyNav;
