---
date: '2022-01-23'
title: '커스텀 훅 어떻게 사용할까?'
categories: ['React', 'Development']
summary: '커스텀 훅을 왜 쓰는지에 대해 알아보고 타입스크립트 환경에서 만들어보자'
thumbnail: './react_thumbnail.png'
---

함수형 리액트로 개발을 진행하면서 hook을 사용해본 경험이 있을 것이다.  
이번에는 리액트 내장 hook이 아닌 사용자가 직접 만드는 hook을 만드는 방법에 대해 알아보겠다.  
여러 컴포넌트에서 사용되는 코드는 하니의 로직으로 묶어서 언제나 쉽게 import 하여 사용할 수 있게 하는 것이 좋다.  
이를 위해 커스텀 훅이라는 것을 사용한다.

커스텀 훅은 사용 시 use를 앞에 붙여준다. ex (useInput, useFetch 등)  
그리고 커스텀 훅도 useState나 useEffect등 내장 훅을 사용해서 만들어준다.

### Custom Hook 구현

커스텀 훅을 만들어 보자 타입스크립트로 가장 많이 쓰는 input과 toggle 커스텀 훅을 만들어 볼 것이다.

아마 input과 관련된 커스텀 훅을 따로 쓰지 않는 다면 보통 아래의 코드처럼 구현하게 된다.  
각각 이메일, 패스워드를 입력하고 제출을 누르면 alert으로 입력된 정보를 보여주고 onReset으로 초기화를 해준다.

```typescript
import React, { FormEvent, useState } from 'react'

function App() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`${email}, ${password}`)
    onReset()
  }

  const onReset = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <InputWrapper>
      <form onSubmit={handleSubmit}>
        <p>이메일</p>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <p>패스워드</p>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">제출</button>
      </form>
    </InputWrapper>
  )
}

export default App
```

이제 input에 대한 커스텀 훅을 구현해보자  
타입스크립트로 커스텀 훅을 구현할 때 리턴 부분에 타입을 따로 지정해주지 않으면 에러가 난다.
아래 코드는 state와 onChange 이벤트 그리고 제출 후 input에 남아있는 값을 reset하는 onReset 이벤트를 구현했다.

```typescript
import {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  ChangeEvent,
} from 'react'

export function useInput(
  initialState: '',
): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>,
] {
  const [state, setState] = useState<string>(initialState)

  const onChange = useCallback(e => {
    setState(e.target.value)
  }, [])

  const onReset = useCallback(
    (): void => setState(initialState),
    [initialState],
  )
  return [state, onChange, onReset]
}

export default useInput
```

그리고 위의 커스텀 함수를 원래 코드에 적용하면 다음과 같이 된다.  
import를 통해 useInput hook을 불러오고 <b>state, onChange, onReset</b>을 사용자가 임의적으로 이름을 지정한다.

```typescript
import React, { FormEvent } from 'react'
import useInput from './useInput'

function App() {
  const [email, onChangeEmail, emailReset] = useInput('')
  const [password, onChangePassword, passwordReset] = useInput('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`${email}, ${password}`)
    emailReset('')
    passwordReset('')
  }

  return (
    <InputWrapper>
      <form onSubmit={handleSubmit}>
        <p>이메일</p>
        <input value={email} onChange={onChangeEmail} type="email" />
        <p>패스워드</p>
        <input value={password} onChange={onChangePassword} type="password" />
        <button type="submit">제출</button>
      </form>
    </InputWrapper>
  )
}

export default App
```

타입스크립트의 토글 커스텀 훅은 더 간단하다.

```typescript
import { useState } from 'react'

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggleValue = () => setValue(!value)

  return [value, toggleValue]
}
```

사용방법은 다음과 같이 선언하고 두번째 인자를 onClick 이벤트 같은 곳에 넣어주면 된다.

```typescript
const [toggle, toggleIsOn] = useToggle(false) // 선언

;<button onClick={toggleIsOn}>토글</button>
{
  toggle && <p>토글</p>
}
```

다음 CodeSandBox에 들어가서 자세히 확인할 수 있다.

<iframe src="https://codesandbox.io/embed/romantic-wescoff-pw5xd?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="romantic-wescoff-pw5xd"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### 커스텀 훅에서 서버로 데이터를 주고받을 땐?

좀 더 고난도의 커스텀 훅을 작성해보자  
만약 커스텀 훅에서 서버로 요청을 보내고 요청에 해당하는 데이터를 받아오려면 어떻게 해야할까?  
커스텀 훅을 작성할 줄 안다면 아래와 같은 로직으로 코드를 짜면 된다는것을 어느정도는 알고 있을 것이다.

```typescript
// 예시 폰 인증
export function useCheckPhone(): { handleCheckPhone: returnType } {
  const handleCheckPhone = async (variable: variableType) => {
    try {
      // do something...
      axios.get('url').then(() => {
        // success something...
      })
    } catch (error) {
      // error something...
    }
    return result
  }

  return { handleCheckPhone }
}
```

여기서 커스텀 훅의 리턴 타입에 어떤 타입을 지정해 줘야 할지가 난관일 것이다.  
이때 반환 타입으로 <b>Promise</b>를 사용하면된다.
예를 들어 handleCheckPhone에서 어떤 인자를 서버로 보내서 어떤 결과 값을 받아올 때 다음과 같이 하면 된다.

```typescript
export function useCheckPhone(): { handleCheckPhone: (variable: variableType, result: resultType) => Promise<result: resultType> } {
  const handleCheckPhone = async (variable: variableType, result: resultType) => {
    try {
       // do something...
       await axios.get("url").then((response) => {
           result = response
       })
    } catch (error) {
       // error something...
    }
    return result
  }

  return {handleCheckPhone}
}
```

Promise는 TypeScript 내부적으로 타입이 정의되어 있다.  
그리고 Promise를 리턴하기 위해 위 예제의 Promise<resultType>과 같이 제네릭 선언을 해주자  
그리고 Axios는 Promise를 반환하기 때문에 해당 타입의 선언을 알아둘 필요가 있다.

지금 까지 커스텀 훅에 대해서 그리고 타입스크립트를 이용한 커스텀 훅 제작에 대해서 알아봤다.  
커스텀 훅을 만들어서 사용하면 컴포넌트의 로직을 분리시켜 필요 할 때 쉽게 재사용 할 수 있다.
