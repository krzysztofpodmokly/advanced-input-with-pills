import { useState } from "react";
import cn from "classnames";

import styles from "./switch.module.scss";
import Checkbox from "../checkbox/Checkbox";

const Switch = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.switchWrapper}>
      <div className={styles.toggleSwitch}>
        <div
          className={cn(styles.switch, {
            [styles.on]: isChecked,
            [styles.off]: !isChecked,
          })}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitch}
            title="switch"
          />
          <span
            className={cn({
              [styles.on]: isChecked,
              [styles.off]: !isChecked,
            })}
          />
        </div>
      </div>
      <Checkbox isChecked={isChecked} handleSwitch={handleSwitch} />
      {/* <div className={styles.toggleCountries}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={handleSwitch}
          id="toggle-countries"
        />
        <label htmlFor="toggle-countries">
          {isChecked
            ? "Select Activation countries"
            : "Select restricted countries"}
        </label>
      </div> */}
    </div>
  );
};

export default Switch;
