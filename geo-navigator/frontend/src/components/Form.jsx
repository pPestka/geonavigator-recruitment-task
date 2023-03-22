import InputCoordinate from "./InputCoordinate";

const Form = (props) => {
  return (
    <form>
      <h2>PODAJ LOKALIZACJĘ W UKŁADZIE WSPÓŁRZĘDNYCH GEODEZYJNYCH "2000"</h2>
      <div>
        <div>
          <InputCoordinate
            label="Współrzędna na kierunku W-E np.: 7498414.59 (oś pozioma) "
            id="geodesicY"
            value={props.geodesicY}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
          />
        </div>
        <div>
          <InputCoordinate
            label="Współrzędna na kierunku S-N, np.: 5787610.21 (oś pionowa) "
            id="geodesicX"
            value={props.geodesicX}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
          />
        </div>
      </div>
    </form>
  );
};
export default Form;
