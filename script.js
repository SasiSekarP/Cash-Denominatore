'use strict';

// variable area

var MoneyArr = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

var resultArr = [];

// element area
let btnEl = document.getElementById('btn');

let BillAmountEl = document.getElementById('BillAmount');

let AmountPaidEl = document.getElementById('AmountPaid');

let InputOneErrorMessageEl = document.getElementById('InputOneErrorMessage');

let InputTwoErrorMessageEl = document.getElementById('InputTwoErrorMessage');

let PayMoreEl = document.getElementById('PayMore');

let resultEl = document.getElementById('result');

let formControleEl = document.getElementById('formControle');

let BalanceMessageEl = document.getElementById('BalanceMessage');

// Funcation area

function error(a) {
    a.style.display = 'block';
}

function success(a) {
    a.style.display = 'none';
}

function classReplace(idName, fromValue, toValue) {
    document.getElementById(idName).classList.replace(fromValue, toValue);
}

// Event area

btnEl.addEventListener('click', (e) => {
    e.preventDefault();
    let BillAmountValue = Number(BillAmountEl.value);
    let AmountPaidValue = Number(AmountPaidEl.value);

    if (BillAmountValue === 0 && AmountPaidValue === 0) {
        error(InputOneErrorMessageEl);
        error(InputTwoErrorMessageEl);
    } else if (BillAmountValue === 0 && AmountPaidValue != 0) {
        error(InputOneErrorMessageEl);
        success(InputTwoErrorMessageEl);
    } else if (BillAmountValue != 0  && AmountPaidValue === 0) {
        error(InputTwoErrorMessageEl);
        success(InputOneErrorMessageEl);
    } else {
        success(InputOneErrorMessageEl);
        success(InputTwoErrorMessageEl);

        if (BillAmountValue > AmountPaidValue) {
            error(PayMoreEl);
        } else {
            success(PayMoreEl);

            let balence = AmountPaidValue - BillAmountValue;

            classReplace('resultContainer', 'none', 'block');
            classReplace('InputOne' ,'InputOne', 'none');
            classReplace('InputTwo', 'InputTwo', 'none');
            classReplace('InputThree', 'InputThree', 'none');
            
            if (balence === 0) {
                let newLine = document.createElement('li');
                resultEl.appendChild(newLine);
                newLine.innerHTML = `<p class="box">No need to pay</p>`
            } else {
                
                BalanceMessageEl.textContent = `Balance Amount is ₹ ${balence}`;

                for (let i = 0; i < MoneyArr.length; i++){
                    if (balence < MoneyArr[i]) {
                        resultArr.push(0)
                    } else {
                        let part = Math.floor(balence / MoneyArr[i]);
                        resultArr.push(part);
                        balence = balence % MoneyArr[i];
                    }
                }
                
                for (let i = 0; i < resultArr.length; i++){
                    if (resultArr[i] != 0) {
                    let newLine = document.createElement('li');
                    resultEl.appendChild(newLine);
                    newLine.innerHTML = `<p class="box">₹ ${MoneyArr[i]}</p><p class="box">${resultArr[i]}</p>`
                    }
                }
            }
        }

    }
})