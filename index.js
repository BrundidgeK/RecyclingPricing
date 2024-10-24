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

    locate(document.getElementById('location').value);
    calculatecalculate();

    //goToFormPage('calculator.html');
}

var index = 1;
const max = 5;
function addItem(button){

    index++;

        // Get the container where we will add the new form
        const formContainer = document.getElementById('form');
                
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
                            <input type="text" id="pounds${index}" name="Weight" value="10">
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

//Plastic, cardboard, glass, can, paper
var itemPrices = [1.28, 0.045, 0.1, 0.35, 0.013];
//Clean, wrapper 
var deduct = [.5, .25];
function calculatecalculate(){
    var totalMoney = 0;
    // Get the container where we will add the new form
    const formContainer = document.getElementById('money');
    var newMoney;

    for(let i = 1; i <= index; i++) {
        const material = mats[i-1];
        const isClean = cleans[i-1]
        const isWrapped = wraps[i-1];
        const weight = weights[i-1];
        let moneyGain = 0;

        if(isClean || isWrapped){
            moneyGain = calc(material, weight) * (isClean ? 1 : 1-cleanDeduct) * (isWrapped ? 1 : 1-wrapDeduct);
            moneyGain = Math.ceil(moneyGain * 100)/100;
            totalMoney += moneyGain;
        }

        var message = `<p><strong> ${weight} pounds of ${material} is ${moneyGain}` +
         (isClean ? '' : '(priced lower due to contamination)') +
          (isWrapped ? '' : '(priced lower due to wrapping/stickers)') + '</strong></p>';
        

        newMoney+=message;
    }

    // Define the HTML content to add
    newMoney += `
        <p><strong> Total: ${totalMoney}</strong></p>
    `;

    formContainer.innerHTML=(newMoney);
}

function resetValues(){
    index = 1;
    itemPrices = [-1, -1, -1, -1, -1];
}

var prices = []
function calc(data, weight){
    var index = 0;
    switch(data){
        case "Cardboard":
            index = 3;
            break;
        case "Plastic":
            index=0;
            break;
        case "Glass":
            index=1;
            break;
        case "Can":
            index=2;
            break;
        case "Paper":
            index=4;
            break;
        default:
            index=-1;
            break;
    }
    if (index == -1){
        return 0;
    }

    console.log(data);
    console.log(weight);
    console.log(prices);
    console.log(prices[index]);
    
    total = prices[index] * weight;
    
    return total;
}


const locPrices = [
    [1.24, .12, .4, .042, .011],
    [1.15, .09, .38, .045, .013],
    [1.34, .08, .43, .043, .012],
    [1.28, .1, .4, .045, .012],
    [1.27, .1, .41, .046, .013]
    ];
const wrapDeduct = .25;
const cleanDeduct = .85;

function locate(str){
    var index = 3;

    switch (str){
        case "northeast":
            index = 0;
            break;
        case "southeast":
            index = 1;
            break;
        case "midwest":
            index = 2;
            break;
        case "west": 
            index = 3;
            break;
        case "southwest":
            index = 4;
            break;
    }
    
    prices = locPrices[index];
}

function addChart(a, src){// Create a new <a> element
    const newLink = document.createElement('a');
    newLink.href = a;
    newLink.target = "_blank";  // Open the link in a new tab

    // Create a new <img> element
    const newImg = document.createElement('img');
    newImg.src = src;

    // Append the image to the link
    newLink.appendChild(newImg);
            
}
