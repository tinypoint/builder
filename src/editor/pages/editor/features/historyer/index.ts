class Historyer {
    Historyer = Historyer;
    _id = -1;

    stack: any[] = [];

    get _redo() {
        return this._id < this.stack.length - 1
    }

    get _undo() {
        return this._id > 0
    }

    get current() {
        if (!this.stack.length) {
            return null;
        }
        return this.stack[this._id]
    }

    push(obj: any) {
        if (this.stack.length > this._id + 1) {
            this.stack = this.stack.slice(0, this._id + 1).concat(obj)
        } else {
            this.stack.push(obj)
        }
        this._id++
        this._listener && this._listener(obj)
    }

    undo() {
        if (!this._undo) {
            return;
        }
        this._id--
        
        this._listener && this._listener(this.stack[this._id])
    }

    redo() {
        if (!this._redo) {
            return;
        }
        this._id++
        this._listener && this._listener(this.stack[this._id])
    }

    getList() {
        return this.stack
    }

    goto(id: number) {
        if (id < 0 || id > this.stack.length - 1) {
            return;
        }
        this._id = id;
        this._listener && this._listener(this.stack[this._id])
    }

    clear() {
        this._id = -1;
        this.stack = [];
        
        this._listener && this._listener(null)
    }

    _listener: any = null;

    onChange(listener: Function) {
        this._listener = listener
    }
}

export default new Historyer()