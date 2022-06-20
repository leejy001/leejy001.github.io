---
date: '2022-06-01'
title: '리액트 상태관리(상태관리 역사)'
categories: ['React']
summary: '상태관리가 나온 배경과 Flux 패턴에 대하여 알아보자'
thumbnail: './react_thumbnail.png'
---

기존 웹페이지를 개발하는 것 뿐만 아니라 이제 웹앱이라고 불리는 개발을 더 많이 하게 된다.

사용자들은 더 이상 페이지를 오고 가는 UX를 원하지 않고 하나의 페이지를 띄워놓고 그 안에서 데이터를 주고 받으며 화면을 실시간으로 변경하는 <b>SPA(Single Page Application)</b>가 웹 개발의 주축을 이루게 되었다.

### 상태란?

프론트엔드에서 상태란 주로 유저 정보나 UI에 영향을 미치는 동적으로 표현되는 데이터다.  
특정 컴포넌트 내부에서 관리되는 로컬 상태와 여러 컴포넌트에서 관리되는 전 역 상태로 구분지을 수 있다.  
프론트엔드는 상태를 갖고 있음으로써 사용자와 상호작용을 할 수 있다.

내 블로그를 예시로 들어보자
<br/>
<br/>

<p align="center"><img src='/images/StateManagement/blog.png' width='100%' alt='blog' /><p>

<br/>
만약 게시글에서 여러 태그를 가진 데이터 리스트를 띄어준다는 가정하에서 React 태그와 관련된 데이터 리스트들을 따로 보고 싶다면 카테고리에서 해당 태그를 클릭하면 React와 관련된 데이터 리스트들을 보여주게 된다.

이는 굳이 백엔드에 요청할 필요없이 데이터를 필터링하여 보여주기만 하면 된다.  
이렇게 프론트엔드에서 상태는 사용자에게 노출시키고 상호작용하기 위한 데이터이다.  
이렇게 상태를 프론트엔드에서 관리하게 되면 api 호출 횟수를 획기적으로 줄일 수도 있을 것이다.

<b>그런데 과연 이게 전부일까?</b>

현대의 웹 개발은 SPA 형태의 UX가 주를 이루기 때문에 그에 따라 필요한 부분만 변경하며 적절하게 클라이언트와 통신할 필요가 있다. 위에서 본 필터링부터, 토글, input, checkbox, api 호출시 로딩 및 에러 상태까지 프론트엔드에서 관리해야하는 필요성이 대두된다.

### 과거 상태 관리

ES6 이전, 제이쿼리가 아직 널리 쓰일때도 상태는 당연히 필요했다.  
이 시기에도 이미 Ajax가 구현되어 비동기적으로 동적화면을 구성하는 시기였다.  
단순히 전역객체를 사용하여 데이터를 관리할 수도 있지만 이는 전역상태를 오염시킬 수 있고, 상태를 필요로 하는 요소에서만 직접 관리가 필요해졌다. 그래서 사용한 방법은 HTML의 <b>data 속성</b>이다.  
상태가 필요한 태그의 data 속성에 상태를 넣음으로써 해당 요소에서만 접근하여 상태를 관리할 수 있었다.  
아래는 article 태그에 <b>data-</b>로 시작하는 속성을 지정하여 data를 넣어주는 HTML 문법이다.

```jsx
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars"
>
  ...
</article>
```

그럼 아래와 같이 JavaScript에서 data 속성에 접근할 수 있다.

```jsx
var article = document.getElementById('electriccars')

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

그러나 위의 방법은 여러 문제점을 가지고 있었다.

<b>첫번째로 DOM으로의 접근이다.</b> DOM에 상태를 저장하고 있기 때문에 상태 관리를 위해서 직접 접근 해야한다.  
이를 위해 DOM에 접근하는 코드가 반드시 필요하며 위 JavaScript 코드가 이에 해당한다.
이렇게 되면 결과적으로 상태가 아닌 DOM 요소를 중심으로 코드가 작성되며 이는 상태에 대한 접근을 떨어트리며 복잡성을 키우게 된다.

<b>두번째로 상태변화 추적이 힘들다.</b> 상태는 HTML 태그의 여러 요소에 흩어져있는데 만일 api를 호출하여 업데이트를 하는 중 상태가 변경될 때 문제가 생긴다면 추적하는 것도 쉽지 않으며 흩어진 여러 상태를 관리하는 것도 쉽지 않을 것이다.

이는 코드의 유지보수와 확장을 어렵게하는 문제로 이어지게 된다.

추가적으로 기존의 UI 상태 관리의 경우 <b>MVC(Model-View-Controller)</b> 설계를 써서 UI를 관리했었다.

<br/>
<table>
    <tr>
     <th align="center">
       <img src='/images/StateManagement/simple_mvc.png' width='100%' alt='simple mvc' />
       <br> Flux 공식 이미지 | 단순 MVC 패턴
     </th>
    </tr>
</table>
<br/>

모델과 뷰가 양방향 데이터 흐름을 가지기 때문에 모델 상태가 바뀌면 뷰가 바뀌게 되며 뷰에서 변경이 일어나면 다시 모델 상태가 바뀌며 컨트롤러가 이를 조작했다.

<br/>
<table>
    <tr>
     <th align="center">
       <img src='/images/StateManagement/complicated_mvc.png' width='100%' alt='complicated mvc' />
       <br> Flux 공식 이미지 | 복잡한 MVC 패턴
     </th>
    </tr>
</table>
<br/>

모델 하나에 의존하는 뷰가 많아지면 많아질수록 데이터의 흐름과 복잡도는 무지막지하게 올라갔으며 데이터의 변경 사항을 신속하게 전파하기가 어려워지는데 이는 모델이 늘어날수록 전파해야 할 대상도 함께 늘어나기 때문이다.  
더 커다란 문제는 각 모델에서 발생하게 된 이벤트가 어플리케이션 전체로 무차별적으로 번져나간다면 어떤 변화가 일어날지 예측하기가 어렵다.  
이런 이유로 최신 프론트 웹 개발 트렌드에서 UI 인터렉션이 많아지며 MVC 설계는 관리가 불가능한 구조가 되었다.

### 현대의 상태 관리

<b>프레임워크의 등장</b>

위에서 나온 문제를 해결하기 위해 AngualrJS가 처음으로 등장하고 뒤이어 React, Vue, Svelte 등의 프레임워크(의미상 프레임워크로 통합)가 등장한다.
위의 SPA 프레임워크의 등장으로 인해 상태는 드디어 DOM에서 탈출한다.  
프론트엔드 개발자는 DOM에 접근하는 로직을 통하지 않고도 자바스크립트를 이용하여 상태를 관리하게 되었고 필요한 상태들을 컨트롤러에 모아서 관리하게 되며 데이터에 초점을 맞춘 개발이 가능해진다.  
그리고 2014년에, 페이스북은 MVC 패턴의 대안으로 기존 양방향의 데이터 흐름에서 단방향으로 데이터 흐름이 진행되는 <b>Flux 패턴</b>을 공개한다.

<iframe width="100%" height="300px" src="https://www.youtube.com/embed/nYkdrAPrdcw" title="Hacker Way: Rethinking Web App Development at Facebook" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
Facebook F8 Conference 2014
<br/>
<br/>
<table>
    <tr>
     <th align="center">
       <img src='/images/StateManagement/flux.png' width='100%' alt='flux' />
       <br> Flux 공식 이미지 | Flux 패턴
     </th>
    </tr>
</table>
<br/>

우선 단방향 데이터 흐름이 어떻게 이루어지는지 살펴보면

<b>Action/Action Craetor</b>

액션은 데이터의 상태를 변경할 수 있는 명령어 카드와 같다.  
언제든 애플리케이션의 상태를 변경하거나 뷰를 업데이트하고 싶다면 액션을 생성해야한다.  
액션 생성자는 새로 발생한 액션의 타입과 데이터 페이로드(payload)를 액션 메시지로 묶어 디스패쳐로 전달한다.

<br/>

<b>Dispatcher</b>

디스패쳐는 액션 메시지를 감지하는 순간 그것을 각 스토어에 전달한다.  
전달은 콜백(callback) 함수로 이루어지며, 등록되어 있는 모든 스토어로 페이로드를 전달할 수 있다.  
이때 스토어가 서로를 의존하고 있다면 특정 스토어가 업데이트되기를 기다리게 해주는 waitFor()를 사용할 수 있다.

<br/>

<b>Store (Model)</b>

스토어는 어플리케이션의 상태와, 상태를 변경할 수 있는 메서드를 가지고 있다.  
어떤 타입의 액션이 날아왔느냐에 따라 메서드를 다르게 적용하여 상태를 변경하게 된다.

<br/>

<b>View</b>

바로 React에 해당하는 부분이다.  
컨트롤러 뷰는 스토어에서 변경된 데이터를 가져와 모든 자식 뷰에게 데이터를 분배한다.  
데이터를 넘겨받은 뷰는 화면을 새로 렌더링한다.

<br/>

Flux에서 데이터의 흐름은 한 방향으로 강제되며, 새로운 데이터를 넣으면 처음부터 흐름이 다시 시작된다.  
모든 상태는 스토어에 모여 있기 때문에 변경사항을 여러 컴포넌트로 전달하기도 쉽다.  
이로써 Flux 패턴에서 MVC 패턴에 있던 상태의 전이(뷰와 모델 사이의 데이터 변경이 연결된 수많은 곳으로 따라 변경되는 현상)현상을 없애주고 예측 가능하게 된다.

Flux에 대해 더 자세히 알고 싶다면 해당 게시물에서 재미있게 설명하고 있다.  
[[번역] Flux로의 카툰 안내서 | bestalign’s dev blog](https://bestalign.github.io/translation/cartoon-guide-to-flux/)

<br/>

그러나 아직 문제가 하나더 남아있다.

전역상태라는 데이터가 등장하기 전에 리액트는 데이터가 부모 → 자식으로 단방향으로만 흘렀다.

<p align="center"><img src='/images/StateManagement/props_drilling.png' width='60%' alt='props drilling' /></p>

그래서 상위 컴포넌트에서 State를 선언하고 하위 컴포넌트로 Props로 내려주면서 State를 관리한다.  
그러나 어플리케이션이 커지면서 점차 래핑되는 컴포넌트도 많고 State를 전달하기 위해 관계없는 중간 컴포넌트까지 지나가며 State를 Props로 전달하는 <b>Prop Drilling</b>이 생긴다.

<br/>

<p align="center"><img src='/images/StateManagement/redux.png' width='60%' alt='redux' /></p>

즉, 부자관계가 깊어질수록 그저 데이터를 전달해주기 위한 기계적인 코드의 반복과 복잡도가 늘어나는데 이렇게 구조적으로 깊이 내려주는 상태값들을 중앙에서 관리하며 어느 레벨의 컴포넌트이든지 이 중앙상태에만 direct하게 접근하여 값을 가져오거나 갱신할 수 있도록 하는 전역상태의 개념이 등장한다.

다음 포스팅에서는 flux 패턴을 계승하며 전역상태를 관리하는 라이브러리인 Redux에 대해 알아보자

### reference

[flux 공식 사이트](https://facebook.github.io/flux/docs/in-depth-overview)  
['데이터가 폭포수처럼 흘러내려' React의 flux 패턴](https://www.huskyhoochu.com/flux-architecture/)
