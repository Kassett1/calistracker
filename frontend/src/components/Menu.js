import { Link } from "react-router-dom";

function Menu() {
  const items = [
    { src: "/icones/board-icon.svg", to: "/" },
    { src: "/icones/graphic-icon.svg", to: "/stats" },
    { src: "/icones/sport-icon.svg", to: "/sessions" },
    { src: "/icones/chrono-icon.svg", to: "/chrono" },
  ];

  return (
    <div className="bg-color5 sticky bottom-0">
      <ul className="flex gap-[3vw] justify-between px-[5vw] relative bottom-[3vh]">
        {items.map(({ src, to }, i) => (
          <li
            key={i}
            className="
              bg-color4
              rounded-full
              border-[3px] border-color5
              w-[18vw] h-[18vw]
              flex items-center justify-center
            "
          >
            <Link to={to} className="w-full h-full flex items-center justify-center">
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

export default Menu;
