# 가계부를 부탁해!

![최종 결과물 미리보기 :](/client/public/img-logo.png)


## 안녕하세요! 👋

본 리포지토리는 개인 프로젝트인 **지출 및 자산 관리 애플리케이션** 코드를 포함하고 있습니다.

## 디자인

- [피그마 링크](https://www.figma.com/file/YlqmZ5JlnnyksInDIHRTHJ/HomeAccountBook_mockup?type=design&node-id=0%3A1&mode=design&t=gw0H9wPStNi7CLhV-1)

## 기술 스택
- 사용 언어 & 프레임워크 : `JavaScript`, `TypeSript`, `ReactJS`, `NodeJs`, `ExpressJS`, `JWT`, `Mongoose`
- 빌드 툴 : `NPM` & `Vite`
- DB : `MongoDB`
- 스타일링 : CSS in JS (`Styled-component`)
- 전역 상태 관리 : `Recoil`, `Tanstack-query`
- 라이브러리 : `React-router`, `React-hook-form`, `Axios`, `date-fns`, `nivo`, `react-day-picker`, `mustache`, `react-copy-to-clipboard`, `nodemailer`, `rsuite`

## 구현 내용

1. **모놀리식** 스트럭쳐로 클라이언트와 서버 프로젝트를 하나의 리포지토리에서 구현
2. 프로젝트 요구사항을 충족시킬 수 있는 **API** 및 **Data schema** 작성 ([링크](https://stellar-rook-e9e.notion.site/API-Schema-6e29ae767fa84d8abc7b6aefc8c0ccc3?pvs=4))
3. **React-router**를 활용하여 페이지 라우팅 및 navigate, redirect 기능 구현
4. **Tanstack-query**를 활용한 커스텀 훅을 작성하여 infiniteQuery를 사용해 무한 스크롤 및 데이터 상태 관리 기능, fetchStatus와 hasNextPage를 활용한 loader UI 구현
5. **date-fns**, **react-day-picker** 라이브러리를 활용하여 특정 기간 내 데이터만 조회하고 기간 변경 기능 구현
6. **nivo** 차트 라이브러리를 활용하여 자산을 등록하고 그래프 형태로 조회하고 수정할 수 있는 기능 구현
7. **mustache**와 **nodemailer** 라이브러리를 활용하여 멤버 초대 이메일 템플릿 발송 기능 구현
8. (진행중)


**Have fun building!** 🚀
