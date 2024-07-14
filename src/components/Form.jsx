// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  console.log(lat);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      async function fetchCitiesData() {
        try {
          setGeoCodingError("");
          setIsGeoLoading(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else"
            );
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.country);
          console.log(data);
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      fetchCitiesData();
    },
    [lat, lng]
  );

  if(isGeoLoading) return <Spinner />
  if (geoCodingError) return <Message message={geoCodingError}></Message>;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name </label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
