class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error("Config isn't exist");
        }
        this.config = config;

        this.arr = [this.config.initial];
        this.index = 0;
        this.changes = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.arr[this.index];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.arr.push(state);
            this.index++;

        } else {
            throw new Error("Error");
        }
        this.changes = true;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.arr[this.index]].transitions[event]) {
            this.arr.push(this.config.states[this.arr[this.index]].transitions[event]);
            this.index++;
        } else {
            throw new Error("Error");
        }

        this.changes = true;
        return this.arr[this.index];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.index = 0;
        return this.arr[this.index];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {


        if (!event) {
            return Object.keys(this.config.states);
        } else {

            let arr = [];
            for (let key in this.config.states) {
                if (this.config.states[key].transitions[event]) {
                    arr.push(key);
                }
            }
            return arr;
        }
    }


    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.index === 0) {
            return false;
        }

        --this.index;
        this.changes = false;
        return true;
    }


    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.index === 0 && this.arr.length === 1) {
            return false;
        } else if (this.changes) {
            return false;
        } else if (this.index === this.arr.length - 1) {
            return false;
        } else {
            ++this.index;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arr = [this.config.initial];
        this.index = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
