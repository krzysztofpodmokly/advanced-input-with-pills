import styles from "./output.module.scss";

const Output = ({ data }: any) => {
  return (
    <div className={styles.wrapper}>
      <h3>Form payload</h3>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
    </div>
  );
};

export default Output;
