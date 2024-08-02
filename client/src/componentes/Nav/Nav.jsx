// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
// import { logout } from "../../redux/actions/actions";

export const Nav = ({ user }) => {
  return (
    <div className="space-y-6 md:space-y-10 w-full mt-10">
      <h1 className="font-bold text-4xl text-center md:hidden">
        D<span className="text-teal-600">.</span>
      </h1>cd
      <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
        Dashwind<span className="text-teal-600">.</span>
      </h1>
      <div id="profile" className="space-y-3">
        <img
          src={user.picture}
          alt="Avatar user"
          className="w-10 md:w-16 rounded-full mx-auto"
        />
        <div>
          <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
            {user.name}
          </h2>
          <p className="text-xs text-gray-500 text-center">Administrator</p>
        </div>
      </div>
      <div id="menu" className="flex flex-col w-full space-y-2">
        <Link
          to={"/dashboard"}
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out"
        >
          <svg
            className="w-6 h-6 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
          <span className="">Dashboard</span>
        </Link>
        <Link
          to={"/products"}
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 fill-current inline-block"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="">Products</span>
        </Link>
        <button
          onClick={() => doSignOut()}
          className="flex text-center justify-center gap-2 items-center text-sm border border-gray-200 shadow-sm mb-2 font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 fill-current inline-block"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Salir
        </button>
      </div>
    </div>
  );
};
