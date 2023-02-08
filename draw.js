var images = ['./images/deer.png', './images/holo.png', './images/chick.png', './images/fish.png', './images/crab.png', './images/prawn.png'];
var choices = ['Deer','Gourd','Chick','Fish','Crab','Shrimp'];
let arr = Array(6).fill(0);
let total  = 1000;
document.getElementById('total').innerHTML = 'Total: ' + String(total);
document.getElementById('start').disabled = true;
document.getElementById('again').disabled = true;



function change(index){
    let current = parseInt(document.getElementById('myRange').value);
    if (total - current >= 0){
        arr[index - 1] += current;
        var m = document.getElementById('m' + String(index));
        m.innerHTML = choices[index - 1] + ': ' + String(arr[index - 1]);
        total -= current;
    }
    else{
        alert('You cannot bet higher than your money');
    }
    document.getElementById('total').innerHTML = 'Total: ' + String(total); 
    
}

function money(arr, dice){
    let total = 0;
    let count = [];
    for (let i = 1; i < 7; i++){
        count.push(dice.filter(x => x == i).length);
    }
    for (let i = 0; i < 6; i++){
        if (count[i] == 0){
            continue;
        }
        else{
            total += (count[i] + 1)*arr[i];
        }
    }
    return total;

}


function start(){
    let dice = [];
    for (let i = 1; i < 4; i++){
        var r = document.getElementById('r' + String(i));
        let x = Math.floor(Math.random()*6); 
        r.innerHTML = '<img src=' + String(images[x]) + ' width="60px" height="80px" />';
        dice.push(x + 1);
    }
    for (var num of dice){
        document.getElementById(String(num)).style.backgroundColor = 'green';
    }
    document.getElementById('earn').innerHTML = 'You earn: ' + String(money(arr, dice));
    document.getElementById('total').innerHTML = 'Total: ' + String(total += money(arr, dice));
    document.getElementById('start').disabled = true;
    document.getElementById('again').disabled = false;
    
}

function end(){
    for (let i = 1; i < 7; i++){
        document.getElementById(String(i)).disabled = true;
    }
    document.getElementById('start').disabled = false;
    document.getElementById('end').disabled = true;
}

function again(){
    for (let i = 1; i < 7; i++){
        document.getElementById(String(i)).disabled = false;
        document.getElementById(String(i)).style.backgroundColor = 'aqua';
        var m = document.getElementById('m' + String(i));
        m.innerHTML = choices[i - 1] + ': 0';
    }
    for (let i = 1; i < 4; i++){
        var r = document.getElementById('r' + String(i));
        r.innerHTML = "";
    }
    arr = Array(6).fill(0);
    document.getElementById('earn').innerHTML = 'You earn: ...';
    document.getElementById('end').disabled = false;
    document.getElementById('again').disabled = true;
}

var slider = document.getElementById("myRange");
var output = document.getElementById("m_bet");
output.innerHTML = 'Current bet: ' + String(slider.value); 


slider.oninput = function() {
  output.innerHTML = 'Current bet: ' + String(slider.value);
}

function add_money(){
    var money = document.getElementById('add').value;
    if (money == ''){
        alert('You need to add a number');
    }
    else{
        document.getElementById('total').innerHTML = 'Total: ' + String(total += parseInt(money));
    }
}