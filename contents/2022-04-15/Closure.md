---
date: '2022-04-12'
title: 'Closure'
categories: ['JavaScript']
summary: '여러 함수 프로그래밍 언어에서 공통적으로 발견되는 특성인 클로저(Closure)에 대하여 알아보자'
thumbnail: './javascript_thumbnail.png'
---

**클로저는 함수와 함수가 선언된 어휘적 환경(Lexical Environment)의 조합이다.**

클로저는 함수를 지칭하고 또 그 함수가 선언된 환경과의 관계라는 개념이 합쳐진것이다.  
클로저를 이해하려면 자바스크립트가 어떻게 변수의 <b>유효 범위(Lexical scoping)</b>를 지정하는지 먼저 이해해야 한다.

### 어휘적 범위 지정 (Lexical Scoping)

예제 코드를 보자

```javascript
function foo() {
  var f1 = 'f1'
  function bar() {
    alert(f1)
  }
  bar()
}
foo()
```

foo()는 지역 변수 f1과 함수 bar()를 생성한다.  
bar()는 foo()안에 정의된 내부 함수이며 foo()함수 본문에서만 사용이 가능하다.  
여기서 주의할 점은 bar() 내부에는 자신만의 지역 변수가 없다.  
그런데 함수 내부에서 외부 함수의 변수에 접근할 수 있기 때문에 bar() 함수 역시 부모 함수 foo()에서 선언된 변수 f1에 접근이 가능하다.

만약 bar()가 자신만의 f1변수를 가진다면 this.f1을 사용했을 것이다.  
스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다.  
여기서 “lexical”이란, 어휘적 범위 지정(lexical scoping) 과정에서 변수가 어디에서 사용 가능한지 알기 위해서 그 변수가 소스코드 내 어디에서 선언되었는지 고려한다는 것을 의미한다.  
중첩된 함수는 외부 범위(scope)에서 선언한 변수에도 접근할 수 있다.

### 클로저 (Closure)

```javascript
function foo() {
  var f1 = 'f1'
  function bar() {
    alert(f1)
  }
  bar()
}

var myFoo = foo()
foo()
```

해당 코드는 이전 예제와 동일한 결과가 실행된다.  
하지만 흥미로운 차이가 있다면 bar()함수가 실행되기도 전에 외부함수인 foo()로부터 return되어 myFoo 변수에 저장되고 함수 내부의 지역 변수는 그 함수가 처리되는 동안에만 존재한다.  
언뜻 보기엔 bar() 함수가 f1에 접근하기 전에 foo() 함수가 실행이 끝나서 f1 변수에 더 이상 접근하지 못할 것으로 예상되지만 자바스크립트의 경우에는 다르다.

그 이유는 자바스크립트는 함수를 리턴하고, 리턴하는 함수가 클로저를 형성했기 때문이다.

클로저의 특성상 bar()함수가 선언될 때 그 주변의 lexical environment(여기서는 foo()의 lexical environment)와 함께 번들로 묶어버렸기 때문에 bar()가 실행이 되어서 lexical environment를 만든 뒤 참조하지 않아도, 선언할 때 이미 묶여버리게 된다. 그렇기 때문에 변수 f1을 사용할 수 있게 된다.

**클로저는 함수가 호출되는 환경과 별개로, 기존에 선언되어 있던 환경(어휘적 환경)을 기준으로 변수를 조회한다.**

외부함수의 실행이 종료된 후에도, 클로저 함수는 외부함수의 스코프, 즉, 함수가 선언된 어휘적 환경에 접근할 수 있게된다.  
외부 함수 스코프가 내부함수에 의해 언제든지 참조될 수 있기 때문에 클로저를 남발할 경우 퍼포먼스 저하가 발생할 수도 있다.

### 클로저 형태와 장점

함수를 리턴할 수 있으며 리턴하는 함수에 의해 스코프가 구분된다.

```javascript
const adder = function (x) {
  return function (y) {
    return x + y
  }
}
```

- 클로저는 리턴하는 함수에 의해 스코프(변수의 접근 범위)가 구분된다.
- **클로저의 핵심은 스코프를 이용해서, 변수의 접근 범위를 닫는(폐쇄)데에 있다.** 따라서, 함수를 리턴하는 것만큼이나, 변수가 선언된 곳이 중요합니다. 외부함수 스코프에서 내부함수 스코프로 접근하는 것은 불가능하지만 내부함수에서는 외부함수 스코프에서 선언된 변수에 접근 기능하다.
- 위의 코드를 보면 외부 함수는 y에 접근이 불가능하며 내부 함수는 x에 접근이 가능하다.

**데이터의 보존**

클로저 함수는 외부 함수의 실행이 끝나더라도 외부 함수 내 변수를 사용할 수 있다.  
아래 코드를 보면 외부 함수의 실행이 끝나더라도, adder 함수에서 인자로 넘긴 5라는 값을 x 변수에 계속 담은 채로 남아있고 필요에 따라 4와 9를 호출하여 5에 더할 수 있도록 했다.

```javascript
const adder = function (x) {
  return function (y) {
    return x + y
  }
}

const add5 = adder(5) // 5
add5(4) // 9
add5(9) // 14
```

클로저는 이처럼 특정 데이터를 스코프 안에 가두어 둔 채로 계속 사용할 수 있는 폐쇄성을 갖고 있으며 여러 개의 인자를 받아야하는 함수의 경우에 인자를 필요에 따라 하나씩 받아 호출이 가능하도록 한다. 이를 **커링 함수**라고 한다.
<br/><br/>
**정보의 접근 제한 (캡슐화)**

<b>프라이빗 메소드(private method)</b>는 코드에 제한적인 접근만을 허용한다는 점 뿐만 아니라 전역 네임 스페이스를 관리하는 강력한 방법을 제공하여 불필요한 메소드가 공용 인터페이스를 혼란스럽게 만들지 않도록 한다.  
이는 같은 클래스 내부의 다른 메소드에서만 그 메소드들을 호출할 수 있다는 의미인데 자바스크립트는 태생적으로 이런 방법을 제공하지는 않지만 클로저를 이용하여 흉내내는 것은 가능하다.

다음은 MDN의 예제에 나와있는 코드다.

아래 코드는 프라이빗 함수와 변수에 접근하는 퍼블릭 함수를 정의하기 위해 클로저를 사용하는 방법을 보여준다.  
‘클로저 모듈 패턴’을 사용해 객체에 담아 여러 개의 함수를 리턴하도록 만든다.

```javascript
var counter = (function () {
  var privateCounter = 0
  function changeBy(val) {
    privateCounter += val
  }
  return {
    increment: function () {
      changeBy(1)
    },
    decrement: function () {
      changeBy(-1)
    },
    value: function () {
      return privateCounter
    },
  }
})()

console.log(counter.value()) // 0
counter.increment()
counter.increment()
console.log(counter.value()) // 2
counter.decrement()
console.log(counter.value()) // 1
```

외부의 counter 함수는 3가지 메소드를 반환한다.

1. 외부함수의 변수를 증가(increment)시키는 메소드
2. 외부함수의 변수를 감소(decrement)시키는 메소드
3. 외부함수의 변수를 출력(value)하는 메소드

스코프('외부 스코프에서는 내부 스코프의 변수에 접근할 수 없다')의 규칙에 의해서
counter라는 함수를 바꾸지 않고 privateCounter 라는 변수에 값을 새롭게 할당할수 없다.  
단지 3개의 public method(increment, decrement, value)를 통해서만 접근이 가능하다.  
위의 장점은 불필요하거나 의도치 않은 변수의 변경을 막는다는 것이다.
<br/><br/>
**모듈화에 유리하다.**

MDN 예제의 코드를 보자

```javascript
var makeCounter = function () {
  var privateCounter = 0
  function changeBy(val) {
    privateCounter += val
  }
  return {
    increment: function () {
      changeBy(1)
    },
    decrement: function () {
      changeBy(-1)
    },
    value: function () {
      return privateCounter
    },
  }
}

var counter1 = makeCounter()
var counter2 = makeCounter()
console.log(counter1.value()) // 0
counter1.increment()
counter1.increment()
console.log(counter1.value()) // 2
counter1.decrement()
console.log(counter1.value()) // 1
console.log(counter2.value()) // 0
```

makeCounter라는 클로저 함수를 각각의 변수에 할당하면 각자 독립적으로 값을 사용하고 보존할 수 있다.  
각 클로저는 그들 고유의 클로저를 통한 `privateCounter` 변수의 다른 버전을 참조한다.  
각 카운터가 호출될 때마다 하나의 클로저에서 변수 값을 변경해도 다른 클로저의 값에는 영향을 주지 않는다.  
이와 **같이 함수의 재사용성을 극대화하여 함수 하나를 독립적인 부품의 형태로 분리하는 것을 모듈화라고 한다.**  
클로저를 통해 데이터와 메소드를 묶어다닐 수 있기에 클로저는 모듈화에 유리하다.

### 클로저를 쓸 때 주의할 점

**반복문 클로저**

```javascript
var i
for (i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
```

간단하게 0-9까지 정수를 출력하는 코드이지만 실제론 10만 10번 출력하는 엉뚱한 코드이다.  
이유는 setTimeout()에 인자로 넘어긴 익명함수는 모두 1초 뒤에 호출된다.  
그 1초 동안 이미 반복문을 모두 순회되며 i값은 이미 10이 되어있는 상태다.  
그 때 익명함수가 호출되며 이미 10이 된 i를 참조하게된다.  
이제 위의 문제점을 클로저 모듈 패턴으로 해결해보자

```javascript
let i
for (i = 0; i < 10; i++) {
  ;(function (j) {
    setTimeout(function () {
      console.log(j)
    }, 1000)
  })(i)
}
```

중간에 IIFE(즉시 실행 함수 표현)를 이용하여 setTimeout에 걸린 익명 함수를 클로저로 만들었다.  
이 코드에서 i는 IIFE내에 j라는 형태로 주입되며, 클로저에 의해 각기 다른 환경에 포함된다.  
(반복문이 10번 반복되므로 10개의 다른 환경에 포함되며 10개의 서로 다른 인자가 생성된다.)
<br/><br/>
**메모리 해제**

해당 부분은 자바스크립트 메모리 누수와 관련되어서도 자주 언급되는 문제다.  
외부 함수에서 선언된 변수가 중첩된 내부 함수에서 자동으로 사용 가능해지며 중첩된 함수에서 사용/참조하지 않더라도 메모리에 계속 상주하면 클로저에서 메모리 누수가 발생한다.  
코드 실행시 객체가 생성되면 자동으로 힙 메모리를 할당하며 이것이 쓸모 없어졌을 때 자동으로 해제 시켜주는 기능을 **가비지 컬렉션**이라 한다.

JavaScript 엔진은 직간접적으로 참조되지 않은 객체들을 메모리에서 해제하여 메모리 공간을 확보하는 방식으로 동작한다.
그러나 클로저에서는 내부에서 외부 변수를 참조하면서 가비지컬렉션이 일어나지 않게 된다.  
물론 이를 '메모리 누수'라고 하기엔 무리가 있다.  
왜냐하면 클로저는 개발자가 의도적으로 참조를 만들어 냈기 때문이다.  
하지만 그럼에도 불구하고 메모리를 해제할 필요가 있다면 어떻게 해야할까?

클로저는 필요에 의해 의도적으로 함수의 지역변수를 메모리에 할당하기 때문에 메모리를 관리하기 위해서는 필요가 사라진 시점에 메모리를 소모하지 않게 해주면 된다.
<br/><br/>
**메모리 해제 (외부)**

더 이상 쓰이지 않는 시점에 외부에서 null이나 undefined를 할당한다.

```javascript
let outer = (() => {
  let a = 1
  const inner = () => {
    return ++a
  }
  return inner
})()

console.log(outer())
console.log(outer())
outer = null // outer 식별자의 inner 함수 참조를 끊음
```

**메모리 해제 (내부)**

클로저 함수 내부에서 메모리를 해제한다.  
<b>setInterval(타이머 함수)</b>를 이용한 방식이다. 내부적으로 더 이상 쓰이지 않을 경우를 대비하여 null이나 undefined를 할당하여 메모리를 해제한다.

```javascript
;(function () {
  let a = 0
  let intervalId = null
  let inner = () => {
    if (++a >= 10) {
      clearInterval(intervalId)
      inner = null // inner 식별자의 함수 참조를 끊음
    }
    console.log(a)
  }
  intervalId = setInterval(inner, 1000)
})()
```

setInterval로 실행되어 count라는 외부 변수를 참조하고 있으나 count가 10이 되면 메모리를 해제하도록 했다.

**이벤트 리스너 예제**

```javascript
;(function () {
  let count = 0
  let button = document.createElement('button')
  button.innerText = 'click'

  let clickHandler = () => {
    console.log(++count, 'times clicked')
    if (count >= 10) {
      button.removeEventListener('click', clickHandler)
      clickHandler = null // clickHandler 식별자의 함수 참조를 끊음
    }
  }
  button.addEventListener('click', clickHandler)
  document.body.appendChild(butto)
})()
```

버튼에 클릭핸들러를 달고 클릭마다 카운트가 올라간다.  
카운트가 10이 되면, 버튼에서 핸들러를 제거하고 함수를 null로 바꾸면서 메모리를 해제한다.

### **클로저 부작용**

**성능 관련 고려사항 (MDN)**

특정 작업에 클로저가 필요하지 않는데 다른 함수 내에서 함수를 불필요하게 작성하는 것은 현명하지 않다. 이것은 처리 속도와 메모리 소비 측면에서 스크립트 성능에 부정적인 영향을 미칠 것이다.

예를 들어, 새로운 객체/클래스를 생성 할 때, 메소드는 일반적으로 객체 생성자에 정의되기보다는 객체의 프로토타입에 연결되어야 한다. 그 이유는 생성자가 호출 될 때 마다 메서드가 다시 할당되기 때문이다 (즉, 모든 개체가 생성 될 때마다).

**메모리 소비 측면**

성능적인 면에서는 정확히 모르겠지만 메모리 소비 측면에서 각각의 생성된 환경을 기억하기 때문에 불필요하게 클로저를 사용할 경우 그만큼 메모리를 사용할 것으로 보인다.

### 참고

[MDN Closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

[NHN Meetup! (클로저, 그리고 캡슐화와 은닉화)](https://meetup.toast.com/posts/90)

[NHN Meetup! (자바스크립트의 스코프와 클로저)](https://meetup.toast.com/posts/86)

[클로저에 대한 고찰](https://haesoo9410.tistory.com/342)
