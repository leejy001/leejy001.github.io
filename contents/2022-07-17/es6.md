---
date: '2022-07-17'
title: 'ES6 함수의 추가 기능'
categories: ['React']
summary: 'ES6(ECMAScript 2015)에서 새로 추가된 함수의 기능에 대하여 알아보자'
thumbnail: './javascript_thumbnail.png'
---

ECMA Script에 있어서 가장 큰 변곡점 중 하나는 ES6(ECMAScript 2015)의 등장이라 할 수 있겠다.  
수많은 문제가 있었던 ES6 에서는 ES5 이하 버전에서 문제가 되었던 부분들이 해결되고, 많은 기능들이 추가되어 가독성과 유지보수 측면에서 큰 향상을 가져왔기 때문에 아직까지 ES6는 중요하게 다뤄지고 있다.  
모던 자바스크립트 Deep Dive를 읽고 ES6에 새롭게 추가된 함수의 기능과 관련되어서 한 번 정리를 해보려고 한다.

### 함수의 구분

ES6 이전까지 자바스크립트 함수는 별다른 구분 없이 다양한 목적으로 사용되었다.

```jsx
var foo = function () {
  return 1
}

// 1. 일반적인 함수로서 호출
foo() // 1

// 2. new 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수로서 호출
new foo() // foo{}

// 3. 객체에 바인딩되어 메서드로서 호출
var obj = { foo: foo }
obj.foo() // 1
```

ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.  
다시 말하면 ES6이전의 모든 함수는 **callable**이면서 **constructor**인 것이다.

- **callable** : 호출할 수 있는 함수 객체
- **constructor** : 인스턴스를 생성할 수 있는 함수 객체
- **non-constructor** : 인스턴스를 생성할 수 없는 함수 객체

ES6 이전에 메서드라고 부르던 객체에 바인딩된 함수도 callable이며 constructor이다.  
따라서 객체에 바인딩된 함수도 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출 할 수도 있다.

```jsx
// 프로퍼티 f에 바인딩된 함수는 callable이며 constructor이다.
var obj = {
	x : 10;
	f : function () { return this.x; }
};

// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f());  // f {}
```

객체에 바인딩된 함수가 constructor라는 것은 객체에 바인딩된 함수가 prototype 프로퍼티를 가지며, 프로토타입 객체도 생성한다는 것을 의미한다.  
이렇게 모든 함수가 사용 목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다.

이런 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 명확히 구분했다.

<p align="center"><img src='/images/JavaScript/es6_function.png' width='100%' alt='render' /></p>

일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며, ES6이전의 함수와는 차이가 없다.  
하지만 ES6의 메서드 함수나 화살표 함수는 명확한 차이가 있다.  
일반 함수는 constructor이지만 ES6의 메서드와 화살표 함수는 non-constructor이다.

### 메서드

메서드는 ES6 이전에는 일반적으로 객체에 바인딩된 함수를 일컫는 의미로 사용되었지만 ES6 사양에서는 메서드에 다한 정의가 명확하게 규정되어있다. ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

```jsx
const obj = {
  x: 1,
  // foo는 메서드
  foo() {
    return this.x
  },
  // bar에 바인딩한 함수는 메서드가 아닌 일반 함수
  bar: function () {
    return this.x
  },
}

console.log(obj.foo()) // 1
console.log(obj.bar()) // 1
```

ES6 사양에서 정의한 메서드(이하 ES6 메서드)는 인스턴스를 생성할 수 없는 non-constructor다.  
따라서 ES6 메서드는 생성자 함수로서 호출이 불가능하다.  
또한 인스턴스를 생성할 수 없기 때문에 prototype 프로퍼티도 없으며 포로토타입도 생성하지 않는다.  
(참고로 표준 빌드인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor이다.)

```jsx
new obj.foo() // TypeError
obj.foo.hasOwnProperty('prototype') // false

new obj.bar() // bar {}
obj.bar.hasOwnProperty('prototype') // true
```

ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.  
super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조하기 때문에 내부 슬롯 [[HomeObject]]를 갖는 ES6메서드는 super 키워드를 사용할 수 있다.

```jsx
const base = {
  name: 'John',
  sayHi() {
    return `Hi! ${this.name}`
  },
}

const sentence = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}. how are you doing?`
  },
}

console.log(sentence.sayHi())
```

위의 코드를 보면 sayHi는 ES6메서드이며 [[HomeObject]]를 갖는다.  
sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 sentence를 가리키며 super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다.  
ES6 메서드는 <b>본연의 기능(super)</b>을 추가하고 <b>의미적으로 맞지 않는 기능(constructor)</b>은 제거했다.  
따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식을 사용하지 않는것이 좋다.

### 화살표 함수

화살표 함수는 function이란 키워드 대신에 <b>화살표(⇒, fat arrow)</b>를 사용하여 기존의 함수 정의 방식보다 더 간략하게 함수를 정의할 수 있다. 화살표 함수는 표현뿐만 아니라 내부 동작도 기존의 함수보다 간략하다.  
특히 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

### 화살표 함수 정의 문법

**함수 정의**

```jsx
// 화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야한다.
const multiply = (x, y) => x * y
multiply(2, 5) // 10
```

**매개변수 선언**

```jsx
// 매개변수가 여러 개인 경우 소괄호 안에 매개변수를 선언
const arrow = (x, y) => { ... };
// 매개변수가 한 개인 경우 소괄호 생략
const arrow = x => { ... };
// 매개변수가 없는 경우 소괄호 생략 불가
const arrow = () => { ... };
```

**함수 몸체 정의**

함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호는 생략 가능하다.  
이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.

```jsx
const power = x => x ** 2
power(2) // 4

const power = x => {
  return x ** 2
}
```

함수 몸체를 감싸는 중괄호를 생략하면 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생하게된다.  
이유는 표현식이 아닌 문을 반환할 수 없기 때문이다.

```jsx
const arrow = () => const x = 1; // SyntexError

const arrow = () => { return const x = 1; };
```

객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.  
만약 소괄호 ()로 감싸지 않는다면 객체 리터럴의 중괄호 {}를 함수 몸체를 감싸는 중괄호 {}로 잘못 해석하게 된다.

```jsx
const bestCreate = (id, content) => ({ id, content })
besstCreate(1, 'JavaScript') // {id: 1, content: "JavaScript"}

const wrongCreate = (id, content) => {
  id, content
}
wrongCreate(1, 'JavaScript') // undefined
```

함수 몸체가 여러 개의 문으로 구성되어 있다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 없다.  
이때 반환값이 있다면 명시적으로 반환해야 한다.

```jsx
const sum = (a, b) => {
  const result = a + b
  return result
}
```

화살표 함수도 즉시 실행 함수(IIFE)로 사용할 수 있다.

```jsx
const person = (name => ({
  sayHi() {
    return `Hi? My name is ${name}.`
  },
}))('Lee')

console.log(person.sayHi())
```

화살표 함수 역시 일급 객체이기 때문에 <b>고차 함수(map, filter, reduce)</b>에 인수로 전달할 수 있어서 일반적인 함수 표현식보다 표현이 간결하고 가독성이 좋다. 이처럼 화살표 함수는 콜백 함수로서 정의할 때 유용하다.  
표현만 간략한 것만이 아니라 일반 함수의 기능을 간략화하고 this도 편리하게 설계되었다.

### 화살표 함수, 일반 함수의 차이

**1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.**

화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```jsx
const Foo = () => {}

// 화살표 함수는 생성자 함수로서 호출할 수 없다.
new Foo() // TypeError

// 화살표 함수는 prototype 프로퍼티가 없다.
Foo.hasOwnProperty('prototype') // false
```

**2. 중복된 매개변수 이름을 선언할 수 없다.**

일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다.

```jsx
function normal(a, a) {
  return a + a
}
console.log(normal(1, 2)) // 4
```

단, strict mode에서 중복된 매개변수 이름을 선언하면 에러가 발생한다.

```jsx
'use strict'

function normal(a, a) {
  return a + a
} // SyntaxError
```

화살표 함수에서도 중복된 매개변수 이름을 선언하면 에러가 발생한다.

```jsx
const arrow = (a, a) => a + a // SyntaxError
```

**3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.**

화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 상위 스코프의 this, arguments, super, new.target을 참조한다.  
만약 중첩 화살표 함수인 경우에 상위 화살표 함수에도 this, argument, super, new.target 바인딩이 없으므로 스코프 체인 상에서 가장 상위 함수 중에서 화살표 함수가 아닌 함수의 this, argument, super, new.target을 참조한다.

### this

화살표 함수와 일반 함수의 가장 큰 차이점이 바로 this다.  
화살표 함수의 this는 일반 함수의 this와 다르게 동작한다. 이는 <b>“콜백 함수 내부의 this 문제”</b>, 즉 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.  
this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
함수를 정의할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아닌 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

**콜백 함수 내부의 this 문제**

```jsx
class Latte {
  constructor(ingredient) {
    this.ingredient = ingredient
  }
  add(arr) {
    return arr.map(function (item) {
      return item + this.ingredient // TypeError
    })
  }
}

const latte = new Latte('-latte')
console.log(latte.add(['choco', 'vanilla']))
```

위 예제를 실행하면 맛있는 choco-latte, vanilla-latte가 나올것 같지만 TypeError가 발생한다.

이유는 무엇일까?

프로토타입 메서드(add) 내부에서 this는 메서드를 호출한 객체(ingredient)를 가리킨다.  
그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부에서 this는 undefined를 가리킨다.  
이는 Array.prototype.map 메서드가 콜백 함수를 일반 함수로서 호출했기 때문이다.

일반 함수에서 호출되는 모든 함수 내부의 this는 전역 객체를 가리키지만 클래스 코드의 모든 코드에는 <b>strict mode</b>가 암묵적으로 적용된다. 그렇기에 Array.prototype.map메서드의 콜백 함수도 역시 strict mode가 적용된다.

strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아닌 undefined가 바인딩되므로 일반 함수로서 호출되는 Array.prototype.map 메서드의 콜백 함수 내부의 this에는 undefined가 바인딩된다.

이때 발생하는 문제가 <b>“콜백 함수 내부의 this 문제”</b>가 되겠다.

즉, 콜백 함수의 this와 외부 함수의 this가 서로 다른 값을 가리키고 있기 때문에 TypeError가 발생한 것이다.  
ES6 이전에는 이 문제를 해결하기 위해 this를 다른 변수에 선언하여 회피시킨다음 해당 변수를 참조하기도 했다. 아니면 map 함수의 두번째 인수에 this를 할당하거나 Array.prototype.bind 메서드를 이용하여 문제를 해결했다.

ES6에서는 화살표 함수를 사용하여 “콜백 함수 내부의 this 문제”를 해결할 수 있다.

```jsx
class Latte {
  constructor(ingredient) {
    this.ingredient = ingredient
  }
  add(arr) {
    return arr.map(item => item + this.ingredient)
  }
}

const latte = new Latte('-latte')
console.log(latte.add(['choco', 'vanilla'])) // ["choco-latte", "vanilla-latte"]
```

이젠 맛있는 choco-latte와 vanilla-latte를 마실 수 있게 되었다.

화살표 함수는 함수 자체의 this 바인딩을 가지지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 <b>lexical this</b>라 한다.  
이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.  
화살표 함수에는 this 바인딩이 없기 때문에 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.

만약 중첩 화살표 함수의 경우에는 상위 화살표 함수에도 this 바인딩이 존재하지 않기 때문에 스코프 체인상 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조하게 된다.  
만약 화살표 함수가 전역 함수인 경우에는 화살표 함수의 this는 전역 객체를 가리키게 된다.  
전역 함수의 상위 스코프는 전역이고 전역에서 this는 전역 객체를 가리키기 때문이다.

```jsx
const foo = () => console.log(this)
foo() // window
```

화살표 함수는 함수 자체의 this 바인딩을 갖지 않아 call, apply, bind 같은 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없다. 호출 할 수 없다는 것은 아니지만 함수 자체의 this 바인딩을 가지고 있지 않기 때문에 교체는 불가능하며 항상 상위 스코프의 this 바인딩을 참조한다.

화살표 함수의 이런 문제 때문에 메서드를 화살표 함수로 정의하는 것도 피해야한다.

```jsx
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`),
}

person.sayHi() // Hi
```

위의 코드의 경우 sayHi 프로퍼티에 할당된 화살표 함수 내부의 this는 상위 스코프인 전역의 this를 가리키기 때문에 해당 예제를 브라우저에서 실행 시 this.name은 빈 문자열을 갖는 window.name과 같다.

따라서 다음과 같이 메서드 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

```jsx
const person = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi ${this.name}`)
  },
}

person.sayHi() // Hi Lee
```

this와 마찬가지로 화살표 함수는 함수 자체의 super, arguments 바인딩을 가지지 않는다.
따라서 화살표 함수 내부에서 super나 arguments를 참조하면 this와 마찬가지로 상위 스코프의 super, arguments를 참조한다.

### Rest 파라미터

**기본 문법**

Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 … 을 붙여서 정의한 매개변수를 의미한다.  
Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

```jsx
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
  console.log(rest) // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5)
```

그리고 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다.  
이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당되는데 Rest 파라미터는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다.
따라서 Rest 파라미터는 반드시 마지막 파라미터이어야하며 단 하나만 선언할 수 있다. 그리고 Rest 파라미터는 기본값을 지정할 수 없다.

```jsx
function foo(param1, param2, ...rest) {
  console.log(param1) // 1
  console.log(param2) // 2
  console.log(rest) // [ 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5)
```

### Rest 파라미터와 arguments 객체

ES6 이전에는 매개변수의 개수를 확정할 수 없는 가변 인자 함수의 경우 매개변수를 통해 인수를 전달받는 것이 불가능하여 arguments 객체를 활용하여 인수를 전달받았다.  
argument 객체는 함수 호출 시 전달된 인수들의 정보를 담는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용이 가능하다.

```jsx
// 가변 인자 함수
function sum() {
  // 가변 인자 함수는 arguments 객체를 통해 인수를 전달
  console.log(arguments)
}

sum(1, 2) // {length: 2, '0' : 1, '1' : 2}
```

하지만 arguments 객체는 배열이 아닌 유사 배열 객체이므로 배열 메서드를 사용하려면 call, apply와 같은 메서드를 사용하여 arguments 객체를 배열로 변환해야 하는 번거로움이 있다.

```jsx
function sum() {
  var array = Array.prototype.slice.call(arguments)

  return array.reduce(function (pre, cur) {
    return pre + cur
  }, 0)
}

console.log(sum(1, 2, 3, 4, 5)) // 15
```

ES6에서는 rest 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다.  
이를 통해 유사 배열 객체인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.

```jsx
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0)
}

console.log(sum(1, 2, 3, 4, 5)) // 15
```

함수와 ES6 메서드는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있지만 화살표 함수는 위에서 설명했다시피 arguments 객체를 갖고 있지 않는다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

### 매개변수 기본값

함수 호출 시 매개변수의 개수만큼 인수를 전달하는 것이 바람직하나 그렇지 않은 경우에도 에러가 발생하진 않는다.  
이는 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다.
따라서 의도치 않은 결과를 방지하기 위해 매개변수에 인수가 전달되었는지 확인하여 인수가 전달되지 않은 경우 매개변수에 기본값을 할당할 필요가 있다.

```jsx
function sum(x, y) {
  // 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당한다.
  x = x || 0
  y = y || 0

  return x + y
}

console.log(sum(1, 2)) // 3
console.log(sum(1)) // 1
```

ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다.

```jsx
function sum(x = 0, y = 0) {
  return x + y
}

console.log(sum(1, 2)) // 3
console.log(sum(1)) // 1
```

매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우에만 유효하다.

```jsx
function logName(name = 'Lee') {
  console.log(name)
}

logName() // Lee
logName(undefined) // Lee
logName(null) // null
```
