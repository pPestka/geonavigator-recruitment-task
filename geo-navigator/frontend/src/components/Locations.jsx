import React, { useEffect, useState } from "react";
import InputCoordinate from "./InputCoordinate";
import * as Validation from "../functions/Validation";
import * as Calculation from "../functions/Calculation";
import Recalculation from "./Recalculation";
import UpdateLocation from "./UpdateLocation";
import * as Formatting from "../functions/Formatting";

export const Locations = (props) => {
  const [appState, setAppState] = useState({ locations: [] });
  const [imputValueGeodesicY, setImputValueGeodesicY] = useState();
  const [imputValueGeodesicX, setImputValueGeodesicX] = useState();
  const [geodesicY, setGeodesicY] = useState();
  const [geodesicX, setGeodesicX] = useState();
  const [latitudeBDecimal, setLatitudeBDecimal] = useState();
  const [longitudeLDecimal, setLongitudeLDecimal] = useState();
  const [latitudeBDegreeMinutesSeconds, setLatitudeBDegreeMinutesSeconds] =
    useState();
  const [longitudeLDegreeMinutesSeconds, setLongitudeLDegreeMinutesSeconds] =
    useState();
  const [linkToGoogleMaps, setLinkToGoogleMaps] = useState();
  const [recalculateOrReset, setRecalculateOrReset] = useState(false);
  const [isResultReady, setIsResultReady] = useState(true);
  const [visiblState, setVisiblState] = useState(true);
  const [id, setId] = useState();

  useEffect(() => {
    const url = "http://localhost:8080/api/locations";
    fetch(url)
      .then((data) => data.json())
      .then((response) => setAppState({ locations: response }));
  });

  const removeLocation = (event, id) => {
    const url = "http://localhost:8080/api/locations/" + id;
    fetch(url, {
      method: "DELETE",
    }).then((data) => console.log(data));
  };

  const changeCoordinates = (
    event,
    argId,
    argVisiblState,
    argGeodesicY,
    argGeodesicX,
    argLatitudeBDecimal,
    argLongitudeLDecimal,
    argLatitudeBDegreeMinutesSeconds,
    argLongitudeLDegreeMinutesSeconds,
    argLinkToGoogleMaps
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const prevLocation = {
      id: id,
      visiblState: true,
      imputValueGeodesicY: geodesicY,
      imputValueGeodesicX: geodesicX,
      geodesicY: geodesicY,
      geodesicX: geodesicX,
      latitudeBDecimal: latitudeBDecimal,
      longitudeLDecimal: longitudeLDecimal,
      latitudeBDegreeMinutesSeconds: latitudeBDegreeMinutesSeconds,
      longitudeLDegreeMinutesSeconds: longitudeLDegreeMinutesSeconds,
      linkToGoogleMaps: linkToGoogleMaps,
    };

    const prevUrl = "http://localhost:8080/api/locations/" + id;
    fetch(prevUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prevLocation),
    }).then((data) => console.log(data));

    setId(argId);
    setVisiblState(argVisiblState);
    setIsResultReady(!argVisiblState);
    setGeodesicY(argGeodesicY);
    setGeodesicX(argGeodesicX);
    setImputValueGeodesicY(argGeodesicY);
    setImputValueGeodesicX(argGeodesicX);
    setLatitudeBDecimal(argLatitudeBDecimal);
    setLongitudeLDecimal(argLongitudeLDecimal);
    setLatitudeBDegreeMinutesSeconds(argLatitudeBDegreeMinutesSeconds);
    setLongitudeLDegreeMinutesSeconds(argLongitudeLDegreeMinutesSeconds);
    setLinkToGoogleMaps(argLinkToGoogleMaps);

    const newLocation = {
      id: argId,
      visiblState: !argVisiblState,
      imputValueGeodesicY: argGeodesicY,
      imputValueGeodesicX: argGeodesicX,
      geodesicY: argGeodesicY,
      geodesicX: argGeodesicX,
      latitudeBDecimal: argLatitudeBDecimal,
      longitudeLDecimal: argLongitudeLDecimal,
      latitudeBDegreeMinutesSeconds: argLatitudeBDegreeMinutesSeconds,
      longitudeLDegreeMinutesSeconds: argLongitudeLDegreeMinutesSeconds,
      linkToGoogleMaps: argLinkToGoogleMaps,
    };

    const url = "http://localhost:8080/api/locations/" + argId;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    }).then((data) => console.log(data));
  };

  const handleInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRecalculateOrReset(true);
    setIsResultReady(false);
    var value = Formatting.formatValue(e.target.value);
    console.log(value);
    if (!isNaN(value)) {
      var id2 = e.target.id;
      console.log(id2);
      switch (id2) {
        case "geodesicY":
          setImputValueGeodesicY(value);
          break;
        case "geodesicX":
          setImputValueGeodesicX(value);
      }
    } else {
      return;
    }
  };

  const handleClick = (event, geodesicY, geodesicX) => {
    if (!recalculateOrReset) {
      setGeodesicY("");
      setGeodesicX("");
      setImputValueGeodesicY("");
      setImputValueGeodesicX("");
      setLatitudeBDecimal("");
      setLongitudeLDecimal("");
      setLatitudeBDegreeMinutesSeconds("");
      setLongitudeLDegreeMinutesSeconds("");
      setLinkToGoogleMaps("");

      setIsResultReady(false);
    } else if (geodesicY === "" || geodesicX === "") {
      return;
    } else if (
      !Validation.areValueInRange(geodesicY, 7000000, 8000000) ||
      !Validation.areValueInRange(geodesicX, 5000000, 6500000)
    ) {
    } else {
      console.log(event);
      console.log(geodesicY);
      console.log(geodesicX);
      var arrayBL = Calculation.polandCs2000Zone7ToGeografic(
        geodesicY,
        geodesicX
      );
      console.log(arrayBL[0]);
      console.log(arrayBL[1]);
      setGeodesicY(geodesicY);
      setGeodesicX(geodesicX);
      setLatitudeBDecimal(arrayBL[0]);
      setLongitudeLDecimal(arrayBL[1]);
      var latitudeBDegree =
        Calculation.decimalToDegreesMinutesAndSeconds(arrayBL[0]) + "N";
      setLatitudeBDegreeMinutesSeconds(latitudeBDegree);
      var LongitudeLDegree =
        Calculation.decimalToDegreesMinutesAndSeconds(arrayBL[1]) + "E";
      setLongitudeLDegreeMinutesSeconds(LongitudeLDegree);
      setLinkToGoogleMaps(
        Calculation.linkGenerate(latitudeBDegree, LongitudeLDegree)
      );

      setIsResultReady(true);
      console.log(latitudeBDecimal);
      console.log(linkToGoogleMaps);
    }
    setRecalculateOrReset(!recalculateOrReset);
  };

  const updateLocation = (
    event,
    id,
    visiblState,
    geodesicY,
    geodesicX,
    latitudeBDecimal,
    longitudeLDecimal,
    latitudeBDegreeMinutesSeconds,
    longitudeLDegreeMinutesSeconds,
    linkToGoogleMaps
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const newLocation = {
      id: id,
      visiblState: !visiblState,
      imputValueGeodesicY: geodesicY,
      imputValueGeodesicX: geodesicX,
      geodesicY: geodesicY,
      geodesicX: geodesicX,
      latitudeBDecimal: latitudeBDecimal,
      longitudeLDecimal: longitudeLDecimal,
      latitudeBDegreeMinutesSeconds: latitudeBDegreeMinutesSeconds,
      longitudeLDegreeMinutesSeconds: longitudeLDegreeMinutesSeconds,
      linkToGoogleMaps: linkToGoogleMaps,
    };
    const url = "http://localhost:8080/api/locations/" + id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    }).then((data) => console.log(data));
  };

  return (
    <>
      {appState.locations.map((location) => {
        return (
          <>
            <tr>
              <td>{location.id}</td>
              <td>
                {location.visiblState ? (
                  location.geodesicY
                ) : (
                  <InputCoordinate
                    id="geodesicY"
                    value={imputValueGeodesicY}
                    onChange={(e) => handleInput(e)}
                  />
                )}
              </td>
              <td>
                {location.visiblState ? (
                  location.geodesicX
                ) : (
                  <InputCoordinate
                    id="geodesicX"
                    value={imputValueGeodesicX}
                    onChange={(e) => handleInput(e)}
                  />
                )}
              </td>
              {visiblState || !recalculateOrReset ? (
                <>
                  <td>{location.latitudeBDecimal}</td>
                  <td>{location.longitudeLDecimal}</td>
                  <td>{location.latitudeBDegreeMinutesSeconds}</td>
                  <td>{location.longitudeLDegreeMinutesSeconds}</td>
                  <td>
                    <a
                      class="App-link"
                      target="_blank"
                      href={location.linkToGoogleMaps}
                    >
                      {location.linkToGoogleMaps}
                    </a>
                  </td>
                </>
              ) : (
                <>
                  <td>{latitudeBDecimal}</td>
                  <td>{longitudeLDecimal}</td>
                  <td>{latitudeBDegreeMinutesSeconds}</td>
                  <td>{longitudeLDegreeMinutesSeconds}</td>
                  <td>
                    <a class="App-link" target="_blank" href={linkToGoogleMaps}>
                      {linkToGoogleMaps}
                    </a>
                  </td>
                </>
              )}
              <td>
                <button onClick={(event) => removeLocation(event, location.id)}>
                  Usuń
                </button>
              </td>
              <td>
                <input
                  id={location.id}
                  type="submit"
                  value={location.visiblState ? "Zmień" : "Anuluj"}
                  onClick={(event) =>
                    changeCoordinates(
                      event,
                      location.id,
                      location.visiblState,
                      location.geodesicY,
                      location.geodesicX,
                      location.latitudeBDecimal,
                      location.longitudeLDecimal,
                      location.latitudeBDegreeMinutesSeconds,
                      location.longitudeLDegreeMinutesSeconds,
                      location.linkToGoogleMaps
                    )
                  }
                />
              </td>
              <>
                <td>
                  <Recalculation
                    onClick={(event) =>
                      handleClick(
                        event,
                        imputValueGeodesicY,
                        imputValueGeodesicX
                      )
                    }
                    recalculateOrReset={recalculateOrReset}
                    isRecalculateVisible={!location.visiblState}
                  />
                </td>
              </>

              <td>
                <UpdateLocation
                  onClick={(event) =>
                    updateLocation(
                      event,
                      location.id,
                      location.visiblState,
                      geodesicY,
                      geodesicX,
                      latitudeBDecimal,
                      longitudeLDecimal,
                      latitudeBDegreeMinutesSeconds,
                      longitudeLDegreeMinutesSeconds,
                      linkToGoogleMaps
                    )
                  }
                  isUpdateVisible={
                    !location.visiblState &&
                    !recalculateOrReset &&
                    isResultReady
                  }
                />
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
