import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="flex flex-wrap bg-[#232f3e] text-white justify-center p-5">
          <div>
            <div className="flex gap-52">
              <div>
                <h3 className="font-bold">Get to know us</h3>
                <ul className="">
                  <li>
                    <Link to="/">About Us</Link>
                  </li>
                  <li>
                    <Link to="/">Careers</Link>
                  </li>
                  <li>
                    <Link to="/">Press Release</Link>
                  </li>
                  <li>
                    <Link to="/">Amazon science</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Connect With us</h3>
                <ul className="">
                  <li>
                    <Link to="/">Facebook</Link>
                  </li>
                  <li>
                    <Link to="/">Twitter</Link>
                  </li>
                  <li>
                    <Link to="/">Instagram</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Make money</h3>
                <ul className="">
                  <li>
                    <Link to="/">Sell on amazon</Link>
                  </li>
                  <li>
                    <Link to="/">Advertize your products</Link>
                  </li>
                  <li>
                    <Link to="/">Sell on amazon</Link>
                  </li>
                  <li>
                    <Link to="/">Advertize your products</Link>
                  </li>
                  <li>
                    <Link to="/">Advertize your products</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Let us help you</h3>
                <ul className="">
                  <li>
                    <Link to="/">Your Account</Link>
                  </li>
                  <li>
                    <Link to="/">Return Center</Link>
                  </li>
                  <li>
                    <Link to="/">Download App</Link>
                  </li>
                  <li>
                    <Link to="/">Help</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-[#131A22] text-gray-300 text-xs p-7">
          <div>
            <ul className="flex mb-2.5 gap-20">
              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">AbeBooks</h5>
                  <span className="navFooterDescText">
                    Books, art
                    <br />
                    &amp; collectibles
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link
                  to="/"
                  className="nav_a"
                >
                  <h5 className="font-bold">Amazon Web Services</h5>s
                  <span className="navFooterDescText">
                    Scalable Cloud
                    <br />
                    Computing Services
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">Audible</h5>
                  <span className="navFooterDescText">
                    Download
                    <br />
                    Audio Books
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">IMDb</h5>
                  <span className="navFooterDescText">
                    Movies, TV
                    <br />
                    &amp; Celebrities
                  </span>
                </Link>
              </li>
            </ul>
            <ul className="flex my-2.5 gap-20">
              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">Shopbop</h5>
                  <span className="navFooterDescText">
                    Designer
                    <br />
                    Fashion Brands
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">Amazon Business</h5>
                  <span className="navFooterDescText">
                    Everything For
                    <br />
                    Your Business
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">Prime Now</h5>
                  <span className="navFooterDescText">
                    2-Hour Delivery
                    <br />
                    on Everyday Items
                  </span>
                </Link>
              </li>

              <li className="w-36">
                <Link to="/" className="nav_a">
                  <h5 className="font-bold">Amazon Prime Music</h5>
                  <span className="navFooterDescText">
                    100 million songs, ad-free
                    <br />
                    Over 15 million podcast episodes
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-[#131A22] p-5">
          <ul className="flex justify-center text-xs text-gray-400 gap-2.5">
            <li className="nav_first">
              <Link
                to="/"
                id=""
                className="nav_a"
              >
                Conditions of Use &amp; Sale
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/"
                id=""
                className="nav_a"
              >
                Privacy Notice
              </Link>{" "}
            </li>
            <li className="nav_last">
              <Link
                to="/"
                id=""
                className="nav_a"
              >
                Interest-Based Ads
              </Link>{" "}
            </li>
          </ul>
          <div className="text-xs text-gray-400 text-center">© 1996-2025, Amazon.com, Inc. or its affiliates</div>
        </div>
      </footer>
    </div>
  );
}
