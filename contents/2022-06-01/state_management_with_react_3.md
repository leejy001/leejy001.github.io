---
date: '2022-06-10'
title: '리액트 상태관리(Redux, Context API)'
categories: ['React']
summary: 'Context API와 Redux의 차이점에 대하여 알아보자'
thumbnail: './context-redux.png'
---

저번 시간에 Flux 패턴이 등장하게 된 이유와 Flux 패턴을 계승한 전역 상태 관리 라이브러리인 Redux와 Flux의 차이점에 대하여 알아보았다.

<b>Redux</b>의 특징은 다음과 같다.

1. Vanilla JS 뿐만 아니라 React, Vue와 같은 프레임워크에서도 사용이 가능하다.
2. 상태를 저장하는 Store를 통해 상태 관리 중앙화가 가능하다.
3. thunk, saga와 같은 미들웨어를 추가적으로 사용하여 구성할 수 있다.
4. Redux devtool extension이라는 라이브러리를 통해 상태에 대한 디버깅도 가능하다.
5. 전역 상태를 관리하는 용도 외에도 로컬스토리지 상태저장, 버그리포트 첨부 기능등을 사용할 수 있다.

Redux를 복습하는 겸 사용하는 방법에 대해 알아보자

Redux는 크게 전역 상태를 보관하는 <b>Store</b>, 상태 저장소에 접근하는 <b>Reducer</b>, Reducer에서 행동을 지시하는 <b>Action</b>, 저장소에 보관된 상태를 가져오는 <b>subscription</b>이 있다.  
저장소에 보관된 상태를 가져오는 것은 subscription 말고 다른 방법을 사용하도록 하겠다.

### Action 생성

Action은 Reducer에게 보내지는 저장소에 대한 행동이다.  
Reducer는 이 Action에 따라 Store에 접근하여 정해진 동작을 하며 이렇게 상태가 변하는 것에 대한 액션을 함수로 작성한다.

```jsx
// action.js
export const ADD_TODO = 'ADD_TODO'

let id = 1

export const addTodo = data => {
  return {
    type: ADD_TODO,
    todo: {
      id: id++,
      title: data.title,
      isComplete: data.isComplete,
    },
  }
}
```

### Reducer 생성

Store에 유일하게 접근할 수 있는 유일한 객체다.  
Reducer 함수 내에서 반환되는 값이 상태 저장소에 저장된다.  
초기 상태를 설정하고, Action을 type으로 구별하여 상태를 업데이트하는 로직을 Reducer로 작성한다.  
상태가 추가되는 것이 아닌 덮어씌워지게 되므로 전체 상태를 복사하여 상태를 갱신한 후에 반환해야 한다.

```jsx
// reducer.js
import { ADD_TODO } from './action";

const initialState = {
	todos: []
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state.todos, action.todo ];
    default:
      return state;
  }
};
```

### Store 생성

redux의 createStore를 통해 Store의 인자에 생성한 루트 Reducer를 넣어 생성한다.  
만약 Reducer가 여러 개라면 combineReducer를 통해 Reducer를 하나로 합치는 과정을 추가로 진행해야 한다.

```jsx
// store.js
import { createStore } from 'redux'
import { todoReducer } from './reducer'

const store = createStore(todoReducer)

export default store
```

### react-redux의 Provider로 root에 store 등록

Entry 파일에서 Provider에 store를 등록한다.

```jsx
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
)
```

### useDispatch, useSelector로 개별 컴포넌트에서 사용

상태 값을 변경하고자 하는 컴포넌트에서 생성한 action을 useDispatch를 통해 발생시킬 수 있다.  
만들어둔 액션생성 함수를 import 한다.

```jsx
import { addTodo } from './action'
import { useDispatch } from 'react-redux'

// 다른 코드는 생략...
const dispatch = useDispatch()
dispatch(addTodo({ title: text, isComplete: false }))
```

상태 값을 사용하고자 하는 컴포넌트에서 useSelector로 상태 객체를 꺼내서 사용할 수 있다.  
아래는 state를 distructuring한 모습이다.

```jsx
import { useSelector } from 'react-redux'

// 다른 코드는 생략...
const todos = useSelector(state => state.todos)
```

지금까지 Redux를 이용하여 전역 상태를 관리하는 코드를 어떻게 짜는지 알아봤다.  
Redux를 사용한다면 learning curve가 어느정도 있는 편이다.  
작은 기능을 구현하기 위해서라도 준비해야하는 boilerplate 코드가 많은 편이다.  
그중 가장 문제였던 건 위의 코드에는 나와있지 않지만 서버와의 data fetching을 처리하는 코드 부분이 아닐까 싶다.

서버와의 통신을 하는 코드를 짜며 request, fetching, success, fail 등의 상황에 대한 코드들이 산더미 처럼 쌓인다.  
물론 GraphQL 기반의 Apollo client를 사용한다면 data fetching에 대한 boilerplate에 대해 어느 정도 걱정을 덜어 줄 순 있을 것이다.  
그러나 여전히 위의 단점과 같이 작은 기능에도 reducer, action, dispatch 등을 선언하는 피로감이 남아있다.  
Context api를 이용한다면 쉬운 재 사용성은 물론이고 Redux와 비교시 꼭 reducer를 사용하지 않아도 되기 때문에 간단한 기능을 직관적이고 적은양의 코드로 만들 수 있다.

### Context API

Context API는 Redux와 마찬가지로 상태의 중앙 관리를 위한 상태 관리 도구이다.  
Redux와 다르게 React에서만 사용할 수 있다. 또 리덕스와 다르게 여러 저장소가 존재할 수 있다.  
다음은 Context API의 특징이다.

1. React에서만 사용 가능하다.
2. Entry 파일(root)에서 구성한 Provider를 내려 주는 형식이다.
3. 사용하고자 하는 컴포넌트에서 작성한 DIspatch와 State를 꺼내서 사용한다.
4. reducer를 여러 개 만들면 Provider에서 여러 단계로 만들어 사용할 수 있다.

### Context API 사용 방식

Context API는 크게 전역 상태가 저장되는 <b>context</b>, 전역 상태를 제공하는 <b>Provider</b>, 그리고 전역 상태를 받아 사용하는 <b>Consumer</b>로 나뉘어져 있다.

### React.createContext

```jsx
const userContext = React.createContext(defaultValue)
```

context 객체를 만든다.  
컴포넌트가 이 context를 가지려면 해당 컴포넌트 상위에 <b>provider</b>로 부터 context를 정의한 변수 <b>userContext</b>를 감싸면 된다.  
<b>defaultValue param</b>은 트리 안에 적절한 provider를 찾지 못했을 때 쓰이는 값이다.  
(해당 store가 어떠한 provider에 할당되지 않은 경우)완전 독립적인 context를 유지할때 쓰인다.  
provider를 통해 undefined를 보낸다 해도 해당 context를 가진 컴포넌트는 provider를 읽지 못한다.

### Context.Provider

```jsx
<MyStore.Provider value={this.state}>
  <subComponent1 />
  <subComponent2 />
</MyStore.Provider>
```

<b>provider</b>는 정의한 context를 하위 컴포넌트에게 전달하는 역할을 한다.  
provider를 전달하는 변수는 꼭 <b>value</b>를 사용해야 하고 전달 받는 컴포넌트의 제한 수는 없다.  
provider하위에 또 다른 provider배치가 가능하며, 이 경우 하위 provider값이 우선시 된다.  
provider하위에 context를 가진 모든 컴포넌트는 provider의 value로 가진 state가 변할 때마다 전부 리렌더링된다.

### **Context.Consumer**

```jsx
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

context 변화를 구독하는 React 컴포넌트다.  
해당 컴포넌트 사용 시 함수 컴포넌트 안에서 context를 구독할 수 있다.  
<b>context.Consumer</b>의 자식은 함수여야하며 이 함수는 context의 현재 값을 받고 React 노드를 반환한다.  
이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 provider의 value prop과 동일하다.  
상위 provider가 없다면 value 매개변수 값은 <b>createContext()</b>에서 정의한 <b>defaultValue</b> 와 동일하다.  
만약 여러 컴포넌트를 구독하려면 Consumer 내부에 또다른 Consumer를 정의하는 방법으로 context를 내려줘야 한다. (아래 코드)

```jsx
<ThemeContext.Consumer>
  {theme => (
    <UserContext.Consumer>
      {user => <ProfilePage user={user} theme={theme} />}
    </UserContext.Consumer>
  )}
</ThemeContext.Consumer>
```

## 차이점

결론적으로 보면 Context API와 Redux는 사용법과 그 구조에 조금 차이가 있을 뿐 전역 상태를 관리한다는 점에서는 유사하다.
애초에 Redux가 Context API를 기반으로 만들어진 것이기 때문이기도 하다.  
단순 전역 상태 관리가 필요하다면 Context API, 디버깅이나 로깅 등의 상태 관리 외의 기능이나 미들웨어가 필요하다면 Redux를 사용하는 것이 좋다고 생각된다.

Context API 같은 경우 추가 dependency 없이 사용이 가능하기 때문에 가볍게 사용할 수 있는 점에서 좋지만 여러 상태를 넘겨줄 때 Provider를 중첩해서 내려줘야 하는점은 불편했다.
그리고 Redux는 Context API와 다르게 전역 상태 관리외에 다양한 기능을 제공한다.

[Dan Abrarnov의 Medium 게시글](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) 에 다음과 같이 Redux의 강점을 서술했다.

- [로컬 스토리지에 상태를 유지한 다음 즉시 부팅한다.](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage?course=building-react-applications-with-idiomatic-redux)
- [서버의 상태를 미리 채우고 HTML로 클라이언트에 보내고 상자에서 꺼내서 부팅한다.](http://redux.js.org/docs/recipes/ServerRendering.html)
- [사용자 작업을 직렬화하고 상태 스냅샷과 함께 자동화된 버그 보고서에 첨부하여 제품 개발자가 오류를 재현할 수 있도록 한다.](https://github.com/dtschust/redux-bug-reporter)
- [네트워크를 통해 작업 개체를 전달하여 코드 작성 방식을 크게 변경하지 않고 협업 환경을 구현한다.](https://github.com/philholden/redux-swarmlog)
- [코드 작성 방식을 크게 변경하지 않고 실행 취소 기록을 유지하거나 낙관적인 변형을 구현한다.](http://redux.js.org/docs/recipes/ImplementingUndoHistory.html)
- [개발 중인 상태 기록 사이를 이동하고 코드가 변경될 때 작업 기록에서 현재 상태를 재평가한다(예: TDD).](https://github.com/gaearon/redux-devtools)
- [제품 개발자가 앱을 위한 사용자 지정 도구를 빌드할 수 있도록 개발 도구에 전체 검사 및 제어 기능을 제공한다.](https://github.com/romseguy/redux-devtools-chart-monitor)
- [대부분의 비즈니스 로직을 재사용하면서 대체 UI를 제공한다.](https://youtu.be/gvVpSezT5_M?t=11m51s)

위의 강점과 더불어 Redux-Saga, Redux-Thunk 등 다양한 추가 라이브러리를 통해 개발자가 조금 더 상태 관리를 수월하게하고 긴밀하고 정확한 코딩을 할 수 있도록 한다. 이렇게 여러 라이브러리가 모여 Redux라는 하나의 프레임워크가 되어 개발자에게 큰 도움을 주고 있는 것으로 볼 수 있다.

하지만 Context API는 이런 부가적인 기능을 제공하지 않아 다른 라이브러리를 통해 구현해야한다.  
Redux가 많은 기능을 제공하지만 Context API에 비해 작성해야하는 코드도 많고 복잡하기 때문에 이런 부가 기능이 필요하지 않다면 Redux를 사용하지 않아도 된다고 생각한다.

### reference

[React Context](https://ko.reactjs.org/docs/context.html)  
[Redux가 필요하지 않을 수도 있습니다.](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
