"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Device } from "@modules";
import { usePathname, useRouter } from "next/navigation";

function Header({
  icon = "/vercel.svg",
  orientation = "top",
  mobileOrientation = "left",
  variant = "default",
  sticky,
  links = [],
  fullnav = true,
}) {
  const router = useRouter();

  const pathname = usePathname();

  const window = Device();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleNav = () =>
    showMobileMenu ? setShowMobileMenu(false) : setShowMobileMenu(true);

  useEffect(() => {
    if (showMobileMenu && window.md)
      return document.body.classList.add("overflow-hidden");

    setTimeout(() => {
      document.body.classList.remove("overflow-hidden");
    }, 1000);
  }, [showMobileMenu, window]);

  const handle = () => {
    if (headerRef.current) {
      if (
        document.body.getBoundingClientRect().y * -1 ||
        document.body.scrollTop
      ) {
        headerRef.current.style = "top:0px;left:0px;position:fixed;";
        document.body.style.paddingTop =
          headerRef.current.getBoundingClientRect().height + "px";
      } else {
        headerRef.current.style = "top:0px;left:0px;position:relative;";
        document.body.style.paddingTop = "0px";
      }
    }
  };
  const headerRef = useRef();

  useEffect(() => {
    if (sticky && headerRef.current) {
      handle();
      document.addEventListener("scroll", handle);
      return () => {
        document.removeEventListener("scroll", handle);
      };
    }
  }, [window, headerRef, router]);

  function FullNav() {
    return (
      <div className="w-full header-fullnav">
        <div className="header-body">
          <nav className={`header-nav ${fullnav ? "w-full" : ""}`}>
            {links.map((item, index) => {
              if (item.links) {
                return (
                  <div key={index} className="header-dropdown">
                    <div className="header-title">{item.label}</div>
                    <div className="header-dropdown-links">
                      {item.links.map((item, sub_index) => {
                        return (
                          <Link
                            className={`header-title ${
                              pathname == item.href ? "header-title-active" : ""
                            }`}
                            key={index + "-" + sub_index}
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`header-title ${
                    pathname == item.href ? "header-title-active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }

  return (
    <>
      {window.lg && (
        <header
          ref={headerRef}
          className={`header ${
            fullnav ? "flex-wrap" : ""
          } header-variant-${variant}`}
        >
          {fullnav && orientation == "bottom" && <FullNav />}
          <div
            className={`header-body header-${orientation} ${
              fullnav ? "flex-wrap" : ""
            }`}
          >
            <div
              className={`header-icon-container ${fullnav ? "w-full" : ""} ${
                orientation == "left"
                  ? "!justify-start"
                  : orientation == "right"
                  ? "!justify-end"
                  : ""
              }`}
            >
              <img src={icon} className={`${fullnav ? "!w-[100px]" : ""}`} />
            </div>

            {!fullnav && (
              <nav className={`header-nav ${fullnav ? "w-full" : ""}`}>
                {links.map((item, index) => {
                  if (item.links) {
                    return (
                      <div key={index} className="header-dropdown">
                        <div className="header-title">{item.label}</div>
                        <div className="header-dropdown-links">
                          {item.links.map((item, sub_index) => {
                            return (
                              <Link
                                className={`header-title ${
                                  pathname == item.href
                                    ? "header-title-active"
                                    : ""
                                }`}
                                key={index + "-" + sub_index}
                                href={item.href}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`header-title ${
                        pathname == item.href ? "header-title-active" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
          {fullnav && orientation != "bottom" && <FullNav />}
        </header>
      )}
      {window.md && (
        <header
          ref={headerRef}
          className={`relative header-mobile w-screen flex header-variant-${variant}  `}
        >
          <div
            className={`flex w-full header-${mobileOrientation} ${
              showMobileMenu ? "overflow-hidden" : ""
            }`}
          >
            <div className="header-mobile-icon-container">
              <img src={icon} />
            </div>
            <svg
              id="hamburger"
              className={`w-[40px] h-[40px]s ${
                showMobileMenu ? "activeHamburger" : ""
              }`}
              viewBox="0 0 60 40"
              onClick={toggleNav}
            >
              <g
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path id="top-line" d="M10,10 L50,10 Z"></path>
                <path id="middle-line" d="M10,20 L50,20 Z"></path>
                <path id="bottom-line" d="M10,30 L50,30 Z"></path>
              </g>
            </svg>
          </div>
          <nav
            className={`sheader ${
              showMobileMenu ? "header-open" : "header-close"
            }`}
            style={{ transition: "height 0.5s" }}
          >
            {links.map((item, index) => {
              if (item.links) {
                return;
              }
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`header-title ${
                    pathname == item.href ? "header-title-active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
      )}
    </>
  );
}

Header.Options = [
  {
    type: "select",
    value: "variant",
    options: [
      {
        label: "default",
        value: "default",
      },
      {
        label: "dark",
        value: "dark",
      },
    ],
  },
  {
    type: "select-boolean",
    value: "sticky",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    type: "select-boolean",
    value: "fullnav",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    type: "select",
    value: "orientation",
    options: [
      {
        label: "top",
        value: "top",
      },
      {
        label: "bottom",
        value: "bottom",
      },
      {
        label: "right",
        value: "right",
      },
      {
        label: "left",
        value: "left",
      },
    ],
  },
  {
    type: "select",
    value: "mobileOrientation",
    options: [
      {
        label: "top",
        value: "top",
      },
      {
        label: "bottom",
        value: "bottom",
      },
      {
        label: "right",
        value: "right",
      },
      {
        label: "left",
        value: "left",
      },
    ],
  },
  {
    value: "icon",
  },
];

Header.canAppend = false;

export { Header };
