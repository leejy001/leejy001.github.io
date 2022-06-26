---
date: '2022-06-20'
title: '브라우저의 렌더링 과정'
categories: ['Web']
summary: '브라우저가 서버로부터 받은 데이터를 어떻게 파싱하여 브라우저에 렌더링 하는지 알아보자'
thumbnail: './web.png'
---

**모던 자바스크립트의 브라우저 렌더링 과정을 읽고 정리한 글입니다.**

대부분의 프로그래밍 언어는 운영체제나 가상 머신 위에서 실행되지만 웹 어플리케이션의 클라이언트 사이드 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 따라서 브라우저 환경을 고려할 때 더 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능하다. 이를 위해 브라우저가 HTML, CSS, JS로 작성된 텍스트 문서를 어떻게 파싱(해석)하여 브라우저에 렌더링하는지에 대해 알아보자

우선 단어 정리부터 해보면

**파싱**

파싱(구문 분석)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해(어휘 분석)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정을 말한다.  
일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행한다.

**바이트코드**

바이트코드는 특정 하드웨어가 아닌 가상 컴퓨터에서 돌아가는 실행 프로그램을 위한 이진 표현법이다.  
하드웨어가 아닌 소프트웨어에 의해 처리되기 때문에, 보통 기계어보다 더 추상적이다.

**렌더링**

렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것을 말한다.

<br/><br/>

**브라우저의 렌더링 과정**

<br/>
<p align="center"><img src='/images/Web/render.png' width='100%' alt='render' /></p>

브라우저는 다음과 같은 과정을 거쳐 렌더링을 수행한다.

1. 브라우저는 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성 및 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST(추상 구문 트리)를 생성하고 바이트코드를 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있으며 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된다.
4. 렌더 트리를 기반으로 HTML 요소의 레이아웃(위치와 크기)을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다.

### 요청과 응답

브라우저의 핵심 기능 필요한 리소스(정적 파일 또는 서버가 동적으로 생성한 데이터)는 서버에 존재하기 때문에 서버에 요청한 후 서버로부터 응답받은 리소스를 파싱하여 브라우저에 시각적으로 렌더링한다.

서버에 요청을 전송하기 위해서 브라우저의 주소창에 URL을 입력하고 엔터 키를 누르면 URL의 호스트 이름이 DNS를 통해 IP 주소로 변환되고 해당 IP 주소를 갖는 서버에게 요청을 전송한다.

<br/>
<p align="center"><img src='/images/Web/uri.png' width='100%' alt='uri' /></p>

예를 들어 브라우저의 주소창에 <u>https://leejy001.github.io/</u>을 입력하고 엔터를 누르면 루트 요청(/, scheme과 host만으로 구성된 URI에 의한 요청)이 google.com 서버로 전송된다.  
루트 요청에는 명확히 리소스를 요청하는 내용이 없지만 암묵적으로 index.html을 응답하도록 기본 설정이 되어있다.  
즉, <u>https://leejy001.github.io/</u>은 <u>https://leejy001.github.io/index.html</u>과 같은 요청이다.

따라서 서버는 루트 요청에 대해 서버의 루트 폴더에 존재하는 정적 파일 index.html을 클라이언트로 응답한다.  
만약 index.html이 아닌 다른 정적 파일을 서버에 요청하려면 브라우저의 주소창에 요청할 정적 파일의 경로(서버의 루트 폴더 기준)와 파일 이름을 URI의 호스트 뒤에 path에 기술하여 서버에 요청하면 루트 폴더의 해당 정적 파일의 경로 안의 정적 파일을 응답한다.

개발자 도구의 Network 패널에서 Network로 응답된 리소스를 확인해보면 index.html뿐만 아니라 CSS, 자바스크립트, 이미지, 폰트 파일들도 응답된 것을 확인할 수 있는데 이는 브라우저 렌더링 엔진이 HTML(index.html)을 파싱하는 도중에 외부 리소스를 로드하는 태그, 즉 CSS 파일을 로드하는 link 태그, 이미지 파일을 로드하는 img 태그, 자바스크립트를 로드하는 script 태그 등을 만나면 HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청하기 때문인데 이에 관한 설명은 뒤에 나온다.

### HTML 파싱과 DOM 생성

브라우저의 요청에 의해 서버가 응답란 HTML 문서는 문자열로 이루어진 순수한 텍스트다.  
순수한 텍스트인 HTML 문서를 브라우저에 시각적인 픽셀로 렌더링하려면 HTML 문서를 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야한다.

다음과 같은 index.html이 서버로부터 응답되었다고 할 때

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

브라우저의 렌더링 엔진은 아래와 같은 과정을 통해 응답받은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.

<p align="center"><img src='/images/Web/change_dom.png' width='100%' alt='change DOM' /></p>

1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답, 이때 서버는 브라우저가 요청한 HTML 파일을 읽어 들여 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경유하여 응답한다.
2. 브라우저는 서버가 응답한 HTML 문서를 바이트 형태로 응답받은 다음에 바이트 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식(UTF-8 등)을 기준으로 문자열로 변환한다.  
   참고로 meta 태그의 charset 어트리뷰트에 선언된 인코딩 방식은 <b>content-type: text/html; charset=utf-8</b>과 같이 응답 헤더에 담겨 응답되며 브라우저는 이를 확인하고 문자열로 변환한다.
3. 문자열로 변환된 HTML 문서를 읽어 들여 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해한다.
4. 각 토큰들을 객체로 변환하여 노드들을 생성하며 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드가 생성되며 노드는 이후 DOM을 구성하는 기본요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 **HTML 요소는 중첩 관계를 갖는다.**  
   즉, HTML 요소의 콘텐츠 영역(시작 태그와 종료 태그의 사이)에는 텍스트 뿐만 아니라 다른 HTML 요소도 포함될 수 있으며 요소 간에 중첩 관계에 의해 부자 관계가 형성되고 이러한 HTML 요소 간의 부자 관계를 반영하여 모든 노드들을 **트리 자료구조**로 구성한다. 이 노드들로 구성된 트리 자료구조를 <b>DOM</b>이라 한다.

즉, DOM은 HTML 문서를 파싱한 결과물이다.

### CSS 파싱과 CSSOM 생성

렌더링 엔진은 HTML을 처음부터 할 줄씩 순차적으로 파싱하여 DOM을 생성해 나간다.  
이처럼 렌더링 엔진은 DOM을 생성해 나가다가 CSS를 로드하는 link/style 태그를 만나면 DOM 생성을 일시 중단하고 link 태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청하여 해당 CSS를 HTML과 동일한 파싱 과정(바이트 → 문자 → 토큰 → 노드 → CSSOM)을 거치며 해석하여 <b>CSSOM</b>을 생성한다.  
이후 CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 시작하여 DOM 생성을 재개한다.

아까 index.html에 CSS 파일을 로드하는 link 태그가 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  ...
</html>
```

렌더링 엔진은 meta 태그까지 HTML을 순차적으로 해석하고 link 태그를 만나면 DOM 생성을 일시 중단하고 link 태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청한다.

예를 들어, 다음과 같은 style.css 파일이 서버로부터 응답되었다고 해보자

```css
body {
  font-size: 18px;
}

ul {
  list-style-type: none;
}
```

서버로부터 CSS 파일이 응답되면 렌더링 엔진은 HTML과 동일한 해석 과정을 거쳐 CSS를 파싱하여 CSSOM을 생성하는데 이때 CSSOM은 CSS의 상속을 반영하여 생성된다.  
위 예제에서 body 요소에 적용한 font-size 프로퍼티와 ul 요소에 적용한 list-style-type 프로퍼티는 모든 li 요소에 상속된다.

<p align="center"><img src='/images/Web/cssom.png' width='100%' alt='CSSOM' /></p>

### 렌더 트리 생성

렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 각각 DOM과 CSSOM을 생성한다.  
그리고 DOM과 CSSOM은 렌더링을 위해 **렌더 트리**로 결합된다.
렌더 트리는 렌더링을 위한 트리 구조의 자료구조이기 때문에 렌더 트리는 브라우저 화면에 렌더링되는 노드만으로 구성된다.

<p align="center"><img src='/images/Web/render-tree.png' width='100%' alt='Render tree' /></p>

이후 완성된 렌더 트리는 각 HTML 요소의 레이아웃(위치와 크기)을 계산하는 데 사용되며 브라우저 화면에 픽셀을 렌더링하는 페인팅 처리에 입력된다.

<p align="center"><img src='/images/Web/layout-paint.png' width='90%' alt='Layout Paint' /></p>

지금까지 살펴본 브라우저의 렌더링 과정은 반복해서 실행될 수 있다.

예를 들어, 다음과 같은 경우 반복해서 레이아웃 계산과 페인팅이 재차 실행된다.

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 창의 리사이징에 의한 뷰포트 크기 변경
- HTML 요소의 레이아웃(위치, 크기)에 변경을 발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경

레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 비용이 많이 드는, 즉 성능에 악영향을 주는 작업이기 때문에 가급적 리렌더링이 빈번하게 발생하지 않도록 주의할 필요가 있다.

### 자바스크립트 파싱과 실행

HTML 문서를 파싱한 결과물로서 생성된 DOM은 HTML 문서의 구조와 정보뿐만 아니라 HTML 요소와 스타일 등을 변경할 수 있는 프로그래밍 인터페이스로서 DOM API를 제공하며 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작할 수 있다.  
CSS 파싱 과정과 마찬가지로 렌더링 엔진은 HTML을 한 줄씩 순차적으로 파싱하며 DOM을 생성해 나가다가 자바스크립트 파일을 로드하는 script 태그나 자바스크립트 코드를 콘텐츠로 담은 script 태그를 만나면 DOM 생성을 일시 중단한다.
그리고 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 서버에 요청하여 로드한 자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해할 수 있는 저수준 언어로 변환하고 실행하는 역할을 한다.  
렌더링 엔진으로부터 제어권을 넘겨받은 자바스크립트 엔진은 자바스크립트 코드를 파싱하며, HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하듯이 자바스크립트 엔진은 자바스크립트를 해석하여 AST(추상적 구문 트리)를 생성한다.

그 AST를 기반으로 인터프리터가 실행할 수 있는 중간 코드인 바이트코드를 생성하여 실행한다.

<p align="center"><img src='/images/Web/JS_parsing.png' width='90%' alt='JS Parsing' /></p>

**토크나이징**

단순한 문자열인 자바스크립트 소스코드를 어휘 분석하여 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해한다. 이 과정을 렉싱이라고 부르기도 하지만 토크나이징과 미묘한 차이가 있다.

**파싱**

토큰들의 집합을 구문 분석하여 <b>AST(추상적 구문 트리)</b>를 생성한다.
AST는 토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료구조다. AST는 인터프리터나 컴파일러만이 사용하는 것은 아니다.
AST를 사용하면 TypeScript, Babel, Prettier 같은 트랜스파일러를 구현할 수 있다.

**바이트코드 생성과 실행**

파싱의 결과물로서 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 인터프리터에 의해 실행된다.
참고로 V8엔진의 경우 자주 사용되는 코드는 터보팬이라 불리는 컴파일러에 의해 최적화된 머신 코드로 컴파일되어 성능을 최적화한다.
만약 코드의 사용 빈도가 적어지면 다시 디옵티마이징하기도 한다.

### 리플로우(reflow)와 리페인트(repaint)

만약 자바스크립트 코드에 DOM이나 CSSOM을 변경하는 DOM API가 사용된 경우 DOM이나 CSSOM이 변경된다.  
이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우지의 화면에 다시 렌더링하는데 이를 리플로우, 리페인트라 한다.

<p align="center"><img src='/images/Web/reflow_repaint.png' width='100%' alt='Reflow Repaint' /></p>

**리플로우**는 레이아웃 계산을 다시 하는 것을 말하며, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행된다.

**리페인트**는 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것을 말한다.

따라서 리플로우와 리페인트가 반드시 순차적으로 동시에 실행되는 것은 아니며, 레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.

### 자바스크립트 파싱에 의한 HTML 파싱 중단

지금까지 살펴본 바와 같이 렌더링 엔진과 자바스크립트 엔진은 직렬적으로 파싱을 수행한다.  
이처럼 브라우저는 동기적으로, 즉 위에서 아래로 순차적으로 HTML, CSS, 자바스크립트를 파싱하고 실행한다.  
이것은 script 태그의 위치에 따라 HTML 파싱이 블로킹되어 DOM 생성이 지연될 수 있다는 것을 의미한다.  
따라서 script 태그의 위치는 중요한 의미를 갖는다.

<p align="center"><img src='/images/Web/html_parsing.png' width='100%' alt='HTML Parsing' /></p>

위 예제의 경우 app.js의 파싱과 실행 이전까지는 DOM의 생성이 일시 중단되는데 이때 자바스크립트 코드(app.js)에서 DOM이나 CSSOM을 변경하는 DOM API를 사용할 경우 DOM이나 CSSOM이 이미 생성되어 있어야 한다.

만약 DOM을 변경하는 DOM API를 사용할 때 DOM의 생성이 완료되지 않은 상태라면 문제가 발생할 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <script>
      const $apple = document.getElementById('apple')
      $apple.style.color = 'red' // TypeError: Cannot read property 'style' of null
    </script>
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
```

DOM API인 document.getElementById('apple')은 DOM에서 id가 'apple'인 HTML 요소를 취득한다.  
하지만 document.getElementById('apple')을 실행하는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하기 않았기 때문에 DOM에는 id가 'apple'인 HTML 요소가 포함되어 있지 않은 상태다.

따라서 위 예제는 정상적인 동작을 하지 않는다.

이런 문제를 해결하기 위해 가장 좋은 방법은 body 요소의 가장 아래에 스크립트를 위치시키는 방법이다.  
그 이유는 다음과 같다.

- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생한다.
- 자바스크립트 로딩/파싱/실행으로 인해 HTML 요소들의 렌더링에 지정받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $apple = document.getElementById('apple')
      $apple.style.color = 'red'
    </script>
  </body>
</html>
```

자바스크립트가 실행될 시점에는 이미 렌더링 엔진이 HTML 요소를 모두 파싱하여 DOM 생성을 완료한 이후다.  
따라서 DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하는 에러가 발생할 우려도 없다. 또한 자바스크립트가 실행되기 이전에 DOM 생성이 완료되어 렌더링되므로 페이지 로딩 시간이 단축되는 이점도 있다.

### script 태그의 async/defer 어트리뷰트

앞에서 살펴본 자바스크립트 파싱에 의한 DOM 생성이 중단되는 문제를 근본적으로 해결하기 위해 HTML5부터 script 태그에 async와 defer 어트리뷰트가 추가되었다.  
async와 defer 어트리뷰트는 다음과 같이 src 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용할 수 있다. 즉, src 어트리뷰트가 없는 인라인 자바스크립트에는 사용할 수 없다.

```HTML
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```

위의 어트리뷰트를 사용하면 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.

**async 어트리뷰트**

HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.  
단, 자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행되며, 이때 HTML 파싱이 중단된다.

<p align="center"><img src='/images/Web/script_async.png' width='90%' alt='Script Async' /></p>

여러 개의 script 태그에 async 어트리뷰트를 지정하면 script 태그의 순서와 관계없이 로드가 완료된 자바스크립트부터 먼저 실행되므로 순서가 보장되지 않기 때문에 순서 보장이 필요한 script 태그에는 async 어트리뷰트를 저장하지 않아야 한다.

**defer 어트리뷰트**

async 어트리뷰트와 마찬가지로 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.  
단, 자바스크립트의 파싱과 실행은 HTML 파싱이 완료된 직후, 즉 DOM 생성이 완료된 직후 진행된다.  
따라서 DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용하다.

<p align="center"><img src='/images/Web/script_defer.png' width='90%' alt='Script Defer' /></p>
