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
        
        const listItems = document.querySelector(".todo-list__items")
        const element = `<li class="list-item" id=${list.length}>
                            <span>
                                 ${value}
                             </span>
                             <button onclick="TodoList.finishTask(${list.length})" class="button button--primary">выполнить</button>
                             <button onclick="TodoList.removeItem(${list.length})" class="button button--danger">отменить</button>
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
}

Timer.start();
TodoList.init();
