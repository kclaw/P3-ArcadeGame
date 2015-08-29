var GameStatus = function(){

    var current_level = 1;

    var current_heart = 3;

    var current_status = 0;

    var status = ['initial','running','complete'];

    var level_data_map = {
        1 : "level_1_data",
        2 : "level_2_data",
        3 : "level_3_data"
    };

    var level_1_data = {
        "items":[{
            "item" : "star",
            "x": 200,
            "y": 200
        }],
        "enemies":[{
            "type" : "bee",
            "speed" : 50,
            "x" : 0,
            "y" : 63
        }]
    };

    function raiseLevel(){
        current_level++;
    };

    function sinkLevel(){
        currebt_level--;
    };

    function getLevelData(){
        return level_data_map[current_level];
    };

    function breakHeart(){
        current_heart--;
    };

    function startGame(){
        current_status = 1;
    };

    function finishGame(){
        current_status = 2;
    };

    return {
        raiseLevel : raiseLevel,
        sinkLevel : sinkLevel,
        getLevelData : getLevelData,
        startGame : startGame,
        finishGame : finishGame;
    };

}
