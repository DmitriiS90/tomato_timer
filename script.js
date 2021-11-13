// document.querySelector("#singUpButton").addEventListener('click', ()=>{window.location.replace('login.html')})

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

Timer.start();
