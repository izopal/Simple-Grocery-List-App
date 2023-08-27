const input = document.querySelector('.container .box form input');
const button = document.querySelector('.container .box form button');
const list = document.querySelector('.container ol');
 
button.addEventListener('click', ()=> {
    createList();
    input.value = "";
})

//============= Функція для створення списку завдань ========================>
function createList(){
    const inputValue = input.value.trim() // Видаляємо пробіли з початку і кінця
    
    // Створюємо перевірку на ввдення пустого рядка
    if(inputValue !== ''){
        // Змінюємо стиль для .container ol, встановлюючи display на "flex"
        list.style.display = "flex";

        // Створюємо елемент <li> 
        const li = document.createElement('li');
        // Додаємо <li> до <ol>
        list.appendChild(li);

        // Створюємо елемент <p> і вказуємо його атрибути
        const p = document.createElement('p');
        p.innerText = inputValue;
        // Додаємо <p> до <ol>
        li.appendChild(p);
       
        getCloseSVG(li);
        getDone(p, li);
    }
}

//============= Функція керування подією виконано "Done" ========================>
function getDone(p, li){
    let isFirstClick = true // додаємо атрибут на перевірки чи вкл./викл. функція 
    p.onclick = () =>{
        if(isFirstClick) {
            p.classList.toggle('active'); // Додає або видаляє клас 'active' дя зміни стилю тексту

            getDoneSVG(li); // Додаємо  клас <svg>

            // Запускаємо умову закриття завдання
            const close = li.querySelector('.ionicon-Close');
            close.addEventListener('click', () => {
                if(!isFirstClick){
                    list.removeChild(li);
                    updateList();
                } 
            });
            
            isFirstClick = false; // Змінюємо значення маркеру, щоб функція більше не спрацьовувала
        } 
    };
}


//========== Функція для перевірки, чи присутні елементи li у списку ol, якщо відсутні змінюємо стиль на display: none==================>
function updateList() {
    const liElements = list.querySelectorAll('li');
    if (liElements.length > 0) {
        list.style.display = "flex";
    } else {
        list.style.display = "none";
    }
}

//============= Функція для ствоерння і встановлення атрибутів елемента <svg done> ========================>
function getDoneSVG(li){
    const svg = 'http://www.w3.org/2000/svg'
    // Створюємо елемент <svg> і вказуємо йому атрибути 
    const svgDone = document.createElementNS(svg, 'svg');
          svgDone.classList.add('ionicon-Done');
          svgDone.setAttribute('viewBox', '0 0 512 512');
    // Додаємо <svg> до <li>
    li.appendChild(svgDone);

    // Створюємо елемент <path> для SVG і вказуємо йому атрибути
    const pathDone = document.createElementNS(svg, 'path');
          pathDone.setAttribute('d', 'M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284');
    // Доддаємо <path> до <svg>
    svgDone.appendChild(pathDone);
}


//============= Функція для ствоерння і встановлення атрибутів елемента <svg close> ========================>
function getCloseSVG(li){
    const svg = 'http://www.w3.org/2000/svg'
    // Створюємо елемент <svg> і вказуємо йому атрибути
    const svgClose = document.createElementNS(svg, 'svg');
          svgClose.classList.add('ionicon-Close');
          svgClose.setAttribute('viewBox', '0 0 512 512');
    // Додаємо <svg> до <li>
    li.appendChild(svgClose);
    
    // Створюємо елемент <path> для SVG і вказуємо йому атрибути
    const pathClose = document.createElementNS(svg, 'path');
          pathClose.setAttribute('d', 'M368 368L144 144M368 144L144 368');
    // Доддаємо <path> до <svg>
    svgClose.appendChild(pathClose);
}

