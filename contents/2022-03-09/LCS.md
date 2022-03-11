---
date: '2022-03-09'
title: 'LCS'
categories: ['JavaScript', 'Algorithm']
summary: 'Longest Common Subsequnce(최장 공통 부분 수열), Longest Common Substring(최장 공통 부분 문자열)에 대하여 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### 알고리즘 정리 3번째[Longest Common Subsequence]

Longest Common Subsequence, <b>최장 공통 부분 수열</b>이라고도 한다.  
최장 공통 부분 수열이란 두 수열이 주어질 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제다.  
여기서 중요한게 연속된 부분 문자열인지(Substring) 연속되지 않은 부분 문자열인지(Subsequnce)제대로 개념을 제대로 확인해야한다.

CRISSIS와 TRYSISS의 <b>Longest Common Subsequence</b>는 RSIS가 된다.  
(이 때 꼭 문자열이 연속해야 할 필요는 없다.)

CRISSIS와 TRYSISS의 <b>Longest Common Substring</b>은 SIS가 된다.
<br/><br/>
이 문제의 풀이 방법은 다음과 같다.

우선 CRISSIS와TRYSISS를 문자열의 인덱스를 이용하여 이중 for문으로 서로 각각의 문자를 비교한다.  
LCS의 점화식은 다음과 같다.

> 만약 현재 비교하고 있는 두 문자가 같으면 : DP[i][j] = DP[i-1][j-1] + 1  
> 현재 비교하고 있는 두 문자가 다르다면 : DP[i][j] = max(DP[i-1][j], DP[i][j-1])

우선 비교대상인 문자열 2개의 문자열 길이에서 +1 큰 배열로 2차원 배열을 만들어준다.  
그리고 0행, 0열에는 마진으로 0을 넣어준다.  
예를 들어서 (0, T) 즉 0행 T열인 경우에는 빈문자열과 ‘T’를 비교하겠다는 의미가 되기에 0을 넣는다.
<br/><br/>

<p align="center"><img src='/images/Algorithm/LCS/LCS_one.png' width='50%' alt='lcs one' /><p>
<br/>

반복문을 돌며 각 칸을 채워보자  
먼저 T, T를 비교해보자 TRISSIS와 CRYSISS 중에서 <b>“T” vs “C”</b>를 비교하게 된다.  
두 문자는 다르기 때문에 <b>DP[i][j-1]</b>와 <b>DP[i-1][j]</b> 중 큰 값이 들어와야한다.  
여기서 <b>DP[i][j-1]</b>는 <b>“” vs “C”</b>를 의미하고 <b>DP[i-1][j]</b>는 <b>“T” vs “”</b>를 의미한다.  
두개의 문자는 다르니까 그 둘을 비교하기 전인 값과 값이 같기에 그 중에서도 최댓값을 넣어준다.  
일단 둘다 0이니까 0을 넣는다.
<br/><br/>

<p align="center"><img src='/images/Algorithm/LCS/LCS_two.png' width='50%' alt='lcs two' /><p>
<br/>

이젠 두 문자가 같은 경우를 살펴본다.  
<b>“TR” vs “CR”</b>의 경우을 비교해보자 일단 비교하는 두 문자는 같다. 둘 다 같다면 <b>DP[i][j] = DP[i-1][j-1] + 1</b>이다.  
현재 <b>“CR”</b>을 비교하기 전 <b>“T” vs “CR”</b> 에서 최장공통부분 수열의 길이가 1 추가된 것과 같다.
<br/><br/>

<p align="center"><img src='/images/Algorithm/LCS/LCS_three.png' width='50%' alt='lcs three' /><p>
<br/>

다음 <b>“TR” vs “CRI”</b> 에서는 두 문자가 다르기에 <b>DP[i][j-1] (“T” vs “CRI”)</b> 과 <b>DP[i-1][j] (“TR” vs “CR”)</b>에서  
가장 큰 값을 넣어 준다.

이를 전부 계산하면 다음과 같다.
<br/><br/>

<p align="center"><img src='/images/Algorithm/LCS/LCS_four.png' width='50%' alt='lcs four' /><p>
<br/>

위 와 같은 표가 완성되며 구하고자 하는 결과는 <b>“TRYSISS” vs “CRISSIS”</b>이기 때문에 마지막 행과 열을 확인하면  
4라는 숫자가 들어있음을 알 수 있다.

전체 코드

```javascript
const str1 = 'TRYSISS'
const str2 = 'CRISSIS'

let DP = Array.from(
  new Array(str1.length + 1),
  () => new Array(str2.length + 1),
)

for (let i = 0; i <= str1.length; i++) {
  DP[i][0] = 0
}

for (let i = 0; i <= str2.length; i++) {
  DP[0][i] = 0
}

function LCS(str1, str2) {
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      console.log(str1[i - 1], str2[j - 1])
      if (str1[i - 1] === str2[j - 1]) {
        DP[i][j] = DP[i - 1][j - 1] + 1
      } else if (str1[i - 1] !== str2[j - 1]) {
        DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - 1])
      }
    }
  }
  return DP[str1.length][str2.length]
}

console.log(LCS(str1, str2)) // 4 (RSIS)
```

### Longest Common Substring

그렇다면 Longest Common Substring, <b>최장 공통 부분 문자열</b>을 구하는 방법은 어떻게 될까?  
두 문자열의 모든 부분 문자열을 구해주고 같은 부분 문자열을 구해준다음에 가장 긴 부분 문자열을 뽑아주면 된다.  
makeArr함수를 살펴보면 만약 문자열의 길이가 6이라면 길이가 6인 부분 문자열부터 2인 부분 문자열까지 모든 부분 문자열을 구하게 된다.

```javascript
function makeArr(str) {
  let result = []
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < i; j++) {
      result.push(str.slice(j, j + str.length - i + 1))
    }
  }
  return result
}
```

길이가 6일 때

i = 0, j = [0], Substring = “TRYSISS”.slice(0, 7)  
result = [”TRYSISS”]

길이가 5일 때

i = 1, j = [0, 1], Substring = “TRYSISS”.slice(0, 6), “TRYSISS”.slice(1, 7)  
result = [”TRYSISS”, “TRYSIS”, “RYSISS”]

길이가 4일 때

i = 2, j = [0, 1, 2], Substring = “TRYSISS”.slice(0, 5), “TRYSISS”.slice(1, 6), “TRYSISS”.slice(2, 7)  
result = [”TRYSISS”, “TRYSIS”, “RYSISS”, “TRYSI”, “RYSIS”, “YSISS”]
<br/><br/>
이렇게 두 문자열의 부분 문자열을 모두 구해준 다음에 filter를 이용하여 서로 겹치는 부분 문자열을 따로 저장한다.

```javascript
let intersection = arrayOne.filter(item => arrayTwo.includes(item))
```

마지막으로 공통된 부분 문자열들을 내림차순 정렬하고 가장 긴 공통 부분 문자열을 반환하면 된다.

**전체 코드**

```javascript
function makeArr(str) {
  let result = []
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < i; j++) {
      result.push(str.slice(j, j + str.length - i + 1))
    }
  }
  return result
}

function sol(str1, str2) {
  const arrayOne = makeArr(str1)
  const arrayTwo = makeArr(str2)
  let intersection = arrayOne.filter(item => arrayTwo.includes(item))

  intersection.sort((a, b) => {
    return b.length - a.length
  })

  return intersection[0].length
}

console.log(sol('TRYSISS', 'CRISSIS')) // 3 (SIS)
```

---

### 알아두면 좋은 코드

**빈 2차원 배열 선언하는 방법**

자바스크립트는 2차원 배열이 없다. 하지만 약간의 트릭을 통하여 2차원 배열과 비슷한 배열은 만들 수 있다.

**1. 초기값을 할당하여 배열 생성**

```javascript
// arr[5][2]
let arr = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
]
```

**2. 반복문을 사용하여 빈 배열 생성**

```javascript
// arr[5][2]
let arr = new Array(5)

for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(2)
}
```

**3. 2차원 배열 생성 함수를 만들어서 사용하기**

```javascript
function create2DArray(rows, columns) {
  let arr = new Array(rows)
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns)
  }
  return arr
}

// arr[5][2]
let arr = create2DArray(5, 2)
```

**4. Array 객체에 배열 생성 함수 추가해서 사용**

```javascript
Array.matrix = function (m, n, initial) {
  let a = []
  let mat = []
  for (let i = 0; i < m; i += 1) {
    a = []
    for (let j = 0; j < n; j += 1) {
      a[j] = initial
    }
    mat[i] = a
  }
  return mat
}

// arr[5][2]
let arr = Array.matrix(5, 2, 0)
```

**5. ES6 지원하는 최신 브라우저에서 사용 가능한 방법**

```javascript
// arr[5][2]
const arr = Array.from(new Array(5), () => new Array(2).fill(0))
```
