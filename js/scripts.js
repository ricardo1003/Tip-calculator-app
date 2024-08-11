const inputsTypeNumber = [...document.getElementsByClassName("numberInput")]
const percentageButtons = [...document.getElementsByClassName("tipPercentage")]
const customPriceInput = document.getElementById("customPrice")
const resultTexts = [...document.getElementsByClassName("result")]
const resetButton = document.getElementsByClassName("resetButton")[0]

let selectedTip = -1

function calculateTip(){
    let billCost = inputsTypeNumber[0].value
    let tipOptions = 0
    if(selectedTip < 5){
        tipOptions = parseInt(percentageButtons[selectedTip].getElementsByTagName("p")[0].innerHTML.replace("%",""))
    }else{
        tipOptions = parseFloat(customPriceInput.value)
    }
    let NofPeople = inputsTypeNumber[1].value
    let results = new Array(2).fill(0)

    results[0] = (billCost*tipOptions/100)/NofPeople
    results[1] = ((billCost*tipOptions/100)/NofPeople)+billCost/NofPeople

    for(let i = 0; i<resultTexts.length;i++){
        resultTexts[i].innerHTML = "$" + (results[i]).toFixed(2)
    }
}

let checked = new Array(3).fill(false)

for(let i = 0; i<inputsTypeNumber.length;i++){
    inputsTypeNumber[i].addEventListener("input", ()=>{
        checked[i] = true
        if(checked.indexOf(false) === -1){
            calculateTip()
        }
    })
}
for(let i = 0; i<percentageButtons.length;i++){
    percentageButtons[i].addEventListener("change", ()=>{
        selectedTip = i
        checked[2] = true
        if(checked.indexOf(false) === -1){
            calculateTip()
        }
    })
}
customPriceInput.addEventListener("input",()=>{
    if(customPriceInput.value != 0){
        if(selectedTip < 5){
            percentageButtons[selectedTip].getElementsByTagName("input")[0].checked = false
        }
        checked[2] = true
        selectedTip = 5
        calculateTip()
    }
})