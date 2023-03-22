const InputCoordinate = (props) => {
  return (
    <>
      <label htmlFor="props.id">{props.label} </label>
      <input
        id={props.id}
        type="text"
        maxlength="10"
        size="11"
        placeholder="_ _ _ _ _ _ _._ _"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </>
  );
};

export default InputCoordinate;
