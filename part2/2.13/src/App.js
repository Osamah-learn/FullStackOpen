import React, { useState, useEffect } from "react";
import axios from "axios";
import Hello from "./components/Hello";

function App() {
  // We create state named countries
  const [countries, setCountries] = useState([]);
  const [input, SetInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // we fetch data into countries array

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log("Response", response.data[0]);
    });
  }, []);
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
  const countryView = (country) => {
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
      </>
    );
  };

  const filteredContentView = (countries) => {
    if (countries.length === 1) {
      return countryView(countries[0]);
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
    } else return <div>Too many matches, specify another filter</div>;
  };
  return (
    <div className="App">
      <p>Find Country</p>
      <input onChange={handleInput} value={input} placeholder="Search..." />
      <p>{input}</p>
      {selectedCountry
        ? countryView(selectedCountry)
        : filteredContentView(filteredContent(input))}
    </div>
  );
}

export default App;
