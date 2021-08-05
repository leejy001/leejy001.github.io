<h1 align="center">Welcome to LEE Blog ✨</h1>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux Saga-999999?style=flat-square&logo=Redux-Saga&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>
<div>
 <img alt="React" src="https://img.shields.io/badge/React-17.0.2-red.svg"> <img alt="Redux" src="https://img.shields.io/badge/Redux-4.1.0-blue.svg"> <img alt="ReduxSaga" src="https://img.shields.io/badge/Redux Saga-1.1.3-blue.svg">  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.0.1-blueviolet.svg">  <img alt="Express" src="https://img.shields.io/badge/Express-4.17.1-blueviolet.svg"> <img alt="mongoose" src="https://img.shields.io/badge/mongoose-5.12.14-green.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">

### 🔥 Motivation

> React + Redux Saga + Node.js + MongoDB 기술을 공부하기 위해 시작한 프로젝트입니다.
> 그리고 실제로 서비스를 배포하고 이미지 파일을 따로 저장하기 위해 AWS를 이용했습니다.

## 서비스 소개

### [LEE Blog](http://ec2-3-34-215-248.ap-northeast-2.compute.amazonaws.com) 블로그 서비스 프로젝트

- 나만의 블로그 서비스.
- CKEditor5를 이용한 편리하고 다양한 기능을 가진 문서 편집 기능 제공
- 메인 페이지에서 카테고리 검색 및 일반 검색 기능을 제공을 통해 유용한 정보를 쉽고 빠르게 찾을 수 있습니다.
- CKEditor5 기반 게시물 작성, 카테고리 설정, 게시물 검색, 카테고리 검색, 반응형 디자인 등 다양한 기능을 제공합니다.

## UI

### 1) 메인 홈페이지

![mainpage](https://user-images.githubusercontent.com/49552804/125185905-52dfc080-e262-11eb-8dc6-3b98ad54bb32.gif)

- Masonry Layout기반 Card 디자인 & Spiner 로딩 구현
- Infinite scroll 이용
- 최대한 간단하게 디자인 구현 카테고리 검색, 일반 검색 창을 필요할 때 선택 시 노출 시키도록 구현함

### 2) Responsive Layout

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125186092-4ad45080-e263-11eb-9e55-f1ec3fff8072.gif"/>
       <br><br>[메인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125186122-70f9f080-e263-11eb-8cc2-f8d9c74820e7.gif"/>
       <br><br>[포스팅] 
    </th>
  </tr>
</table>

- 미디어 쿼리를 이용하여 반응형 웹사이트를 구현

### 3) 로그인

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125186142-925adc80-e263-11eb-982a-56b32faf78fd.gif"/>
       <br><br>[로그인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125186153-9dae0800-e263-11eb-96cf-ec4438079b7a.gif"/>
       <br><br>[회원가입] 
    </th>
  </tr>
</table>

- 모달을 통해 로그인과 회원가입을 구현했습니다.
  - ReactStrap 이용

![sociallogin](https://user-images.githubusercontent.com/49552804/125186209-efef2900-e263-11eb-98a2-2344732795ba.gif)

- 소셜 로그인으로 로그인 구현
  - frontend : react-google-login 이용
  - backend : google-auth-library 이용

### 4) 카테고리 검색

![categorysearch](https://user-images.githubusercontent.com/49552804/125186250-3c3a6900-e264-11eb-937b-e22179986186.gif)

- 카테고리마다 해당 카테고리의 포스트의 개수 나타냄
- 카테고리 선택 시 카테고리 검색 결과로 이동

### 5) 게시물 검색

![serch](https://user-images.githubusercontent.com/49552804/125186267-56744700-e264-11eb-98f4-1461c50ac191.gif)

- 포스트 제목 검색 시 검색 결과로 이동

### 6) 게시물 작성/수정/삭제

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125186353-f336e480-e264-11eb-864c-426677e6763a.gif"/>
       <br><br>[게시물 작성]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125186346-ed410380-e264-11eb-8f28-8f988a4254f2.gif"/>
       <br><br>[게시물 수정] 
    </th>
  </tr>
</table>

- CKeditor 5를 이용하여 문서 작성, 이미지 삽입 등을 간편하게 할 수 있음
- 게시글 작성자는 PostDetail에서 수정 및 삭제 버튼을 눌러 포스트 수정 및 삭제

### 7) 게시물 보기

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/49552804/125186432-5e80b680-e265-11eb-90ea-6011976a5479.gif"/>
       <br><br>[Scroll progressbar]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/49552804/125186435-62143d80-e265-11eb-9dd8-d385082525e1.gif"/>
       <br><br>[Top button] 
    </th>
  </tr>
</table>

- 해당 게시글의 길이에 따라 상단에 Scroll progressbar를 이용하여 진행도 표시
- Top Button을 누르면 페이지 최상단으로 이동

### 7) 댓글 작성/수정/삭제

![comment](https://user-images.githubusercontent.com/49552804/125186549-e2d33980-e265-11eb-921b-27e32d2c4e49.gif)

- 댓글을 작성할 시 본인의 댓글은 오른쪽에 표시되며 삭제 및 수정 작업 가능

## 활용기술 Frontend

- **[Hooks]()**: 함수형 컴포넌트의 React State와 생명주기 관리를 도와주는 모듈로 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 도와준다. (클래스형 컴포넌트 기능 거의 대부분을 대체가능)
- **[Redux]()**: Redux는 개발자가 일관적으로 동작하고, 서로 다른 환경(서버, 클라이언트, 네이티브)에서 작동하고, 테스트하기 쉬운 앱을 작성하도록 도와준다. (자바스크립트 앱을 위한 예측 가능한 상태 컨테이너)
- **[Redux Saga]()**: 리액트/리덕스 애플리케이션의 사이드 이펙트, 예를 들면 데이터 fetching이나 브라우저 캐시에 접근하는 순수하지 않은 비동기 동작들을, 더 쉽고 좋게 만드는 것을 목적으로 하는 라이브러리이다.
- **[Axios]()**: 파일 업로드를 처리하기 위해 도입한 HTTP 클라이언트 라이브러리로써, 비동기 방식으로 Node.js 서버에 HTTP 데이터 요청을 실행한다. (파일 관리에 있어서는 RESTfull 방식이 GraphQL 방식보다 효과적)
- **[Sass]()**: CSS의 유지보수의 불편함을 개선하여 효율적인 스타일링을 도와주는 라이브러리다.
- **[Intersection Observer]()**: 기존 Scroll Event로 Infinite Scroll을 구현하면 엘리먼트의 offset을 구하기 위해 불필요한 함수 호출과 매번 layout을 새로 그려 성능의 문제가 발생하게 되는 데, Intersection Observer는 타겟 엘리먼트와, 타겟 엘리먼트의 부모나 뷰포트가 교차하는 부분의 변화를 비동기적으로 관찰하여 이러한 문제점을 해결한다.
- **[ReactStrap]()**: Card, From, Alert등 여러 디자인을 쉽고 예쁘게 처리하도록 도와준다.

## 활용기술 Backend

- **[Express]()**: NodeJS를 사용하여 서버를 개발하고자 하는 개발자들을 위하여 서버를 쉽게 구성할 수 있게 만든 프레임워크
- **[multer]()**: 파일 업로드를 위해 사용되는 multipart/form-data를 다루기 위한 node.js의 미들웨어 (multer를 거치면 `req.file` 혹은 `req.files` 로 내용을 넘겨준다)
- **[multer-s3]()**: 이미지를 form-data로 받아 저장할 수 있도록 해주는 모듈, amazon S3에 업로드할 수 있다.
- **[AWS SDK]()**: JS로 AWS 연결하기 위한 모듈

## 활용기술 DB

- **[Mongoose]()**: NoSQL 데이터베이스를 지원하는 노드의 확장모듈, mongoose는 mongoDB의 ODM이다. (ODM은 문서를 DB에서 조회할 때 자바스크립트 객체로 바꿔주는 역할을 한다.)

## File Setting

**Frontend**

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂img
 ┃ ┗ 📜custom.scss
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜loadUser.js
 ┃ ┃ ┣ 📜LoginModal.js
 ┃ ┃ ┣ 📜RegisterModal.js
 ┃ ┣ 📂comments
 ┃ ┃ ┣ 📜CommentItem.js
 ┃ ┃ ┣ 📜CommentList.js
 ┃ ┃ ┗ 📜Comments.js
 ┃ ┣ 📂editor
 ┃ ┃ ┣ 📜EditorConfig.js
 ┃ ┃ ┗ 📜UploadAdapter.js
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜Category.js
 ┃ ┃ ┣ 📜CategoryCardOne.js
 ┃ ┃ ┣ 📜CategoryList.js
 ┃ ┃ ┣ 📜PostCardOne.js
 ┃ ┃ ┣ 📜StudyCategory.js
 ┃ ┃ ┣ 📜StudyCategoryContainer.js
 ┃ ┃ ┣ 📜StudyPostCardOne.js
 ┃ ┃ ┗ 📜TimeForDay.js
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📜SearchInput.js
 ┃ ┣ 📂spinner
 ┃ ┃ ┗ 📜Spinner.js
 ┃ ┣ 📜AppNavbar.js
 ┃ ┣ 📜Footer.js
 ┃ ┣ 📜Header.js
 ┃ ┗ 📜Pagination.js
 ┣ 📂redux
 ┃ ┣ 📂reducers
 ┃ ┃ ┣ 📜authReducer.js
 ┃ ┃ ┣ 📜commentReducer.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜postReducer.js
 ┃ ┣ 📂sagas
 ┃ ┃ ┣ 📜authSaga.js
 ┃ ┃ ┣ 📜commentSaga.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜postSaga.js
 ┃ ┗ 📜types.js
 ┣ 📂routes
 ┃ ┣ 📂nomalRoute
 ┃ ┃ ┣ 📜CategoryResult.js
 ┃ ┃ ┣ 📜PostCardList.js
 ┃ ┃ ┣ 📜PostDetail.js
 ┃ ┃ ┣ 📜PostEdit.js
 ┃ ┃ ┣ 📜PostWrite.js
 ┃ ┃ ┣ 📜Profile.js
 ┃ ┃ ┣ 📜Search.js
 ┃ ┃ ┗ 📜Study.js
 ┃ ┗ 📂protectRoute
 ┃ ┃ ┗ 📜ProtectedRoute.js
 ┃ ┗ 📜Router.js
 ┣ 📜App.js
 ┣ 📜index.js
 ┣ 📜ScrollToTop.js
 ┗ 📜store.js
```

<br />

**Backend**

```
📦src
 ┣ 📂config
 ┃ ┗ 📜index.js
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜category.js
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜post.js
 ┃ ┗ 📜user.js
 ┣ 📂routes
 ┃ ┗ 📂api
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜post.js
 ┃ ┃ ┣ 📜search.js
 ┃ ┃ ┗ 📜user.js
 ┣ 📜app.js
 ┗ 📜server.js
```

## Update

- Study page 추가 (공부한 내용을 정리하고 카테고리별로 묶음)
- Study cateory page Pagination 추가
- 일부 디자인 변경
