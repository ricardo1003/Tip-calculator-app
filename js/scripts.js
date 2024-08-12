const fieldElements = [...document.getElementsByClassName("field")]
const inputsTypeNumber = [...document.getElementsByClassName("numberInput")]
const percentageButtons = [...document.getElementsByClassName("tipPercentage")]
const customInputContainer = document.getElementById("customContainer")
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
        inputsTypeNumber[i].value = Math.abs(inputsTypeNumber[i].value)
        if(inputsTypeNumber[i].value == "0"){
            fieldElements[i].classList.add("failed")
            checked[i] = false
        }else{
            checked[i] = true
            fieldElements[i].classList.remove("failed")
            if(checked.indexOf(false) === -1){
                calculateTip()
            }
        }
    })
    inputsTypeNumber[i].addEventListener("focus",()=>{
        fieldElements[i].classList.add("focused")
    })
    inputsTypeNumber[i].addEventListener("blur",()=>{
        fieldElements[i].classList.remove("focused")
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
    customPriceInput.value = Math.abs(customPriceInput.value)
    if(customPriceInput.value != 0){
        customInputContainer.classList.remove("failed")
        if(selectedTip != 5 && selectedTip >= 0){
            percentageButtons[selectedTip].getElementsByTagName("input")[0].checked = false
        }
        checked[2] = true
        selectedTip = 5
        if(checked.indexOf(false) === -1){
            calculateTip()
        }
    }else{
        customInputContainer.classList.add("failed")
    }
})
customPriceInput.addEventListener("focus",()=>{
    customPriceInput.classList.add("focused")
})
customPriceInput.addEventListener("blur",()=>{
    customPriceInput.classList.remove("focused")
})


resetButton.addEventListener("click",()=>{
    checked = new Array(3).fill(false)
    customPriceInput.value = ""
    inputsTypeNumber.forEach(input =>{
        input.value = ""
    })
    percentageButtons.forEach(button =>{
        button.getElementsByTagName("input")[0].checked = false
    })
    selectedTip = -1
})