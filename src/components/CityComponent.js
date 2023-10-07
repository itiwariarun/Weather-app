import React from "react";
import { getTimeOfDayIcon, GetHumanReadableTime } from "../Utils";

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full gap-5 px-5 my-20 text-center bg-blue-400 border-2 border-solid sm:px-20 md:px-28 py-14 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border-slate-800">
        <p className="text-4xl text-slate-50">{GetHumanReadableTime()}</p>
        <p className="w-40 h-40"> {getTimeOfDayIcon()}</p>
        <h1 className="text-2xl font-semibold md:text-4xl text-slate-50">
          Find Weather of your city
        </h1>
        <form onSubmit={fetchWeather}>
          <article className="flex items-center justify-center max-w-lg pt-10 pb-2">
            <div className="flex bg-white border-2 rounded-md">
              <input
                onChange={(e) => updateCity(e.target.value)}
                type="text"
                className="px-4 py-2 w-52 sm:w-60 md:w-80 xl:w-96"
                placeholder="Search City..."
              />
              <button
                type="submit"
                aria-label="Search City Weather"
                className="flex items-center justify-center px-4 border-l"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </div>
          </article>
          {props.error !== "" && (
            <p className="text-xs font-semibold text-right text-red-600 delay-700">
              * {props.error}
            </p>
          )}
        </form>
      </section>
    </>
  );
};
export default CityComponent;
