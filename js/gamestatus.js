var GameStatus = function(){

    var current_level = 1;

    var max_level = 3;

    var current_heart = 3;

    var current_status = 'none';

    var status = ['initial','running','nextlevel','complete','gameover'];

    var enter_initial_status_callback = [];

    var leave_initial_status_callback = [];

    var enter_running_status_callback = [];

    var leave_running_status_callback = [];

    var enter_nextlevel_status_callback = [];

    var leave_nextlevel_status_callback = [];

    var enter_complete_status_callback = [];

    var leave_complete_status_callback = [];

    var enter_gameover_status_callback = [];

    var leave_gameover_status_callback = [];

    var status_callback = {
        'enterinitial' : enter_initial_status_callback,
        'leaveinitial' : leave_initial_status_callback,
        'enterrunning' : enter_running_status_callback,
        'leaverunning' : leave_running_status_callback,
        'enternextlevel' : enter_nextlevel_status_callback,
        'leavenextlevel' : leave_nextlevel_status_callback,
        'entercomplete' : enter_complete_status_callback,
        'leavecomplete' : leave_complete_status_callback,
        'entergameover' : enter_gameover_status_callback,
        'leavegameover' : leave_gameover_status_callback
    };

    var level_1_data = {
        "items":[{
            "type" : "star",
            "x": 200,
            "y": 200
        }],
        "enemies":[{
            "type" : "bug",
            "speed" : 50,
            "x" : 0,
            "y" : 63
        }]
    };

    var level_2_data = {
        "items":[{
            "type" : "star",
            "x": 150,
            "y": 90
        }],
        "enemies":[{
            "type" : "bug",
            "speed" : 50,
            "x" : 0,
            "y" : 63
        },{
            "type" : "bug",
            "speed" : 150,
            "x" : 0,
            "y" : 126
        }]
    };

    var level_3_data = {
        "items":[{
            "type" : "star",
            "x": 150,
            "y": 90
        },{
            "type" : "star",
            "x": 350,
            "y" : 40
        },{
            "type" : "star",
            "x": 400,
            "y":20
        }],
        "enemies":[{
            "type" : "bug",
            "speed" : 50,
            "x" : 0,
            "y" : 63
        },{
            "type" : "bug",
            "speed" : 100,
            "x" : 0,
            "y" : 126
        },{
            "type" : "bug",
            "speed" : 100,
            "x":0,
            "y":193
        }]
    };

    var level_data_map = {
        1 : level_1_data,
        2 : level_2_data,
        3 : level_3_data
    };

    /*This function is called when player has completed it level*/
    function raiseLevel(){
        current_level++;
        changeStatus('nextlevel');
        current_status = 'nextlevel';
        changeStatus('running');
        current_status = 'running';
    };

    /*This function returns game data in current level*/
    function getLevelData(){
        console.log("current level:" + current_level);
        return level_data_map[current_level];
    }

    /* not used*/
    function breakHeart(){
        current_heart--;
    }

    /*This function is called when player is going to start the game*/
    function startGame(){
        changeStatus('running');
        current_status = 'running';
    }

    /*This function is called when player succeed the game*/
    function finishGame(){
        changeStatus('complete');
        current_status = 'complete';
    }

    /*This function is called when it is going to prepare the game to start*/
    function resetGame(){
        changeStatus('initial');
        current_status = 'initial';
    }

    /*This function is called when the game is over*/
    function gameover(){
        changeStatus('gameover');
        current_status = 'gameover';
    }

    /*This function returns current status of the game*/
    function getGameStatus(){
        return current_status;
    }

    /*This function checks whether has next level*/
    function hasNextLevel(){
        if(current_level == max_level)
            return false;
        return true;
    }

    /*This function set current level to start level*/
    function resetLevel(){
        current_level = 1;
    }

    /*This function is called when status from one to another
    * It would callback function when there is a change of status.
    */
    function changeStatus(newstatus){
        console.log('current status: '+current_status+ '  ' + 'new status: '+newstatus);
        if(current_status!=newstatus){
            if(current_status!='none')
                status_callback['leave'+current_status].forEach(function(callback){
                    callback();
                });
            status_callback['enter'+newstatus].forEach(function(callback){
                callback();
            });
        }
    }

    /* This function add callback function to status callback handler
    */
    function addStatusCallBack(when,status,callback){
        console.log('status call back is added: '+when+status);
        var phrase = when+status;
        status_callback[phrase].push(callback);
    }

    return {
        raiseLevel : raiseLevel,
        getLevelData : getLevelData,
        startGame : startGame,
        finishGame : finishGame,
        resetGame : resetGame,
        gameover : gameover,
        getGameStatus :  getGameStatus,
        addStatusCallBack : addStatusCallBack,
        hasNextLevel : hasNextLevel,
        resetLevel : resetLevel
    }

}
