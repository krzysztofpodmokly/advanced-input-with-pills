import { useState } from "react";
import _ from "lodash";
import cn from "classnames";

import styles from "./input.module.scss";
import { continentsWithCountries } from "../../continents";
import { IContinent, ICountry } from "./interface";
import Switch from "../switch/Switch";
// import Checkbox from "../checkbox/positive/CheckboxPositive";
import CheckboxNegative from "../checkbox/negative/CheckboxNegative";
import CheckboxPositive from "../checkbox/positive/CheckboxPositive";
import Output from "../output/Output";

const AdvancedInput = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [countryPills, setCountryPills] = useState<string[]>([]);

  const [continentTab, setContinentTab] = useState<string>("All");
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

    const isCountryChecked = matchingCountries.some((country: string) =>
      checkedCountries.includes(country)
    );

    if (isCountryChecked) return;

    setCountryPills((prevState) => {
      return [...prevState, ...matchingCountries];
    });
    setUserInput("");

    setCheckedCountries((prevState) => [...prevState, ...matchingCountries]);
    setFilteredCountries(allCountries);
    setContinentTab("All");
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

    const countryContinentOrigin = allCountries.find(
      (country: ICountry) => country.name === pill
    )?.region;

    if (continentTab === "All") {
      setFilteredCountries(allCountries);
    } else {
      setFilteredCountries((prevState) => {
        return prevState.filter((c) => c.region === continentTab);
      });
    }

    if (countryContinentOrigin && continentTab !== countryContinentOrigin) {
      setContinentTab(countryContinentOrigin);
      setFilteredCountries(
        allCountries.filter((country: ICountry) =>
          countryContinentOrigin === "All"
            ? country.region
            : country.region === countryContinentOrigin
        )
      );
    }
    setIsSelectAllClicked(false);
  };

  const handleContinentTabSwitch = (continentName: string) => {
    const selectAllCountriesByContinent = allCountries
      .filter((country: ICountry) =>
        continentTab && continentName !== "All"
          ? country.region === continentName
          : country
      )
      .map((country: ICountry) => country.name);
    const allSelectedCountriesIncluded = selectAllCountriesByContinent.every(
      (country: string) => checkedCountries.includes(country)
    );

    if (allSelectedCountriesIncluded) {
      setIsSelectAllClicked(true);
    } else {
      setIsSelectAllClicked(false);
    }

    setContinentTab(continentName);

    setFilteredCountries(
      allCountries.filter((country: ICountry) =>
        continentName === "All"
          ? country.region
          : country.region === continentName
      )
    );
    setUserInput("");
  };

  const handleCountryCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    country: ICountry
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

    const updatedCheckedCountries = [...checkedCountries, country.name];

    const areAllOptionsSelected = filteredCountries
      .map((country: ICountry) => country.name)
      .every((country: string) => updatedCheckedCountries.includes(country));
    if (areAllOptionsSelected) {
      setIsSelectAllClicked(true);
    } else {
      setIsSelectAllClicked(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSelectAll = (currentContinentTab: string) => {
    const selectAllCountriesByContinent = allCountries
      .filter((country: ICountry) =>
        currentContinentTab && currentContinentTab !== "All"
          ? country.region === currentContinentTab
          : country
      )
      .map((country: ICountry) => country.name);

    if (_.isEmpty(_.xor(selectAllCountriesByContinent, checkedCountries))) {
      return;
    }

    setIsSelectAllClicked(!isSelectAllClicked);

    setCheckedCountries((prevState) => {
      return [...prevState, ...selectAllCountriesByContinent];
    });
    setFilteredCountries((prevState) => prevState);
    setCountryPills((prevState) => {
      return _.uniq([...prevState, ...selectAllCountriesByContinent]);
    });
  };

  const handleDeselectAll = (currentContinentTab: string) => {
    const deselectCountriesByContinent = allCountries
      .filter((country: ICountry) =>
        continentTab && continentTab !== "All"
          ? country.region !== currentContinentTab
          : country
      )
      .map((country: ICountry) => country.name);

    setIsSelectAllClicked(!isSelectAllClicked);

    setCheckedCountries((prevState) => {
      const mappedFilteredCountries = filteredCountries.map(
        (country: ICountry) => country.name
      );
      const shouldDeselectOptions = prevState.every((country: string) =>
        mappedFilteredCountries.includes(country)
      );
      return shouldDeselectOptions ? [] : deselectCountriesByContinent;
    });
    setFilteredCountries((prevState) => {
      return prevState;
    });

    setCountryPills((prevState) => {
      const mappedFilteredCountries = filteredCountries.map(
        (country: ICountry) => country.name
      );
      const shouldDeselectOptions = prevState.every((country: string) =>
        mappedFilteredCountries.includes(country)
      );
      return shouldDeselectOptions ? [] : deselectCountriesByContinent;
    });
  };

  const [isCountriesToggled, setIsCountriesToggled] = useState<boolean>(false);

  const handleCountriesToggle = () => {
    setIsCountriesToggled(!isCountriesToggled);
  };

  const mockData = {
    restrictedCountries: [{ continent: "Europe", countries: ["Poland"] }],
  };

  return (
    <>
      <Output data={mockData} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.contentWrapper}>
          <div className={styles.userInteraction}>
            {countryPills.map((pill: string) => {
              return (
                <div
                  key={pill}
                  className={cn(styles.pill, {
                    [styles.activation]: isCountriesToggled,
                    [styles.restricted]: !isCountriesToggled,
                  })}
                >
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
              <div
                className={styles.dropdownArrow}
                onClick={handleDropdownOpen}
              >
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
            <div className={styles.switchWrapper}>
              <Switch
                checked={isCountriesToggled}
                onChange={handleCountriesToggle}
              />
              {isCountriesToggled ? (
                <CheckboxPositive
                  label="activation-countries-toggle"
                  checked={true}
                  onChange={handleCountriesToggle}
                  value={"Activation countries"}
                />
              ) : (
                <CheckboxNegative
                  label="restricted-countries-toggle"
                  checked={true}
                  onChange={handleCountriesToggle}
                  value={"Restricted countries"}
                />
              )}
            </div>

            <div className={styles.textWrapper}>
              <h3>Region</h3>
            </div>
            <div className={styles.continents}>
              {continentsWithCountries.map((continent: IContinent) => {
                return (
                  <div key={continent.continent} className={styles.continent}>
                    <div className={styles.continentTabs}>
                      <button
                        className={cn(styles.continentTab, {
                          [styles.active]: continentTab === continent.continent,
                        })}
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
                return isCountriesToggled ? (
                  <CheckboxPositive
                    key={country.code}
                    label={country.code}
                    checked={
                      checkedCountries.includes(country.name) &&
                      countryPills.includes(country.name)
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleCountryCheckbox(event, country)
                    }
                    value={country.name}
                  />
                ) : (
                  <CheckboxNegative
                    key={country.code}
                    label={country.code}
                    checked={
                      checkedCountries.includes(country.name) &&
                      countryPills.includes(country.name)
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleCountryCheckbox(event, country)
                    }
                    value={country.name}
                  />
                );
              })}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default AdvancedInput;
