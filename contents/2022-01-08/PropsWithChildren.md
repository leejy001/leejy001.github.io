---
date: '2022-01-08'
title: 'PropsWithChildren'
categories: ['React', 'Development']
summary: 'PropsWithChildren을 쓰는 방법에 대해서 알아보자'
thumbnail: './react_thumbnail.png'
showThumbnail: true
---

### 리액트 개발일지 [PropsWithChildren]

리액트로 프로젝트를 개발할 때 가장 중요한 것 중 하나가 컴포넌트를 잘 만드는 것이다.  
컴포넌트는 리액트로 이루어진 앱을 만드는데 가장 최소한의 단위이기도 하고 이러한 컴포넌트들을 유기적으로 연결해서 하나의 앱을 만들기 때문이다.
따라서 하나의 목적에만 부합하는 것이 아닌 어떤 패턴의 코드에 항상 적용할 수 있는 재사용 컴포넌트를 만들어야 했다.
개발을 진행하면서 일부 컴포넌트 폼이 재사용되는 것을 발견해고 해당 컴포넌트를 따로 분리하여 여러 컴포넌트에서 사용하는 방법을 고민해야했다.

### ReactNode와 PropsWithChildren

타입스크립트로 개발을 진행하고 있어서 <b>ReactNode</b>라는 타입, children이라는 속성과 다른 속성들도 한꺼번에 전달하는 방법을 고민했다.
ReactNode는 jsx내에서 사용할 수 있는 모든 요소의 타입을 의미하며 [다음 포스트](https://leejy001.github.io/2022-01-02/react_component_type/)에서 자세히 알아볼 수 있다.
<br/><br/>
그럼 재사용 컴포넌트를 구현해보자 React + Typescript 환경에 styled-components를 추가해줬다.  
일단 재사용할 컴포넌트를 Form.tsx에 따로 구현한다.

```typescript
// Form.tsx
import React, { ReactNode } from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
  width: 90%;
  height: auto;
  background-color: lightblue;
`

const FormTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid black;
  height: 40px;
  p {
    font-size: 20px;
    border-bottom: 0;
    margin-left: 20px;
  }
  button {
    margin-right: 20px;
  }
`

const FormBody = styled.div`
  p {
    font-size: 18px;
    color: blue;
    border-bottom: 1px solid black;
    margin: 0;
  }
`

type FormTypes = {
  title: string
  onClick: () => void
  children?: ReactNode
}

function Form({ title, onClick, children }: FormTypes) {
  return (
    <FormWrapper>
      <FormTitle>
        <p>{title}</p>
        <button onClick={onClick}>클릭</button>
      </FormTitle>
      <FormBody>{children}</FormBody>
    </FormWrapper>
  )
}

export default Form
```

그다음 재사용 컴포넌트를 적용할 App.tsx에 다음과 같이 선언하면 된다.

```typescript
// App.tsx
import React from 'react'
import './styles.css'
import Form from './Form'

const ListItem = [
  { id: 1, title: '당근' },
  { id: 2, title: '사과' },
  { id: 3, title: '바나나' },
]

export default function App() {
  const onClickOne = () => {
    alert('컴포넌트 1')
  }

  return (
    <div className="App">
      <Form title={'컴포넌트 1'} onClick={onClickOne}>
        {ListItem.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </Form>
    </div>
  )
}
```

실행 해보면 다음과 같은 결과를 얻는다.
<br/><br/>

<p align="center"><img src='/images/React/component_example.png' width='90%' alt='component_example' /><p>

여기서 한가지 중요한 점은 FormBody라는 div태그 내부에 children을 선언했다.  
따라서 FormBody는 children에 들어가는 컴포넌트 태그의 스타일도 변경할 수 있다.

```typescript
const FormBody = styled.div`
  p {
    font-size: 18px;
    color: blue;
    border-bottom: 1px solid black;
    margin: 0;
  }
`
```

위 코드를 보면 FormBody의 p태그의 글씨 크기는 18px이며 색깔은 파란색으로 지정 해준것을 볼 수 있다.  
Form.tsx는 다음과 같이 여러 컴포넌트에서 재사용이 가능하다.

```typescript
// App.tsx
return (
  <div className="App">
    <Form title={'컴포넌트 1'} onClick={onClickOne}>
      {ListItem.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </Form>
    <br />
    <Form title={'컴포넌트 2'} onClick={onClickTwo}>
      <NoList>No List</NoList>
    </Form>
  </div>
)
```

물론 ReactNode외에도 ReactNode와 비슷한 기능을 하는 <b>PropsWithChildren</b>이 있다.  
PropsWithChildren도 ReactNode처럼 컴포넌트 재사용을 할 수 있으며 다음은 PropsWithChildren의 타입이다.

`type PropsWithChildren<P> = P & { children?: ReactNode };`

PropsWithChildren은 children의 type을 따로 선언할 필요는 없고 선언한 FormTypes을 PropsWithChildren의 Type으로 넣어주면 된다.

```typescript
// Form.tsx
import React, { PropsWithChildren } from "react";

type FormTypes = {
  title: string;
  onClick: () => void;
};

function Form({
  title,
  onClick,
  children
}: PropsWithChildren<FormTypes>) {
  return (
    // write code here
  )
}

export default Form
```

다음 아래의 코드 샌드박스에 ReactNode와 PropsWithChildren을 이용한 두가지 방법으로 자주 사용되는 컴포넌트를 분리해서 재사용해봤다.
재사용하는 컴포넌트가 있다면 따로 분리해서 코드 양을 줄이는 것도 리액트 앱을 최적화 시키는 하나의 방법이다.

<iframe src="https://codesandbox.io/embed/falling-frost-1mc6d?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="falling-frost-1mc6d"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
