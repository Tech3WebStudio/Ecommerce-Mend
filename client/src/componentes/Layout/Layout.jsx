import { Nav } from "../Nav/Nav";

export function Layout({ children }) {
  return (
    <div id="view" className="h-full w-full flex flex-row">
      <div className="md:hidden flex items-center justify-center p-4">
        <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
          <svg
            className="w-5 h-5 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="sidebar"
        className="bg-white md:h-screen lg:max-h-full flex shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
      >
        <Nav />
      </div>
      <div className="flex-grow p-4 w-screen m-2">{children}</div>
    </div>
  );
}
