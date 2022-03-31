---
date: '2022-03-30'
title: '실행 컨텍스트(Execution Context) - 생성과 구조'
categories: ['JavaScript']
summary: '실행 컨텍스트의 생성과 구조에 대하여 알아보자'
thumbnail: './javascript_thumbnail.png'
---

실행 컨텍스트와 관련되어서 첫번째로 실행 컨텍스트의 정의와 유형에 어떤것이 있는지, JavaScript엔진이 실행 컨텍스트를 어떻게 관리하는지에 대해 알아보았다.  
이번에는 JavaScript엔진이 실행 컨텍스트를 어떻게 생성하며, 실행 컨텍스트는 어떤 구조를 가지고 있는지에 대하여 알아보자

실행 컨텍스트를 실행하기 위해 보유하는 프로퍼티에는 다음이 있다.

- Lexical Environment
- Variable Environment

ES5 이전의 Variable Object, Activition Object, Scope Chain등의 개념이 <b>Lexical Environment</b>로 변경되었다.  
Lexical Environment은 자바스크립트 코드를 실행하기 위해 함수, 블록의 유효 범위 안에 있는 <b>식별자(변수이름)</b>와 결과값을 가지는 환경 간단하게 let, const, function으로 선언된 변수와 함수가 저장되는 환경이다.

<b>Variable Environment</b>는 var 키워드로 선언된 변수가 저장되는 환경이다.
<br/><br/>
**실행 컨텍스트에서 “this”를 관리하는 주체**

ES5이전에는 실행 컨텍스트가 직접 관리했지만 이후에는 Lexical Environment에서 관리한다.  
this를 호출하면 Lexical Environment가 반환되어 현재 Lexical Environment에 있는 <b>GetThisBinding()</b>을 호출하여 얻는다.
<br/><br/>
**“Scope Chian”의 변화**

JavaScript는 Lexical Scope를 갖는 언어로써, 식별자 탐색을 위한 참조가 ES5이후에는 Lexical nesting structure, Logical nesting of Lexical Environment value로 바뀌었다.  
<b>Chain(사슬)</b>의 구조보다는 <b>nesting(중첩)</b>에 의미를 강조했다.

### 실행 컨텍스트와 구조

실행 컨텍스트는 <b>“실행 가능한 코드를 형상화 하고 구분 하는 추상적인 개념으로 코드가 실행되고 있는 구역 또는 범위”</b>로써 각 실행 컨텍스트는 아래와 같은 모양을 가지고 있다.

<p align="center"><img src='/images/JavaScript/execution_structure.png' width='100%' alt='execution_structure' /><p>

### 1. 실행 컨텍스트 (Execution Context)

최상위 개념인 실행 컨텍스트는 <b>“코드가 실행되고 있는 구역 또는 범위”</b>라는 정의에 맞게 어느 영역에서 호출 및 실행되냐에 따라 구분하며 각 컨텍스트에 따라 상위 개념 및 구조가 달라진다.

- <b>전역(Global)영역</b>에서 실행되고 있으면 <b>전역 실행 컨텍스트</b>
- 전역 컨텍스트에서 호출 및 실행된 <b>함수(Function)</b>의 영역에서 실행되고 있으면 <b>함수 실행 컨텍스트</b>

그리고 모든 실행 컨텍스트는 아래와 같은 공통된 구조를 갖고 있으며 변수의 참조를 기록하는 환경이라고 할 수 있다.

```plaintext
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>
}
```

위 두개의 프로퍼티는 초기화 시에 같은 객체를 바라보고 있으며 실행 컨텍스트가 호출 및 실행 영역에 따라 구분되는 것과 마찬가지로 각 바라보는 Linked Object가 달라진다.

- 전역(Global) 실행 컨텍스트의 프로퍼티인 경우: Global Lexical Environment / Global Variable Environment
- 일반 함수(Function) 실행 컨텍스트의 프로퍼티인 경우: Lexical Environment / Variable Environment

### 2. Lexical Environment

한글로 <b>“어휘적 환경”</b> 또는 <b>“정적 환경”</b>이라고 할 수 있으며 JavaScript 코드에서 변수 또는 함수 식별자를 <b>맵핑(identifier-variable mapping)</b>하는데 사용되는 객체로 다음과 같은 환경으로 구성되어 있다.

(여기서 식별자(identifier)란 참조 대상 식별자로써 변수나 함수의 이름을 참조하여 변수는 함수 객체와 배열 객체를 포함한 실제 객체 또는 원시값에 대한 참조다.)

- Lexical Environment  
  Outer Environment Reference 또는 Reference to the outer Environment  
  Enviornment Record

### 2.1 Outer Environment Reference

식별자(identifier) 검색을 위해 외부 Lexical Envioronment를 참조하는 포인터로 중첩된 JavaScript 코드에서 스코프 탐색을 위해 사용된다.  
Global Lexical Environment의 Outer Environment Reference 값은 null이다.  
일반 Function 환경에서의 Lexical Environment의 Outer Environment Reference 값은 해당 실행 컨텍스트의 상위 컨텍스트의 Lexical Environment를 참조한다.

아래 코드에서 outer를 활용해 식별자를 찾아보자

```javascript
const g0 = 'g0'

function foo() {
  const f0 = 'f0'

  function bar() {
    const b0 = 'b0'

    console.log(g0) // g0
    console.log(f0) // f0
    console.log(b0) // b0
    console.log(unknown) // Reference Error
  }
  bar()
}

foo()
```

아래는 Environment를 간단히 나타내준다.

```javascript
GlobalEnvironment = {
  environmentRecord: {
    g0: 'g0',
  },
  outer: null,
}

fooEnvironment = {
  environmentRecord: {
    f0: 'f0',
  },
  outer: globalEnvironment, // foo는 Global에서 생성
}

barEnvironment = {
  environmentRecord: {
    b0: 'b0',
  },
  outer: fooEnvironment, // bar는 foo 안에서 생성
}
```

bar의 Environment에서는 f0이나 g0을 찾을 수 없다.  
따라서 outer 참조를 통해 상위 Environment로 올라가서 식별자를 찾는다.  
outer가 null임에도 불구하고 unknown 처럼 찾을 수 없는 식별자라면 Reference Error가 발생한다.

### 2.2 Environment Record

현재 유효범위 내의 값에 식별자들의 바인딩을 기록하는 객체로 모든 지역 변수(변수, 함수 등)를 프로퍼티로 저장하며  
this와 같은 기타 정보도 여기에 저장된다.  
현재 레코드 타입이 포함된 실행 컨텍스트에 따라 <b>Global Environment Record</b>와 일반 Function 환경에서의  
 <b>Environment Record</b>로 구분할 수 있으며 담고 있는 데이터에 대한 속성도 달라진다.

```javascript
function foo() {
  var a = 'a'
  function bar() {
    // code
  }
}
```

위 코드가 있을 때 bar함수의 Lexical Environment에 있는 Outer Environment Reference에는 foo의  
Lexical Environment가 저장된다.  
따라서 bar함수에서 a 변수를 사용하고 싶다면 Outer Environment Reference에 있는 Lexical Environment으로 이동해서 a 변수를 찾아 사용한다.

### 2.3 Environment Record 종류

Environment Record에는 5가지 종류가 있다.
<br/><br/>
**2.3.1 전역 환경 레코드 (Global Environment Record)**

맨 처음 만들어지는 환경 레코드다.  
전역 환경 레코드에는 선언적 환경 레코드, 객체 환경 레코드를 복합적으로 사용하며 객체 환경 레코드의 <b>bindObject</b>에 전역 객체를 바인딩하고 있다. 모든 자바스크립트의 코드들이 공유하는 최상위 스코프를 나타낸다.  
해당 Record 타입의 구조는 실행 컨텍스트의 영역을 불문하고 아래의 Record 타입을 같는다.

- Environment Record  
  객체 환경 레코드 (Object Environment Record)  
  선언적 환경 레코드 (Declarative Environment Record)

**2.3.2 객체 환경 레코드 Object Environment Record**

with 문과 같이 식별자(identifier)를 특징 객체의 속성으로 취급할 때 사용되며, 이를 위해 binding Object하는 속성으로 특정 객체를 가리킨다.
보통은 환경 레코드를 객체로 만드는 것은 비효율 적이라 일반적으론 잘하지 않는다.  
현재 레코드는 Environment Record를 상속하는 서브 클래스다.  
<b>전역(Global) 실행 컨텍스트</b>와 <b>Object Environment Record</b>는 브라우저 환경의 경우 전역 객체로서 window  
객체를 저장한다.  
따라서 일반적인 <b>함수(Function) 실행 컨텍스트</b>와 다르게 Object, Array, Function과 같은 <b>built-in global 객체</b>와 전역 코드에서의 <b>함수/변수 선언</b>에 의해 생성된 모든 식별자 정보를 저장하며 찾을 수 있다.  
(이는 함수 실행 컨텍스트의 Environment Record와는 다른 점이다.)

<br/>

**2.3.3 선언적 환경 레코드 Declarative Environment Record**

이름에서 알 수 있듯이 변수 선언, 함수 선언, catch 절과 같은 <b>문법요소의 효과</b>와 같은 정보를 정의하기 위해 사용된다.  
즉, <b>식별자(identifier) 정보</b>를 해당 레코드 타입에서 찾을 수 있는 이야기다.  
함수 코드에 대한 Lexical Environment는 해당 레코드 타입을 포함하여 하위 레코드 타입으로는 아래와 같다.

- Declarative Environment Record  
  함수 환경 레코드 (Function Environment Record)  
  모듈 환경 레코드 (Module Environment Record)

**2.3.4 함수 환경 레코드 (Function Environment Record)**

함수 내의 최상위 스코프의 바인딩을 나타내는 <b>Declarative Environment Record</b>이다.  
함수에 필요한 this, super, newTarget에 관한 필드, 메소드 동작들이 정의되어 있다.

```plaintext
FunctionEnvironmentRecord = {
	// ... Declarative Environment Record

  	[[ThisValue]]: any
  	[[ThisBindingStatus]]: lexical | initialized | uninitialized
 	[[FunctionObject]]: object
	[[NewTarget]]: object | undefined
}
```

여기서 일반 함수와 화살표 함수의 차이점이 있다.  
화살표 함수는 [[ThisBindingStatus]]가 lexical로 설정되며, this 바인딩을 제공하지 않고  
생성자 함수로도 사용할 수 없다.  
[[FunctionObject]] 필드는 환경 레코드가 생성되게 한 호출된 함수를 가리킨다.  
[[NewTarget]]은 new 키워드와 생성자 함수를 호출한 경우, 처음에 new 키워드가 적용된 함수 객체를 가리킨다.

<br/>

**2.3.5 모듈 환경 레코드 (Module Environment Record)**

자바스크립트 모듈의 바깥 스코프를 표현하기 위한 Declarative Environment Record이며,  
모듈에 있는 변수와 함수가 바인딩된다.  
다른 환경 레코드에 존재하는 바인딩에 간접적으로 접근할 수 있는 불변 import 바인딩을 제공한다.  
그래서 다른 모듈에 대해 import 바인딩을 생성하는 메소드가 추가된다.

### 3. Variable Environment

Lexical Environment 와 function, 변수 식별자가 binding 되는 점을 포함하여 동일하다.  
Variable Environment 또한 Lexical Environment이다. 그러나 만들어진 변수 선언 및 함수 선언에 대해서는  
바인딩을 유지한다.  
Lexical Environment는 일시적으로 Lexical Environement 하위에 새로운 환경을 가리키며 이 새로운 환경은 임시 바인딩을 보유한다.
그리고 임시 범위를 벗어나면 Variable Environment가 참조하고 있는 값으로 Lexical Environment를 복구한다.  
Lexical Environment와 Variable Environment의 차이점은 전자는 함수 선언과 변수(let , const)의 바인딩을 저장하고 후자는 변수(var)만 저장한다.

### 4. Execution Context 구조

Execution Context 하위 구조

```javascript
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>
}
```

Lexical Environment 구조

```javascript
Lexical Environment = {
  Outer Environment Reference,
  Environment Record: {
    Object Environment Record,
    Declarative Environment Record: {
      Function Environment Record,
      Module Environment Record
    },
    This Binding
  }
}
```

Variable Environment 구조

```javascript
EnvironmentRecord: {
  Outer Environment Reference,
  Environment Record: {
    Object Environment Record,
    Declarative Environment Record,
    This Binding
  }
}
```

### 참조

[Javascript의 실행 컨텍스트 및 실행 스택에 대해](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)  
[Execution Context와 Lexical Environment](https://iamsjy17.github.io/javascript/2019/06/10/js33_execution_context.html)  
[ECMAScript 2015](https://262.ecma-international.org/6.0/#sec-executable-code-and-execution-contexts)  
[자바스크립트 함수(3) - Lexical Environment](https://meetup.toast.com/posts/129#newfunctionenvironment)
