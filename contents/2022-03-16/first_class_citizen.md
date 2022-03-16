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

그렇다면 함수는 어떨까?

```javascript
const foo = function () {
  console.log('foobar')
}
// 변수를 사용해 호출
foo()
```

자바스크립트에선 함수는 값이 될 수 있다. fn이라는 함수가 있고 이 함수는 또 다른 함수를 리턴하고 있다.

```javascript
function fn() {
  return function () {
    console.log('Hello!')
  }
}
```

자바스크립트에서는 함수를 변수처럼 취급하기 때문에 함수는 다른 함수의 반환값으로 사용될 수 있다.  
이렇게 함수를 반환하는 함수를 <b>고차 함수</b>라고 한다.

다음은 sayHello라는 함수가 다른 함수의 인자로 사용되고 있다.

```javascript
function sayHello() {
  return 'Hello, '
}
function greeting(helloMessage, name) {
  console.log(helloMessage() + name)
}
// `sayHello`를 `greeting` 함수에 인자로 전달
greeting(sayHello, 'JavaScript!')
```

함수 greeting은 sayHello라는 함수를 인자로 받아서 인자를 함수로 실행시키고 있다.  
다른 함수에 인자로 전달된 함수를 <b>콜백 함수</b>라고 부른다. sayHello 함수는 콜백 함수이다.  
자바스크립트의 함수는 아래 3가지 조건을 모두 충족시키기에 함수 역시 1급 시민이라고 할 수 있다.

**1. 함수를 변수나 데이타에 할당 할 수 있다.**  
**2. 함수를 인자로 전달 할 수 있다.**  
**3. 함수를 리턴 할수 있다.**

물론 모든 언어에서 함수가 1급 시민은 아니다. 자바의 경우에는 함수는 1급 시민이 아니다.
