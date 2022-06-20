---
date: '2022-06-04'
title: '리액트 상태관리(Flux, Redux)'
categories: ['React']
summary: 'Flux와 Redux의 차이점에 대하여 알아보자'
thumbnail: './redux.png'
---

### Redux

Flux 패턴을 계승한 Redux가 출현함에 따라 Redux의 사용은 점점 늘어났으며 지금도 가장 많이 사용하는 상태 관리 라이브러리로 뽑을 수 있다.

<br/>
<table>
    <tr>
     <th align="center">
       <img src='/images/StateManagement/percent.png' width='100%' alt='percent' />
       <br> npm trends 이미지
     </th>
    </tr>
</table>
<br/>

그러나 Redux의 코드작성은 상태에 따른 액션값들과 디스패치 함수들, 리듀서들이 늘어남에 따라 점점 복잡해지고 이런 Redux를 대체할 더 간단한 솔루션을 요구하며 이에 맞게 React는 16.3 버전부터 Context API를 제공하고 있다.
<br/><br/>
<b>그렇다면 이런 Redux가 더 흥했던 이유는 무엇일까?</b>

Redux가 널리 쓰이는 이유는 flux 패키지는 실제 프로젝트에 적용하도록 만들어진 것은 아니고 패턴 컨셉을 시연한 수준이었고, Redux는 이 컨셉을 진지하게 적용한 프로젝트였기 때문이다.

Redux는 다른 구현체와 비교해봐도 비교적 사용법이 단순한 편이었으며 ES6 문법도 잘 지원하고 크기도 2Kb정도로 상당히 작은 편이다.

물론 React와 함께 많이 사용되면서도 의존성이 없기때문에 React와 별개로 독립적으로도 사용이 가능했다.

Redux 공식 페이지에서도 Redux에 대해서 다음과 같이 명시하고 있다.

> <b>"Redux는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너이며 이를 React나 다른 뷰 라이브러리와 함께 사용할 수 있다"</b>

### Redux와 Flux 차이점

아래 Redux 코드를 한번 보도록 하자

```jsx
import { createStore } from 'redux'

// (state, action) => newState 형태의 순수 함수인 리듀서
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 앱의 상태를 보관하는 Redux 저장소를 만든다.
let store = createStore(counter)

store.subscribe(() => console.log(store.getState())))

// 내부 상태를 변경하는 유일한 방법은 액션을 보내는 것뿐이다.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

앞에서 말했듯이 Redux는 flux를 그대로 구현하진 않았다.  
우선 <b>첫번째로 앱의 상태를 보관하는 Redux Store(저장소)를 한번 보자</b>

counter라는 루트 리듀서(Reducer)를 선언하고 이를 createStore로 전달하여 저장소를 생성한다.  
flux를 사용하면 앱에 여러 개의 싱글톤 패턴의 저장소가 있는 것이 일반적이지만 flux 패턴과 달리 Redux앱에서는 단 하나의 저장소만 있어야 하고, 결합은 리듀서 단계에서 일어난다.만약 앱이 커진다면 저장소를 추가하는 대신 루트 리듀서를 여러개의 작은 리듀서로 나눠준다.

그리고 각 리듀서는 상태 트리의 서로 다른 부분들에서 독립적으로 작동하며 이들을 합치기 위해 <b>combineReducers</b> 같은 헬퍼를 사용할 수 있다.

```jsx
// reducer.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter,
})

// app.js
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
```

이는 마치 React 앱에 하나의 루트 컴포넌트만 존재하지만, 그 안에 여러 작은 컴포넌트들이 조합되어 있는 것과 마찬가지라고 할 수 있다.  
Store에서 쓸 수 있는 메서드로는 4가지가 있다.

```jsx
type Store = {
  dispatch: Dispatch,
  getState: () => State,
  subscribe: (listener: () => void) => () => void,
  replaceReducer: (reducer: Reducer) => void,
}
```

<b>subscribe, dispatch, getState, replaceReducer</b>가 있지만 앞의 3가지에 대해서만 설명을 하겠다.

<b>getState</b>는 애플리케이션의 현재 상태 트리를 반환한다. 저장소의 리듀서가 마지막으로 반환한 값과 동일하다.

<b>dispatch(action)</b>은 액션을 보낸다. 이것이 Redux에서 상태 변경을 일으키기 위한 유일한 방법이다.  
위 예제에서 'INCREMENT'라는 type의 Action을 dispatch하면 counter라는 리듀서에서 Action.type에 맞는해당 조건문을 찾아 상태값에 1을 더하는 코드를 실행하여 Store의 전역 State에 반영된다.

<b>subscribe(listener)</b>는 변경 사항에 대한 리스너를 추가한다. 리스너는 액션이 보내져서 상태 트리의 일부가 변경될 수 있을 때마다 호출된다. 콜백 안에서 현재 상태 트리를 읽으려면 <b>getState()</b>를 호출하면 된다.

<br/>
<b>두번째로 Redux에서는 Dispatcher라는 개념이 없다.</b>

Flux는 단일 Dispatcher를 가지고 있으며 모든 작업은 해당 Dispatcher를 통과해야한다.

<br/>

<p align="center"><img src='/images/StateManagement/redux_structure.png' width='60%' alt='redux structure' /></p>

반면 Redux 같은 경우, 앞서 저장소(Store)에서 쓰는 4가지 메서드에 대해서 살펴보았듯이 Redux에는 디스패처 엔티티가 없고 대신 저장소에서 간단한 API 기능을 제공하며 그 중 하나는 디스패치(dispatch) 작업이다.

<b>리듀서(Reducer)</b>는 Dispatch + Store의 기능을 담당한다.  
(Redux의 스토어는 어플리케이션의 유일 객체로서 뷰 전체를 Wrapping하는 역할만 맡는다.)

<b>뷰(View)</b>에서 Action type을 지정하여 Dispatch하고, Dispatch된 Action에 따라 리듀서에서 데이터 처리를 한다.
즉, Action이 바로 Store로 보내지는 것이 아닌 Dispatcher가 리듀서 함수를 실행시켜서 새로운 상태를 저장소에 반영하고 저장소를 통해 상태가 변경되면 뷰에게 새로운 상태를 보내주고 뷰가 업데이트된다.

<b>Action</b>은 어떤 일이 일어났는지는 알려주지만 애플리케이션의 상태를 어떻게 바꾸어야 할지는 알려주지 않는데,  
Redux 프레임워크에서는 리듀서가 이 역할을 담당하게 되는것이다.

이렇게 Redux는 데이터 로직이 리듀서에 있지만 flux는 유동적으로 데이터 논리가 저장된다.

그리고 또 다른 차이점은 Flux에서는 제약 없이 원하는 대로 상태를 변경할 수 있지만 Redux는 저장소의 상태가 변경될 수 없다는 점이다.

내부적으로 데이터가 변경 되는 것을 감지하기 위하여 [shallow equality](https://redux.js.org/docs/faq/ImmutableData.html#how-redux-uses-shallow-checking) 검사를 하기 때문이다.

이를 통하여 객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교를 하는 것이 아니라 겉핥기 식으로 비교를 하여 좋은 성능을 유지할 수 있다.

리덕스는 주어진 상채를 가저와 각 리듀서로 전달하고 변경사항이 있는 경우 리듀서의 새로운 객체를 overwrite하여 리턴하며, 변경사항이 없다면 이전 객체를 리턴한다.

<br/>

지금까지 Redux와 Flux의 차이점에 대해서 알아보았다.  
다음 포스팅에서 Redux와 Context API의 특징과 사용 방법에 대해서 자세히 알아보도록 하자

### reference

['데이터가 폭포수처럼 흘러내려' React의 flux 패턴](https://www.huskyhoochu.com/flux-architecture/)  
[“[Quora] 왜 Redux가 Flux보다 대중적인가요?”](https://www.quora.com/unanswered/Why-is-Redux-more-popular-than-Facebook-Flux)  
[ReactJS에서 Redux와 Flux의 차이점](https://www.geeksforgeeks.org/what-are-the-differences-between-redux-and-flux-in-reactjs/)
