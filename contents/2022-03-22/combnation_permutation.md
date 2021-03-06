---
date: '2022-03-22'
title: '순열과 조합'
categories: ['JavaScript', 'Algorithm']
summary: '순열과 조합 그리고 중복 순열을 구하는 방법에 대해 알아보자'
thumbnail: './algorithm.png'
---

### 알고리즘 정리 5번째 [순열, 조합]

순열과 조합은 코딩 테스트를 치룰 때 많이 다루는 알고리즘 중 하나이다.

### 조합(Combinations)

조합은 n개 중에 r개를 뽑는 경우의 수를 구할 때 순서를 고려하지 않는 개념이다.  
4C3 = 4Combination3은 4개 중에 3개를 선택하는데 ‘조합’으로 나올 수 있는 경우의 수를 구한다.

```planetext
Input: [1, 2, 3, 4]
OutPut: [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]
```

조합에서는 순서를 고려하지 않기에 OutPut 내부의 숫자 배치가 어떻게 되든 같은 경우의 수로 취급하게 된다.

### 조합 방식

```planetext
start
1을 선택하고 나머지 [2,3,4]중에서 2개씩 조합을 구한다. (num = 2)
2를 선택하고 나머지 [3,4]를 반환한다. (num = 1)
고정했던 2에 이어붙인다.
[2,3],[2,4]
3을 선택하고 나머지 [4]를 반환한다. (num = 1)
고정했던 3에 이어붙인다.
[3,4]
[2,3,4]일 때 나오는 모든 조합 반환
[2,3],[2,4],[3,4]
고정했던 1에 이어붙인다. (num = 2)
[1,2,3],[1,2,4],[1,3,4]

2를 선택하고 나머지 [3,4]중에서 2개씩 조합을 구한다. (num = 2)
3을 선택하고 나머지 [4]를 반환한다. (num = 1)
고정했던 3에 이어붙인다.
[3,4]
[3,4]일 때 나오는 모든 조합 반환
[3,4]
고정했던 2에 이어붙인다. (num = 2)
[1,2,3],[1,2,4],[1,3,4],[2,3,4]

3을 선택하고 나머지 [4]중에서 2개씩 조합을 구한다. (num = 2)
[1,2,3],[1,2,4],[1,3,4],[2,3,4]

4를 선택하고 나머지 []중에서 2개씩 조합을 구한다. (num = 2)
[1,2,3],[1,2,4],[1,3,4],[2,3,4]
end
```

이렇게 배열의 처음부터 하나씩 선택(고정)하며 뒤의 나머지 배열들의 조합을 구해 앞의 고정된 원소에 붙여주면 된다. 나머지 배열들의 조합을 구할 땐 재귀함수를 이용해주자.

### 조합 코드

```javascript
function getComb(arr, num) {
  const result = []
  if (num === 1) return arr.map(item => [item]) // 1
  arr.forEach((fixed, index, arr) => {
    // 2
    const rest = arr.slice(index + 1) // 3
    const comb = getComb(rest, num - 1) // 3
    const answer = comb.map(item => [fixed, ...item]) // 4
    result.push(...answer) // 4
  })
  return result
}

console.log(getComb([1, 2, 3, 4], 3)) // [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
```

종료 조건 및 풀이 방법은 다음과 같다.

1. 재귀 종료 조건: 한 개를 선택하는 경우에 남아있는 모든 배열의 원소를 하나씩 선택하여 배열로 리턴해준다.
2. forEach문에는 처리할 현재 값(currentvalue)를 인자로 넣을 수 있으며 이게 고정(fixed)값이 되겠다.

   `arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])`

   forEach문으로 배열의 모든 원소를 처음부터 끝까지 한번씩 고정(fixed)되게 한다.

3. 고정된 값을 제외하고 나머지 배열에 대한 조합을 구한다. 그리고 선택한 개수 또한 하나씩 줄어든다.
4. 고정(fixed)된 값을 제외한 나머지 조합에 고정(fixed)된 값을 앞에 붙이고, 전개 구문(spread syntax)을 사용해 리턴할 배열에 넣는다. 그리고 가장 처음 고정되었던 원소의 조합까지 전부 구해줬다면 최종 결과 값에 push해준다.

3과 4가 고정(fixed) 값인 것(2C3, 1C2)처럼 배열 원소수보다 선택하려는 개수가 더 많은 경우는 빈 배열이 리턴되기에 최종 결과값에 포함되진 않는다.

### 순열(Permutations)

순열은 n개 중에 r개를 뽑는 경우의 수를 구할 때 순서를 고려하여 뽑는다.  
4P3 = 4Permutation3은 4개 중에 3개를 선택하는데 ‘순열’로 나올 수 있는 경우의 수를 구하는 것이다.

```planetext
Input: [1, 2, 3, 4]
Output: [1, 2, 3], [1, 2, 4], [1, 3, 2], [1, 3, 4], [1, 4, 2], [1, 4, 3],
        [2, 1, 3], [2, 1, 4], [2, 3, 1], [2, 3, 4], [2, 4, 1], [2, 4, 3],
        [3, 1, 2], [3, 1, 4], [3, 2, 1], [3, 2, 4], [3, 4, 1], [3, 4, 2],
        [4, 1, 2], [4, 1, 3], [4, 2, 1], [4, 2, 3], [4, 3, 1], [4, 3, 2]
```

### 순열 방식

순열은 조합을 구하는 코드와 크게 차이나지 않는다.  
조합과 다른 점은 배열의 처음부터 선택(고정)하면서 나머지 배열을 구할 때, 고정된 값을 제외한 모든 원소에 대해서  
순열을 구해야한다.

```planetext
1을 선택하고 나머지 [2,3,4]중에서 2개씩 순열을 구한다. (num = 2)
2를 선택하고 나머지 [3,4]를 반환한다. (num = 1)
고정했던 2에 이어붙인다.
[2,3],[2,4]
3을 선택하고 나머지 [2,4]를 반환한다. (num = 1)
고정했던 3에 이어붙인다.
[3,2],[3,4]
4를 선택하고 나머지 [2,3]를 반환한다. (num = 1)
고정했던 3에 이어붙인다.
[4,2],[4,3]
[2,3,4]일 때 나오는 모든 순열 반환
[2,3],[2,4],[3,2],[3,4],[4,2],[4,3]
고정했던 1에 이어붙인다. (num = 2)
[1,2,3],[1,2,4],[1,3,2],[1,3,4],[1,4,2],[1,4,3]

2를 선택하고 나머지 [1,3,4]중에서 2개씩 순열을 구한다. (num = 2)
1을 선택하고 나머지 [3,4]를 반환한다. (num = 1)
고정했던 1에 이어붙인다.
[1,3],[1,4]
3을 선택하고 나머지 [1,4]를 반환한다. (num = 1)
고정했던 3에 이어붙인다.
[3,1],[3,4]
4를 선택하고 나머지 [1,3]를 반환한다. (num = 1)
고정했던 4에 이어붙인다.
[4,1],[4,3]
[1,3,4]일 때 나오는 모든 순열 반환
[1,3],[1,4],[3,1],[3,4],[4,1],[4,3]
고정했던 2에 이어붙인다. (num = 2)
[1,2,3],[1,2,4],[1,3,2],[1,3,4],[1,4,2],[1,4,3]
[2,1,3],[2,1,4],[2,3,1],[2,3,4],[2,4,1],[2,4,3]

...
```

### 순열 코드

조합 코드에서 나머지 배열을 구하는 코드만 바꿔주면 된다.

```javascript
function getPermu(arr, num) {
  const result = []
  if (num === 1) return arr.map(item => [item])
  arr.forEach((fixed, index, arr) => {
    // const rest = arr.slice(index + 1);
    const rest = [...arr.slice(0, index), ...arr.slice(index + 1)]
    const comb = getPermu(rest, num - 1)
    const answer = comb.map(item => [fixed, ...item])
    result.push(...answer)
  })
  return result
}

console.log(getPermu([1, 2, 3, 4], 3))
/*
  [[1, 2, 3], [1, 2, 4], [1, 3, 2], [1, 3, 4], [1, 4, 2], [1, 4, 3],
   [2, 1, 3], [2, 1, 4], [2, 3, 1], [2, 3, 4], [2, 4, 1], [2, 4, 3],
   [3, 1, 2], [3, 1, 4], [3, 2, 1], [3, 2, 4], [3, 4, 1], [3, 4, 2],
   [4, 1, 2], [4, 1, 3], [4, 2, 1], [4, 2, 3], [4, 3, 1], [4, 3, 2]]
*/
```

### 중복 순열(permutation with repetition)

중복 순열은 n개의 서로 다른 원소 중에서 중복을 허용하여 r개를 뽑아 나열하는 경우의 수다.  
중복 순열은 선택(고정)된 값도 다시 선택가능하기에 rest 배열에 기본 arr을 넘겨주면 된다.

```javascript
function getComb(arr, num) {
  const result = []
  if (num === 1) return arr.map(item => [item])
  arr.forEach((fixed, index, arr) => {
    const rest = arr
    const comb = getComb(rest, num - 1)
    const answer = comb.map(item => [fixed, ...item])
    result.push(...answer)
  })
  return result
}

console.log(getComb([1, 2, 3, 4], 3))
/*
[[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 2, 1], [1, 2, 2], [1, 2, 3], [1, 2, 4],
 [1, 3, 1], [1, 3, 2], [1, 3, 3], [1, 3, 4], [1, 4, 1], [1, 4, 2], [1, 4, 3], [1, 4, 4]
 [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 1, 4], [2, 2, 1], [2, 2, 2], [2, 2, 3], [2, 2, 4],
 [2, 3, 1], [2, 3, 2], [2, 3, 3], [2, 3, 4], [2, 4, 1], [2, 4, 2], [2, 4, 3], [2, 4, 4],
 [3, 1, 1], [3, 1, 2], [3, 1, 3], [3, 1, 4], [3, 2, 1], [3, 2, 2], [3, 2, 3], [3, 2, 4],
 [3, 3, 1], [3, 3, 2], [3, 3, 3], [3, 3, 4], [3, 4, 1], [3, 4, 2], [3, 4, 3], [3, 4, 4],
 [4, 1, 1], [4, 1, 2], [4, 1, 3], [4, 1, 4], [4, 2, 1], [4, 2, 2], [4, 2, 3], [4, 2, 4],
 [4, 3, 1], [4, 3, 2], [4, 3, 3], [4, 3, 4], [4, 4, 1], [4, 4, 2], [4, 4, 3], [4, 4, 4]]
*/
```
