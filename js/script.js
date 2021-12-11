let messsage = document.querySelector('.header__input'),
    btnAdd = document.querySelector('.icon__plus'),
    todo = document.querySelector('.todo-list');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    disiplayTodoList();
}

messsage.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        let newTodo = {
            todo: messsage.value,
            checked: false,
        }
        todoList.push(newTodo);
        disiplayTodoList();
        localStorage.setItem('todo', JSON.stringify(todoList));
        messsage.value = '';
        location.reload();
    }
});

btnAdd.addEventListener('click', function addMessage() {
    let newTodo = {
        todo: messsage.value,
        checked: false,
    }
    todoList.push(newTodo);
    disiplayTodoList();
    localStorage.setItem('todo', JSON.stringify(todoList));
    messsage.value = '';
    location.reload();
});

todo.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('item__cross')) {
        todoList.forEach((item, i) => {
            if (event.target.parentElement.querySelector('.item__input').innerHTML ===
                item.todo) {
                todoList.splice(i, 1);
                localStorage.setItem('todo', JSON.stringify(todoList));
                disiplayTodoList();
            }
        });
    }

    if (event.target.classList.contains('checkbox')) {
        todoList.forEach((item, i) => {
            if (event.target.parentElement.querySelector('.item__input').innerHTML ===
                item.todo) {
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(todoList));
                disiplayTodoList();
            }
        })
    }
    location.reload();
});

let todoItem = document.querySelectorAll('.item__input'),
    todoCheckbox = document.querySelectorAll('.checkbox');
todoList.forEach((item, i) => {
    if (item.checked === true) {
        todoItem[i].classList.add('done');
        todoCheckbox[i].classList.add('check-true');
    }
});

function disiplayTodoList() {
    let displayMesgs = '';
    if (todoList.length === 0) todo.innerHTML = ''
    todoList.forEach(function(item, i) {
        displayMesgs += `
        <li class="list__item">
                    <label for="itemCheck" class="item__input">${item.todo}</label>
                    <input type="checkbox" class="item__check" id="itemCheck"><span class="checkbox"></span>
                    <a href="#" class="item__cross">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7678 9.99992L19.6339 2.13361C20.122 1.64548 20.122 0.853913 19.6339 0.366097C19.1458 -0.122032 18.3545 -0.122032 17.8664 0.366097L10 8.23209L2.13394 0.366097C1.64581 -0.122032 0.854232 -0.122032 0.366099 0.366097C-0.122033 0.854225 -0.122033 1.64579 0.366099 2.13361L8.23247 9.99992L0.366099 17.8662C-0.122033 18.3544 -0.122033 19.1459 0.366099 19.6337C0.610166 19.8778 0.930171 20 1.24986 20C1.56956 20 1.88987 19.8778 2.13394 19.6337L10 11.7677L17.8664 19.6337C18.1104 19.8778 18.4304 20 18.7501 20C19.0698 20 19.3901 19.8778 19.6339 19.6337C20.122 19.1456 20.122 18.354 19.6339 17.8662L11.7678 9.99992Z" fill="black"/>
                        </svg>
                    </a>
                </li>
        `;
        todo.innerHTML = displayMesgs;
    });
};