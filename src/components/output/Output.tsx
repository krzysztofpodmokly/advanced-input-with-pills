import { ICountry } from "../input/interface";
import styles from "./output.module.scss";

const Output = ({
  data,
}: {
  data: {
    activationCountries: ICountry[];
    restrictedCountries: ICountry[];
  };
}) => {
  return (
    <div className={styles.wrapper}>
      <h3>Form payload</h3>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
    </div>
  );
};

export default Output;
