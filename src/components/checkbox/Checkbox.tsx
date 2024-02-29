import styles from "./checkbox.module.scss";

const Checkbox = (props: any) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id={props.label}
        value={props.value}
      />
      <label htmlFor={props.label}>{props.value}</label>
    </div>
  );
};

export default Checkbox;
