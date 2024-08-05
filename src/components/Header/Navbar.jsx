import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import {
  ALL_PERSONAL_PROJECTS,
  ALL_TEAM_PROJECTS,
  BLOG_MEMBER,
  BLOG_MEMBER_TUTORIAL,
  LOGIN_PAGE,
  PROFILE,
  REGISTER_PAGE,
  SCHEDULE,
} from "../../routes/constant";
import { logout, selectUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserDropdownLinks = [
  {
    name: "Hồ sơ cá nhân",
    link: "quan-ly-ho-so/thong-tin-ca-nhan",
  },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 10) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  const location = useLocation();
  return (
    <>
      <nav
        className={`fixed top-0 w-full flex justify-between items-center font-semibold pb-2 z-20 ${
          header
            ? "bg-white backdrop-blur-sm text-black shadow-md"
            : "bg-transparent text-black"
        }`}
      >
        <div className="bg-gradient-to-r from-primary to-secondary text-white font-semibold"></div>
        <div className="w-full mx-auto py-[2px] sm:block hidden font-semibold ">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center justify-center mx-6 gap-4 font-bold text-2xl basis-1/6">
              <NavLink to="/">
                <img
                  src={logo}
                  alt=""
                  width={80}
                  height={50}
                  className="py-4"
                />
              </NavLink>
            </div>

            <div className="hidden lg:flex mx-4 w-full justify-around basis-3/6">
              <ul className="flex items-center gap-6 font-semibold">
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="py-4 m-1">
                  <NavLink
                    to={`/${ALL_TEAM_PROJECTS}`}
                    className={` menuItem ${
                      location.pathname === `/${ALL_TEAM_PROJECTS}`
                        ? "activeNavbar"
                        : ""
                    }`}
                  >
                    Dự án Teams
                  </NavLink>
                </li>
                <li className="py-4  m-1">
                  <NavLink
                    to={`/${ALL_PERSONAL_PROJECTS}`}
                    className={` menuItem ${
                      location.pathname === `/${ALL_PERSONAL_PROJECTS}`
                        ? "activeNavbar"
                        : ""
                    }`}
                  >
                    Dự án cá nhân
                  </NavLink>
                </li>
                <li className="py-4  m-1">
                  <NavLink
                    to={`/${SCHEDULE}`}
                    className={` menuItem ${
                      location.pathname === `/${SCHEDULE}`
                        ? "activeNavbar"
                        : ""
                    }`}
                  >
                    Dự thính lớp học
                  </NavLink>
                </li>
                {/* <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/tai nguyen" ? "activeNavbar" : ""
                    }`}
                  >
                    Tài nguyên
                  </NavLink>
                </li> */}
                <li className="py-4  m-1">
                  <NavLink
                    to={`/${BLOG_MEMBER}`}
                    className={` menuItem ${
                      location.pathname === `/${BLOG_MEMBER}`
                        ? "activeNavbar"
                        : ""
                    }`}
                  >
                    Blog Member
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="hidden lg:block w-full basis-1/6 justify-center items-center z-20">
              {user ? (
                <div className="group w-full mx-auto relative cursor-pointer ">
                  <a
                    href="/#home"
                    className="flex h-[72px] justify-center items-center gap-[2px] "
                  >
                    <FaUserCircle size={30} className="mr-3" />
                    <span className="font-semibold">{user.userName}</span>
                    <span>
                      <FaCaretDown className="ml-2 transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-20 hidden font-normal rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                    <ul className="space-y-3">
                      {UserDropdownLinks.map((link) => (
                        <li key={link.name}>
                          <NavLink
                            className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                            to={link.link}
                          >
                            {link.name}
                          </NavLink>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            dispatch(logout());
                            navigate("/auth/dang-nhap");
                          }}
                          className="font-semibold inline-block w-full rounded-md py-2 hover:bg-mainBg/20 text-red-500"
                        >
                          <LogoutOutlined style={{ marginRight: "10px" }} />
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 font-semibold text-white">
                  <NavLink to={`/auth/${LOGIN_PAGE}`} className="py-2 text-18 ">
                    <span className="text-blueLevel4 rounded-lg py-2 px-2 hover:bg-blueLevel5 hover:border-blueLevel5 hover:text-white border-2 border-blueLevel3">
                      Đăng Nhập
                    </span>
                  </NavLink>
                  <NavLink
                    to={`/auth/${REGISTER_PAGE}`}
                    className="py-4 text-18 "
                  >
                    <span className="rounded-lg py-2 px-2 bg-mainColor text-white hover:bg-hoverBtn border-2 border-blueLevel3">
                      Đăng Ký
                    </span>
                  </NavLink>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 ">
              <div className="lg:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} /> */}
      </nav>
    </>
  );
}

export default Navbar;
