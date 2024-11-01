// components/EstonianWord.js
const EstonianWord = ({ word, basicForm, achieved }) => {
  return (
    <div style={styles.container}>
      <p>
        <strong>Word:</strong> {word}
      </p>
      <p>
        <strong>Basic Form:</strong> {basicForm}
      </p>
      <p>
        <strong>Achieved:</strong> {achieved}
      </p>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
};

export default EstonianWord;
