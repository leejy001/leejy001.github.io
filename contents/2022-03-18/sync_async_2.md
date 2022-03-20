---
date: '2022-03-19'
title: '동기와 비동기 2'
categories: ['JavaScript']
summary: 'Promise에 이어 Async & Await에 대해 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### Callback Hell

저번 포스팅 때 <b>Promise</b>에 대해 자세히 다뤄봤다.  
이번엔 <b>Async & Await</b>에 대해 알아보자

어떤 작업을 1초 후에 차례대로 시작하는 비동기적인 코드가 있다.

```javascript
timer(1000, function() {
  console.log('작업')';
  timer(1000, function() {
    console.log('작업');
    timer(1000, function() {
      console.log('작업);
    });
  });
});
```

이렇게 비동기적인 처리를 할 때 callback이 이용되는데 콜백 내부에 콜백을 호출하며 해당 콜백 함수 내부에 다시 콜백을 호출하는 <b>콜백 지옥(callback hell)</b>이 발생한다.

이런 콜백지옥은 가독성이 떨어짐은 물론 탈출하는 방법도 쉽지 않다.  
이런 문제를 극복하기 위해 등장한게 바로 promise다.  
then은 함수를 인자로 받고 첫번째 함수는 콜백 함수로써 timer가 실행되면 해당 함수가 실행되도록 약속되어있다.

```javascript
timer(1000).then(function () {
  console.log('작업')
  return timer(1000)
})
```

만약 timer를 재실행하고 싶다면 callback 함수에 promise를 반환해주면 다음에 등장하는 then이 promise에 대한 작업이 끝났을때 다시 작업하게된다.

```javascript
timer(1000)
  .then(function () {
    console.log('작업')
    return timer(1000)
  })
  .then(function () {
    console.log('작업')
    return timer(1000)
  })
```

일반적인 callback 지옥이나 위의 코드나 다를게 없어보이지만 차이점은 위의 코드는 promise가 적용되어 then()을 통해 각각의 작업이 chaining된다는 것이다.  
이전 포스트에서도 언급했지만 promise는 <b>nested 방식</b>과 <b>chaining 방식</b>을 자주 사용한다는 점을 기억하자

### async await

여기서 더 나아가서 더 깔끔하게 코드를 짜며 비동기적인 자바스크립트 문법을 동기적으로 짤 수 있는 방법이 등장한다.  
**async와 await**는 자바스크립트의 **비동기** 처리 패턴 중 최근에 나온 문법이다.  
비동기적인 코드를 동기적으로 그리고 문법적으로 단순하게 짜기 위해 몇가지 제약사항이 있다.

**1. 여러 비동기적인 함수를 동기적으로 처리하기 위해 앞에 await 키워드를 붙인다.**  
**2. await가 붙은 여러 비동기적인 함수는 반드시 다른 함수안에서 실행되어야한다.**  
**3. 앞에 await가 붙은 여러 비동기적인 함수를 가지고 있는 실행 함수는 앞에 async라는 키워드가 붙어야한다.**

```javascript
async function run() {
  await timer(1000)
  console.log('작업')
  await timer(1000)
  console.log('작업')
}
run()
```

<b>async</b>는 일반 함수를 Promise로 return 하는 함수(비동기 함수)로 만들어준다.  
앞서 Promise에서는 어떠한 값을 전달할 때 <b>resolve(res)</b>를 사용하여 값을 전달한다.  
Promise와는 다르게 <b>async/await</b>에서는 return 값으로 전달해준다.  
<b>await</b>는 뜻으로도 알수 있듯이 '기다리다'이다.  
promise가 “정착”상태가 될 때 까지 그 실행을 일시 중지 시킬 수 있다.

```javascript
async function test() {
  // test()는 1초 후 "Hello, World!"를 출력한다.
  await new Promise(resolve => setTimeout(() => resolve(), 1000))
  console.log('Hello, World!')
}

test()
```

다음 promise로 짜여진 코드를 async, await 키워드를 이용해서 구현해보자

```javascript
function timer(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}

console.log('start')
timer(1000)
  .then(function (time) {
    console.log('time:', +time)
    return timer(time + 1000)
  })
  .then(function (time) {
    console.log('time:', +time)
    return timer(time + 1000)
  })
  .then(function (time) {
    console.log('time:', +time)
    console.log('end')
  })
```

```javascript
function timer(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}

async function run() {
  console.log('start')
  let time = await timer(1000)
  console.log('time:' + time)
  time = await timer(time + 1000)
  console.log('time:' + time)
  time = await timer(time + 1000)
  console.log('time:' + time)
  console.log('end')
}

run()
```

async/await의 오류는 try/catch를 이용하여 처리가 가능하다.

```javascript
async function computeValue() {
  const err = new Error('Oops!') // rejected value
  throw err
}

async function test() {
  try {
    const res = await computeValue() // Never runs
    console.log(res)
  } catch (error) {
    console.log(error.message) // "Oops!"
  }
}

test()
```

### Promise All, Race

Promise에는 all과 race라는 명령어가 존재한다.

<table>
   <tr>
     <th align="center">
       <img src='/images/JavaScript/promise_all.png' width='80%' alt='root_graph' />
       <p>Promise.all</p>
     </th>
  </tr>
</table>
<br/>

이전 작업들이 비동기적으로 처리된 이후 가장 마지막에 끝난 작업을 기준으로 다음 작업을 실행할 때 all이라는  
명령어를 사용한다.  
Promise.all에 배열을 입력하고 배열에 각각의 promise를 원소로 해서 전달하면 배열 내부의 작업이 전부 끝났을 때<b>(늦게 끝나는 작업 기준)</b> callback 함수가 실행이 되고 첫번째 파라미터에 각각의 작업의 실행 결과를 담은 배열이 반환된다.

```javascript
console.time('Promise.all')
Promise.all([timer(1000), timer(2000), timer(3000)]).then(function (result) {
  console.log('result', result) // result [1000, 2000, 3000]
  console.timeEnd('Promise.all') // Promise.all: 3014.24267578125 ms
})
```

Promise.all의 실행 시간을 보면 가장 마지막 작업이 끝난 시간인 3000ms, 3초 정도 소요된걸 알 수 있다.

<table>
   <tr>
     <th align="center">
       <img src='/images/JavaScript/promise_race.png' width='80%' alt='root_graph' />
       <p>Promise.race</p>
     </th>
  </tr>
</table>
<br/>
<p>

Promise.race는 작업들이 비동기적으로 처리된 이후 가장 처음에 끝난 작업을 기준으로 다음 작업을 실행할때 race라는 명령어를 사용한다. 이 때 아직 끝나지 않은 작업들은 전부 버려지게 된다.

Promise.race에 배열을 입력하고 배열에 각각의 promise를 원소로 해서 전달하면 배열 내부의 작업이 전부 끝났을 때<b>(처음 끝나는 작업 기준)</b> callback 함수가 실행이 되고 첫번째 파라미터에 가장 먼저 끝난 작업이 반환된다.

```javascript
console.time('Promise.race')
Promise.race([timer(1000), timer(2000), timer(3000)]).then(function (result) {
  console.log('result', result) // result 1000
  console.timeEnd('Promise.race') // Promise.race: 1012.06689453125 ms
})
```

Promise.race의 실행 시간을 보면 가장 처음 작업이 끝난 시간인 1000ms, 1초 정도 소요된걸 알 수 있다.
