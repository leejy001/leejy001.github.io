---
date: '2022-02-07'
title: '페이스북 로그인 구현하기'
categories: ['React', 'JavaScript', 'Development']
summary: '리액트 타입스크립트 환경에서 JavaScript SDK로 페이스북 로그인 구현해보자'
thumbnail: './react_thumbnail.png'
showThumbnail: true
---

회사에서 프로젝트를 진행하면서 페이스북 로그인을 구현할 일이 생겼다.  
기존에는 리엑트 라이브러리인 react-facebook-login을 이용하여 간단하게 구현하곤 했지만 이번에는  
React + TypeScript 환경에서 javascript sdk를 이용하여 구현했다.  
실은 React에서 JavaScript sdk를 이용해서 로그인을 구현하는 것은 꽤 간단하다.

일단 먼저 페이스북 개발자 사이트에 가서 로그인을 하고 오른쪽 상단에 내 앱을 클릭하면 다음과 같은 화면이 뜬다.
<br/><br/>

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_one.png' width='100%' alt='fb_login_one' /><p>

여기서 앱만들기를 누른 다음에 앱 유형을 자신의 프로젝트에 맞게 선택하고 상세 정보 추가에서 앱의 이름을 설정해주고 앱 만들기를 누르면 앱이 만들어진다.

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_two.png' width='50%' alt='fb_login_two' /><p>

다음에 하단의 옵션을 선택하고 테스트 앱 만들기를 누르면 테스트 앱의 이름을 정하는 모달 창이 뜨고
테스트 앱 이름을 정한다음에 확인을 누르고 자신이 사용하는 페이스북 계정의 비밀번호를 입력하면 테스트 앱이 만들어진다.
그리고 만들어진 테스트 앱을 클릭하면 다음과 같은 대시보드가 뜬다.
<br/><br/>

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_three.png' width='100%' alt='fb_login_three' /><p>

여기서 일단 설정 > 기본 설정으로 이동한다.

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_four.png' width='100%' alt='fb_login_four' /><p>

기본 설정 화면에서 앱 도메인에 자신이 페이스북 로그인 기능을 넣을 앱 도메인을 입력해준다.  
입력할 때 입력후에 아래에 뜨는 부분을 클릭해야 입력한 도메인이 설정된다.
다음 기본 설정 하단에 플랫폼 추가를 누르고 웹 사이트를 선택한 다음에 사이트 URL도 앱 도메인에 입력한 것과 똑같이 넣어주면 된다.

그리고 왼쪽에 드는 사이드바 메뉴를 보면 제품 추가란이 있다.  
클릭한 후에 아래로 스크롤을 내리면 페이스북의 다양한 기능들이 있는데 그 중 페이스북 로그인을 추가해주자
<br/><br/>

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_five.png' width='100%' alt='fb_login_five' /><p>

그러면 위와 같은 화면이 나오고 웹을 선택한 다음에 단계별로 설정하는 부분이 나오는데 따라서 설정하면 된다.  
마지막으로 페이스북 로그인 설정으로 들어가서 JavaScript SDK로 로그인을 예로 바꾸고 허용 도메인을 넣어주자.
<br/><br/>

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_step_six.png' width='100%' alt='fb_login_six' /><p>

일반적인 자바스크립트 환경에선 아래 코드를 그대로 붙여 넣으면 실행이 되겠지만 문제는 타입스크립트일 때다.

```javascript
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```

window객체에 property를 추가해줘야하는데 fbAsyncInit에 어떤 타입을 설정해줘야하는지 FB는 어떤 타입을 지정해야하는지 알 수 없었다.  
방법을 찾던 중 타입스크립트 환경에서 페이스북 로그인을 진행할 수 있는 라이브러리를 하나 발견했다.

[타입스크립트 페이스북 로그인](https://www.npmjs.com/package/@types/facebook-js-sdk)

라이브러리를 설치하고 페이스북 로그인 버튼을 다음과 같이 구현해줬다.

```typescript
//FBLoginButton.tsx
import React, { useEffect } from 'react'

// 페이스북 로그인 시 나온는 데이터 형식
interface AllResponse {
  status: 'connected' | 'not_authorized' | 'unknown'
  authResponse: null | AuthResponse
}

interface AuthResponse {
  accessToken: string
  expiresIn: number
  signedRequest: string
  userId: string
  data_access_expiration_time: number
  graphDomain: string
}

interface nameResponse {
  name: string
  id: string
}

function FBLoginButton() {
  useEffect(() => {
    setFBAsyncInit()
    loadSdkAsynchronously()
  }, [])

  const setFBAsyncInit = () => {
    window.fbAsyncInit = function () {
      FB.init({
        version: GRAPH_VERSION, // 현재 기준으로 v13.0이다.
        appId: FB_APP_ID, // 앱 ID를 넣어주면 된다.
        xfbml: true,
        cookie: true,
      })
    }
  }

  const loadSdkAsynchronously = () =>
    (function (d: Document, s: string, id: string) {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element as Element
      let js = element as any
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode!.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

  // 2. getLoginStatus를 통해 로그인 상태를 검사한다.
  const checkLogin = () => {
    FB.getLoginStatus(function (response) {
      checkState(response)
    })
  }

  // 3. 로그인 상태에 따라 다음 동작을 다르게 설정해준다.
  const checkState = (response: AllResponse) => {
    if (response.status === 'connected') {
      getUser() // 유저 정보 받아오기
    } else if (response.status === 'not_authorized') {
      console.log(response)
      alert('Please log ' + 'into this app.')
    } else {
      console.log(response)
      alert('Please log ' + 'into Facebook.')
    }
  }

  // 4. fields를 이용해서 로그인한 유저의 name, id정보를 받아올 수 있다.
  const getUser = () => {
    FB.api('/me', { fields: 'name' }, function (response: nameResponse) {
      console.log(response.name)
    })
  }

  // 1. 로그인을 진행하고 로그인이 제대로 됬는지 체크해준다.
  const FBLoginClick = () => {
    FB.login()
    checkLogin()
  }
  return <button onClick={FBLoginClick}>페이스북으로 로그인하기</button>
}

export default FBLoginButton
```

페이스북으로 로그인하기 버튼을 누르면 페이스북 인증 화면이 뜨고 인증을 완료하면 다음과 같이 유저 정보가 넘어온 것을 확인할 수 있다.

<p align="center"><img src='/images/Func/FacebookLogin/facebook_login_result.png' width='100%' alt='fb_login_result' /><p>
