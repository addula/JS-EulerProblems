/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/
(function(){
  function gcd(numbers) {
    return numbers.reduce(function (a, b) {
      return b === 0 ? a : gcd([b, a % b]);
    });
  }
  
  function lcm(numbers) {
    return numbers.reduce(function (a, b) {
      return Math.abs(a * b) / gcd([a, b]);
    });
  }
  
  function sumOfFactorsOfXBelowN(X, N) {
      var n = Math.floor((N - 1) / X);
      return (X * ((n * (n + 1)) / 2));
  }
  
  function firstApproach(arr, limit) {
      var total = 0;
      for(var i = 1; i < limit; i++) {
          var divisible = false;
          for(var j = 0; j < arr.length; j++) {
              if(i % arr[j] === 0) {
                  divisible = true;
                  break;
              }
          }
          if(divisible) {
              total += i;
          }
      }
      return total;
  }
  
  function secondApproach(arr, limit) {
      var total = 0;
      arr.forEach(function(num) {
          total += sumOfFactorsOfXBelowN(num, limit);
      });
      var lcmOfArr = lcm(arr);
      total = total - sumOfFactorsOfXBelowN(lcmOfArr, limit);
      return total;
  }
  
  var a;
  
  a = performance.now();
  console.log(firstApproach([3, 5], 1000000));
  console.log(performance.now() - a);
  
  a = performance.now();
  console.log(secondApproach([3, 5], 1000000));
  console.log(performance.now() - a);
})();
