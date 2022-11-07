// operators
const operators = ['+', '-', 'x', '%'];


/**
 * Add a charapter to the calculation_string
 * 
 * @param {*} el the button istance
 */
function addValue(el) {
    var calculation_string = document.getElementById("text-calculation").innerText;
    let last_char = calculation_string[calculation_string.length-1]; 

    // case: the character is an operator
    if (operators.includes(el.innerText)) {
        // check: operator is not inserted as first character 
        // check: operator is not inserted after an operator
        if (calculation_string != '0' && !operators.includes(last_char)) {
            calculation_string += el.innerText;
        }
    }
    // case: the character is a number
    else {
        // case: is the first number inserted
        if (calculation_string == '0')  {
            calculation_string = el.innerText;
        }
        else {
            calculation_string += el.innerText;
        }
    }
    // update the calculation_string
    document.getElementById("text-calculation").innerHTML = calculation_string;
}


/**
 * Reset the calculation string to '0'
 */
function cleanCalculationString() {
    document.getElementById("text-calculation").innerHTML = '0';
}


/**
 * Remove the last character from calculation_string
 */
function removeLastChar() {
    var calculation_string = document.getElementById("text-calculation").innerText;
    // check: no character inserted
    if (calculation_string == '0') {}
    // check: only one caracther inserted
    else if (calculation_string.length == 1) {
        document.getElementById("text-calculation").innerHTML = '0';
    }
    else {
        calculation_string = calculation_string.slice(0, -1);
        // update calculation_string
        document.getElementById("text-calculation").innerHTML = calculation_string;
    }
}


/**
 * Perform the calculations
 */
function calculateOperation() {
    let calculation_string = document.getElementById('text-calculation').innerText;
    let last_char = calculation_string[calculation_string.length-1]; 
    
    // check: the last char of the calculatin_string is not an operator 
    if (!operators.includes(last_char)) {
        // 1. MAPPING 
        // All the characters of the string are mapped 
        // to differentiate operators and numbers
        var values_maps_array = [];
        for(let char in calculation_string) {
            var index = operators.indexOf(calculation_string[char]);
            var value = calculation_string[char];
            values_maps_array.push([value, index])
        }
    
        // 2. GROUPING
        // group the numbers
        let support_string = '';
        let grouped_values_array = [];
        for (el in values_maps_array) {
            // case1: the char is a number
            if (values_maps_array[el][1] == -1) {
                support_string += values_maps_array[el][0];
            }
            // case2: the char is an operator
            else {
                grouped_values_array.push(support_string);
                grouped_values_array.push(values_maps_array[el][0]);
                support_string = '';
            }
        }
        // add last value grouped 
        grouped_values_array.push(support_string);
    
    
        // 3. PERFORM CALCULATION
        let value1;
        let value2;
        let result;
        let op_index;
        // moltiplications and divisions
        while (grouped_values_array.includes('x') || grouped_values_array.includes('%')) {
            if (grouped_values_array.includes('x')) {
                op_index = grouped_values_array.indexOf('x');
                value1 = parseFloat(grouped_values_array[op_index - 1]);
                value2 = parseFloat(grouped_values_array[op_index + 1]);
                result = value1 * value2;
            }
            else {
                op_index = grouped_values_array.indexOf('%');
                value1 = parseFloat(grouped_values_array[op_index - 1]);
                value2 = parseFloat(grouped_values_array[op_index + 1]);
                // check: division by 0 not allowed
                if (value2 !== 0) {
                    result = value1 / value2;
                }
                else { 
                    alert('la divisione per 0 non è permessa')
                    cleanCalculationString();
                    break;
                }
            }
            // replace operator with operation result
            grouped_values_array[op_index] =  String(result);
            // remove the prevous and the folling numbers
            grouped_values_array.splice(op_index - 1, 1);
            grouped_values_array.splice(op_index, 1);
        } 

    
        //sums and subtraptions
        while (grouped_values_array.includes('+') || grouped_values_array.includes('-')) {
            if (grouped_values_array.includes('+')) {
                op_index = grouped_values_array.indexOf('+');
                value1 = parseFloat(grouped_values_array[op_index - 1]);
                value2 = parseFloat(grouped_values_array[op_index + 1]);
                result = value1 + value2;
            }
            else {
                op_index = grouped_values_array.indexOf('-');
                value1 = parseFloat(grouped_values_array[op_index - 1]);
                value2 = parseFloat(grouped_values_array[op_index + 1]);
                result = value1 - value2;
            }
            // replace operator with operation result
            grouped_values_array[op_index] =  String(result);
            // remove the prevous and the folling numbers
            grouped_values_array.splice(op_index - 1, 1);
            grouped_values_array.splice(op_index, 1);
            console.log(grouped_values_array);
        }
        
        // update calculation string
        document.getElementById('text-calculation').innerHTML = grouped_values_array[0];
    }
    else {
        alert('un opertore non può essere inserito come ultimo carattere!')
    }
}



