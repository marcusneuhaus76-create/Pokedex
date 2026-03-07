const cache = {};

function expensiveCalculation(n) {
  if (cache[n]) {
    console.log("From cache");
    return cache[n];
  }

  console.log("Calculated");
  const result = n * n; // Beispiel
  cache[n] = result;
  return result;
}

expensiveCalculation(5);
expensiveCalculation(5);