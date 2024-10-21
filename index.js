function goToFormPage(page) {
    window.location.href = page;
}

var mats = ['a', 'a', 'a', 'a', 'a'];
var cleans = [false, false, false, false, false];
var wraps = [false, false, false, false, false];
var weights = [0,0,0,0,0];
function goToCalPage(){
    for(let i = 1; i <= index; i++) {
        const material = document.getElementById('materialSelect'+i).value;
        const isClean = document.getElementById('clean'+i).checked;
        const isWrapped = document.getElementById('wrap'+i).checked;
        const weight = document.getElementById('pounds'+i).value;
        
        mats[i-1] = material;
        cleans[i-1] = isClean;
        wraps[i-1] = isWrapped;
        weights[i-1] = weight;
    }

    goToFormPage('calculator.html');
}

var index = 1;
const max = 5;
function addItem(button){

    index++;

        // Get the container where we will add the new form
        const formContainer = document.getElementById('Information');
                
        // Create a new div element to hold the new form section
        const newSection = document.createElement('div');
        newSection.classList.add('recycling-section');  // Add a class for styling purposes

        // Define the HTML content to add
        newSection.innerHTML = `
            <table>
                <tr>
                    <th>
                        <select name="Next" id="materialSelect${index}"> 
                            <option value="Plastic{">Plastic</option>
                            <option value="Cardboard">Cardboard</option>
                            <option value="Paper">Paper</option>
                            <option value="Cans">Cans</option>
                            <option value="Glass">Glass</option>
                        </select>
                    </th>
                </tr>
                <form>                
                    <tr>
                        <td>
                            <input type="checkbox" id="clean${index}" name="Clean?" value="cleaned">
                            <label for="clean${index}"> Clean and uncontaminated </label><br>
                        </td>
                        <td>
                            <input type="checkbox" id="wrap${index}" name="Wrap?" value="no wrapper">
                            <label for="wrap${index}"> Clear of wrappers/stickers </label><br>
                        </td>
                        <td>
                            <input type="text" id="pounds${index}" name="Weight" value="ilbs">
                            <label for="pounds${index}"> Weight? (Ilbs.) </label><br>
                        </td>
                    </tr>
                </form>
            </table>
            
        `;

        formContainer.appendChild(newSection);
        if(index == max){
        // Append the new section to the form container

        const contentToDelete = button;
            
            // Remove that block from the DOM
            contentToDelete.remove();

        }
}

var itemPrices = [-1, -1, -1, -1, -1];
function calculatecalculate(){
    for(let i = 1; i <= index; i++) {
        const material = mats[i-1];
        const isClean = cleans[i-1]
        const isWrapped = wraps[i-1];
        const weight = weights[i-1];
        
        // Get the container where we will add the new form
        const formContainer = document.getElementById('money');
                
        // Create a new div element to hold the new form section
        const newSection = document.createElement('div');
        newSection.classList.add('recycling-section');  // Add a class for styling purposes

        // Define the HTML content to add
        newSection.innerHTML = `
            <p><strong>Material:</strong> ${material}</p>
            <p><strong>Clean:</strong> ${isClean ? 'Yes' : 'No'}</p>
            <p><strong>Wrapped:</strong> ${isWrapped ?  'Yes' : 'No'}</p>
            <p><strong>Weight:</strong> ${weight} lbs</p>
        `;

        formContainer.appendChild(newSection);
    }
}

function resetValues(){
    index = 1;
    itemPrices = [-1, -1, -1, -1, -1];
}