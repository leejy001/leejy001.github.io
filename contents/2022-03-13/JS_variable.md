---
date: '2022-03-13'
title: 'var, let, const 그리고 Hoisting'
categories: ['JavaScript']
summary: 'var, let const에 대한 차이와 호이스팅에 대해서 알아보자'
thumbnail: './javascript_thumbnail.png'
---

<b>var</b>는 자바스크립트의 역사와 함께했던 유구한 문법, 전통적으로 변수를 만들때 사용한 키워드다.  
그런데 크롬 브라우저 기준 2016년 문법부터 let, const라는 새로운 문법이 탑재되었다.

### let과 const는 어떨 때 사용할까?

```javascript
let price = 10000
const vat_percent = 0.1
let vat = price * vat_percent
console.log(vat)
```

위의 코드를 보면 가격(price)는 let을 쓰고 있으며 값은 10000이다.  
가격은 언제든지 물가에 따라 변동 될 수 있다.  
부가가치세율(vat_percent)은 법으로 지정되어 있으며 한국에서는 10%의 부가가치세율이 붙는다.  
이 값이 바뀌진 않기에 const를 붙이며, const는 상수라고 하고 변하지 않는 값에 주로 붙는다.  
이름의 값이 바뀔 수 있다면 let을 쓰고 바뀌지 않는 고정된 값이라면 const를 쓴다는 것을 알아두자
<br/><br/>
let, const과 var의 차이점에 대해서 더 알아보자

우선 var는 global scope에 선언되며 let과 const는 script scope에 선언된다.

```javascript
var foo = 'foo' // global scope
let bar = 'bar' // script scope
const woo = 'woo' // script scope
```

let과 const는 전역객체에 속성을 부여하지 않는다는 의미이다.  
따라서 최상위 객체인 window에 속성을 생성하지 않기 때문에 window를 통해 값을 불러올 수 없다.

```javascript
var foo = 'foo'
let bar = 'bar'

console.log(window.foo)
console.log(window.bar)
```

따라서 let이나 const로 선언된 변수나 상수는 window를 통해 var와 let, const 모두 함수 내에 선언한 경우  
function local scope에 선언된다.

```javascript
function example() {
  var foo = 'foo' // local scope
  let bar = 'bar' // local scope
  const woo = 'woo' // local scope
}
```

그리고 자바스크립트에는 block이라는 scope가 있는데 var는 global, let 과 const는 block scope에 선언된다.

```javascript
{
  var foo = 'foo' // global scope
  let bar = 'bar' // block scope
  const woo = 'woo' // block scope
}
```

let과 const가 나온 뒤로 var보다는 let을 사용하는 것을 권장하며 만약 값이 변하지 않는 고정 된 값이라면 const를 사용하도록 하고 있다.

### 왜 var보다 let을 사용하도록 권장하는 것 일까?

1. 범위 규칙이 엄격하다.
2. 호이스팅이 없다.
3. 재정의를 막아준다.

**1. 범위 규칙이 엄격하다.**

```javascript
function example() {
  var foo = 'foo'
  let bar = 'bar'
  console.log(foo, bar) // foo bar
  {
    let woo = 'woo'
    console.log(woo) // woo
  }
  console.log(woo) // Uncaught ReferenceError: woo is not defined
}

example()
```

위 코드는 let으로 선언된 woo를 중괄호 밖에서 실행할 때 레퍼런스 오류(해당 변수가 정의되지 않음)를 발생시킨다.  
let을 var로 바꿔서 돌려보면 문제 없이 실행되는 것을 확인 할 수 있다.  
let은 자신을 둘러싼 제일 scope안에서만 작동하는 것에 비해 var는 함수안에서 선언된다면 function scope까지 함수 바깥에 선언된다면 global scope까지 작동한다.
<br/><br/>
**2. 호이스팅(Hosting, 끌어올리기)이 없다.**

호이스팅에 대한 설명은 본 설명이 끝난 다음 추가하겠다.

```javascript
function example_one() {
  console.log(foo) // undefined
  var foo = 'foo'
  console.log(foo) // foo
}

function example_two() {
  console.log(bar) // Uncaught ReferenceError
  let bar = 'bar'
  console.log(bar) // bar
}
```

example_one의 코드에서 위쪽 console.log는 자신 아래에 정의된 변수를 끌어올려 불러온다.  
(변수가 정의되었다는 것만 알고 초기화된 값까지 불러오진 않지만, 중요한 것은 에러가 없다는 것이다.)  
반면 example_two의 코드에서 bar라는 변수가 정의되지 않았다는 에러를 발생시킨다.
<br/><br/>
**3.재정의를 막아준다.**

```javascript
var foo = 'foo1'
var foo = 'foo2'

let bar = 'bar1'
let bar = 'bar2' // Uncaught SyntaxError
```

재정의를 할 경우 var는 허용되지만 let은 허용되지 않고 SyntaxError를 발생시킨다.  
위의 경우도 중요한 건데 변수를 선언한다는 것은 해당 변수가 존재하지 않기에 새로 변수를 선언해준다는 의미인데  
만약 var와 같이 이미 선언된 변수를 재선언하게 된다면 이는 오류로 이어질 수 있다.

var, let 그리고 const는 scope별로 어떻게 동작하는지 전체적으로 알고 싶다면 아래 표를 확인해보자
<br/><br/>

<p align="center"><img src='/images/JavaScript/variable.png' width='80%' alt='lcs one' /><p>

### 그렇다면 호이스팅이 무엇일까?

호이스팅은 코드가 실행되기 전에 변수선언/함수선언이 해당 스코프의 최상단으로 끌어 올려진 것 같은 현상을 말한다.
JS 엔진은 스크립트를 가져 오면 **가장 먼저 코드에서 데이터를 위한 메모리를 설정한다.**  
이 시점에는 코드가 실행되지는 않고 실행을 하기 위한 준비단계이다.

함수와 변수가 메모리에 저장되는 방식은 다르다.

- **함수는 전체 함수에 대한 참조와 함께 저장된다.**
- **변수의 경우 ES6 문법인 let과 const는 초기화 되지 않은 채로 저장이 되고, var는 undefined로 저장이 된다.**

### 변수는 어떻게 생성되고, 호이스팅은 어떻게 이뤄지게 될까?

**1단계: 선언 단계(Declaration phase)**  
변수를 실행 컨텍스트의 변수 객체에 등록하며 이 변수 객체는 스코프가 참조하는 대상이 된다.

**2단계: 초기화 단계(Initialization phase)**  
변수 객체에 등록된 변수를 위한 공간을 메모리에 확보하며 이 단계에서 변수는 undefined로 초기화가 된다.

**3단계: 할당 단계(Assignment phase)**  
undefined로 초기화된 변수에 실제 값을 할당하게 된다.

var는 호이스팅이 발생하게 되면 선언과 초기화가 거의 동시에 이루어진다.  
실행 시점의 스코프의 최상단에서 해당 변수에 대한 메모리가 살아있기 때문에 선언부 위치에 상관하지 않고 참조 및 할당이 가능하다.
let, const는 호이스팅이 발생하면, 선언만 이루어지며 실행 시점에서 실질적인 선언부를 만나기 전까진 초기화는 이루어지지 않는다.  
이 간극만큼 해당 변수에 대한 메모리는 존재하지 않기에 선언부 상단에서 참조 및 할당이 불가능하게 되며, 이 간극을 일시적 사각지대, <b>TDZ(Temporal Dead Zone)</b>라고 한다.
변수는 존재하지만, 초기화가 되어있지 않는 것이다.
<br/><br/>
호이스팅에는 변수선언일 때 호이스팅과 함수 선언에서의 호이스팅이 있다.

함수 호이스팅은 다른 무엇보다 가장 먼저 이루어진다.
그리고 함수 호이스팅은 오직 선언문에서만 가능하다.

```javascript
foo1() // 함수 선언문에서는 호이스팅
foo2() // 함수 표현식이라서 호이스팅 X

function foo1() {
  console.log('Hello')
}
var foo2 = function () {
  console.log('world')
}
```

변수 선언에서의 호이스팅은 위에 설명했다시피 var에서는 가능하지만 let과 const에서는 불가능하다.

```javascript
// var 호이스팅
console.log(foo) // foo! (선언 + 초기화 된 상태)
foo = 'foo!' // (선언 + 초기화 + 할당 된 상태)
var foo
console.log(text) // foo!
```

```jsx
console.log(foo); // Uncaught SyntaxError (선언 된 상태, 초기화(메모리 공간 확보와 undefined로 초기화) 안되서 참조 불가능 -> 에러)
let foo; // 여기서 초기화 단계가 실행
const bar; // Uncaught SyntaxError (const 키워드는 재할당 및 재선언 불가능, 선언과 동시에 할당해야 함)
```

호이스팅은 자바스크립트의 특성에 따라 코드 실행 전 컴파일을 거치며 자연스럽게 귀결되는 전처리 과정이지만  
undefined나 reference error와 같이 호이스팅의 사이드 이펙트(Side Effect)를 피하기 위해서는 항상 변수를 현재 스코프 최상단에서 선언하도록 하고, 선언과 함께 초기화를 진행해야한다.
