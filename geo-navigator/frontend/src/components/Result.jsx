const Result = (props) => {
  return (
    props.isResultVisible && (
      <>
        <ul class="list-secondary">
          <span>
            Współrzędne geograficzne w formacie dziesiętnym [DD.DDDDDDD]:
          </span>
          <li>
            <span>Długość geograficzna: {props.longitudeLDecimal} E</span>
          </li>
          <li>
            <span>Szerokość geograficzna: {props.latitudeBDecimal} N</span>
          </li>
        </ul>
        <ul class="list-secondary">
          <span>
            Współrzędne geograficzne w formacie sześćdziesiętnym [DD.MM.SS]:
          </span>
          <li>
            <span>
              Długość geograficzna: {props.longitudeLDegreeMinutesSeconds}
            </span>
          </li>
          <li>
            <span>
              Szerokość geograficzna: {props.latitudeBDegreeMinutesSeconds}
            </span>
          </li>
        </ul>
        <p>
          <h4>Link do lokalizacji w Google Maps (pinezka): </h4>
          <a class="App-link" target="_blank" href={props.link}>
            {props.link}
          </a>
        </p>
      </>
    )
  );
};

export default Result;
