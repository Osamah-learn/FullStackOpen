import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // We create state named countries
  const [countries, setCountries] = useState([]);
  const [input, SetInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState();

  // we fetch data into countries array

  const getData = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  };
  useEffect(() => getData(), []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=903b83753cc54a3f8fe170011221301&q=${selectedCountry.name.common}&aqi=no`
        )
        .then(
          (response) => setWeather(response.data) + console.log(response.data)
        );
    }
  }, [selectedCountry]);

  // we get input value
  const handleInput = (event) => {
    SetInput(event.target.value);
    setSelectedCountry(null);
  };

  // we filter our country items deppend on our value
  /* const filteredContent = (input) => { return countries.filter((country) => {
    const countryValue = country.name;
    const inputValue = input.toLowerCase();
    if (inputValue === "") {
      return false;
    } else if (countryValue.common.toLowerCase().includes(inputValue)) {
      return true;
    } else {
      return false;
    }
  })}; */

  const filteredContent = (input) => {
    if (input === "") return [];
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
  };
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };
  const languagesToArray = (languages) => {
    /* console.log(typeof(languages)) */
    const languagesAsString = JSON.stringify(languages);
    /* console.log(typeof(languagesAsString)); */
    const languagesAsStringWithoutBraces = languagesAsString.substring(
      1,
      languagesAsString.length - 1
    );
    /* console.log(languagesAsStringWithoutBraces) */
    const languagesAsArrayOfTwoStrings =
      languagesAsStringWithoutBraces.split(",");
    const languagesAsArrayOfOneString = languagesAsArrayOfTwoStrings.map(
      (languageTuple) => {
        const splitedWord = languageTuple.split(":")[1];
        return splitedWord.substring(1, splitedWord.length - 1);
      }
    );
    return languagesAsArrayOfOneString;
  };
  const CountryView = (country) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <h2>population: {country.population}</h2>
        <div>
          spoken languages{" "}
          {languagesToArray(country.languages).map((language, key) => (
            <li key={key}>{language} </li>
          ))}
        </div>
        <img src={country.flags["png"] || country.flags["svg"]}></img>
        <div>
          <h3>
            Weather In {weather && weather.location && weather.location.name}
          </h3>
          <img
            src={
              weather &&
              weather.current &&
              weather.current.condition &&
              weather.current.condition.icon
            }
          ></img>
          <p>
            Temprutre : {weather && weather.current && weather.current.temp_c}{" "}
            Celcius
          </p>
          <p>
            wind:{" "}
            {weather &&
              weather.current &&
              weather.current.wind &&
              weather.current.wind_mph}{" "}
            mph direction:{" "}
            {console.log(
              weather &&
                weather.current &&
                weather.current.wind &&
                weather.current.wind_dir
            )}
          </p>
        </div>
      </>
    );
  };

  const FilteredCountriesView = (countries) => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0]);
    } else if (countries.length <= 10) {
      return (
        <div>
          {countries.map((country, key) => (
            <li key={key}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </div>
      );
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else {
      return <div>Write countryName</div>;
    }
  };
  return (
    <div className="App">
      <p>Find Country</p>
      <input onChange={handleInput} value={input} placeholder="Search..." />
      <p>{input}</p>
      {selectedCountry
        ? CountryView(selectedCountry)
        : FilteredCountriesView(filteredContent(input))}
    </div>
  );
}

export default App;
