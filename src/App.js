import React, { useState, Suspense, lazy } from "react";
import Axios from "axios";
const WeatherComponent = lazy(() =>
  import("./components/WeatherInfoComponent")
);
const CityComponent = lazy(() => import("./components/CityComponent"));
const Loading = lazy(() => import("./components/Loading"));
function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [screenLoad, setScreenLoad] = useState(true);
  setTimeout(() => {
    setScreenLoad(false);
  }, 1000);
  const fetchWeather = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      updateWeather(response.data);
      setError("");
    } catch (error) {
      // Handle the error here, for example, log it to the console
      updateCity(null);
      updateWeather(null);

      setError("Enter a valid city");
      // You can also set an error state or display an error message to the user
    }
  };
  setTimeout(() => {
    setLoading(false);
  }, 6000);
  return (
    <>
      {" "}
      <Suspense
        fallback={
          <div className="w-screen min-h-screen bg-slate-600 animate-pulse" />
        }
      >
        {screenLoad ? (
          <div className="w-screen min-h-screen bg-slate-600 animate-pulse" />
        ) : (
          <main className="min-h-screen p-2 bg-no-repeat bg-cover max-w-screen md:p-5">
            <div className="container mx-auto">
              <div className="flex flex-col items-center justify-center w-full">
                <CityComponent
                  error={error}
                  updateCity={updateCity}
                  fetchWeather={fetchWeather}
                />
                {loading && !weather && (
                  <h2 className="pb-10 text-4xl font-semibold animate-pulse text-slate-200">
                    Search Your Desired City
                  </h2>
                )}
                {loading ? (
                  <Loading />
                ) : error === "" ? (
                  <>
                    <WeatherComponent weather={weather} city={city} />
                  </>
                ) : (
                  <h3 className="pb-10 text-4xl font-semibold animate-pulse text-slate-200">
                    No results found !
                  </h3>
                )}
              </div>
            </div>
          </main>
        )}{" "}
      </Suspense>
    </>
  );
}

export default App;
