---
date: '2022-03-02'
title: '쓰로틀링과 디바운싱'
categories: ['JavaScript', '최적화']
summary: '자바스크립트의 프로그래밍 기법인 쓰로틀링과 디바운싱을 알아보자'
thumbnail: './javascript_thumbnail.png'
showThumbnail: true
---

자바스크립트 최적화 이야기

### Throttling, Debouncing

보통 자바스크립트의 프로그래밍 기법이라고 하며 둘 다 디바이스(일반적으로 CPU)의 무리를 주지 않기 위해 사용되곤 한다. 용어에 대해서 잠깐 정리하고 넘어가자
<br/><br/>
<b>쓰로틀링(throttling)</b>: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 프로그래밍 기법  
보통 throttle은 압력 조절이라는 뜻을 가지고 있다. 파이프라인을 통해 이벤트라는 연료를 이동시키는 중이라고 생각을 해보자, 요청 혹은 이벤트가 의도한 바보다 너무 과도하게 발생한다면 일정하게 delay를 주고 delay 동안 파이프라인을 잠가버리는 것이다. 그 기간동안 발생한 이벤트, 요청, 함수 등은 무시된다.
<br/><br/>
<b>디바운싱(debouncing)</b>: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 프로그래밍 기법  
전자 쪽에서 bouncing이란 스위치들이 접점에서 떨어지거나 붙는 지점에 물리적으로 미세하게 여러번의 on/off가 발생하게 되는 현상이다. 이는 의도한 바가 아니니 사전에 방지해주는 것이 옳다.  
이런 불필요한 현상을 방지하는 의미로 debouncing이라고 표현하며 여러 이벤트가 발생하면 일정 그룹으로 묶어 하나로 처리한다는 의미를 가지고 있다.

디바운싱은 검색어 입력 시, 쓰로틀링은 스크롤에서 많이 사용하는데 코드를 보자

### 디바운싱

다음 코드를 이용해서 검색어를 입력해본다.

```javascript
<input id="input" />

<script>
  document.querySelector("#input").addEventListener("input", function (e) {
    console.log("여기에 검색 결과 요청", e.target.value);
  });
</script>
```

검색어를 입력하자마자 엔터 없이도 결과가 바로바로 나와야 하기 때문에 항상 input 이벤트에 대기하고 있다.  
만약 <b>'안녕'</b>이라는 단어를 입력해보자 <b>ㅇ, 아, 안, 안ㄴ, 안녀, 안녕</b> 순으로 입력이 진행 될때마다 검색 결과 요청이 실행 되며, 유료 api를 사용한다면 글자를 한 글자씩 입력받을 때마다 쿼리가 날아가면 비용적 손해가 생길 수 있다.
<br/><br/>
다음은 디바운싱으로 검색어를 구현해봤다.  
input 이벤트 발생 시마다 200ms 씩 타이머를 설정해준다. 200ms 동안 입력이 없다면 입력이 끝난 것으로 판단하고, 200ms 이전에 타자 입력이 발생하면 이전 타이머는 취소하고 새로운 타이머를 설정한다.

```javascript
<input id="input" />

<script>
  let timer;

  document.querySelector("#input").addEventListener("input", function (e) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      console.log("여기에 ajax 요청", e.target.value);
    }, 200);
  });
</script>
```

검색어를 중간에 끊어서 입력하지 않는 한 여러번 호출이 되지 않는다. 이게 바로 디바운싱이다.

### 쓰로틀링

보통 성능 문제 때문에 많이 사용한다. (특성 자체가 실행 횟수에 제한을 건다.)  
스크롤을 올리거나 내릴 때 scroll 이벤트가 매우 많이 발생한다.  
scroll 이벤트가 발생할 때 뭔가 복잡한 작업을 설정한다면 (예를 들면 무한 스크롤의 경우) 매우 빈번하게 실행되기에 오류가 생길 수 도 있다.

아래 코드는 쓰로틀링을 걸어주기 전의 코드다.

```javascript
<div>
    <div style="display: flex; flex-direction: column; position: fixed;">
        <h3>throttle 처리전</h3>
        <div><label>이벤트 발생 : </label> <span id="count">0</span></div>
    </div>
    <div style="background-color: aquamarine; height: 500px;"></div>
    <div style="background-color: lightblue; height: 500px;"></div>
    <div style="background-color: lightcoral; height: 500px;"></div>
    <div style="background-color: lightsalmon; height: 500px;"></div>
    <div style="background-color: lemonchiffon; height: 500px;"></div>
    <div style="background-color: lightskyblue; height: 500px;"></div>
    <div style="background-color: lightseagreen; height: 500px;"></div>
</div>

<script>
  window.addEventListener("scroll", function (e) {
    console.log("스크롤 이벤트 발생!");
    const count = document.getElementById("count");
    count.innerText = parseInt(count.innerText) + 1;
  });
</script>
```

끝까지 화면을 스크롤 하니 마우스 스크롤은 5번만 했는데 이벤트를 59번이나 발생한다.  
스크롤을 일정 부분 내릴때마다 api를 호출해야 하는 경우라면 수많은 api가 중복 호출될 위험이 있다.  
이때 쓰로틀링을 걸어주는데 몇 초에 한번, 또는 몇 밀리 초에 한 번씩만 실행되게 제한을 두며
타이머가 설정되어 있다면 아무 동작도 하지 않고, 타이머가 없다면 타이머를 설정한다.

타이머는 일정 시간 후에 스스로 해제하고 요청을 날리게 된다.

```javascript
<div>
    <div style="display: flex; flex-direction: column; position: fixed;">
        <h3>throttle 처리후</h3>
        <div><label>이벤트 발생 : </label> <span id="count">0</span></div>
    </div>
    <div style="background-color: aquamarine; height: 500px;"></div>
    <div style="background-color: lightblue; height: 500px;"></div>
    <div style="background-color: lightcoral; height: 500px;"></div>
    <div style="background-color: lightsalmon; height: 500px;"></div>
    <div style="background-color: lemonchiffon; height: 500px;"></div>
    <div style="background-color: lightskyblue; height: 500px;"></div>
    <div style="background-color: lightseagreen; height: 500px;"></div>
</div>

<script>
  let timer;

  window.addEventListener("scroll", function () {
    if (timer) return;
    timer = setTimeout(function () {
      console.log("스크롤 이벤트 발생!");
      const count = document.getElementById("count");
      count.innerText = parseInt(count.innerText, 10) + 1;
      timer = null;
    }, 800);
  });
</script>
```

쓰로틀링을 적용하기 전과 달리 끝까지 스크롤 시 3번의 이벤트 호출이 전부였다. (어느정도 차이는 있다.)  
자바스크립트는 이벤트 기반의 언어이며 브라우저 환경에서 렌더링은 성능을 크게 좌지우지 하기 때문에, 이런 쓰로틀링이나 디바운싱의 개념이 중요하게 여겨지는 것 같다.  
최적화의 방법은 무궁무진하고 그 만큼 많은 생각을 해야하는 것 같다.
