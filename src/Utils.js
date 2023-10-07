import { Sunset, Sunrise, Day, Night } from "./constant";
import { useEffect, useState } from "react";

export function formatDateToCustomFormat(dateString) {
  const inputDate = new Date(dateString);

  const options = {
    weekday: "short", // Short day name (e.g., "Sun")
    month: "short", // Short month name (e.g., "Mar")
    day: "2-digit", // Two-digit day of the month (e.g., "01")
  };

  return inputDate.toLocaleDateString("en-US", options);
}
export function formatDateToCustomTimeFormat(dateString) {
  const inputDate = new Date(dateString);

  const options = {
    hour: "2-digit", // Two-digit hour (e.g., "12")
    minute: "2-digit", // Two-digit minute (e.g., "00")
    second: "2-digit", // Two-digit second (e.g., "00")
  };

  return inputDate.toLocaleTimeString("en-US", options);
}
// Example usage:
export function fahrenheitToCelsius(kelvin) {
  return `${(kelvin - 274.15).toFixed(0)}°`;
}

export function getTimeOfDayIcon() {
  const now = new Date();
  const currentHour = now.getHours();

  // Define the time intervals for sunrise, day, sunset, and night
  const sunriseStartHour = 5; // 5:00 AM
  const dayStartHour = 8; // 7:00 AM
  const sunsetStartHour = 16; // 6:00 PM
  const nightStartHour = 19; // 8:00 PM

  if (currentHour >= sunriseStartHour && currentHour < dayStartHour) {
    // It's sunrise time
    return (
      <>
        <Sunrise />
      </>
    );
  } else if (currentHour >= dayStartHour && currentHour < sunsetStartHour) {
    // It's daytime
    return (
      <>
        <Day />
      </>
    );
  } else if (currentHour >= sunsetStartHour && currentHour < nightStartHour) {
    // It's sunset time
    return (
      <>
        <Sunset />
      </>
    );
  } else {
    // It's nighttime
    return (
      <>
        <Night />
      </>
    );
  }
}

export function GetHumanReadableTime() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateLiveTime = () => {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const date = new Date(timestamp);

      // Extract the hours, minutes, seconds, and AM/PM indicator
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      // Format the minutes and seconds to ensure they have two digits
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      // Create a human-readable time string (e.g., "hh:mm:ss AM/PM")
      const newTimeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

      // Update the state with the new time string
      setTimeString(newTimeString);
    };

    // Initial call to set the time immediately
    updateLiveTime();

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateLiveTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return timeString;
}
