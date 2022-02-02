---
date: '2022-02-02'
title: '자바스크립트 기본 함수 2'
categories: ['JavaScript']
summary: '자바스크립트의 다양한 기본 함수에 대해서 알아보자'
thumbnail: './javascript_thumbnail.png'
showThumbnail: true
---

1편에 이어서 **Set, Map, String, For in/for of/forEach/ Math** 메서드에 대해서 알아보자

### Set

Set은 중복 값을 제외한 유일한 값을 저장해준다.

```javascript
let arr = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 5]
let s = new Set(arr)

console.log(s) // {1, 2, 3, 4, 5}
```

**size** : 값의 개수를 반환한다.  
Set의 크기는 length가 아닌 size를 통해 구할 수 있다.

```javascript
let arr = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 5]
let s = new Set(arr)

console.log(s.size) // 5
console.log(s.length) // undefined
```

Set에는 다음과 같은 메서드가 있다.

**add()** : 새로운 요소를 추가한다.  
**delete()** : 해당 요소를 삭제한다.  
**has()** : 특정 값을 가지고 있는지 확인한다.  
**clear()** : 모든 요소를 제거한다.

```javascript
let arr = [1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 5]
let s = new Set(arr)

console.log(s.has(5)) // true
console.log(s.has(7)) // false

console.log(s.add(7)) // {1, 2, 3, 4, 5, 7}
console.log(s.has(7)) // true

s.delete(7)
console.log(s) // {1, 2, 3, 4, 5}
console.log(s.has(7)) // false

s.clear()
console.log(s) // {}
```

### Map

key와 value를 같이 저장하는 객체다.

**set()** : Map 객체에 key와 value를 넣고 그 객체를 반환한다. (값 설정)

```javascript
let m = new Map()

m.set('하나', 'one')
m.set('둘', 'two')
m.set('셋', 'three')

console.log(m) // {'하나' => 'one', '둘' => 'two', '셋' => 'three'}
```

**get()** : 주어진 키에 해당하는 값을 반환한다.

```javascript
let m = new Map()
m.set('이름', 'name')

console.log(m.get('이름')) // name
```

**has()** : 객체 내 주어진 키의 값이 있는지 확인하고 Boolean 값을 반환한다.

```javascript
let m = new Map()

m.set('수학점수', 90)

console.log(m.has('수학점수')) // true
console.log(m.has(90)) // false
```

<b>for-of</b> 문을 통해 순회하기

```javascript
let score = new Map()

score.set('국어', 90)
score.set('수학', 85)
score.set('영어', 70)

for (let [key, value] of score) {
  console.log(`${key} : ${value}`)
}

/*
국어 : 90
수학 : 85
영어 : 70
*/

for (let i of score) {
  console.log(i)
}

/*
[국어, 90]
[수학, 85]
[영어, 70]
*/
```

### String

String 전역 객체는 문자열의 생성자다.

```javascript
let str = 2
let strTwo = 'two'
let strThree = '둘'

console.log(strTwo) // 'two'
console.log(strThree) // '둘'

// 템플릿 리터럴
console.log(`${str}는 영어로 ${strTwo}이고 한글로 ${strThree}이다.`) // '2는 영어로 two이고 한글로 둘이다.'
```

String에는 특정 문자를 입력하는 이스케이프 문자가 있다.

\n : Enter(개행)  
\t : 탭  
\v : 세로 탭  
\\' : 작은 따옴표  
\\" : 큰 따옴표  
\\\ : 역슬래시

<b>concat</b>을 이용해서 문자열끼리 연결해줄 수 있다.

```javascript
let str = 'Welcome to'

console.log(str.concat('JavaScript')) // 'Welcome to JavaScript'
```

**includes()**

```javascript
let str = 'abc abcd abcde abcdef'

console.log(str.includes('abcd')) // true
console.log(str.includes('efg')) // false
```

**split()** : 문자열을 지정된 구분자로 나눈 후 배열로 반환한다.

```javascript
let str = '아침 점심 저녁'

console.log(str.split(' ')) // ['아침', '점심', '저녁']
```

**replace()** : 특정 패턴에 일치하는 문자열을 교체할 수 있다.

```javascript
let str = 'abc abcd abcde abcdef'

console.log(str.replace('abcd', 'efgh')) // abc efgh abcde abcdef

// 정규 표현식을 사용하여 전역 교체
console.log(str.replace(/abc/g, '!')) // ! !d !de !def
console.log(str.replace(/ /g, '-')) // abc-abcd-abcde-abcdef
```

**slice()** : 인덱스를 기준으로 문자열을 잘라내 반환한다.
**indexOf()** : 주어진 문자열과 첫번째로 만나는 문자열의 인덱스를 반환한다.

```javascript
let str = '사과는 영어로 Apple'

console.log(str.indexOf('영어로')) // 4
console.log(str.slice(4, 7)) // 영어로
```

**match()** : 문자열에서 정규식과 매치되는 부분을 검색하고 배열로 반환한다.

```javascript
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let regexp = /[A-E]/gi

console.log(str.match(regexp)) // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

**toLowerCase() / toUpperCase()** : 대소문자로 변환한다.

```javascript
let str = 'JavaScript'

console.log(str.toLowerCase()) // javascript
console.log(str.toUpperCase()) // JAVASCRIPT
```

다음 처럼 대소문자 판별도 할 수 있다.

```javascript
let str = 'apple'

if (str == str.toLowerCase()) {
  console.log('소문자입니다.')
} else {
  console.log('대문자입니다.')
}
```

### for / for in / for of / forEach

자바스크립트에는 for, while문 말고도 다양한 형식의 반복문이 있다.

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = 0;

// 1. for
for (let i = 0; i < arr.length; i++) {
  result += arr[i];
}

// 2. for in
for (let i in arr) {
  result += arr[i]
}

// 3. for of
for (let i in arr) {
  result += i;
}

// 4. forEach - 오직 Array 객체에서만 사용이 가능하다.
arr.forEach( x=> { result} += x; });
```

### Math

Math 객체는 수학에서 자주 사용하는 상수와 함수들을 미리 구현해 놓은 자바스크립트 표준 내장 객체다.

**Math.abs()** : 절대값 반환  
**Math.cbrt()** : 세제곱근을 반환  
**Math.ceil()** : 크거나 같은 수 중 가장 작은 정수를 반환  
**Math.floor()** : 작거나 같은 수 중 가장 큰 정수를 반환

**Math.max()** : 가장 큰 수를 반환  
**Math.min()** : 가장 작은 수를 반환

**Math.pow(x, y)** : x의 y 제곱을 반환  
**Math.random()** : 0과 1사이의 난수를 반환  
**Math.round()** : 가장 가까운 정수를 반환
