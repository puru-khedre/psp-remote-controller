const cos = [
  { angle: 0.19634954084936207, value: "0.981" },
  { angle: 0.5890486225480862, value: "0.831" },
  { angle: 0.9817477042468103, value: "0.556" },
  { angle: 1.3744467859455345, value: "0.195" },
  { angle: 1.7671458676442586, value: "-0.195" },
  { angle: 2.1598449493429825, value: "-0.556" },
  { angle: 2.552544031041707, value: "-0.831" },
  { angle: 2.945243112740431, value: "-0.981" },
];

const sin = [
  { angle: 0.19634954084936207, value: "0.195" },
  { angle: 0.5890486225480862, value: "0.556" },
  { angle: 0.9817477042468103, value: "0.831" },
  { angle: 1.3744467859455345, value: "0.981" },
  { angle: 1.7671458676442586, value: "0.981" },
  { angle: 2.1598449493429825, value: "0.831" },
  { angle: 2.552544031041707, value: "0.556" },
  { angle: 2.945243112740431, value: "0.195" },
];

// const pointCalc = (center, radii) => {
//     let x=
// };

const tan = [
  { angle: 0, value: "0.000" },
  { angle: 0.39269908169872414, value: "0.414" },
  { angle: 0.7853981633974483, value: "1.000" },
  { angle: 1.1780972450961724, value: "2.414" },
  { angle: 1.5707963267948966, value: "16331239353195370.000" },
  { angle: 1.9634954084936207, value: "-2.414" },
  { angle: 2.356194490192345, value: "-1.000" },
  { angle: 2.748893571891069, value: "-0.414" },
];

const circleEquation = (center, point, radii) => {
  let { i, j } = center;
  let { x, y } = point;

  let aSq = Math.pow(x - i, 2);
  let bSq = Math.pow(y - j, 2);
  let radiiSq = Math.pow(radii, 2);

  return aSq + bSq - radiiSq;
};

const equationCalc = (center, point, line) => {
  const lineNum = +line.slice(-1);
  const { i, j } = center;
  const { x, y } = point;
  const tanVal = tan[lineNum];

  let a = tanVal * x;
  let b = y;
  let c = tanVal * i + j;
  if (tanVal > 0) {
    return a + b + c;
  } else {
    return -(a + b + c);
  }
};
