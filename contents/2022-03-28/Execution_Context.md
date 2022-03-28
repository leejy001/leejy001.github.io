---
date: '2022-03-28'
title: '자바스크립트 실행 컨텍스트(Execution Context)'
categories: ['JavaScript', 'Algorithm']
summary: '자바스크립트의 실행 컨텍스트의 정의와 유형, 자바스크립트에서 어떻게 생성하며 관리하는지 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### 실행 컨텍스트(Execution Context)

<b>실행 컨텍스트(Execution Context)</b>는 scape, hoisting, this, function, closure 등의 동작원리를 담는  
자바스크립트의 핵심원리이다.  
[ECMAScript 스펙](https://developer.mozilla.org/ko/docs/Web/JavaScript/Language_Resources)에 따르면 실행 컨텍스트를 실행 가능한 코드를 형상화하고 구분하는 추상적 개념이라고 정의한다.  
JavaScript 엔진은 코드를 실행하기 위해 여러가지 정보를 가지고 있으며 실행 컨텍스트의 유형이 따라 달라질 수 있음을 알고 있어야 한다.

- Variable: 전역 변수, 지역 변수, 매개 변수, 객체의 프로퍼티
- Argument: 인자 객체
- Scope: 변수의 유효범위
- This

위와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 JavaScript 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다.

### 실행 컨텍스트의 유형

실행 구역 또는 범위에 따라 실행 컨텍스트의 유형을 구분할 수 있다.

- 전역 실행 컨텍스트 (Global Execution Context)
- 함수 실행 컨텍스트 (Functional Execution Context)
- Eval 실행 컨텍스트 (Eval Function Execution Context)

**전역 실행 컨텍스트 (Global Execution Context)**  
실행 컨텍스트의 가장 기초가 되는 구간 또는 범위(가장 바깥쪽)로, 함수 구간 안에서 실행 되는 코드가 아닌 이상 대부분 전역 실행 컨텍스트 내에서 실행된다.  
전역 컨텍스트에는 두 가지 작업이 발생한다.

1. window 객체인 전역 컨텍스트 생성
2. this를 전역 객체로 할당

**함수 실행 컨텍스트 (Functional Execution Context)**  
함수가 실행될 때마다 해당 함수의 실행 컨텍스트가 생성된다.  
즉, 호출이 발생될때마다 각 함수의 함수 컨텍스트가 생성된다.
<br/><br/>
**Eval 함수 실행 컨텍스트 (Eval Function Execution Context)**  
eval 함수 또한 함수 컨텍스트와 동일하게 실행 컨텍스트를 갖지만 가급적 사용을 지양해야한다.  
[Eval 코드 취약점 존재 사용하지 말 것](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)

### 실행 컨텍스트의 생성과 실행 관리

실행 컨텍스트의 생성 및 실행을 제대로 이해하기 위해선 <b>실행 스택(Execution Stack)</b>과 <b>제어권(Control)</b>에 대한 개념을 숙지해야한다.  
먼저 <b>호출 스택(Execution Stack)</b>이란 <b>LIFO (Last In, First Out)</b>의 자료구조로 코드 또는 함수가 실행하며 생성되는 각각의 실행 컨텍스트를 저장하는 구조적인 집합체다.

JavaScript 엔진이 script 태그를 만다게 되면,

1. 실행 가능한 코드로 <b>제어권(Control)</b>이 이동하면 논리적인 스택 구조를 가지는 빈 실행 컨텍스트 스택이 생성된다.
2. 제어권 이 전역 코드로 이동하면 전역 실행 컨텍스트가 생성되며 비어있는 컨텍스트 스택에 push한다.
3. 전역 환경에서 함수를 호출하면 제어권이 함수 코드로 이동하며 호출된 함수의 함수 컨텍스트가 생성 및 실행 스택에 push한다.
4. JavaScript 엔진은 실행 스택에서 가장 상단의 실행 컨텍스트부터 실행하게 되고
5. 각 실행 컨텍스트가 종료되면 실행 스택에서 제거(pop)되고, LIFO의 순서에 맞춰 제어권이 이동한다.

```javascript
// 전역 context
var n0 = 'n0'
var n1 = 'n1'

function foo() {
  // foo 함수 context
  var n2 = 'n2'
  var f0 = n0 + n1 + n2
  function print() {
    // print 함수 context
    console.log(f0)
  }
  print()
}
```

<p align="center"><img src='/images/JavaScript/execution_stack.png' width='100%' alt='execution_stack' /><p>

1. 전역 컨텍스트가 호출되며 전역 실행 컨텍스트가 실행 스택에 push
2. foo 함수 호출 및 실행되며 foo 함수의 함수 실행 컨텍스트가 실행 스택에 push
3. print 함수 호출 및 실행되며 print 함수의 함수 실행 컨텍스트를 실행 스택에 push, 그리고 실행이 끝난면 print 함수의 함수 실행 컨텍스트는 pop
4. foo 함수의 실행 또한 완료되며 함수 실행 컨텍스트 pop
5. 전역 실행 컨텍스트만 남음

여기까지 Execute context가 무엇이며 해당 유형과 JavaScript 엔진이 Execute context를 어떻게 생성하며  
관리하는지 알아보았다.  
다음 Execute context 포스팅에서는 구조와 예시에 대해 다뤄보도록 하겠다.
