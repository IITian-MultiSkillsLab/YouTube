//first we have to generate random sentences

const quoteApi = "https://api.quotable.io/random?minLength=100&maxLength=200";
/*you can set maximum and minimum number of characters you want*/
const quoteSection = document.getElementById("quote")
const userInput = document.getElementById("quote-input")

let quote = "";
let time=0;
let timer="";
let mistakes=0;

//function to display random quote
async function fetchNewQuote(){
    const response = await fetch(quoteApi);
    //storing response
    let data = await response.json();

    quote = data.content;

    //make an array of each character of quote
    let arr = quote.split("").map((value)=>{
        return "<span class='quote-chars'>"+value+"</span>";
    });

    //join array now
    quoteSection.innerHTML = arr.join("");
}

//logic for comparing input with given quote
userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll(".quote-chars");
    //creating array from recieved span tags
    quoteChars = Array.from(quoteChars);

    //array from user input characters
    let userInputChars = userInput.value.split("");

    //comparing each character
    quoteChars.forEach((char, index)=>{
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
        //if user hasn't typed anything
        else if(userInputChars[index] == null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            } else{
                char.classList.remove("failure");
            }
        }
        else {
            //check if user entered wrong characters
            if(!char.classList.contains("failure")){
                mistakes++;
                char.classList.add("failure");
                
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        let check = quoteChars.every((element)=>{
            return element.classList.contains("success");
        })
        //to check that every characters entered are correct

        if(check){
            displayResult();
        }


    })
});

//start test when user enter the first character
userInput.addEventListener("keypress", ()=>{
    if(time ==0){
        startTest();
    }
})

//updating time on screen
function updateTimer(){
    time++;
    let stime = Math.floor(time/100);
    let mstime = time %100;
    document.getElementById("time-sec").innerText = stime;
    document.getElementById("time-msec").innerText = mstime;
}

//setting timer
const timeIncrease = ()=>{
    time = 0;
    timer = setInterval(updateTimer, 10);
    //time will be set after 10 milli seconds
}

const displayResult = ()=>{
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    userInput.disabled = true;
    //user can't enter anything after test is completed
    let timeTaken = 0;
    timeTaken = (time/100)/60; //converting time in minutes
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + 'wpm';
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100)+'%';

}

//start test
const startTest = () => {
    mistakes = 0;
    timer = '';
    timeIncrease();
}
window.onload = () => {
    userInput.value = "";
    fetchNewQuote();
}