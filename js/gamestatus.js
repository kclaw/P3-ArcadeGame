var GameStatus = function(){

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

    var level = new Level();

    /*This function is called when player has completed it level*/
    function raiseLevel(){
        level.raiseLevel();
        changeStatus('nextlevel');
        current_status = 'nextlevel';
        changeStatus('running');
        current_status = 'running';
    }

    /*This function delegate to Level.getLevelData() and return data loading to game based on current level*/
    function getLevelData(){
        console.log("current level:" + level.getCurrentLevel());
        return level.getLevelData();
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

    /*This function delegated to Level.hasNextLevel() and checks whether has next level*/
    function hasNextLevel(){
        return level.hasNextLevel();
    }

    /*This function delegated to Level.resetLevel and set current level to start level*/
    function resetLevel(){
        level.resetLevel();
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
