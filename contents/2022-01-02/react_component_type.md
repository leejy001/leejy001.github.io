---
date: '2022-01-02'
title: 'React Component Types'
categories: ['React']
summary: 'JSX.Element, ReactElement, ReactNode에 대해 비교해보자'
thumbnail: './react_thumbnail.png'
showThumbnail: true
---

### React 그것이 알고싶다. [Component Type 편]

회사에서 React + Typescript를 사용하여 개발을 진행하면서 어렵다고 생각했던 부분 중 하나가 컴포넌트의 타입을
어떻게 지정하는가에 대한 부분이었다.  
관련 자료를 찾아보다가 [StackOverFlow](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement)에 좋은 답변이 있었고 [definitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2034c45/types/react/index.d.ts#L203)도 확인 해볼 수 있었다.

### 1. JSX.Element, ReactElement, ReactNode의 차이점이 뭘까?

JSX는 바벨에 의해서 <b>React.createElement(component, props, ...children)</b>을 사용하도록 코드가 변환된다.  
JSX를 이용하면 html 처럼 생긴 문법을 리액트 라이브러리의 렌더링 함수로 변환한다.
그렇기에 [JSX를 사용하지 않고 리액트를 사용할 수 있지만](https://ko.reactjs.org/docs/react-without-jsx.html) 매우 불편하다.

예시로 다음처럼 JSX로 작성한 코드는

```javascript
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>
  }
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById('root'))
```

다음과 같이 JSX를 사용하지 않는 코드로 컴파일될 수 있다.

```javascript
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`)
  }
}

ReactDOM.render(
  React.createElement(Hello, { toWhat: 'World' }, null),
  document.getElementById('root'),
)
```

위의 코드가 변환되는 것은 [다음 사이트](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.16.7&externalPlugins=&assumptions=%7B%7D)에서 직접 확인해볼 수 있다.

이 <b>React.createElement</b>의 리턴 타입이 바로 <b>ReactElement</b>와 <b>JSX.Element</b>이다.

<p align="center"><img src='/images/React/react_component_type.png' width='70%' alt='react component'/></P>

ReactElement와 JSX.Element는 묶어서 생각해도 좋다.
JSX.Element의 <b>제네릭 인터페이스</b>가 ReactElement다.

### 1. ReactElement

ReactElement는 type과 props 그리고 key를 가진 객체다.

```typescript
type Key = string | number

interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>,
> {
  type: T
  props: P
  key: Key | null
}
```

### 2. JSX.Element

JSX.Element는 props와 any type을 제네릭 타입으로 가지고 있는 ReactEelement이다.  
JSX는 React의 <b>global namespace</b>에 있기 때문에, 다양한 라이브러리들이 자체적으로 JSX를 구현하여 사용한다.

```typescript
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

예시

```typescript
<p> // <- ReactElement = JSX.Element
  <Custom> // <- ReactElement = JSX.Element
    {true && "test"} // <- ReactNode
  </Custom>
</p>
```

### 3. ReactNode

ReactNode는 클래스 컴포넌트에서 <b>render()</b> 메소드를 통해 반환된다.  
render() 메소드는 클래스 컴포넌트에서 필수적으로 필요하며 render() 메소드가 호출될 시 this.props와 this.state를 활용하여 아래 타입중 하나를 반환하게 된다.

<b>React elements</b>: JSX를 통해 생성한다. 컴포넌트를 JSON으로 표현한 것  
<b>Arrays and fragments</b>: render()를 통해서 여러 개의 element들을 반환한다.  
<b>Portals</b>: 별도의 DOM 하위 트리에 자식 엘리먼트를 렌더링 하게 해준다.  
<b>String and numbers</b>: 이 값들은 DOM 상에 텍스트 노드로서 렌더링 된다.  
<b>Boolean or null</b>: 아무것도 렌더링하지 않는다.  
(대부분의 경우 `return {boolean} && <Child />` 패턴을 지원하는데 사용한다.)
<br/><br/>
**render() 함수는 순수해야 한다.**  
컴포넌트의 state를 변경하지 않으면서 호출 시 동일한 결과를 반환하고 브러우저와 직접적으로 상호작용하지 않는다.
이러한 render() 메소드는 통해 반환되는 값이 <b>ReactNode</b>이며 위의 타입들을 모두 포함한다.

또 ReactNode는 ReactElement의 <b>superset(상위집합)</b>이라고 할 수 있다.  
ReactNode는 ReactElement, ReactFragment, string, ReactNode의 Array, null, undefind, boolean과 같이 좀더 유연한 타입을 정의할 수 있다.

```typescript
type ReactText = string | number
type ReactChild = ReactElement | ReactText

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined
```

### 4. 클래스 컴포넌드와 함수형 컴포넌트의 render시 return 값 차이

클래스 컴포넌트는 ReactNode를 render()와 함께 return하며 ReactNode는 그 자체로 다양한 타입을 지닌다.

```typescript
render(): ReactNode;
```

함수형 컴포넌트는 ReactElement를 return한다.  
함수형은 <b>stateless components</b>이다.  
<b>stateless components</b>: component 내부에서 state를 사용하지 않는 (리렌더링이 없는) component 의미

ReactElement는 object 형태로 null 값을 가지고 있지 않기 때문에 union을 사용해서 null값을 줘야한다.

```typescript
interface StatelessComponent<P = {}> {
  (props: P & { children?: ReactNode }, context?: any): ReactElement | null
}
```

예시

```typescript
const Example = (): ReactElement | null => {
  if (true) return null
  return <p>false</p>
}
```
