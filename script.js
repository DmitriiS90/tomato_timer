class Timer {
    constructor() {
        this.started = false;
        this.minutes = 0;
        this.seconds = 0;
        this.minutesSelector = null;
        this.secondsSelector = null;
        this.interval = null;
    }

    static start() {
        const self = this;
        this.minutesSelector = document.querySelector('#minutes');
        this.secondsSelector = document.querySelector('#seconds');
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#start').onclick = function () {
            self.launchTimer.apply(self);
        };
        document.querySelector('#stop').onclick = function () {
            self.stopTimer.apply(self);
        };
    }

    static resetVariables(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
    }

    static launchTimer() {
        this.resetVariables(25, 0, true);
    }

    static stopTimer() {
        this.resetVariables(25, 0, false);
        this.updateDom();
    }

    static toDoubleDigit(num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    }

    static updateDom() {
        this.minutesSelector.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsSelector.innerHTML = this.toDoubleDigit(this.seconds);
    }

    static intervalCallback() {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    }

    static timerComplete() {
        this.started = false;
    }
}

class TodoList {
    submitButton = document.querySelector("#submitButton")
    cancelButton = document.querySelector("#cancelButton")

    static init() {
        submitButton.addEventListener("click", this.addItem)
    }

    static addItem() {
        const value = document.querySelector(".todo-list__form input").value
        const list = document.querySelectorAll(".todo-list__items li")
        const id = list.length
        const listItems = document.querySelector(".todo-list__items")
        const element = `<li class="list-item" id=${id}>
                            <textarea class="display-none" id="text_${id}" placeholder="Описание задачи"></textarea>
                            <button onclick="TodoList.setDescription(${id})" class="button button--primary">?</button>
                            <span class="todo-list__task" id="task_${id}">
                                 ${value}
                             </span>
                             <input class="display-none" id="edit_${id}" />
                             <button onclick="TodoList.finishTask(${id})" class="button button--primary">+</button>
                             <button onclick="TodoList.removeItem(${id})" class="button button--danger">X</button>
                             <button onclick="TodoList.editTask(${id})" class="button button--danger">редактировать</button>
                         </li>`
        listItems.insertAdjacentHTML('beforeEnd', element)
    }

    static removeItem(id){
        const removeItem = document.getElementById(id)
        removeItem.remove()
    }
    static finishTask(id){
        const task = document.getElementById(id)
        task.classList.toggle('finish', true);
    }
    
    static editTask(id){
        const oldTask = document.querySelector(`#task_${id}`);
        const newTask = document.querySelector(`#edit_${id}`);
        oldTask.classList.toggle('display-none');
        newTask.classList.toggle('display-none');
        oldTask.innerHTML = newTask.value;
    }
    static setDescription(id){
        const description = document.querySelector(`#text_${id}`);
        description.classList.toggle('display-none');
    }
}

Timer.start();
TodoList.init();
