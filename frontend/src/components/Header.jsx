import { Link } from "react-router-dom";
import img from "../assets/images/pexels-quang-nguyen-vinh.jpg";

export default function Header() {
  return (
    <header>
      <div className="relative">
        <img
          className="w-full max-h-96 object-cover"
          src={img}
          alt="buildings_construction"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-400 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-widest uppercase drop-shadow-md bg-black bg-opacity-50 px-4 text-center">
          <p>UNITED CONSTRUCTION</p>
          <p className="text-xl">Builders & Developers</p>
        </div>
      </div>
    </header>
  );
}
