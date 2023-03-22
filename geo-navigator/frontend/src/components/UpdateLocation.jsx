const UpdateLocation = (props) => {
  return (
    props.isUpdateVisible && (
      <form>
        <input type="submit" value="Aktualizuj" onClick={props.onClick} />
      </form>
    )
  );
};

export default UpdateLocation;
