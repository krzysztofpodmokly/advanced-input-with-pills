const Output = ({ data }: any) => {
  return (
    <>
      <h3>Output</h3>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
    </>
  );
};

export default Output;
