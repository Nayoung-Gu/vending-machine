// 1. 입금 기능
// [x] 입금액 input 값 받은 후 '입금 '버튼을 누르면 잔액란으로 값 이동

// 2. 거스름돈 반환
// [x] '거스름돈 반환' 버튼 누르면 잔액이 소지금란으로 이동

// 3. 음료 구매
// [x] 3-1. 음료 버튼 누르면 카트로 이동
// [ ] 3-2. 카트의 음료 버튼을 누르면 하나씩 수량 감소
// [x] 3-3. 음료 종류당 하나의 li에 카운트 누적
// [x] 3-4. '획득' 버튼 누르면 카트에 담긴 음료가 획득한 음료칸으로 이동
// [x] 3-5. (실패) 카트에 담긴 금액이 잔액을 초과하면 alert
// [x] 3-6. (성공) 기존 잔액 - 구매금액

// 4. 총금액 계산
// [x] 획득한 음료의 총금액을 구해 하단에 표시

// 5. 금액 단위 표시
// [ ] 세 자리 단위로 콤마 생성

const vendingMachine = document.querySelector(".vending-machine");
const drinkCont = vendingMachine.querySelectorAll(".drink-list li");
const buyCont = vendingMachine.querySelector(".cont-buy");
const returnBtn = buyCont.querySelector(".btn-return");
const depositInput = buyCont.querySelector(".input-deposit");
const depositBtn = buyCont.querySelector(".btn-deposit");
const balance = buyCont.querySelector(".txt-balance");
const getBtn = buyCont.querySelector(".btn-get");
const selectedColaCont = buyCont.querySelector(".list-staged");

const myPage = document.querySelector(".my-page");
const myMoney = myPage.querySelector(".txt-money");
const boughtColaCont = myPage.querySelector(".list-myItems");

// 잔액을 소지금에 포함하기
function getChange() {
  myMoney.textContent =
    parseInt(balance.innerText.slice(0, -2)) +
    parseInt(myMoney.innerText) +
    " 원";

  balance.textContent = "0 원";
}

// 입금하기
function deposit() {
  if (depositInput.value) {
    // const formattedMoney = Number(
    //   parseInt(balance.innerText) + parseInt(depositInput.value)
    // ).toLocaleString();
    balance.textContent =
      parseInt(balance.innerText) + parseInt(depositInput.value) + " 원";

    depositInput.value = "";
  }
}

returnBtn.addEventListener("click", getChange);
depositBtn.addEventListener("click", deposit);

// 음료 장바구니에 담기
let colaObj = {};

drinkCont.forEach((item) => {
  const colaName = item.children[0].children[1].innerText;
  let selectedColaCount = document.createElement("span");

  item.addEventListener("click", () => {
    const selectedCola = document.createElement("li");
    const selectedColaImg = document.createElement("img");
    const selectedColaName = document.createElement("strong");
    if (colaObj[colaName]) {
      colaObj[colaName] += 1;
      const updatedCount = colaObj[colaName];
      selectedColaCount.innerText = updatedCount;
    } else {
      selectedColaImg.setAttribute("src", `./src/images/${colaName}.png`);
      selectedColaName.innerText = colaName;

      selectedCola.append(selectedColaImg);
      selectedCola.append(selectedColaName);
      selectedCola.append(selectedColaCount);
      selectedColaCont.append(selectedCola);
      colaObj[colaName] = 1;
      selectedColaCount.innerText = colaObj[colaName];
    }

    // 음료 구매하기
    getBtn.addEventListener("click", () => {
      let price = selectedColaCont.childElementCount * 1000;
      const totalPriceTxt = document.querySelector(".price-total");

      if (balance.innerText.slice(0, -2) < price) {
        alert("잔액이 부족합니다.");
      } else {
        // const formattedMoney = (
        //   boughtColaCont.childElementCount * 1000
        // ).toLocaleString();
        balance.innerText = boughtColaCont.childElementCount * 1000 + " 원";
        selectedCola.remove();
        boughtColaCont.append(selectedCola);
        totalPriceTxt.textContent = boughtColaCont.childElementCount * 1000;
      }
    });
  });
});
