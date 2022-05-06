const clearBtn = document.getElementById('clear-btn')
const deleteBtn = document.getElementById('delete-btn')
const calcMainText = document.getElementById('calc-main')
const calcSecondaryText = document.getElementById('calc-secondary')

let firstNum = 0
let secondNum = 0
let operator = '+'
let prevNum = true

function isOperator(char) {
    console.log(char);
    const operators = ['+ ','- ','x ','÷ ']
    console.log(operators.includes(char));
    return operators.includes(char)
}

function renderButtons() {
    // Get container that holds grid of buttons
    const buttonGridContainer = document.getElementById('button-grid-container');

    // make array of button icons in correct order
    // 7-8-9-÷-4-5-6-X-1-2-3---.-0-=-+
    const symbols = ['7','8','9','÷','4','5','6','x','1','2','3','-','.','0','=','+']

    // Generate buttons
    for(let i = 0; i < 16; i++){
        let button = document.createElement('button')
        button.classList.add('button-container')
        button.textContent = symbols[i]

        // add unique ID for each button
        button.setAttribute('id',`btn-${symbols[i]}`)

        // add event listener for each button
        button.addEventListener('click', () => {
            if(symbols[i] === '+'){
                
                // check if operate is needed - last character in secondary text
                if(isOperator( calcSecondaryText.textContent.slice(-2) )){
                    secondNum = calcMainText.textContent
                    operate(operator, firstNum, secondNum)
                    operator = '+'
                    calcSecondaryText.textContent =  calcSecondaryText.textContent.substring(0, calcSecondaryText.textContent.length-4)
                    calcSecondaryText.textContent += `${calcMainText.textContent} + `
                    firstNum = calcMainText.textContent
                    prevNum = true
                } else {
                    // operate not needed
                    firstNum = calcMainText.textContent
                    calcSecondaryText.textContent += `${firstNum} + `
                    prevNum = true
                    operator = '+'
                }
            }
            else if(symbols[i] === '-'){
                
                // check if operate is needed - last character in secondary text
                if(isOperator( calcSecondaryText.textContent.slice(-2) )){
                    secondNum = calcMainText.textContent
                    operate(operator, firstNum, secondNum)
                    operator = '-'
                    // TODO: Fix bug, substring still contains digits for large numbers
                    calcSecondaryText.textContent =  calcSecondaryText.textContent.substring(0, calcSecondaryText.textContent.length-4)
                    calcSecondaryText.textContent += `${calcMainText.textContent} - `
                    firstNum = calcMainText.textContent
                    prevNum = true
                } else {
                    // operate not needed
                    firstNum = calcMainText.textContent
                    calcSecondaryText.textContent += `${firstNum} - `
                    prevNum = true
                    operator = '-'
                }
            }
            else if(symbols[i] === 'x'){
                
                // check if operate is needed - last character in secondary text
                if(isOperator( calcSecondaryText.textContent.slice(-2) )){
                    secondNum = calcMainText.textContent
                    operate(operator, firstNum, secondNum)
                    operator = 'x'
                    calcSecondaryText.textContent =  calcSecondaryText.textContent.substring(0, calcSecondaryText.textContent.length-4)
                    calcSecondaryText.textContent += `${calcMainText.textContent} x `
                    firstNum = calcMainText.textContent
                    prevNum = true
                } else {
                    // operate not needed
                    firstNum = calcMainText.textContent
                    calcSecondaryText.textContent += `${firstNum} x `
                    prevNum = true
                    operator = 'x'
                }
            }
            else if(symbols[i] === '÷'){
                
                // check if operate is needed - last character in secondary text
                if(isOperator( calcSecondaryText.textContent.slice(-2) )){
                    secondNum = calcMainText.textContent
                    operate(operator, firstNum, secondNum)
                    operator = '÷'
                    calcSecondaryText.textContent =  calcSecondaryText.textContent.substring(0, calcSecondaryText.textContent.length-4)
                    calcSecondaryText.textContent += `${calcMainText.textContent} ÷ `
                    firstNum = calcMainText.textContent
                    prevNum = true
                } else {
                    // operate not needed
                    firstNum = calcMainText.textContent
                    calcSecondaryText.textContent += `${firstNum} ÷ `
                    prevNum = true
                    operator = '÷'
                }
            }

            else if(symbols[i] === '='){
                secondNum = calcMainText.textContent
                calcSecondaryText.textContent += `${secondNum} = `
                operate(operator, firstNum, secondNum)
            } else {
                if(prevNum) {
                    calcMainText.textContent = symbols[i] 
                    prevNum = false
                } else {
                    calcMainText.textContent += symbols[i]
                }
            }
        })

        buttonGridContainer.appendChild(button)
    }

}

function operate(oper, num1, num2) {
    console.log(`Calculation: ${num1} ${oper} ${num2}`);
    switch(oper){
        case '+':
            calcMainText.textContent = parseInt(num1)+parseInt(num2)
            break
        case '-':
            calcMainText.textContent = num1-num2
            break
        case 'x':
            calcMainText.textContent = num1*num2
            break
        case '÷':
            calcMainText.textContent = num1/num2
            break
    }
}

clearBtn.addEventListener('click', () => {
    calcMainText.textContent = '0'
    calcSecondaryText.textContent = ''
    prevNum = true
})

deleteBtn.addEventListener('click', () => {
    calcMainText.textContent = calcMainText.textContent.slice(0,-1)
})

renderButtons()