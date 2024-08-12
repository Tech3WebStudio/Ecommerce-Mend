import React from "react";

const Navigation = () => {
  return (
    <nav className="z-0 relative">
      <div className="relative z-10 bg-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex justify-center items-center px-2 lg:px-0">
              <a className="flex-shrink-0" href="#">
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src="../ninalogo.webp"
                  alt="Logo"
                />
              </a>
              <div className="hidden lg:block lg:ml-2">
                <div className="flex">
                  <a
                    href="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    {" "}
                    Location{" "}
                  </a>
                  <a
                    href="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    {" "}
                    Article{" "}
                  </a>
                  <a
                    href="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    {" "}
                    Recipe{" "}
                  </a>
                  <a
                    href="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    {" "}
                    Promo{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search{" "}
                </label>
                <form action="#" className="relative z-50">
                  <button
                    type="submit"
                    id="searchsubmit"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <input
                    type="text"
                    name="s"
                    id="s"
                    className="block w-60 pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-primary text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                aria-expanded="false"
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <div className="px-2 pt-2 pb-3">
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-white font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Location{" "}
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-white font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Article{" "}
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-white font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Recipe{" "}
            </a>
            <a
              href="#"
              className="mt-1 block px-3 py-2 rounded-md text-white font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Promo{" "}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
