---
date: '2022-03-16'
title: 'first class citizen'
categories: ['JavaScript']
summary: '자바스크립트의 1급 시민에는 어떤 것이 있을까?'
thumbnail: './javascript_thumbnail.png'
---

### first class citizen

프로그래밍에는 <b>first class citizen(1급 시민)</b>이라는 개념이 있다.

해당 개념은 꽤 오래전부터 존재해왔는데 <b>first class citizen</b>이라고 하면 거주의 자유, 직업 선택의 자유가 보장되며 참정권을 가지는 시민을 의미한다면 <b>second class citizen</b>는 같은 시민이긴 하지만 거주와 직업 선택의 제한을 가지고 참정권 역시 제한되어 있는 시민을 의미한다.
<br/><br/>
프로그래밍 세계에서도 비슷한 개념이 존재한다.

프로그래밍 언어 디자인에서 특정언어의 <b>first class citizen</b>이란 보통 다른 객체들에게 적용 가능한 연산을 모두 지원하는 객체를 의미한다.  
이런 연산에는 보통 매개변수로 전달하고, 함수에서 반환되고 수정되고 변수에 할당되는 작업 또한 포함된다.  
영국의 컴퓨터 과학자 Christopher Strachey는 1967년에 1급 시민을 다음과 같이 정의했다.
<br/><br/>
**1. 변수(variable)에 담을 수 있다.**  
**2. 인자(parameter)로 전달할 수 있다.**  
**3. 반환값(return value)으로 전달할 수 있다.**

### 자바스크립트에서 1급 시민에 해당하는 문법

1은 변수의 값이 될 수 있을까?

```javascript
var num = 1
```

대부분의 프로그래밍 언어에서 숫자는 1급 시민의 조건을 충족한다.  
숫자는 변수에 지정할 수 있고 인자나 반환값으로 전달할 수 있다.

그렇다면 조건 문은 변수의 값이 될 수 있을까?

```javascript
var isDog = if(dog) { console.log('bark!!'); }
```

조건은 변수에 담아줄 수 없다. 그러므로 조건은 1급 시민이 아니다.

**그렇다면 함수는 어떨까?**

다음과 같은 조건을 만족하는 객체를 일급 객체라고 한다.

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

자바스크립트의 함수는 다음 예제와 같이 위의 조건을 모두 만족하기 때문에 일급 객체다.

```javascript
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당한다.
const increase = function (num) {
  return ++num
}

const decrease = function (num) {
  return --num
}

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease }

// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
  let num = 0

  return function () {
    num = aux(num)
    return num
  }
}

// 3. 함수의 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase)
console.log(increaser()) // 1
console.log(increaser()) // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease)
console.log(decreaser()) // -1
console.log(decreaser()) // -2
```

함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다.  
객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.  
따라서 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가받는다.
