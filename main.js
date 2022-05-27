// 1. 입금 기능
// [x] 입금액 input 값 받은 후 '입금 '버튼을 누르면 잔액란으로 값 이동

// 2. 거스름돈 반환
// [x] '거스름돈 반환' 버튼 누르면 잔액이 소지금란으로 이동

// 3. 음료 구매
// [x] 3-1. 음료 버튼 누르면 카트로 이동
// [ ] 3-2. 카트의 음료 버튼을 누르면 하나씩 수량 감소
// [ ] 3-3. 음료 종류당 하나의 li에 카운트 누적
// [x] 3-4. '획득' 버튼 누르면 카트에 담긴 음료가 획득한 음료칸으로 이동
// [x] 3-5. (실패) 카트에 담긴 금액이 잔액을 초과하면 alert
// [x] 3-6. (성공) 기존 잔액 - 구매금액

// 4. 총금액 계산
// [x] 획득한 음료의 총금액을 구해 하단에 표시

// 5. 금액 단위 표시
// [ ] 세 자리 단위로 콤마 생성

const drinkCont = document.querySelectorAll(".drink-list li");
const buyCont = document.querySelector(".cont-buy");
const returnBtn = buyCont.querySelector(".btn-return");
const depositInput = buyCont.querySelector(".input-deposit");
const depositBtn = buyCont.querySelector(".btn-deposit");
const balance = buyCont.querySelector(".txt-balance");
const myMoney = document.querySelector(".txt-money");
const getBtn = document.querySelector(".btn-get");

const selectedColaCont = document.querySelector(".list-staged");
const boughtColaCont = document.querySelector(".list-myItems");

function getChange() {
  myMoney.textContent =
    parseInt(balance.innerText) + parseInt(myMoney.innerText) + " 원";
  balance.textContent = "0 원";
}

function deposit() {
  if (depositInput.value) {
    balance.textContent =
      parseInt(balance.innerText) + parseInt(depositInput.value) + " 원";
    depositInput.value = "";
  }
}

returnBtn.addEventListener("click", getChange);
depositBtn.addEventListener("click", deposit);

drinkCont.forEach((item) => {
  item.addEventListener("click", () => {
    const colaName = item.children[0].children[1].innerText;
    const selectedCola = document.createElement("li");
    const selectedColaImg = document.createElement("img");
    const selectedColaName = document.createElement("strong");
    const selectedColaCount = document.createElement("span");

    selectedColaImg.setAttribute("src", `./src/images/${colaName}.png`);
    selectedColaName.innerText = colaName;
    selectedColaCount.innerText = 1;
    selectedCola.append(selectedColaImg);
    selectedCola.append(selectedColaName);
    selectedCola.append(selectedColaCount);
    selectedColaCont.append(selectedCola);

    getBtn.addEventListener("click", () => {
      let price = selectedColaCont.childElementCount * 1000;
      const totalPriceTxt = document.querySelector(".price-total");
      console.log(price);
      if (parseInt(balance.innerText) < price) {
        alert("잔액이 부족합니다.");
      } else {
        balance.innerText = parseInt(balance.innerText) - price + " 원";
        selectedCola.remove();
        // price = 0;

        boughtColaCont.append(selectedCola);

        totalPriceTxt.textContent = boughtColaCont.childElementCount * 1000;
      }
    });
  });
});
