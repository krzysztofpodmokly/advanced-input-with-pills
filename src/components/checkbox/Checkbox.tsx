import cn from "classnames";

import styles from "./checkbox.module.scss";

const Checkbox = (props: any) => {
  return (
    <label className={styles.container}>
      {props.value}
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
      />
      <span
        className={cn(styles.checkmark, {
          [styles.negative]: !props.isPositive,
          [styles.positive]: props.isPositive,
        })}
      />
    </label>
  );
};

export default Checkbox;
