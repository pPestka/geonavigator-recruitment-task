const Attention = (props) => {
  var attentionArray = [
    "Wypełnij wszystkie pola",
    "Niedozwolony znak",
    "Wpisz wartość z prawidłowych przedziałów",
    "Uwaga: Wprowadziłeś lokalizację poza granicami Polski lub na obszarze Morza Bałtyckiego",
  ];
  return (
    props.isAttentionVisible && <p>{attentionArray[props.attentionIndex]}</p>
  );
};

export default Attention;
