import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { renderComponentByVariant } from "./../constant";
import Loading from "./Loading";

import {
  formatDateToCustomFormat,
  formatDateToCustomTimeFormat,
  fahrenheitToCelsius,
} from "./../Utils";
import { motion } from "framer-motion";
import { Humidity, Wind, Pressure } from "./../constant";
export default function List({ open, setOpen, weather }) {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 6000);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-screen max-w-xl pointer-events-auto">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                      <button
                        aria-label="Close SideBar"
                        type="button"
                        className="relative text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col h-full overflow-y-scroll shadow-xl bg-gradient-to-br from-slate-800 to-gray-800">
                    <section className="px-4 py-6 bg-white sm:px-6 ">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        List Of All Available Forecasts
                      </Dialog.Title>
                    </section>
                    {!loading && (
                      <section className="relative grid flex-1 gap-20 px-4 py-20 mt-6 sm:px-6">
                        {weather !== undefined && weather !== null
                          ? weather.list.map((item, index) => (
                              <motion.div
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -80, opacity: 0 }}
                                transition={{ duration: 1 }}
                                key={
                                  formatDateToCustomFormat(item?.dt_txt) +
                                  formatDateToCustomTimeFormat(item?.dt_txt) +
                                  index
                                }
                                className="flex items-center justify-center flex-grow max-h-fit"
                              >
                                <article className="flex flex-col w-full max-w-lg p-4 bg-blue-400 border bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border-slate-400 rounded-xl">
                                  <p className="text-xl font-bold text-slate-100">
                                    {weather.city.name}
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    {formatDateToCustomFormat(item?.dt_txt)}
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    {formatDateToCustomTimeFormat(item?.dt_txt)}
                                  </p>
                                  <p className="inline-flex items-center self-center justify-center w-24 h-24 mt-10 text-6xl rounded-lg">
                                    {renderComponentByVariant(
                                      item?.weather[0]?.icon
                                    )}
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
                                          {fahrenheitToCelsius(
                                            item?.main?.temp_max
                                          )}
                                        </p>
                                      </hgroup>
                                      <hgroup>
                                        <p className="text-sm">
                                          <i className="far fa-long-arrow-down"></i>
                                        </p>
                                        <p className="text-sm font-medium text-gray-200">
                                          {fahrenheitToCelsius(
                                            item?.main?.temp_min
                                          )}
                                        </p>
                                      </hgroup>
                                    </span>
                                  </article>
                                  <article className="flex flex-row justify-between gap-10 mt-6">
                                    <hgroup className="flex flex-col items-center">
                                      <p className="text-sm font-medium">
                                        Wind
                                      </p>
                                      <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                        <Wind /> {item?.wind?.speed.toFixed(0)}
                                        k/h
                                      </p>
                                    </hgroup>
                                    <hgroup className="flex flex-col items-center">
                                      <p className="text-sm font-medium">
                                        Humidity
                                      </p>
                                      <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                        <Humidity /> {item?.main?.humidity}
                                      </p>
                                    </hgroup>
                                    <hgroup className="flex flex-col items-center">
                                      <p className="text-sm font-medium">
                                        Visibility
                                      </p>
                                      <p className="flex items-center gap-2 py-4 text-sm font-medium text-gray-200">
                                        <Pressure /> {item?.main?.pressure}
                                      </p>
                                    </hgroup>
                                  </article>
                                </article>
                              </motion.div>
                            ))
                          : null}
                      </section>
                    )}
                    {loading && (
                      <section className="flex items-center justify-center w-full h-full">
                        <Loading />
                      </section>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
