---
date: '2022-03-18'
title: '동기와 비동기 1'
categories: ['JavaScript']
summary: 'Synchronous(동기)와 Asynchronous(비동기)에 대해 알아보고 자바스크립트에서는 비동기적인 작업을 어떻게 처리하는지 알아보자'
thumbnail: './javascript_thumbnail.png'
---

자바스크립트를 배우다 보면 <b>Synchronous(동기)</b>와 <b>Asynchronous(비동기)</b>라는 단어를 보게 된다.  
<b>Synchronous(동기)</b>는 앞에 있는 명령이 끝나기 기다렸다가 뒤에 있는 명령이 순차적으로 실행되는 것을 의미한다.  
<b>Asynchronous(비동기)</b>는 앞에 명령이 끝나는 것과 관계없이 병렬적으로 명령이 실행되는 것을 의미한다.
<br/><br/>
동기적으로 실행되는 점이 좋은 이유는 순차적으로 실행되기 때문에 어떻게 실행될 것인지 파악하기 쉽다.  
그러나 비동기적인 경우는 동시적으로 실행되기 때문에 혼란스럽지만 훨씬 더 빠르게 명령을 수행 할 수 있다.

### 그럼 비동기적인 처리는 언제 할까?

어떤 명령을 실행할 때 해당 명령이 언제 종료될 지 예측하기 어렵거나, 메인 작업이 아닐 경우에 비동기적인 처리를  
주로 진행한다. 서버와 웹 브라우저가 통신할 때 서버가 언제 끝날지 예측하기 어렵다. 그리고 서버가 느릴 수도,  
브러우저의 처리 속도가 느릴 수도 있다.
<br/><br/>
그러면 해당 통신이 종료될 때까지 아무것도 하지 않는 것이 과연 맞을까?
<br/><br/>
다른 일을 하고 있다가 통신이 종료되면 callback을 호출하며 필요한 작업들을 나중에 하면 좋지 않을까?
<br/><br/>
만약 서버와 웹 브라우저가 동기적으로 통신하게 된다면 사용자는 통신이 진행되는 동안 웹 페이지 내부에서 어떤  
행위도 할 수 없게 된다.  
하지만 현재 웹 페이지를 사용하면서 그런 적은 없으며 심지어 통신을 하고 있다는 사실조차도 제대로 인지하지 못한다. 이유는 서버와 웹브라우저 사이의 통신은 비동기적으로 이루어지기 때문이다.
<br/><br/>
이제 서버와 웹 브라우저가 통신할 때 사용하는 Fetch Api에 대해 알아보자

[Fetch Api 예제](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)

[JSON 예제](https://jsonplaceholder.typicode.com/)

Featch Api 예제 코드다.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    return response.json()
  })
  .then(function (myJson) {
    console.log(myJson)
  })
```

해당 코드를 실행해보면 myJson이라는 파라미터를 통해서 우리가 웹 서버가 리턴해준 JSON 데이터 타입을 자바스크립트 데이터 타입에 맞게 Converting(변경)한 결과를 가져온다.  
위와 같은 서버와의 통신은 비동기적으로 처리하는 경우가 많다.
<br/><br/>
다음과 같이 입력해서 실행할 때 결과는 어떻게 나올까?

```javascript
console.log(1)
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    return response.json()
  })
  .then(function (myJson) {
    console.log(myJson)
  })
console.log(2)
```

console.log의 1과 2가 먼저 출력되고 서버에서 받아온 값들이 출력되게 된다.

fetch 함수의 형식은 다음과 같다.

`const fetchResponsePromise = fetch(resource [, init])`

fetch하는 함수에 resource(url)를 준다. 그러면 fetch 함수는 Promise 데이터 타입을 리턴한다.  
Promise 데이터 타입은 Response Object를 돌려준다.

해당 코드를 실행해보면 Promise라는 데이터 타입을 반환하는 것을 알 수 있다.

```javascript
var fetched = fetch('https://jsonplaceholder.typicode.com/posts')
console.log('fetched', fetched)
/*
  Promise {<pending>}
  <constructor>: "Promise"
  name: "Promise"
*/
```

반환된 값은 두개의 함수를 사용할 수 있다. 바로 <b>then()</b>과 <b>catch()</b>이며 둘다 callback 함수를 받는다.  
then()은 fetch를 통해서 실행한 결과가 성공했을 때 then()으로 전달된 callback 함수가 호출되도록 약속되어 있으며 결과 값이 있다면 첫번째 파라미터로 받을 수 있다.

```javascript
var fetched = fetch('https://jsonplaceholder.typicode.com/posts')
fetched.then(function (response) {
  console.log('response', response) // reponse Response {type: "cors", url: "https://jsonplaceholder.typicode.com/posts", redirected: false, status: 200, ok: true…}
})
fetched.catch(function (reason) {
  console.log('reason', reason)
})
```

만약 실행된 결과가 실패했다면 catch()로 전달된 callback 함수가 호출되고 파라미터로는 이유를 알려줄 것이다.

```javascript
var fetched = fetch('https://jsonplaceholder.typi.com/posts')
fetched.then(function (response) {
  console.log('response', response)
})
fetched.catch(function (reason) {
  console.log('reason', reason) // reason TypeError: Failed to fetch
})
```

위의 예제로 알 수 있듯이 Promise를 사용하여 비동기적인 작업을 사용할 때 그 작업이 성공했는지 실패했는지 표준화된 방식을 이용하여 처리할 수 있도록 해준다.  
보통은 위의 코드처럼 끊어서 코드를 입력하지 않고 2가지 방식으로 나타낸다.

### Nested promise

다음 코드를 보면 then안에서 다시 promise를 사용하고 then을 사용하는 경우가 있는데 Nested 방식이라고 한다.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    response.json().then(function (data) {
      console.log('data', data)
    })
  })
  .catch(function (reason) {
    console.log('reason', reason)
  })
```

### Promise chaining

then 내부에서 promise를 리턴한다. 그리고 바깥쪽에서 다시 then을 연결시켜 data를 console.log로 출력하는데 이를 chaining 방식이라고 한다.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    return response.json()
  })
  .catch(function (reason) {
    console.log('reason', reason)
  })
  .then(function (data) {
    console.log(data)
  })
```

전체적으로 promise의 실행 구조를 보자
<br/><br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/JavaScript/promises.png' width='80%' alt='root_graph' />
     </th>
  </tr>
</table>

[이미지 출처](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

promise를 사용하게 되면 그 즉시 <b>pending(진행 중인)</b>상태가 되고 결과가 성공이면 <b>then()</b>으로 전달된 callback 함수가 호출되며 우린 이걸 <b>resolved(fulfill)</b> 상태라고 한다.  
만약에 error가 발생하면 <b>catch()</b>로 전달된 callback 함수가 호출되며 <b>rejected</b> 상태가 된다.  
그리고 새로운 promise를 반환하면 다시 pending 상태가 시작되고 앞의 과정을 반복할 수 있게 된다.

### Promise 만들기

new Promise()를 이용해서 새로운 promise를 만든다.  
내부에 실행 함수를 선언해주고 첫번째 파라미터로 promise가 성공 시 반환하는 <b>resolve 함수</b>를 두번째 파라미터로  
promise가 실패 시 반환하는 <b>reject 함수</b>를 선언한다. (파라미터로 함수를 받는다.)

```javascript
function job1() {
  return new Promise(function (resolve, reject) {
		...
  });
}

// arrow function
function job1() {
  return new Promise((resolve, reject) => {
		...
  });
}
```

그리고 내부에 promise 성공 시 <b>resolve를 반환</b>해주고 <b>then()</b>을 통해서 <b>resolve 값</b>을 출력해줄 수 있다.

```javascript
function job1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('resolved ok')
    }, 2000)
  })
}
job1().then(function (data) {
  console.log('data :', data) // data : resolve ok
})
```

내부에 promise 실패 시 <b>reject를 반환</b>해주고 <b>catch()</b>를 통해서 <b>reject 값</b>을 출력해줄 수 있다.

```javascript
function job1() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject('job1 fail')
    }, 2000)
  })
}

job1()
  .then(function (data) {
    console.log('data1 :', data)
  })
  .catch(function (reason) {
    console.log(reason) // job1 fail
  })
```
