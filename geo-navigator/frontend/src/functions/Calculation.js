const polandCs2000Zone7ToGeografic = function (geodesicY, geodesicX) {
  //########################### Listing of main constants ###########################
  // (B,∆L) => (f,∆λ) => (XMERC,YMERC)
  const radiusOfLagrangeSphereRo = 6367449.14577;
  // (XGK, YGK) => (XMERC,YMERC)
  const normParameterS = 0.000002;
  const coefA0 = 5765181.11148097;
  //(XMERC,YMERC) => (XGK, YGK)
  const coefB = [
    5760000, 500199.26224125, 63.88777449, -0.8203917, -0.13125817, 0.00101782,
    0.00010778,
  ];
  //(f,∆λ) => (B,∆L)
  const coefC = [
    0, 0, 0.0033565514856, 0, 0.0000065718731, 0, 0.0000000176466, 0,
    0.000000000054,
  ];
  //########################### Calculations ###########################
  //Poland cs2000 zone 7 to Gauss-Kruger coordinates
  const meridianNumber = 21;
  const parameterM0 = 0.999923;
  const x0 = 0;
  const y0 = 7500000;
  let XGK = (geodesicX - x0) / parameterM0; //pionowa
  let YGK = (geodesicY - y0) / parameterM0; //pozioma
  // [1'] (XGK, YGK) => (XMERC, YMERC)
  let zXGK = (XGK - coefA0) * normParameterS;
  let zYGK = YGK * normParameterS;
  let xMERC =
    coefB[0] +
    zXGK *
      (coefB[1] +
        zXGK *
          (coefB[2] +
            zXGK *
              (coefB[3] +
                zXGK * (coefB[4] + zXGK * (coefB[5] + zXGK * coefB[6])))));
  let yMERC =
    zYGK *
    (coefB[1] +
      zYGK *
        (coefB[2] +
          zYGK *
            (coefB[3] +
              zYGK * (coefB[4] + zYGK * (coefB[5] + zYGK * coefB[6])))));

  // [2'] (XMERC, YMERC) => (f, ∆λ)
  let alpha = xMERC / radiusOfLagrangeSphereRo;
  let beta = yMERC / radiusOfLagrangeSphereRo;
  let w = 2 * Math.atan(Math.exp(beta)) - Math.PI / 2;
  let fi = Math.asin(Math.cos(w) * Math.sin(alpha));
  let lambdaIncrement = Math.atan(Math.tan(w) / Math.cos(alpha));

  // [3'] (f, ∆λ) => (B, ∆L)
  let bRadians =
    fi +
    coefC[2] * Math.sin(2 * fi) +
    coefC[4] * Math.sin(4 * fi) +
    coefC[6] * Math.sin(6 * fi) +
    coefC[8] * Math.sin(8 * fi);
  let LIncrementRadians = lambdaIncrement;
  let lRadians = LIncrementRadians + (Math.PI * meridianNumber) / 180;

  // Decimal solution
  let bDegree = Math.trunc((10000000 * (bRadians * 180)) / Math.PI) / 10000000;
  let lDegree = Math.trunc((10000000 * (lRadians * 180)) / Math.PI) / 10000000;

  return [bDegree, lDegree];
};

const decimalToDegreesMinutesAndSeconds = (degreeInDecimal) => {
  var absolute = Math.abs(degreeInDecimal);
  var degrees = Math.floor(absolute);
  var minutesNotTruncated = (absolute - degrees) * 60;
  var minutes = Math.floor(minutesNotTruncated);
  var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  var degreeMinutesSeconds = degrees + "°" + minutes + "'" + seconds + "''";
  return degreeMinutesSeconds;
};

const linkGenerate = (
  latitudeBDegreeMinutesSeconds,
  longitudeLDegreeMinutesSeconds
) => {
  return (
    "https://www.google.pl/maps/place/" +
    latitudeBDegreeMinutesSeconds +
    longitudeLDegreeMinutesSeconds
  );
};

export {
  polandCs2000Zone7ToGeografic,
  decimalToDegreesMinutesAndSeconds,
  linkGenerate,
};
