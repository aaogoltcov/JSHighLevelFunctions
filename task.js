function sleep(milliseconds) {
  let e = new Date().getTime() + milliseconds;
  while (new Date().getTime() <= e) {};
};

function sum(...args) {
  sleep(100);
  return args.reduce((sum, arg) => {
    return sum += +arg;
  }, 0);
};

function compareArrays(arr1, arr2) {
  let result;
  if (arr1.length == 0 && arr2.length == 0) {
    result = true;
  } else if (arr1.length === arr2.length &&
            Array.isArray(arr1) &&
            Array.isArray(arr2)) {
    arr1.forEach((iArray1) => arr2.forEach((iArray2) => {
      if (iArray1 === iArray2) {
        result = true;
    } else {
      result = false;
    };
    }));
  } else {
    result = false;
  };
  return result;
};

function memorize(fn, limit) {
  let resultArray = {};
    return function(...args) {
      if (Object.keys(resultArray).includes(args.toString())) {
        return resultArray[args];
      } else {
        if (Object.keys(resultArray).length == limit) {
          delete resultArray[Object.keys(resultArray)[0]];
        };
        resultArray[args] = fn(...args);
        return resultArray[args];
      };
    };
};

// task with *
let array = [ [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4], [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4], [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4], [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4] ];

const mSum = memorize(sum, 5);

function testCase(testFunction, iterations, array) {
  let iteration = 1;
  while (iteration <= iterations) {
    array.forEach((element) => {
      console.log(iteration, element, testFunction(...element));
      iteration += 1;
      });
  }
};
// first functions -- 10263.175ms (71.015ms без sleep)
console.time(sum);
testCase(sum, 100, array);
console.timeEnd(sum);


// second function -- 314.343ms (9.100ms без sleep)
console.time(memorize);
testCase(mSum, 100, array);
console.timeEnd(memorize);

// Функция memorize выполняется в 8 - 32 раза быстрее (в зависимости от sleep) за счет соранения предыдущих результатов,
// и исключения повторного расчета.