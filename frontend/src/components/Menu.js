import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Menu({ currentPage }) {
  const items = [
    {
      src: "/icones/board-icon.svg",
      to: "/",
      isActive: currentPage === "home",
    },
    {
      src: "/icones/sport-icon.svg",
      to: "/sessions",
      isActive: currentPage === "sessions",
    },
    {
      src: "/icones/chrono-icon.svg",
      to: "/chrono",
      isActive: currentPage === "chrono",
    },
    {
      src: "/icones/login-icon.svg",
      to: "/login",
      isActive: currentPage === "login",
    },
  ];

  return (
    <div className="bg-color5 fixed bottom-0 w-full">
      <ul className="flex gap-[3vw] justify-between px-[5vw] relative bottom-[3vh]">
        {items.map(({ src, to, isActive }, i) => (
          <li
            key={i}
            className={`
              rounded-full
              border-[3px] border-color5
              w-[18vw] h-[18vw]
              flex items-center justify-center
              ${isActive ? "bg-accent2" : "bg-color4"}
            `}
          >
            <Link
              to={to}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={src}
                alt=""
                className="
                  w-[8vw] h-[8vw]
                  object-contain
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Menu;
