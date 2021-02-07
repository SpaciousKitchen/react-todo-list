## 스터티 과제

- [x] 왕기초 
  - 클릭시 색상바뀌기
    - 구현방식 :css내용 변경 
  - 투두 입력시 textarea로 바꾸기
    
    - 구현 방식 : state 변화 시  textarea로 변경 
  
- [x] 초보 
  
  -   수정하기 기능 추가:
      -   구현 방식 :reducer사용 하여 state  내역 수정
- [x] 중수 

  - 로그인 기능 추가하여 자기 글만 수정, 삭제하기

    - 구현 방식 :reducer사용 하여 useInfo에 추가

      *모든 사용자 로그인 가능
- [x] 고수 

  - 투두리스트 + 로그인, 회원가입연동
    - 구현방식 :firebase realtime를 사용하여 로그인 회원 가입을 구현

      *데이터 join 및 관계설정이 불 가능해 불편함을 느꼈습니다. node.js Sequelize로  가능하지만 시간 관계상 firebase로 진행했습니다.)

      *firebase로 데이터 조회 및 삭제 추가 등을 처음 해보아서 메소드를 파악을 모두 못한 상태로 구현했습니다.

      *패스워드의 경우 암호화 작업은 레벨 테스트 임으로 건너뛰었습니다.

## 스터티 과제 gif
- 클릭시 색 변환
<img src="img/클릭시-색-변환.gif" width="100%">

- 회원가입 
<img src="img/회원가입.gif" width="100%">

- 로그인 
<img src="img/로그인.gif" width="100%">

- 투두 추가
<img src="img/투두추가.gif" width="100%">

- 투두 수정
<img src="img/투두변경.gif" width="100%">

- 투두 삭제
<img src="img/투두삭제.gif" width="100%">
