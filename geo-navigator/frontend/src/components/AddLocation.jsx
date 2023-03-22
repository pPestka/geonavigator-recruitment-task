export const AddLocation = (props) => {
  const addNewLocation = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newLocation = {
      visiblState: true,
      imputValueGeodesicY: props.geodesicY,
      imputValueGeodesicX: props.geodesicX,
      geodesicY: props.geodesicY,
      geodesicX: props.geodesicX,
      latitudeBDecimal: props.latitudeBDecimal,
      longitudeLDecimal: props.longitudeLDecimal,
      latitudeBDegreeMinutesSeconds: props.latitudeBDegreeMinutesSeconds,
      longitudeLDegreeMinutesSeconds: props.longitudeLDegreeMinutesSeconds,
      linkToGoogleMaps: props.linkToGoogleMaps,
    };

    const url = "http://localhost:8080/api/locations";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    }).then((data) => console.log(data));
  };

  return (
    <form>
      <input
        type="submit"
        value="Zapisz"
        onClick={(event) => addNewLocation(event)}
      />
    </form>
  );
};
