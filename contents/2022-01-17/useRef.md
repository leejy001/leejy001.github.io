---
date: '2022-01-17'
title: 'useRef?'
categories: ['React']
summary: 'useRef? 대체 왜 쓰는걸까?'
thumbnail: './react_thumbnail.png'
showThumbnail: true
---

### React 그것이 알고싶다. [useRef 편]

Hook은 React버전 16.8부터 React요소로 새로 추가되었다.  
Hook을 이용하여 기존의 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있다.

Hook에는 <b>useState, useEffect, useContext</b> 같은 기본적인 Hook과
<b>useReducer, useCallback, useMemo, useRef, useLayoutEffect</b> 등 추가된 Hook이 있으며 이번 시간에는 useRef에 대해서 알아보겠다.

### ref?

Javascript에서 특정 DOM을 선택하는 상황에서 <b>getElementById, querySelector</b> 같은 DOM Selector 함수를 사용해서 DOM을 선택한다.
ref는 reference의 줄임말으로, DOM을 직접 참조하기 위해 사용하며 클래스형 컴포넌트에서는 <b>createRef</b>, 함수형 컴포넌트에선 <b>useRef</b>를 사용하는데, 둘의 동작 방식은 동일하다.

React 공식 문서에는 다음과 같이 useRef를 정의한다.

> useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다.
> 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지될 것입니다.

useRef를 이용하면 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리할 수 있다.  
컴포넌트가 렌더링 된다는 것은 함수(컴포넌트)를 호출하여 실행되는 것인데
컴포넌트는 자신의 state가 변경되거나 부모에게서 받는 props가 변경될 때마다 리렌더링을 진행한다.  
useRef로 관리하는 변수는 값이 바뀐다고 컴포넌트가 리렌더링되지 않는다.
리액트 컴포넌트에서 상태는 상태를 바꾸는 함수를 호출하고 나서 그다음 렌더링이후 업데이트된 상태를 조회할 수 있지만,
useRef로 관리하는 변수는 설정 후 바로 조회할 수 있다.

### 언제 ref를 사용할까?

DOM을 직접적으로 건드려야 할 때인데 다음과 같은 상황에서 사용한다.

1. 스크롤 이벤트
2. 특정 input 포커스
3. canvas 요소에 그림 그리기
4. 외부 라이브러리를 사용하여 생성된 인스턴스
5. setTimeout, setInterval 을 통해서 만들어진 id

### useRef를 이용하여 특정 DOM 선택하기

타입스크립트를 이용해서 구현해봤다.  
useRef를 이용하여 객체를 만들고 이 객체를 통해 우리가 선택하고 싶은 DOM에 ref 값으로 설정해 줘야한다.

```typescript
const inputRef = useRef<HTMLInputElement>(null) // 객체를 만들고

<input
  name="name"
  placeholder="이름"
  onChange={onChange}
  value={name}
  ref={inputRef} // ref 값으로 설정
/>
```

그리고 특이하게 inputRef의 값을 가져올 때 <b>inputRef.current</b>로 접근해야한다.  
inputRef 자체에 대입하면 안되고 항상 <b>current</b> 속성을 이용하여 접근하도록 하자

```typescript
const onReset = () => {
  setInputs({
    name: '',
    nickname: '',
  })
  inputRef.current.focus()
}
```

다음 코드는 이메일과 패스워드를 입력하고 초기화를 누르면  
onReset 함수에서 email input 부분에 포커스를 하는 focus() DOM API를 호출해준다.

```typescript
import React, { useState, useRef, ChangeEvent } from 'react'

type InputType = {
  email: string
  password: string
}

export default function App() {
  const [inputs, setInputs] = useState<InputType>({
    email: '',
    password: '',
  })
  const nameInput = useRef<HTMLInputElement>(null)

  const { email, password } = inputs // 비구조화 할당을 통해 값 추출

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onReset = () => {
    setInputs({
      email: '',
      password: '',
    })
    nameInput.current.focus()
  }

  return (
    <div>
      <input
        name="email"
        type="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
        ref={nameInput}
      />
      <input
        name="password"
        type="password"
        placeholder="패스워드"
        onChange={onChange}
        value={password}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>이메일: {email}</b>
        <br />
        <b>패스워드: {password}</b>
      </div>
    </div>
  )
}
```

### useRef로 컴포넌트 안의 변수 만들기

ref는 DOM을 선택하는 것 이외에도 변수로써의 역할을 할 수 있다고 했다.  
ref는 객체로써 취급되며 Heap에 저장되어 프로그램 종료시까지 같은 메모리 주소를 가지기에 임의로 값을 변경하지 않는한 값이 계속 유지된다.

다음은 state와 ref로 선언한 변수를 각각 카운트 해주는 코드다.

```typescript
import React, { useState, useRef } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const countId = useRef<number>(0)
  console.log(`랜더링... count: ${count}`)

  const startCounter = () => {
    setCount(count + 1)
    console.log('state count')
  }

  const stopCounter = () => {
    countId.current += 1
    console.log('ref count')
  }

  return (
    <>
      <button onClick={startCounter}>state 카운트</button>
      <button onClick={stopCounter}>ref 카운트</button>
    </>
  )
}
```

<p align="center"><img src='/images/React/ref_console.png' width='70%' alt='ref_console' /><p>

console.log()를 보면 state를 카운트 할 때 state 카운트 console.log()와 렌더링 console.log()가 같이 실행되는 것을 볼 수 있다.
그런데 ref를 카운트 할 때는 ref 카운트 console.log()만 실행 되는 것을 볼 수 있다.
<br/><br/>
ref는 전역에 있는 객체의 값을 사용하기에 전체 라이프사이클이 유지되는 동안 항상 값이 유지된다.  
아래 코드는 input에 숫자를 입력하면 리렌더링이 되며 리렌더링이 진행되면 Math.random()을 이용하여 계속 새로운 랜덤한 숫자를 리턴한다.
과연 useRef를 통해 선언한 변수는 값이 바뀔까?

```typescript
import React, { useState, useRef, ChangeEvent } from 'react'

function App() {
  const withUseRef = useRef(Math.random())
  const withoutUseRef = Math.random()
  const [state, setState] = useState('')

  console.log('withUseRef', withUseRef.current)
  console.log('withoutUseRef', withoutUseRef)

  const handleState = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setState(value)
  }

  return (
    <div className="App">
      <div>랜덤 숫자</div>
      <input type="text" value={state} onChange={handleState} />
    </div>
  )
}

export default App
```

<p align="center"><img src='/images/React/ref_console2.png' width='90%' alt='ref_console2' /><p>

위의 결과처럼 useRef를 쓰지 않은 변수는 값이 바뀌지만 useRef를 쓴 변수는 값이 유지 된다는 것을 알 수 있다.
