# 🥤 Vending Machine

## 개요

html, css로 벤딩머신 구현하기 (js는 추후에 추가 예정)
<br>
<br>

## 주요 속성

- GRID와 gap으로 좌측 벤딩머신의 기본 레이아웃 구성
- 자주 쓰이는 색상 :root 변수에 저장
- 콜라 아이템이 active 되었을 때 border 대신 outline으로 적용해 레이아웃에 영향이 가지 않도록 적용
- 장바구니와 획득한 음료의 콜라 아이템들 컴포넌트화 후 재활용
<br>

## 이슈

1. 품절 상품 위에 품절 로고 띄우기 <br>
  👉 이슈: li에 품절 로고로 덮고 -index를 주었으나 아이템 뒤로 밀려났고 배경색이 적용되지 않았다. <br>
  👉 해결: 피그마로 다운받은 (검정 배경 포함) 품절 로고를 li에 가상요소로 삽입하고 z-index로 처리한 후 `pointer-events:none`을 적용해 클릭이 불가하게 구현했다. <br>
  
2. 장바구니, 획득한 음료 부분의 스크롤 <br>
  👉 이슈: 스크롤을 webkit에 커스텀하고 `overflow: hidden scroll` 설정해놨는데 컨텐츠가 박스 높이보다 적을 때 스크롤은 없으면서 스크롤이 있을 위치는 존재해 레이아웃에 불균형 <br>
  👉 이슈 파악: 피그마에서 확인한 스크롤은 맥의 기본 디자인이었다. <br>
  👉 해결(예정): 디자인적으로 예쁘진 않지만 스크롤 커스텀은 후순위의 문제라 모바일용 반응형 페이지, 추후 자바스크립트 기능 추가 이후 구현할 계획이다.
<br>

## 실제 구현 화면
![image](https://user-images.githubusercontent.com/80025366/165006866-f1ac389a-cc4d-4074-a4cb-da7f1ecf84be.png)
