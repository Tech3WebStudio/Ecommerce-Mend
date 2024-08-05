import { useDispatch } from "react-redux";
import { doSignInWithGoogle } from "../firebase/auth";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Login = () => {
  const dispatch = useDispatch();
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    dispatch(doSignInWithGoogle());
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={"initLogin.webp"}
          alt="Placeholder Image"
          className="object-fill w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 flex justify-center gap-2 items-center flex-col">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <div className="mt-6 ml-10 mr-10 w-full">
          <button
            onClick={onGoogleSignIn}
            className="group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-primary focus:bg-pink-50 active:bg-pink-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <LazyLoadImage
                src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="flex w-max ml-1 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Google
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
