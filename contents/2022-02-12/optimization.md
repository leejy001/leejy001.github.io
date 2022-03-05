---
date: '2022-02-12'
title: 'useMemo, useCallback, React.memo'
categories: ['React', '최적화']
summary: '최적화 3대장 useMemo, UseCallback, React.memo에 대해서 알아보자'
thumbnail: './react_thumbnail.png'
showThumbnail: true
---

### React 그것이 알고싶다. [useMemo, useCallbak, React.memo 편]

리액트에서 최적화와 관련되어 공부를 하면 등장하는 3대장이 있다.  
바로 useMemo, useCallback, React.memo인데 이 3대장에 대해서 한번 알아보도록 하자

### 최적화에 사용되는 Memoization

일단 Memoization이란 무슨 뜻일까?  
일단 위키백과에는 다음과 같이 나와있다.

> 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행속도를 빠르게 하는 기술

위 최적화 3대장 또한 이 Memoization을 기반으로 동작한다.  
그럼 이 Memoization이 어떻게 사용되는지 확인해보자

### useCallback

React공식문서에서 useCallback은 메모이제이션된 콜백을 반환한다고 되어있다.  
함수를 memoized한다고 생각하면 이해가 쉽다.

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  }, // inline callback
  [a, b], // dependency
)
```

인라인 콜백과, 의존성 값의 배열을 전달하면 useCallback은 콜백의 메모이제이션된 버전을 반환한다고 되어있다.  
그리고 함수 내에 참조하는 state, props가 있다면 의존성 배열에 추가해야한다.  
위의 코드에서는 a, b의 값이 변경되지 않는다면 <b>(의존성 값이 변경되지 않는다면)</b> 함수가 새로 생성되지 않는다.  
새로 생성되지 않는다는 것은 메모리에 새로 할당하지 않으며 기존의 동일한 참조 값을 사용한다는 것을 의미하고,  
이는 최적화된 하위 컴포넌트에서 불필요한 렌더링을 줄일 수 있다는 것을 의미한다.  
만약 의존성 값이 없다면 컴포넌트가 렌더링 되는 최초에 한번만 생성되며 이후에는 동일한 참조값을 사용하게 된다.

컴포넌트가 렌더링 될 때마다 새로운 함수를 생성하여 자식 컴포넌트의 속성 값으로 입력하는 경우가 많은데  
이런 경우에 useCallback을 이용하면 리액트의 랜더링 성능을 높여줄 수 있다.

다음 코드는 useCallback을 이용한 예시다.

```typescript
import React, { ChangeEvent, useState } from 'react'

export default function App() {
  const [form, setForm] = useState({ name: '', skill: '' })
  const { name, skill } = form

  const onChange = useCallback((e: ChangeEvent) => {
    const { name, value } = e.target
    setForm(form => ({ ...form, [name]: value }))
  }, [])

  return (
    <>
      <input name="name" value={name} onChange={onChange} />
      <input name="skill" value={skill} onChange={onChange} />
    </>
  )
}
```

위 코드는 useCallback을 사용하지 않는다면 input이 입력될 때마다 리렌더링이 진행되며 그때마다 onChange 함수를 다시 만들어준다.
사용안 할때와 별 차이가 없을 것 같지만 나중에 해당 컴포넌트가 form state와 관계 없이 리렌더링 될 때 함수를 새로 생성해주는 것을 방지해준다.

### useMemo

useMemo는 메모이제이션된 값을 반환해준다.  
함수의 결과 값을 memoized하여 불필요한 연산을 관리한다고 보면 된다.

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
const memoizedValue = useCallback(computeExpensiveValue(a, b), [a, b])
```

useMemo의 특징은 일단 함수 호출 이후의 return 값이 memoized되며 두 번째 인자인 배열의 요소가 변경될 때마다
첫번째 파라미터의 callback함수를 다시 생성하는 방식이다.  
useCallback을 이용하여 useMemo의 대체형태로 사용할 수도 있다.

아래 코드는 첫번째, 두번째 숫자를 버튼을 눌러 증가시키는 코드다.

```typescript
// App.tsx
import React, { useState } from 'react'
import ShowCount from './ShowCount'

const App = () => {
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(0)

  const increaseOne = () => {
    setFirst(prevState => prevState + 1)
  }

  const increaseTwo = () => {
    setSecond(prevState => prevState + 1)
  }

  return (
    <div className="App">
      <div>
        <button onClick={increaseOne}>+</button>
        <button onClick={increaseTwo}>+</button>
      </div>
      <ShowCount first={first} second={second} />
    </div>
  )
}

export default App
```

```typescript
// ShowCount.tsx
import React from 'react'

type PropsTypes = {
  first: number
  second: number
}

const getFirst = (number: number) => {
  console.log('첫번째 숫자가 변동되었습니다.')
  return number
}

const getSecond = (number: number) => {
  console.log('두번째 숫자가 변동되었습니다.')
  return number
}

const ShowState = ({ first, second }: PropsTypes) => {
  const showFirst = getFirst(first)
  const showSecond = getSecond(second)

  return (
    <div>
      {showFirst} <br />
      {showSecond}
    </div>
  )
}

export default ShowState
```

각각 두번씩 눌렀을 때 다음과 같이 console이 출력된다.

<p align="center"><img src='/images/React/optimization1.png' width='80%' alt='optimization1' /><p>

> 첫번째 아니면 두번째 버튼을 눌러 해당 state를 변경하려고 하는데 변경하고자 하는 state에 해당하지 않는 함수도 덩달아 실행된다니...
> 너무 비효율적이다.

이제 ShowCount 컴포넌트 내에서 useMemo를 사용해보자
아래와 같이 해당 코드를 변경하면 된다.

```javascript
const showFirst = getFirst(first)
const showSecond = getSecond(second)

// 위 코드를 아래와 같이 변경
const showFirst = useMemo(() => getFirst(first), [first])
const showSecond = useMemo(() => getSecond(second), [second])
```

<p align="center"><img src='/images/React/optimization2.png' width='80%' alt='optimization2' /><p>

첫번째 숫자를 변경할 땐 <b>'첫번째 숫자가 변동되었습니다.'</b>만 뜨며  
두번째 숫자를 변경 시 <b>'두번째 숫자가 변동되었습니다.'</b>만 뜨는 것을 확인할 수 있다.

> 리액트 공식 홈페이지의 useMemo예시에보면 computeExpensiveValue이라는 함수가 들어가있다.  
> 이처럼 memoization되는 값의 재계산 로직이 복잡한 경우 useMemo를 사용하는 것이 추천되며 성능상 큰 이점으로 작용된다.

### React.memo

React.memo는 컴포넌트의 결과 값을 memoized해서 불필요한 리렌더링을 막는다.
컴포넌트가 같은 props로 자주 렌더링되거나, 무겁고 비용이 큰 연산이 있다면 React.memo()로 컴포넌트를 래핑할 필요가 있다.

```
React.memo(Component, [areEqual(prevProps, nextProps)]);
```

React는 먼저 컴포넌트를 렌더링하고 이전 렌더된 결과와 비교해서 DOM 업데이트를 결정한다.
만약 렌더링 결과가 이전과 다르면 React는 DOM을 업데이트해준다.  
물론 위의 과정은 빠르게 이루어지지만 React.memo를 이용하면 이 과정의 속도를 좀 더 높일 수 있다.

컴포넌트가 React.memo로 래핑 될 때, React는 컴포넌트를 렌더링하고 결과를 memoizing한다.  
그리고 다음 렌더링이 일어날 때 props가 같다면, React는 memoizing된 내용을 재사용함으로써, React에서 리렌더링을 할 때 가상 DOM에서 달라진 부분을 확인하지 않게되어 성능상의 이점을 누릴 수 있다.
<br/><br/>
일단 다음과 같은 경우에 React.memo를 이용한다.

1. Pure Functional Component에서
2. Rendering이 자주일어날 경우
3. re-rendering이 되는 동안에도 계속 같은 props값이 전달될 경우
4. UI element의 양이 많은 컴포넌트의 경우

예시를 살펴보자.  
함수형 컴포넌트 Todo가 React.memo()로 래핑되어 있다.

```javascript
export function Todo({ todo, desc }) {
  return (
    <div>
      <div>Todo title: {todo}</div>
      <div>Todo desc: {desc}</div>
    </div>
  )
}

export const MemoizedTodo = React.memo(Todo)
```

MemoizedTodo의 렌더링 결과는 memoizing되어 있다.  
만약 todo나 desc같은 props가 변경 되지 않는다면 다음 렌더링에도 memoizing된 결과를 그대로 사용한다.

### props 동등 비교 커스터마이징

React.memo()는 props 혹은 props 객체를 비교할 때 얕은 비교를 한다.  
비교 방식을 수정하고 싶다면 React.memo 두 번째 매개변수로 비교함수를 만들어 넘겨준다.

```javascript
function todoPropsAreEqual(prevTodo, nextTodo) {
  return prevTodo.todo === nextTodo.todo && prevTodo.desc === nextTodo.desc
}

const MemoizedTodo = React.memo(Todo, todoPropsAreEqual)
```

nextTodo와 prevTodo가 같다면 true를 반환한다.
