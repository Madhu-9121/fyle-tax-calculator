document.addEventListener('DOMContentLoaded', function() {
    // Function to handle tooltip display
    function handleTooltip(questionMark, tooltipText) {
        const tooltip = document.getElementById('tooltip');
        questionMark.addEventListener('mouseenter', function() {
            const rect = questionMark.getBoundingClientRect();
            tooltip.textContent = tooltipText;
            tooltip.style.display = 'block';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        });

        questionMark.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    }

    // Selecting and handling tooltip for each question mark
    const questionMarks = document.querySelectorAll('.question-mark');
    const tooltipTexts = [
        "Gross annual income is your total salary in a year before any deductions.",
        "Extra Income is the money earned beyond your regular salary or primary source of income.",
        "Age Group refers to the category of age (e.g., < 40, >= 40 & < 60, >= 60) for tax calculation purposes.",
        "Total Applicable Deductions refer to the sum of all deductions applicable to your income for tax calculation purposes."
    ];

    questionMarks.forEach((questionMark, index) => {
        handleTooltip(questionMark, tooltipTexts[index]);
    });

    // Handling tooltip for error icons
    const errorIconGI = document.getElementById('errorIconGI');
    handleTooltip(errorIconGI, "Please enter numbers only");

    const errorIconEI = document.getElementById('errorIconEI');
    handleTooltip(errorIconEI, "Please enter numbers only");

    const errorIconDeductions = document.getElementById('errorIconDeductions');
    handleTooltip(errorIconDeductions, "Please enter numbers only");

    //toggle error icon based on input validity
    function toggleErrorIcon(inputField, errorIcon) {
        if (inputField.value.trim() === "") {
            errorIcon.style.display = 'inline';
            return false; // false if input is invalid
        } else {
            errorIcon.style.display = 'none';
            return true; // true if input is valid
        }
    }

    function validateInputs() {
        const grossIncomeInput = document.getElementById('grossIncome');
        const extraIncomeInput = document.getElementById('extraIncome');
        const ageGroupInput = document.getElementById('ageGroup');
        const deductionsInput = document.getElementById('deductions');

        // Check validity of all input fields
        const isValidGrossIncome = toggleErrorIcon(grossIncomeInput, errorIconGI);
        const isValidExtraIncome = toggleErrorIcon(extraIncomeInput, errorIconEI);
        const isValidAgeGroup = toggleErrorIcon(ageGroupInput, errorIconAge);
        const isValidDeductions = toggleErrorIcon(deductionsInput, errorIconDeductions);

        // Check if any field is empty
        if (!isValidGrossIncome || !isValidExtraIncome || !isValidAgeGroup || !isValidDeductions) {
            const tooltip = document.getElementById('tooltip');
            tooltip.textContent = "Input field is mandatory";
            tooltip.style.display = 'block';
            return false; // Return false if any field is empty
        }

        return true; // Return true if all fields are filled
    }

    // Event listener for submit button click
    const calculateBtn = document.getElementById('calculateBtn');
    function taxcalc(grossIncomeInput, extraIncomeInput, ageGroupInput, deductionsInput) {
        // input values to numbers
        const grossIncome = parseFloat(grossIncomeInput);
        const extraIncome = parseFloat(extraIncomeInput);
        const deductions = parseFloat(deductionsInput);
        
       
        const totalIncome = grossIncome + extraIncome - deductions;
        if (totalIncome <= 8) {
            // No tax
            return 0;
        } else {
            let taxRate = 0;
            switch (ageGroupInput) {
                case '<40':
                    taxRate = 0.3;
                    break;
                case '>=40&<60':
                    taxRate = 0.4;
                    break;
                case '>=60':
                    taxRate = 0.1;
                    break;
                default:
                    return -1; // Return -1 to indicate error
            }
    
            // taxable income (amount over 8 Lakhs)
            const taxableIncome = totalIncome - 800000;
    
            // Calculate tax amount
            const tax = taxRate * taxableIncome;
    
            return totalIncome-tax;
        }
    }
    calculateBtn.addEventListener('click', function() {
        // Validate all input fields
        const isValid = validateInputs();

        // If all inputs are valid, proceed with calculation
        if (isValid) {
            // calculation
            const grossIncomeInput = document.getElementById('grossIncome').value;
            const extraIncomeInput = document.getElementById('extraIncome').value;
            const ageGroupInput = document.getElementById('ageGroup').value;
            const deductionsInput = document.getElementById('deductions').value;
            // console.log(grossIncomeInput,extraIncomeInput,ageGroupInput,deductionsInput)
            const tax = taxcalc(grossIncomeInput,extraIncomeInput,ageGroupInput,deductionsInput)
            console.log(tax)
            // add the tax to display
            const resultModal = document.getElementById('resultModal');
            const resultTax = resultModal.querySelector('.resultoftax');
            resultTax.textContent = tax.toFixed(2)
            resultModal.style.display = "block";
        }
    });

});
// close model
const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', function() {
    const resultModal = document.getElementById('resultModal');
    resultModal.style.display = "none";
});



// showing error icon
document.addEventListener('DOMContentLoaded', function() {
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    
    const errorIconGI = document.getElementById('errorIconGI');
    const errorIconEI = document.getElementById('errorIconEI');
    const errorIconDeductions = document.getElementById('errorIconDeductions');

    // Function to show or hide error icon based on input validity
    function toggleErrorIcon(inputField, errorIcon) {
        if (isNaN(inputField.value)) {
            errorIcon.style.display = 'inline';
        } else {
            errorIcon.style.display = 'none';
        }
    }

    // Check for errors initially when the page loads
    toggleErrorIcon(grossIncomeInput, errorIconGI);
    toggleErrorIcon(extraIncomeInput, errorIconEI);
    toggleErrorIcon(deductionsInput, errorIconDeductions);

    // Event listeners for input events on the input fields
    grossIncomeInput.addEventListener('input', function() {
        toggleErrorIcon(grossIncomeInput, errorIconGI);
    });

    extraIncomeInput.addEventListener('input', function() {
        toggleErrorIcon(extraIncomeInput, errorIconEI);
    });

    deductionsInput.addEventListener('input', function() {
        toggleErrorIcon(deductionsInput, errorIconDeductions);
    });
});


