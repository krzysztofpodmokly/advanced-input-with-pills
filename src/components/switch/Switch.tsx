import cn from "classnames";

import styles from "./switch.module.scss";

const Switch = (props: any) => {
  return (
    <div className={styles.toggleSwitch}>
      <div
        className={cn(styles.switch, {
          [styles.on]: props.checked,
          [styles.off]: !props.checked,
        })}
      >
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span
          className={cn({
            [styles.on]: props.checked,
            [styles.off]: !props.checked,
          })}
        />
      </div>
    </div>
  );
};

export default Switch;
