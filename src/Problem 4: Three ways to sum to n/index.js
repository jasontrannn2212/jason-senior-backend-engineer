// Calculates the sum of all integers from 1 to n using recursion
var sum_to_n_a = function (n) {
  if (n === 0) {
    return 0;
  }
  return n + sum_to_n_a(n - 1);
};

// Calculates the sum of all integers from 1 to n using a mathematical formula
var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

// Calculates the sum of all integers from 1 to n using a loop
var sum_to_n_c = function (n) {
  let sum = 0;
  for (i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
