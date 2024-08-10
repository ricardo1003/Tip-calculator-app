const inputsTypeNumber = [...document.getElementsByClassName("numberInput")]
const percentageButtons = [...document.getElementsByClassName("tipPercentage")]
const customPriceInput = [...document.getElementsByClassName("customPrice")]
const resultTexts = [...document.getElementsByClassName("result")]
const resetButton = document.getElementsByClassName("resetButton")[0]

let selectedTip = -1

let tipPerPerson = 0
let totalTip = 0
function calculateTip(){
    let billCost = inputsTypeNumber[0].value
    let tipOptions = parseInt(percentageButtons[selectedTip].getElementsByTagName("p")[0].innerHTML.replace("%",""))
    let NofPeople = inputsTypeNumber[2].value
    tipPerPerson = (billCost*tipOptions/100)/NofPeople
    totalTip = ((billCost*tipOptions/100)/NofPeople)+billCost/NofPeople

    console.log(tipPerPerson + " | " + totalTip)
}
for(let i = 0; i<percentageButtons.length;i++){
    percentageButtons[i].addEventListener("change", ()=>{
        selectedTip = i
    })
}


calculateTip()