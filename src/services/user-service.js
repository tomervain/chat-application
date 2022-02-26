class UserService {
    static metrics = {
        _colors: {},
        users: {}
    }

    constructor() {
        this._colors = {
            "blue": 0,
            "indigo": 0,
            "purple": 0,
            "pink": 0,
            "red": 0,
            "orange": 0,
            "yellow": 0,
            "green": 0,
            "teal": 0,
            "cyan": 0      
        }
        this.users = {}
    }

    addUser(id, name) {
        let userColor = this._pickColor();
        this._colors[userColor] += 1;

        this.users[id] = {
            name: name,
            color: userColor
        };
    }

    removeUser(id) {
        this._colors[this.users[id].color] -= 1;
        delete this.users[id];
    }

    _pickColor() {
        let minCount = Math.min(...Object.values(this._colors));
        let avaialbleColors = Object.keys(this._colors).filter(c => this._colors[c] === minCount);
    
        return avaialbleColors[avaialbleColors.length * Math.random() << 0]
    }
}

exports.UserService = UserService;