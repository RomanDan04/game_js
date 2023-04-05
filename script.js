var time; //v-a memoriza timpul ramas
var d_timer = document.getElementById('timer'); //memorizeaza locul unde v-a fi inscris cate secunde au ramas
var message = document.getElementById("colors__message");//memorizeaza div-ul cu messaj de la inceputul jocului si butonul "Start"
var content = document.getElementById("colors__content");//memorizeaza div-ul in care vor fi adaugate culorile
var timerId;//id-ul intervalului(1 secunda) pentru timer
var c_items = document.getElementsByClassName("colors__item");//memorizeaza un vector din toate divurile ce vor afisa culori
var title = document.getElementById("header__title");//memorizeaza div-ul cu titlul de la inceputul paginii
var color = document.getElementById('header__color');//memorizeaza div-ul in care v-a fi introdusa denumirea culorii
var results = document.getElementsByClassName('results')[0];//memorizeaza div-ul care afiseaza rezultatele

var correct_col;//memorizeaza culoarea corecta
var pos_col;//memorizeaza pozitia culorii corecte

var punctaj = 0;//memorizeaza punctajul
var question_nr = 0;//memorizeaza numarul intrebarii(max 10)

function start_game(){ //functia care incepe joaca
    time = 60;//setam 60 de secunde pentru a finisa joaca
    punctaj = 0;//nulificam punctajul
    question_nr = 0;//nulificam numarul de intrebari

    timerId = setInterval(() => { //adaugam un interval de timp si codul care se v-a realiza
        time -= 1;//scadem 1 secunda
        if(time>=10){//daca a ramas mai mult de 10 secunde
            d_timer.innerText = '00:'+time;//afisam rezultatul in format 00:ab
            d_timer.style.color = '#2d8e99';//coloram textul in "standart"
        }else{
            d_timer.innerText = '00:0'+time;//afisam rezultatul in format 00:0a
            d_timer.style.color = 'red';//coloram textul in ros
        }
        if(!time){//daca timpul s-a terminat =>
            clearTimeout(timerId);//oprim intervalul
            show_results();//afisam rezultatele
        }
    }, 1000);

    message.classList.add("colors__hide");//ascundem mesajul de la inceputul jocului
    content.classList.remove("colors__hide");//afisam blocurile cu culori

    get_colors();//primim culorile in mod aleatoriu

    if(results.style.display == 'flex')//daca resultatele sunt afisate =>
        results.style.display = 'none';//ascundem rezultatele
}

function stop_game(){ //functia opreste joaca si restabileste elementele la valorile initiale
    d_timer.innerText = '01:00';//resetam timer-ul
    message.classList.remove("colors__hide");//afisam inapoi blocul cu mesajul de inceput al jocului
    content.classList.add("colors__hide");//asculdem blocurile cu culori
    d_timer.style.color = '#2d8e99';//resetam culoarea timerului
    title.innerHTML = 'Guessing color game';//schimbam titlul
    color.innerHTML = 'Guest 10 colors and win!';//schimbam titlul
    clearTimeout(timerId);//oprim timer-ul
}

function get_colors(){//functia returneaza culori aleatorii
    pos_col = Math.floor(Math.random()*6);//pozitia culorii care v-a trebui ghicita
    for(var i=0;i<c_items.length;i++){//parcurgem fiecare bloc de culoare in parte
        var r = Math.random()*256|0;//primim aleatoriu r
        var g = Math.random()*256|0;//primim aleatoriu g
        var b = Math.random()*256|0;//primim aleatoriu b
        c_items[i].style.backgroundColor = 'rgb('+r+', '+g+', '+b+')';//modificam culoarea de fundal al blocului
        if(pos_col == i){//daca pozitia este egala cu pozitia culorii care v-a trebui fi ghicita
            correct_col = 'rgb('+r+', '+g+', '+b+')';//memorizam culoarea corecta
        }
    }
    
    title.innerHTML = 'Select the color:';//modificam titlul
    color.innerHTML = correct_col;//inseram culoarea de ghicit
}

function check_col(ell){//functia verifica daca blocul pe care s-a dat clic este rs corect
    var showIcon = '';//variabila salveaza iconita
    question_nr ++;//incrementam numarul intrebarii
    if(ell.style.backgroundColor == correct_col){//daca culoarea de fundal este corecta
        punctaj += 1;//incrementam punctajul
        showIcon = ell.getElementsByClassName('color__true');//returnam iconita de adevar
    }else{ //daca utilizatorul nu a ghicit culoarea =>
        showIcon = ell.getElementsByClassName('color__false');//returnam iconita de fals
    }
    showIcon[0].className += ' col_show';//afisam iconita returnata
    setTimeout(() => { //adaugam o stopare a programului ca sa nu dispara iconita deodata
        showIcon[0].classList.remove("col_show");//ascundem inapoi iconita
        get_colors();//afisam alte culori
    }, 500);
    if(question_nr == 10){//daca au fost 10 incercari
        show_results();//afisam rezultatele
    }
}

function show_results(){//functia afiseaza rezultatele
    stop_game();//opreste timerul
    results.style.display = 'flex';//afiseaza blocul cu rezultate
    results.getElementsByTagName('span')[0].innerHTML = punctaj;//inlocuieste punctajul
}