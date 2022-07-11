---
date: '2022-07-10'
title: '리덕스 미들웨어'
categories: ['React']
summary: '리덕스 미들웨어인 Redux-thunk와 Redux-saga에 대하여 알아보자'
thumbnail: './redux.png'
---

프론트엔드 개발을 React로 하다보면 여러 이유로 상태관리 라이브러리인 Redux를 접하게 된다.  
그리고 Redux를 사용하다 보면 자연스레 Redux-thunk와 Redux-saga와 같은 리덕스 미들웨어도 사용할 기회가 있는데 이 두 리덕스 미들웨어들은 프로젝트에서 비동기처리를 담당하는 역할을 한다.  
비슷하게 비동기 로직을 구현하고 처리하지만 어떤 차이점이 있길래 서로 다른 이름으로, 다르게 쓰이는 것일까?

### Redux의 미들웨어

우선 Redux-thunk와 Redux-saga 두가지 모두 미들웨어라는 것을 짚고 넘어가야한다.  
리덕스의 미들웨어는 리덕스가 다른 상태관리 라이브러리들과 차별되는 핵심 기능 중 하나다.  
리덕스의 flux 패턴에서 맨 처음 액션을 디스패치 하게 되면, 리듀서에서 그 해당 액션에 대한 정보를 바탕으로 스토어의 상태 값을 바꾸게 되는데, 이때 미들웨어를 사용하여 액션이 스토어에서 상태 값을 바꾸기 전에 특정 작업들을 수행할 수 있게 해준다.

득정 작업들에는 다음과 같은 역할이 있다.

- **특정 조건에 따라 액션 수행 여부 판단**
- **액션을 콘솔에 출력하거나 서버쪽에 로깅**
- **액션이 디스패치 되었을 때 데이터를 수정/가공하여 리듀서에게 전달**
- **비동기적인 작업을 수행**

이 중에서 Redux-thunk와 Redux-saga는 마지막 예시인 비동기처리에 주로 사용되는 툴이다.

### Redux Thunk

프로그래밍을 할 때, 동기적으로 어떤 함수가 실행되어야 하는 순간이 있는 반면에 비동기적으로 함수가 실행되어야하는 순간도 존재한다. Redux는 기본적으로 액션객체만을 디스패치할 수 있으며 일반 액션 생성자는 다음과 같이 파라미터를 가지고 액션 객체를 생성하는 작업만 한다.

```jsx
const actionCreator = payload => ({ action: 'ACTION', payload })
```

만약 특성 액션이 몇초뒤에 실행되야 하거나, 현재 상태에 따라 해당 액션이 무시되게 하려면 일반 액션 생성자로는 불가능하지만 Redux-thunk는 이를 가능하게 한다.

아래 코드는 1초뒤 액션이 디스패치되는 예제코드다.

```jsx
const INCREMENT_DELAY = 'INCREMENT_DELAY'

function increment() {
  return { type: INCREMENT_DELAY }
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}
```

이렇게 하다면 나중에 `store.dispatch(incrementAsync());`를 하면 `INCREMENT_DELAY` 액션이 1초뒤에 디스패치된다. 또한 조건에 따라 액션을 디스패치하거나 무시하는 코드를 만들 수도 있다.

```jsx
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    // 카운트가 짝수인 경우 바로 return
    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}
```

만약에, 리턴하는 함수에서 **dispatch, getState**를 파라미터로 받게 한다면 스토어의 상태에도 접근 할 수있다. 따라서 현재의 스토어 상태의 값에 따라 액션이 dispatch 될 지 무시될지 정해줄 수 있다.
그리고 다음과 같이 어떤 정보를 요청하면 thunk는 call을 만들고 API call의 성공 여부에 따라 성공 시 유저의 정보를 가져오고 실패 시 에러를 전달하게 해줄 수 있다.

```jsx
import {fetchRequest, fetchSuccess, fetchFailure} from "./FetchActions';

export const fetchThunk = () => async dispatch => {
        dispatch(fetchRequest());
        try{
					const response = await fetch("API URL")
					const task = await response.json()
          dispatch(fetchSuccess(task));
        } catch(err) {
          dispatch(fetchFailure(err));
        }
    };
```

fetchThunk는 dispatch 매개변수를 가진 함수를 반환하는 함수다.  
dispatch가 호출되면 제어 흐름이 reducer로 이동하여 어떤 작업을 수행하는지 결정된다.  
위의 경우에는 요청이 성공한 경우에만 애플리케이션의 state를 업데이트하게 된다.  
이렇게 Redux-thunk를 사용하면 객체 대신 함수를 생성하는 액션 생성함수를 작성할 수 있게 해준다.

### Redux Saga

Redux-saga 미들웨어는 sagas라고 불리는 순수함수로 복잡한 어플리케이션 로직을 표현할 수 있도록 해준다. 순수 함수는 테스트 관점에서도 바람직한데, 상대적으로 테스트가 쉽고 반복적이며 예측 가능하기 때문이다.  
그리고 thunk는 함수를 디스패치 할 수 있도록 하는 미들웨어였다면, saga는 액션을 모니터링 하고 있다가 특정 액션이 발생했을 때, 미리 정해둔 로직에 따라 특정 작업이 이루어지는 방식으로 동작하는 미들웨어다.

Redux Saga는 그 특성상 Thunk에 비해 많은 기능을 수행한다.

- **비동기 작업 진행시, 기본 요청 취소**
- **특정 액션이 발생했을 때, 이를 구독하고 있다가 다른 액션을 디스패치 하거나 특정 자바스크립트 코드를 실행한다.**
- **API 요청 실패시 재요청 가능**

순수 함수인 Sagas는 **generator**라고 불리는 특수한 형태의 함수로 구현이 된다.  
이 제너레이터는 함수를 구현할 때, 함수의 실행을 특정 구간에 멈추게 하거나 원하는 시점으로 돌아가게 할 수 있다. 또한 결과값을 여러번 리턴할 수 있다.

### 제너레이터(Generator)

```jsx
function exampleFunction() {
  return 1
  return 2
  return 3
  return 4
  return 5
}
```

위와 같이 함수를 작성한다면, 이 함수에선 단 하나의 리턴 값만을 기대할 수 있다. 그러나 제너레이터를 이용하여 함수를 작성한다면 이 반환값을 전부다 받을 수 있으며, 심지어 특정 위치에서 잠시 정지시켜 둘 수도 있다.

```jsx
function* generatorFunction() {
  console.log('one')
  yield 1
  console.log('two')
  yield 2
  console.log('three')
  yield 3
  console.log('four')
  yield 4
  console.log('five')
  yield 5
}
```

제너레이터 함수를 만들 때 function\*이라는 키워드를 사용하여 만든다. 또 한가지 특이한 점은 **yield**라는 표현이다.  
yield는 제너레이터 함수의 실행을 일시적으로 정지시키며, yield 뒤에 오는 표현식은 제너레이터를 관할하고 있던 호출자(caller)에게 반환된다.  
쉽게 생각하면 일반 함수의 return과 유사하다. 즉, 제너레이터 함수는 yield 부분에서 특정 값을 반환하고 그 실행을 잠시 멈추는 것이다. 다시 재실행을 하고 싶다면 다음과 같이 작성하면 된다.

```jsx
generatorFunction.next()
```

yield 부분에서 함수가 특정 로직과 값을 반환하고 코드의 흐름이 멈추면, 이를 다시 진행시키기 위해 위의 예시와 같은 코드를 입력하면 그 다음 yield 부분과 만나기 전까지 함수의 로직이 이어서 실행된다.

saga 코드는 다음과 같다. 전체적으로 Redux-thunk와 구조는 비슷하다.  
그러나 redux-saga만의 effects를 이용하여 더 다양한 기능을 보여줄 수 있다.

```jsx
import { takeLatest, put } from 'redux-saga/effects'

// fetch 메서드를 이용하여 axios로 해당 url의 data를 요청
const fetch = () => {
  return axios.get('http://localhost:8080')
}

function* fetchData() {
  try {
    const response = yield call(fetch)
    const tasks = yield response.json()
    yield put(fetchDataActions.getDataSuccess(tasks))
  } catch (err) {
    yield put(fetchDataActions.getDataError(err))
  }
}

// getData 액션을 감지하는 함수를 작성한다.
// 해당 함수는 getData 액션을 감지하고 있다가,
// 액션이 실행되면, 두번째 인자로 들어있는 제너레이터 함수를 실행한다.
export default function* watchFetchSaga() {
  yield takeLatest(fetchDataActions.getData, fetchSaga)
}
```

### Redux Saga Effect

Redux-saga에는 saga의 활용을 돕기 위한 다양한 effects들이 존재한다.  
이 effects들은 미들웨어에서 활용할 수 있는 정보들을 담고 있는 자바스크립트 객체의 일종이다.  
이 effects들을 활용하여 saga를 보다 효과적으로 사용할 수 있다.

**(1) all**

all effect는 제너레이터 함수들이 들어있는 배열을 인자로 받는다.  
이렇게 들어온 제너레이터 함수들은 all effect 안에서 병렬적으로 기능을 수행하며, 이 함수들이 모두 resolve 될 때까지 기다린다. Promise.all 과 비슷한 기능이라고 생각하면 된다.

**(2) call**

call effect는 함수를 실행시키는 effect이다.  
이 effect의 첫번째 인자에는 함수를 넣고, optional로 나머지 인자에 해당 함수에 넣을 인자를 넣을 수 있다.

**(3) fork**

fork effect 역시 함수를 실행시키는 effect이다.  
call 과 fork의 차이점은 fork의 경우에는 함수를 비동기 실행하며, call의 경우에는 함수를 동기 실행한다는 점이다.  
call로 하면 서버에 요청을 보내고 응답을 받아올 때까지 대기하지만 <b>(blocking)</b>, fork로 하면 서버에 요청을 보낸 뒤 바로 다음 함수를 실행한다. <b>(non-blocking)</b> 따라서 순차적으로 함수가 실행되어야 하는 api 요청 함수 등의 경우에는 call을 사용하며, 그 외의 비동기 로직에는 fork를 사용한다.

**(4) put**

put effect는 특정 액션을 dispatch하는 effect이다.  
위의 예시에서 보면 제너레이터 함수 내부에서 특정 액션을 dispatch 하고 있음을 확인할 수 있다.

**(5) takeEvery / takeLatest**

takeEvery와 takeLatest는 인자로 들어온 액션에 대해 특정 로직을 실행시켜주는 effect이다.  
takeEvery와 takeLatest의 차이는 takeEvery의 경우, 인자로 들어오는 모든 액션에 대해 로직을 실행시켜주는 반면, takeLatest는 기존에 실행 중이던 작업이 있을 경우 이를 취소하고, 가장 마지막으로 실행된 작업만 실행한다.

**(6) throttle / delay**

saga에서 이용할 수 있는 강력한 기능 중 하나라고 생각된다.  
throttle을 사용해서 dispatch된 액션들에 쓰로들링을 할 수 있다.

```jsx
import { throttle } from 'redux-saga/effects'

function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput)
}
```

위의 코드에서 throttle이라는 effect를 이용하면 watchInput은 0.5초 간 handleInput 작업을 수행하지 않는다. 0.5초간의 지연 주기에 발생하는 `INPUT_CHANGED` 액션들을 모두 놓치게 된다.  
saga는 0.5초의 지연 시간 동안 최대 하나의 `INPUT_CHANGED`액션을 수행하고 후행 액션을 처리 할 수 있도록 한다.

delay는 설정된 시간 이후에 resolve하는 Promise 객체를 리턴한다.

```jsx
export function* handleIncrementAsync() {
  yield delay(1000); // 1초 뒤에 실행
  ...
}
```

다음과 같이 delay를 이용하여 디바운싱을 구현할 수 있다.

```jsx
import { call, takeLatest, delay } from 'redux-saga/effects'

function* handleInput({ input }) {
  // debounce by 500ms
  yield delay(500)
  ...
}

function* watchInput() {
  // will cancel current running handleInput task
  yield takeLatest('INPUT_CHANGED', handleInput);
}
```

위의 예 `handleInput`에서 로직을 수행하기 전에 500ms 동안 기다린다.  
이 기간 동안 사용자가 무언가를 입력하면 더 많은 `INPUT_CHANGED`작업을 받게 되지만 `handleInput` 은 delay에 의해 차단 되기 때문에 로직 수행을 시작하기도 전에 `watchInput`에 의해 취소된다.

### 어떤 상황에서 어떤 미들웨어를 써야 할까?

그렇다면 어떤 상황에서 어떤 미들웨어를 쓰는 것이 가장 좋을까?  
우선 Thunk는 Saga에 비해 Boilerplate 코드가 적고 이해하기 쉽다는 장점이 있다.  
하지만, 잘못 사용하는 경우 복잡한 async 로직을 구현하게 될 수도 있으며, 테스트를 하기 어려운 구조로 되어있어, unit test를 자주 하는 환경에서는 적용하기 어렵다는 단점을 가지고 있다.

반면 Saga는 Thunk에 비해 초기에 구현해야 하는 Boilerplate의 양이 많고, 자바스크립트 ES6의 제너레이터 등의 개념을 알아야 하기 때문에 초기 러닝 커브도 높은 편이다. 하지만, 여러 Saga의 effects들을 활용하면 Thunk에 비해 깔끔한 로직을 구현할 수 있다. 또한 Saga는 throttling, debouncing, api의 재요청 및 취소와 관련한 로직을 구현하기 용이하기 때문에, Thunk에 비해 활용도가 높다고 할 수 있다.

개발 환경은 저마다 다르기 때문에 Thunk와 Saga 어떤 것이 더 낫다고 할 수 없다. 두 미들웨어의 사용법이 다른 만큼, 각자의 환경에 맞게 최적의 툴을 선택하여 적용하는 것이 좋은 개발이라고 할 수 있을 것이다.

### reference

[제너레이터 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator)  
[Redux-saga 벨로퍼트](https://react.vlpt.us/redux-middleware/10-redux-saga.html)  
[Redux Thunk & Saga](https://shinejaram.tistory.com/76)
