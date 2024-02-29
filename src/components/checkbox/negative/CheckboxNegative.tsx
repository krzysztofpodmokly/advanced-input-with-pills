import styles from "./negative.module.scss";

const CheckboxNegative = (props: any) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id={props.label}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.label}>{props.value}</label>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 10 10 L 90 90"
          stroke="#fff"
          stroke-dasharray="113"
          stroke-dashoffset="113"
        ></path>
        <path
          d="M 90 10 L 10 90"
          stroke="#fff"
          stroke-dasharray="113"
          stroke-dashoffset="113"
        ></path>
      </svg>
    </div>
  );
};

export default CheckboxNegative;
