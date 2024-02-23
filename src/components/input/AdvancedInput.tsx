import { useState } from "react";
import _ from "lodash";
import cn from "classnames";

import styles from "./input.module.scss";
import { continentsWithCountries } from "../../continents";
import { IContinent, ICountry } from "./interface";

const AdvancedInput = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [countryPills, setCountryPills] = useState<string[]>([]);

  const [continentTab, setContinentTab] = useState<string>("");
  const [checkedCountries, setCheckedCountries] = useState<string[]>([]);
  const [isSelectAllClicked, setIsSelectAllClicked] = useState<boolean>(false);

  const allCountries = continentsWithCountries.flatMap(
    (continent: IContinent) => {
      return continent.countries;
    }
  );
  const [filteredCountries, setFilteredCountries] =
    useState<ICountry[]>(allCountries);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event?.target.value.toUpperCase();

    const splittedInputValue = inputValue
      .split(/,|;|\s/)
      .filter((value) => value !== "");

    setUserInput(inputValue);

    const matchingCountries = continentsWithCountries.flatMap(
      (continent: IContinent) =>
        continent.countries.filter((country: ICountry) =>
          splittedInputValue.includes(country.code.toUpperCase())
        )
    );
    setFilteredCountries(matchingCountries);

    if (!splittedInputValue.length) {
      setFilteredCountries(allCountries);
    }
  };

  const handleDropdownOpen = () => {
    setIsOpen(!isOpen);
    setFilteredCountries(allCountries);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const splittedInputValue = userInput
      .split(/,|;|\s/)
      .filter((value) => value !== "");

    const matchingCountries = continentsWithCountries
      .flatMap((continent: IContinent) =>
        continent.countries.filter((country: ICountry) =>
          splittedInputValue.includes(country.code.toUpperCase())
        )
      )
      .map((country) => country.name);

    setCountryPills((prevState) => {
      return [...prevState, ...matchingCountries];
    });
    setUserInput("");
    setCheckedCountries((prevState) => [...prevState, ...matchingCountries]);
  };

  const handleRemovePill = (pill: string) => {
    setCountryPills(() => {
      const filteredPayload = countryPills.filter(
        (pillName: string) => pillName !== pill
      );
      return filteredPayload;
    });
    setCheckedCountries((prevState) => {
      return prevState.filter((countryName: string) => countryName !== pill);
    });
    setFilteredCountries(allCountries);
  };

  const handleContinentTabSwitch = (continentName: string) => {
    setContinentTab(continentName);
    setIsSelectAllClicked(false);
    setFilteredCountries(
      allCountries.filter(
        (country: ICountry) => country.region === continentName
      )
    );
    setUserInput("");
  };

  const handleCountryCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    country: any
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCountryPills((prevState) => [...prevState, country.name]);
      setCheckedCountries((prevState) => [...prevState, country.name]);
    } else {
      setCountryPills((prevState) => {
        return prevState.filter(
          (countryName: string) => countryName !== country.name
        );
      });
      setCheckedCountries((prevState) => {
        return prevState.filter(
          (countryName: string) => countryName !== country.name
        );
      });
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSelectAll = (continentTab: string) => {
    const selectAllCountries = allCountries
      .filter((country: ICountry) =>
        continentTab ? country.region === continentTab : country
      )
      .map((country: ICountry) => country.name);
    if (_.isEmpty(_.xor(selectAllCountries, checkedCountries))) return;

    setIsSelectAllClicked(!isSelectAllClicked);

    setCheckedCountries((prevState) => {
      return [...prevState, ...selectAllCountries];
    });
    setFilteredCountries((prevState) => prevState);
    setCountryPills((prevState) => {
      return [...prevState, ...selectAllCountries];
    });
  };

  const handleDeselectAll = (continentTab: string) => {
    setIsSelectAllClicked(!isSelectAllClicked);
    setCheckedCountries([]);
    setFilteredCountries(allCountries);
    setCountryPills([]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.contentWrapper}>
        <div className={styles.userInteraction}>
          {countryPills.map((pill: string) => {
            return (
              <div key={pill} className={styles.pill}>
                <div>{pill}</div>
                <div
                  onClick={() => handleRemovePill(pill)}
                  className={styles.removePill}
                >
                  x
                </div>
              </div>
            );
          })}
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              onChange={handleInputChange}
              value={userInput}
              onFocus={handleInputFocus}
              // onKeyDown={handleSubmit}
            />
            <div className={styles.dropdownArrow} onClick={handleDropdownOpen}>
              <div className={styles.arrowIndicator} />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        submit
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.textWrapper}>
            <h3>Regions</h3>
          </div>
          <div className={styles.continents}>
            {continentsWithCountries.map((continent: IContinent) => {
              return (
                <div key={continent.continent} className={styles.continent}>
                  <div className={styles.continentTabs}>
                    <button
                      className={cn(
                        styles.continentTab,
                        continentTab === continent.continent
                          ? styles.active
                          : ""
                      )}
                      type="button"
                      onClick={() =>
                        handleContinentTabSwitch(continent.continent)
                      }
                    >
                      {continent.continent}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.textWrapper}>
            <h3>Country</h3>
            {isSelectAllClicked ? (
              <button
                className={styles.deselectAll}
                type="button"
                onClick={() => handleDeselectAll(continentTab)}
              >
                Deselect all
              </button>
            ) : (
              <button
                className={styles.selectAll}
                type="button"
                onClick={() => handleSelectAll(continentTab)}
              >
                Select all
              </button>
            )}
          </div>
          <div>
            {filteredCountries.map((country: ICountry) => {
              return (
                <div key={country.code}>
                  <input
                    id={country.code}
                    type="checkbox"
                    checked={
                      checkedCountries.includes(country.name) &&
                      countryPills.includes(country.name)
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleCountryCheckbox(event, country)
                    }
                    value={country.name}
                  />
                  <label htmlFor={country.code}>{country.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
};

export default AdvancedInput;
