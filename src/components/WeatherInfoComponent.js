import React, { useState } from "react";
import {
  formatDateToCustomFormat,
  formatDateToCustomTimeFormat,
  fahrenheitToCelsius,
} from "./../Utils";
import List from "./Sidebar";
import { motion } from "framer-motion";

import {
  Humidity,
  Pressure,
  Wind,
  renderComponentByVariant,
} from "./../constant";
const WeatherComponent = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex flex-wrap w-full mx-auto rounded-3xl">
        <div className="grid">
          <div className="flex flex-wrap w-full my-10 gap-28">
            {props.weather !== undefined && props.weather !== null
              ? props.weather.list.map(
                  (item, index) =>
                    index < 6 && (
                      <motion.div
                        key={
                          formatDateToCustomTimeFormat(item?.dt_txt) +
                          index +
                          formatDateToCustomFormat(item?.dt_txt)
                        }
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        className="flex items-center justify-center flex-grow duration-500 max-h-fit hover:scale-95 group"
                        transition={{ duration: 1 }}
                      >
                        <article className="flex flex-col duration-500 shadow-[0px_0px_40px_rgba(0,0,0,0.9)] group-hover:shadow-[inset_0px_0px_40px_rgba(0,0,0,0.9)] bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-slate-400 rounded-xl p-4 w-full max-w-lg">
                          <p className="text-xl font-bold text-slate-100">
                            {props.weather.city.name}
                          </p>
                          <p className="text-sm text-gray-300">
                            {formatDateToCustomFormat(item?.dt_txt)}
                          </p>
                          <p className="text-sm text-gray-300">
                            {formatDateToCustomTimeFormat(item?.dt_txt)}
                          </p>
                          <p className="inline-flex items-center self-center justify-center w-24 h-24 mt-10 text-6xl rounded-lg">
                            {renderComponentByVariant(item?.weather[0]?.icon)}
                          </p>
                          <article className="flex flex-row items-center justify-center mt-6">
                            <p className="text-6xl font-medium">
                              {fahrenheitToCelsius(item?.main?.temp)}
                            </p>
                            <span className="flex flex-col items-center ml-6">
                              <p>{item?.weather[0]?.description}</p>
                              <hgroup className="mt-1">
                                <p className="text-sm">
                                  <i className="far fa-long-arrow-up"></i>
                                </p>
                                <p className="text-sm font-medium text-gray-200">
                                  {fahrenheitToCelsius(item?.main?.temp_max)}
                                </p>
                              </hgroup>
                              <hgroup>
                                <p className="text-sm">
                                  <i className="far fa-long-arrow-down"></i>
                                </p>
                                <p className="text-sm font-medium text-gray-200">
                                  {fahrenheitToCelsius(item?.main?.temp_min)}
                                </p>
                              </hgroup>
                            </span>
                          </article>
                          <article className="flex flex-row justify-between gap-10 mt-6">
                            <hgroup className="flex flex-col items-center">
                              <p className="text-sm font-medium">Wind</p>
                              <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                <Wind /> {item?.wind?.speed.toFixed(0)}k/h
                              </p>
                            </hgroup>
                            <hgroup className="flex flex-col items-center">
                              <p className="text-sm font-medium">Humidity</p>
                              <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                <Humidity /> {item?.main?.humidity}
                              </p>
                            </hgroup>
                            <hgroup className="flex flex-col items-center">
                              <p className="text-sm font-medium">Visibility</p>
                              <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                <Pressure /> {item?.main?.pressure}
                              </p>
                            </hgroup>
                          </article>
                        </article>
                      </motion.div>
                    )
                )
              : null}
          </div>
        </div>
      </section>
      {props.weather !== undefined && props.weather !== null && (
        <section className="flex justify-center px-8 py-4 mx-auto rounded-xl max-w-fit">
          <button
            aria-label="Open SideBar To View Weather List"
            onClick={() => setOpen(true)}
            className="group active:scale-95 duration-700 bg-slate-700 shadow-[inset_0_0_1.6em_-0.6em] shadow-slate-500 overflow-hidden relative h-11 pr-14 text-white rounded-2xl border-none tracking-wider flex items-center  font-[inherit] px-1.5 pl-5 text-base font-medium"
          >
            View Full List
            <span className="h-5 w-10 rounded-xl duration-700 group-hover:w-[calc(100%_-_0.6em)] py-5 shadow-[0.1em_0.1em_0.6em_0.2em] shadow-slate-500 right-1.5 transition-all ml-4 absolute flex justify-center items-center bg-white group-hover:translate-x-0.5 group-hover:transition-transform text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </span>
          </button>
        </section>
      )}
      <List open={open} setOpen={setOpen} weather={props.weather} />
    </>
  );
};

export default WeatherComponent;
