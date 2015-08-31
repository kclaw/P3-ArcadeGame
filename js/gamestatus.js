var GameStatus = function(){

    var current_level = 1;

    var max_level = 2;

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

    var level_data_map = {
        1 : level_1_data,
        2 : level_2_data,
    };

    function raiseLevel(){
        current_level++;
        changeStatus('nextlevel');
        current_status = 'nextlevel';
    };

    function getLevelData(){
        console.log("current level:" + current_level);
        return level_data_map[current_level];
    };

    function breakHeart(){
        current_heart--;
    };

    function startGame(){
        changeStatus('running');
        current_status = 'running';
    };

    function finishGame(){
        changeStatus('complete');
        current_status = 'complete';
    };

    function resetGame(){
        changeStatus('initial');
        current_status = 'initial';
    };

    function gameover(){
        changeStatus('gameover');
        current_status = 'gameover';
    }

    function getGameStatus(){
        return current_status;
    };

    function hasNextLevel(){
        if(current_level == max_level)
            return false;
        return true;
    };

    function resetLevel(){
        current_level = 1;
    };

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
    };

    function addStatusCallBack(when,status,callback){
        console.log('status call back is added: '+when+status);
        var phrase = when+status;
        status_callback[phrase].push(callback);
    };

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
    };

}
