---
date: '2022-04-02'
title: '실행 컨텍스트(Execution Context) - 생성과 실행'
categories: ['JavaScript']
summary: '실행 컨텍스트의 생성과 실행 과정에 대하여 알아보자'
thumbnail: './javascript_thumbnail.png'
---

실행 컨텍스트의 첫번째 포스트에서 실행 컨텍스트가 무엇이며 유형에는 어떠한 것들이 있는지, JavaScript 엔진이 실행 컨텍스트를 어떻게 관리하는지에 대하여 알아보았다.  
두번째 포스트에서는 실행 컨텍스트의 정의와 ES5 이후의 Scope Chain의 변화 그리고 실행 컨텍스트의 세부 구조에 대해 알아보았다.  
이번에는 실행 컨텍스트의 생성과 실행 과정에 대해 알아보고 생성 및 실행 단계에 대해서 알아보도록 하자
<br/><br/>
해당 부분 발췌

**“How is the Execution Context created?”**  
[Javascript의 실행 컨텍스트 및 실행 스택에 대해](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
<br/><br/>
지금까지 JavaScript 엔진이 실행 컨텍스트를 어떻게 관리하는지 알아보았다.  
그럼 지금부터는 JavaScript 엔진이 실행 컨텍스트를 생성하는 방법에 대해 이해해보자  
실행 컨텍스트는 두 단계로 나뉘어져 있다.

1. 생성 단계 (Creation Phase)
2. 실행 단계 (Execution Phase)

### 생성 단계 (Creation Phase)

실행 컨텍스트는 생성 단계 동안 아래의 컴포넌트가 발생한다. (생성 단계는 이전 포스팅에서도 설명되어있다.)

1. Lexical Environment 컴포넌트가 생성된다.
2. Variable Environment 컴포넌트가 생성된다.

그럼 실행 컨텍스트는 개념적으론 아래와 같이 나타낼 수 있다.

```
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```

### Lexical Environment

Lexical Environment는 <b>인식자(identifier)-변수(variable) 매핑(mapping)</b>을 유지하고 있는 구조다.  
(여기서 identifier란 변수/합수들의 이름을 참고하는 것이고, variable은 [함수 객체와 배열 객체를 포함하는] 실질적 객체 또는 기본값 대한 참조값이다.

아래의 코드를 참고하면

```javascript
var a = 20
var b = 40

function foo() {
  console.log('foo')
}
```

위 코드의 lexical environment는 다음과 같이 나타낼 수 있다.

```javascript
lexicalEnvironment = {
  a: 20,
  b: 40,
  foo: <ref. to foo function>
}
```

긱 Lexical Environment는 세가지 컴포넌트를 가지고 있다.

1. Environment Record
2. Reference to the outer environment
3. This binding

### Environment Record

Environment Record는 lexical environment 안에 저장된 변수와 함수의 선언이 있는 곳이다.  
Environment Record에는 두가지 타입이 있다.

**Declarative Environment Record**  
변수와 함수의 선언에 대한 것으로 추측할 수 있다.  
identifier들(변수, 함수, 인수)을 저장한다.  
함수 코드에 대한 lexical environment는 declarative environment record를 포함하고 있다.

**Object Environment Record**  
전역(global) 코드의 lexical environment는 object environment record를 포함하고 있다.  
변수와 함수에 대한 선언과 구분지어, object environment record는 또한 전역 바인딩 객체(global binding object)
(browser의 경우 window 객체)를 저장한다.  
그리고 바인딩된 객체에 대한 각각의 속성(브라우저의 경우, window 객체에 browser에 의해 제공되는 속성과 메서드들이 포함된다.)에 대해 새로운 엔트리가 레코드 안에 생성된다.  
함수 코드를 위해서, environment record는 또한 인덱스의 함수에 전달된 인자 사이의 관계에 대한 매핑과 함수로 전달된 인자들에 대한 길이(숫자, number)에 대한 정보를 담고있는 인자(argument) 객체를 포함한다.

```javascript
function foo(a, b) {
  var c = a + b;
}
foo(2, 3);
// argument object
Arguments: {0: 2, 1: 3, length: 2},
```

### Reference to the outer environment

Reference to the outer environment는 현재 실행 컨텍스트의 외부(outer) lexical environment에 대해 접근하는 것을 의미한다.  
이것은 JavaScript 엔진이 현재 lexical environment에서 변수를 찾지 못한다면 <b>외부 환경(outer environment)</b>에서 찾을 수 있음을 의미한다.

### This Binding

이 컴포넌트에서는 this의 값을 결정하거나 설정한다.  
this는 함수를 호출한 인스턴스를 가리키며, 함수가 어떻게 호출되는지에 따라 값이 달라진다.  
전역(global) 실행 컨텍스트에서 this는 전역 객체를 참조한다. (browser에서 this는 window 객체를 참조한다.)  
함수 실행 컨텍스트에서 this는 함수가 호출되는 방식에 따라 달라진다.  
만약 객체 참조 방식에 따라 함수가 호출될 경우, this 값은 해당 객체로 설정되고 그렇지 않다면 this는 전역 객체 또는 (strict mode 에서는) undefined로 설정된다.

예를 들면 아래의 코드에서

```javascript
const person = {
  name: 'peter',
  birthYear: 1996,
  calcAge: function () {
    console.log(2018 - this.birthYear)
  },
}

person.calcAge()
// 'calcAge'가 'person' 객체 참조로 호출됐기 때문에 'this'는 'person'를 참조한다.

const calculateAge = person.calcAge
calculateAge()
// 어떠한 객체 참조도 주어지지 않았기 때문에 'this'는 전역 window 객체를 참조한다.
```

추상적으로 lexical environment는 아래와 같은 가상의 코드로 나타낼 수 있다.

```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 인식자(Identifier) binding은 여기로 이동한다.
    }
    outer: <null>,
    this: <global object>
  }
}
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 인식자(Identifier) binding은 여기로 이동한다.
    }
    outer: <Global or outer function environment reference>,
    this: <depends on how function is called>
  }
}
```

### Variable Environment

또한 Environment Record는 실행 컨텍스트에서 variable statements에 의해 생성된 binding을 보관하는 lexical environment다.  
즉, Variable Environment 또한 lexical environment이며 위에서 정의한 것처럼 lexical environment의 모든 속성과 컨포넌트들을 가지고 있다.  
ES6에서 LexicalEnvironment와 Variable 컴포넌트의 한가지 차이점은 LexicalEnvironment는 함수 선언과  
변수(let, const) 바인딩을 저장하는데 사용되며 VariableEnvironment는 오직 변수(var) 바인딩을 저장하는데 사용된다.

이부분 까지는 이전 포스팅에서도 본 내용일 것이다.

### 실행 단계

이 단계에서는, 모든 변수에 대한 할당이 끝났으며 마침내 코드가 실행된다.

예제 코드를 보자

```javascript
let a = 20
const b = 30
var c
function multiply(e, f) {
  var g = 20
  return e * f * g
}
c = multiply(20, 30)
```

이 코드를 실행하면, JavaScript 엔진은 전역(Global) 코드를 실행하기 위한 전역 실행 컨텍스트를 생성한다.  
먼저 변수 a, b, c와 함수 multiply()를 글로벌 실행 컨텍스트에 저장한다.  
이때 let, const, 함수 상태인 변수 a, b, 함수 multiply는 lexicalEnvironment에, var인 c는 variableEnvironment에 넣어준다.
그리고 변수 a, b를 undefined로 초기화해준다.
그럼 생성 단계에서 전역 실행 컨텍스트는 아래와 같은 가상의 코드처럼 될 것이다.

```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 인식자(Identifier) binding은 여기로 이동한다.
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 인식자(Identifier) binding은 여기로 이동한다.
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

실행 단계 동안, 변수 할당이 끝났으며 전역 실행 컨텍스트는 아래와 같은 가상의 코드처럼 된다.

```javascript
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 인식자(Identifier) binding은 여기로 이동한다.
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 인식자(Identifier) binding은 여기로 이동한다.
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

multiply(20, 30) 함수에 대한 호출이 발생할 때, 새로운 함수(function) 실행 컨텍스트가 함수 코드를 실행하기 위해 생성된다.  
함수 실행 컨텍스트는 전역 실행 컨텍스트와 유사하지만 전역 객체를 생성하는 대신 JavaScript엔진은 arguments 함수의 모든 매개변수에 대한 참조인 객체를 생성한다.  
함수 실행 컨텍스트는 생성 단계동안 아래와 같은 가상의 코드처럼 된다.

```javascript
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 인식자(Identifier) binding은 여기로 이동한다.
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 인식자(Identifier) binding은 여기로 이동한다.
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```

위의 예시에서 함수 실행 컨텍스트는 arguments 함수에 전달된 모든 매개변수를 참조하는 객체를 생성하고 this 값을 전역 객체로 설정하고 g 매개변수를 undefined로 초기화한다.  
이후, 실행 컨텍스트는 함수(function) 내에서 변수 할당이 끝났다는 의미로 실행 단계를 거치고 함수 실행 컨텍스트의 실행 단계에서 JavaScript 엔진은 g 매개변수에 20을 할당하게된다.

```javascript
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 인식자(Identifier) binding은 여기로 이동한다.
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 인식자(Identifier) binding은 여기로 이동한다.
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```

함수가 완료된 후에, 반환된 값(12000)은 c에 저장되고, 전역(global) lexical environment가 업데이트 된다.  
let과 const로 정의된 변수는 생성 단계 동안에 그 어떠한 값(value)도 연결되지 않으며 var로 정의된 변수는 undefined로 설정된다는 것을 주의해야한다.  
이것은 생성 단계에서 코드에서 변수와 함수 선언에 대해 스캔하고, 함수 선언이 환경에 함수 전체적으로 저장되는 동안, 변수는 처음에(var의 경우) undefined로 설정되거나 (let과 const의 경우) 비초기화(uninitialized) 상태로 유지되기 때문이다.

이게 let과 const 변수가 선언되기 전에 접근하려고 할 때, 참조 에러(reference error)가 발생하는 것과는 다르게 var로 선언된 변수는 (undefined 로) 선언되기 전에 접근할 수 있는 이유다.  
이것을 바로 <b>호이스팅(hoisting)</b>이라고 부른다.  
실행 단계 동안에, JavaScript 엔진이 소스 코드(Source code)상에서 선언한 실제 위치에서 let 변수에 대한 값을 찾지 못한다면 이 변수에는 undefined 값이 할당될 것이다.

### 참조

[자바스크립트 튜토리얼/자바스크립트 실행 컨텍스트](https://www.javascripttutorial.net/javascript-execution-context/)
