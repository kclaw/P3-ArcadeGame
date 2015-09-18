var Level = function () {

    var current_level = 1;

    var max_level = 3;

    var level_1_data = {
        "items": [{
            "type": "star",
            "x": 200,
            "y": 200
        }],
        "enemies": [{
            "type": "bug",
            "speed": 50,
            "x": 0,
            "y": 63
        }]
    };

    var level_2_data = {
        "items": [{
            "type": "star",
            "x": 150,
            "y": 90
        }],
        "enemies": [{
            "type": "bug",
            "speed": 50,
            "x": 0,
            "y": 63
        }, {
            "type": "bug",
            "speed": 150,
            "x": 0,
            "y": 126
        }]
    };

    var level_3_data = {
        "items": [{
            "type": "star",
            "x": 150,
            "y": 90
        }, {
            "type": "star",
            "x": 350,
            "y": 40
        }, {
            "type": "star",
            "x": 400,
            "y": 20
        }],
        "enemies": [{
            "type": "bug",
            "speed": 50,
            "x": 0,
            "y": 63
        }, {
            "type": "bug",
            "speed": 100,
            "x": 0,
            "y": 126
        }, {
            "type": "bug",
            "speed": 100,
            "x": 0,
            "y": 193
        }]
    };

    var level_data_map = {
        1: level_1_data,
        2: level_2_data,
        3: level_3_data
    };

    /*This function returns game data in current level*/
    function getLevelData() {
        console.log("current level:" + current_level);
        return level_data_map[current_level];
    }

    /*This function checks whether has next level*/
    function hasNextLevel() {
        if (current_level == max_level)
            return false;
        return true;
    }

    /*This function set current level to start level*/
    function resetLevel() {
        current_level = 1;
    }

    /*This funcction add one to current_level*/
    function raiseLevel() {
        current_level++;
    }

    /*This function return current_level*/
    function getCurrentLevel() {
        return current_level;
    }

    return {
        getLevelData: getLevelData,
        hasNextLevel: hasNextLevel,
        resetLevel: resetLevel,
        raiseLevel: raiseLevel,
        getCurrentLevel: getCurrentLevel
    };
};
