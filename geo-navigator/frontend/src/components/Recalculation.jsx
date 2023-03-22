const Recalculation = (props) => {
  return (
    props.isRecalculateVisible && (
      <>
        <button onClick={props.onClick}>
          {props.recalculateOrReset ? "Przelicz" : "Resetuj"}
        </button>
      </>
    )
  );
};

export default Recalculation;
