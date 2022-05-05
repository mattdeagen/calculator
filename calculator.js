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

        buttonGridContainer.appendChild(button)
    }

}

renderButtons()