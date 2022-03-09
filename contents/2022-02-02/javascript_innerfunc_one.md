---
date: '2022-02-02'
title: '자바스크립트 기본 함수 1'
categories: ['JavaScript']
summary: '자바스크립트의 다양한 기본 함수에 대해서 알아보자'
thumbnail: './javascript_thumbnail.png'
---

오랜만에 자바스크립트에 대해 복습을 해보았다.  
자바스크립트에는 기본적을 지원하는 함수들이 있으며 잘만 이용하면 코딩테스트나, 개발을 할 때 피로도를 줄여줄 수 있는 유용한 메서드들이 많다.
오늘은 그 기본 함수들에 대해서 알아보도록 하자

### parseInt, parseFloat

문자열을 해당 진수(10진수, 16진수 등)의 정수로 반환해준다.

```javascript
console.log(parseInt('100', 10)) // 100
console.log(parseInt('100', 16)) // 256
console.log(paresInt('100', 8)) // 64
console.log(paresInt('100', 2)) // 4
```

<b>Number()</b>는 parseInt와 다르게 인수를 숫자값으로 반환하는데 이를 변환할 수 없다면 <b>'NaN'</b>를 반환한다.

```javascript
console.log(parseInt('2021년도')) // 2021
console.log(Number('2021년도')) // NaN
```

소숫점 같은 경우는 어떨까?  
우리의 Number()는 소숫점도 당연히 처리해주지만 parseInt는 오직 정수만 처리해준다.

```javascript
console.log(Number(10.31)) // 10.31
console.log(parseInt(10.31)) // 10
```

parseInt 대신 parseFloat을 사용하여 변환해주자

```javascript
console.log(parseFloat(10.32)) // 10.32
console.log(parseFloat('10.32')) // 10.32
```

### Array

Array는 리스트 형태의 고수준 객체인 배열을 생성할 때 사용하는 전역 객체다.  
아래와 같이 Array 객체를 선언해준다.

```javascript
let arr = [1, 2, 3, 4]
console.log(arr) // [1, 2, 3, 4]
console.log(arr[0]) // 1
```

<b>concat</b>을 이용하면 배열과 배열을 이어붙여줄 수 있다.

```javascript
let arrOne = ['사과', '배', '복숭아']
let arrTwo = ['오렌지', '수박', '바나나']
console.log(arrOne.concat(arrTwo)) // ['사과', '배', '복숭아', '오렌지', '수박', '바나나']
```

배열에 항목을 추가 및 제거하는 함수가 있다.  
**push()**: 배열 끝에 항목 추가  
**pop()** : 배열 끝에서 항목 제거  
**unshift()** : 배열 앞에 항목 추가  
**shift()** : 배열 앞에서 항목 제거

```javascript
let arr = ['사과', '배', '복숭아', '오렌지']

console.log(arr.push('수박')) // 5
console.log(arr) // ['사과', '배', '복숭아', '오렌지', '수박']

console.log(arr.pop()) // '수박'
console.log(arr) // ['사과', '배', '복숭아', '오렌지']

console.log(arr.unshift('바나나')) // 5
console.log(arr) // ['바나나', '사과', '배', '복숭아', '오렌지']

console.log(arr.shift('바나나')) // '바나나'
console.log(arr) // ['사과', '배', '복숭아', '오렌지']
```

**splice()** : 요소를 삭제하거나 교체해준다.

```javascript
let arr = ['사과', '배', '복숭아', '오렌지']

console.log(arr.splice(2, 1, '바나나')) // 복숭아
console.log(arr) // ['사과', '배', '바나나', '오렌지']

console.log(arr.splice(1, 0, '파인애플')) // []
console.log(arr) // ['사과', '파인애플', '배', '바나나', '오렌지']
```

**slice()** : 요소를 인덱스 기준으로 잘라준다.

```javascript
let arr = [4, 5, 6, 1, 2, 3]

console.log(arr.slice(3, 6)) // [1, 2, 3]
console.log(arr) // [4, 5, 6, 1, 2, 3]
```

**length** : 배열의 길이를 반환 한다.

```javascript
let arr = [1, 2, 3, 4, 5]

console.log(arr.length) // 5
```

**fill()** : 해당 값으로 배열을 채운다.  
첫번째 인자에 채울 값을 두번째, 세번째 인자에는 각각 시작 인덱스와 끝 인덱스를 지정해주자  
세번째 인자를 생략할 시 시작 인덱스에서 마지막 배열 요소까지 해당 값으로 배열을 채워준다.

```javascript
let arr = [1, 2, 3, 4, 5]

console.log(arr.fill(0)) // [0, 0, 0, 0, 0]
console.log(arr.fill(1, 1, 3)) // [0, 1, 1, 0, 0]
console.log(arr.fill(5, 2)) // [0, 1, 5, 5, 5]
```

**filter()** : 조건을 만족하는 항목들을 배열로 반환해준다.

```javascript
let score = [40, 80, 75, 90, 20, 10]
let message = ['abc', 'abcd', 'ab', 'abcde', 'adb']

console.log(score.filter(x => x >= 80)) // [80, 90]
console.log(message.filter(x => x.length == 3)) // ['abc', 'adb']
```

**flat()** : 메서드 이름에서 보는 것처럼 다차원 배열을 하위 배열로 납작하게? 바꿔준다.  
depth인자를 부여해주면 몇 차원 배열까지 하위 배열에 이어붙여 나타낼 것인지 설정해준다. (기본은 1)

```javascript
let matrix = [1, 2, 3, [1, 2, 3, [10, 20]]]

console.log(matrix.flat()) // [1, 2, 3, [1, 2, 3, 10, 20]]
console.log(matrix.flat(2)) // [1, 2, 3, 1, 2, 3, 10, 20]
```

물론 배열 구멍도 제거가 가능하다.

```javascript
const arr5 = [1, 2, , 4, 5]
arr5.flat() // [1, 2, 4, 5]
```

하지만 flat()은 재귀적으로 이어붙인 새로운 배열을 생성하기 때문에 처리속도가 느리다.  
따라서 대안이 있다.

**1. reduce + concat**  
depth가 1정도 밖에 안된다면 두 메서드의 조합을 이용해도 된다.

```javascript
const arr = [1, 2, [3, 4]]
arr.reduce((acc, val) => acc.concat(val), []) // [1, 2, 3, 4]
```

**2. reduce + concat + isArray + 재귀**  
depth가 1이상이라면 아래와 같이 구현한다.

```javascript
const arr = [1, 2, [3, 4, [5, 6]]]

function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        [],
      )
    : arr.slice()
}

flatDeep(arr, Infinity)
```

스택을 이용하여 구현하는 방법도 있는데 이건 나중에 알아보자

**includes()** : 배열이 특정 항목을 포함하는지 확인해준다.

```javascript
let fruits = ['사과', '배', '복숭아', '오렌지']
fruits.includes('사과') // true
fruits.includes('바나나') // false
```

**join()** : 배열 항목들을 특정 값으로 이어붙인다.

```javascript
let arr = [1, 2, 3, 4, 5]

console.log(arr.join('|')) // 1|2|3|4|5
console.log(arr.join('-')) // 1-2-3-4-5
```

**map()** : 배열을 순회하며 함수를 실행한 결과로 새로운 배열을 만들어 반환한다.

```javascript
let arrOne = [1, 2, 3, 4, 5];
let arrTwo = ['1', '2', '3', '4', '5'];

function coding(x) {
  return x**2;
}

console.log(arr.map(coding));  // [1, 4, 9, 16, 25]
console.log(arr.map(x => parseInt(x, 10));  // [1, 2, 3, 4, 5]
```

**sort()** : 배열을 정렬한 후 그 배열을 반환한다.  
한가지 알아둬야할께 자바스크립트에서는 sort()는 유니코드에 따라 정렬한다.

```javascript
let arr = [1, 2, 100, 10, 222, 3]

console.log(arr.sort()) // [1, 10, 100, 2, 222, 3];
```

따라서 우리가 원하는 오름차순이나 내림차순을 정렬하려면 sort()에 조건을 붙여줘야한다.

```javascript
let score = [40, 80, 75, 90, 81]

score.sort((a, b) => {
  return a - b
}) // 내림차순 정렬은 "return b - a"로 변경해주면 된다.
console.log(score) // [40, 75, 80, 81, 90]
```

**reverse()** : 배열을 역순으로 정렬하고 그 배열을 반환한다.

```javascript
let arr = [1, 2, 3, 4, 5]

console.log(arr.reverse()) // [5, 4, 3, 2, 1]
```

다음번엔 **Set, Map, String, For in/for of/forEach/ Math** 메서드에 대해서 알아보겠다.
