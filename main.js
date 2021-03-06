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
  if (window.confirm("거스름돈을 반환하시겠습니까?")) {
    myMoney.textContent =
      parseInt(balance.innerText) + parseInt(myMoney.innerText) + " 원";

    balance.textContent = "0 원";
  }
}

// 입금하기
function deposit() {
  if (depositInput.value) {
    balance.textContent =
      parseInt(balance.innerText) + parseInt(depositInput.value) + " 원";

    depositInput.value = "";
  } else {
    alert("입금하실 금액을 입력해 주세요.");
  }
}

returnBtn.addEventListener("click", getChange);
depositBtn.addEventListener("click", deposit);

// 음료 장바구니에 담기
let colaObj = {};
let itemCount = 0;

drinkCont.forEach((item) => {
  const colaName = item.children[0].children[1].innerText;
  let selectedColaCount = document.createElement("span");

  item.addEventListener("click", () => {
    itemCount++;
    const selectedCola = document.createElement("li");
    const selectedColaImg = document.createElement("img");
    const selectedColaName = document.createElement("strong");
    // 이미 장바구니에 담겨있는 경우
    if (colaObj[colaName]) {
      colaObj[colaName] += 1;
      const updatedCount = colaObj[colaName];
      selectedColaCount.innerText = updatedCount;
      // 장바구니에 아이템을 처음 담는 경우
    } else {
      selectedColaImg.setAttribute("src", `./src/images/${colaName}.png`);
      selectedColaName.innerText = colaName;

      selectedCola.append(selectedColaImg);
      selectedCola.append(selectedColaName);
      selectedCola.append(selectedColaCount);
      selectedColaCont.append(selectedCola);
      selectedColaImg.classList.add("selected");
      selectedColaName.classList.add("selected");
      selectedColaCount.classList.add("selected");
      selectedCola.classList.add("selected");
      selectedCola.classList.add(`${colaName}`);
      for (let i = 0; i < selectedCola.children.length; i++) {
        selectedCola.children[i].classList.add(`${colaName}`);
      }
      selectedCola.style.cursor = "pointer";
      colaObj[colaName] = 1;

      selectedColaCount.innerText = colaObj[colaName];
    }
  });
});

// 장바구니 아이템 클릭시 수량 감소
selectedColaCont.addEventListener("click", (e) => {
  if (e.target.classList.contains("selected")) {
    const selectedCola = e.target.classList[1];
    colaObj[selectedCola] -= 1;
    selectedColaCont.children[0].children[2].innerText -= 1;
    itemCount -= 1;
    if (colaObj[selectedCola] === 0) {
      selectedColaCont.children[0].remove();
    }
  }
});

// 음료 구매하기
getBtn.addEventListener("click", () => {
  let price = itemCount * 1000;
  const totalPriceTxt = document.querySelector(".price-total");

  // 잔액이 부족해 구매에 실패한 경우
  if (balance.innerText.slice(0, -2) < price) {
    console.log(balance.innerText.slice(0, -2));
    console.log(price);
    alert("잔액이 부족합니다.");
    // 성공적으로 구매한 경우
  } else {
    if (window.confirm("음료를 구매하시겠습니까?")) {
      balance.innerText =
        parseInt(balance.innerText) - itemCount * 1000 + " 원";

      boughtColaCont.innerHTML += selectedColaCont.innerHTML;
      totalPriceTxt.textContent = +totalPriceTxt.textContent + itemCount * 1000;
      itemCount = 0;
      selectedColaCont.innerHTML = "";
      colaObj = {};
    }
  }
});
