var CollisionDetector = function(canvas) {
    var enterBelowBoundaryXAxisHandler = [];
    var leaveBelowBoundaryXAxisHandler = [];

    var enterAboveBoundaryXAxisHandler = [];
    var leaveAboveBoundaryXAxisHandler = [];

    var enterBelowBoundaryYAxisHandler = [];
    var leaveBelowBoundaryYAxisHandler = [];

    var enterAboveBoundaryYAxisHandler = [];
    var leaveAboveBoundaryYAxisHandler = [];

    var collisionHandler = [];

    function isCollided(obj1,obj2){
        if(!isObjectWithBound(obj1) || !isObjectWithBound(obj2)){
            console.error("error: parameter not matches");
            return false;
        }
        if (obj1.boundx < obj2.boundx + obj2.boundwidth  && obj1.boundx + obj1.boundwidth  > obj2.boundx &&  obj1.boundy < obj2.boundy + obj2.boundheight && obj1.boundy + obj1.boundheight > obj2.boundy) {
            // The objects are touching
            return true;
        }
        return false;
    };


    function isOutOfWall(obj){
        console.log(canvas.width + ' ' +obj.boundx);
       // var left = canvas.width - obj.x - obj.width;
        if(!isObjectWithBound(obj))
            return false;
        //var coord = getCoordinatesinCanvas(obj);
        if(obj.boundx>canvas.width||obj.boundx<0)
            return true;
        return false;
    };


    function isInsideCanvas(obj){
        console.log(obj.boundx+' '+obj.boundy);
        if(!isObjectWithBound(obj))
            return false;
        if(obj.boundx+obj.boundwidth<canvas.width && obj.boundx+obj.boundwidth>0 && obj.boundy+obj.boundheight<canvas.height && obj.boundy+obj.boundheight>0)
            return true;
        return false;
    };


    function isAboveCeiling(obj){
        if(!isObjectWithBound(obj))
            return false;
        //var coord= getCoordinatesinCanvas(obj);
        if(obj.boundy>canvas.height||obj.boundy<0)
            return true;
        return false;
    };

    /*
        lowerx:
        higherx:
        lowery:
        highery:
    */
    function subscribeBoundaryCheck(when,type,obj,action){
        console.log('subscribeBoundaryCheck: '+type);
        if(typeof(when)==='string' && typeof(type)==='string' && isObjectWithBound(obj) && isFunction(action)){
            switch(type){
                case 'lowerx':
                    if (when=='enter')
                        enterBelowBoundaryXAxisHandler.push({'object':obj,'event':action});
                    else if (when=='leave')
                        leaveBelowBoundaryXAxisHandler.push({'object':obj,'event':action});
                    console.log('subsribe:'+ obj +' with action:'+action +'when:'+when);
                    break;
                case 'abovex':
                    if (when=='enter')
                        enterAboveBoundaryXAxisHandler.push({'object':obj,'event':action});
                    else
                        leaveAboveBoundaryXAxisHandler.push({'object':obj,'event':action});
                    break;
                case 'lowery':
                    if (when=='enter')
                        enterBelowBoundaryYAxisHandler.push({'object':obj,'event':action});
                    else if (when=='leave')
                        leaveBelowBoundaryYAxisHandler.push({'object':obj,'event':action});
                    break;
                case 'abovey':
                    if(when=='enter')
                        enterAboveBoundaryYAxisHandler.push({'object':obj,'event':action});
                    else if (when=='leave')
                        leaveAboveBoundaryYAxisHandler.push({'object':obj,'event':action});
                    break;
            }
        }else{
            console.error("subsribeBoundaryCheck: parameter not matches");
        }
    };
    function unsubscribeBoundaryCheck(obj){
    };
    function subscribeCollisionCheck(obj1,obj2,callback){
        collisionHandler.push({'object1':obj1,'object2':obj2,'event':callback});
    };

    function unsubscribeCollisionCheck(obj1,obj2){
        console.log('before' + collisionHandler.length);
        for(check in collisionHandler){
            var object = collisionHandler[check];
            if(object.object1==obj1 && object.object2==obj2)
                collisionHandler.splice(check,1);
        }
        console.log('after' + collisionHandler.length);
    };

    function checkCollision(){
        enterBelowBoundaryXAxisHandler.forEach(function(handler){
            if(handler.object.boundx<=0){
                console.log('below x-asis boundary is triggered');
                handler.event();
            }else{
                leaveBelowBoundaryXAxisHandler.forEach(function(handler){
                    handler.event();
                });
            }
        });
        enterAboveBoundaryXAxisHandler.forEach(function(handler){
            if(handler.object.boundx+handler.object.boundwidth>=canvas.width){
                console.log('above x-axis boundary is triggered');
                handler.event();
            }else{
                leaveAboveBoundaryXAxisHandler.forEach(function(handler){
                    handler.event();
                });
            }
        });
        enterBelowBoundaryYAxisHandler.forEach(function(handler){
            if(handler.object.boundy+handler.object.boundheight>=canvas.height){
                console.log('below y-axis boundary is triggered');
                handler.event();
            }else{
                leaveBelowBoundaryYAxisHandler.forEach(function(handler){
                    handler.event();
                });
            }
        });
        enterAboveBoundaryYAxisHandler.forEach(function(handler){
 if(handler.object.boundy<=0){
                console.log('above y-axis boundary is triggered');
                handler.event();
            }else{
                leaveAboveBoundaryYAxisHandler.forEach(function(handler){
                    handler.event();
                });
            }
        });
        collisionHandler.forEach(function(handler){
            if(isCollided(handler.object1,handler.object2)){
                console.log('collision is detected');
                handler.event();
            }
        });
    };

    function isObjectWithBound(obj){
        if('boundx' in obj && 'boundy' in obj && 'boundwidth' in obj && 'boundheight' in obj)
            return true;
        return false;
    };

    function isFunction(obj){
        return obj && {}.toString.call(obj) == '[object Function]';
    };

    function getCoordinatesinCanvas(obj){
        var rect = canvas.getBoundingClientRect();
        if(!obj||!obj.boundx||!obj.boundy)
            return;
        var x = (obj.boundx-rect.left)/(rect.right-rect.left)*canvas.width;
        var y = (obj.boundy-rect.top)/(rect.bottom-rect.top)*canvas.height;
        return {
            x: x,
            y: y
        };
    };

    return {
        subscribeBoundaryCheck:subscribeBoundaryCheck,
        subscribeCollisionCheck:subscribeCollisionCheck,
        unsubscribeCollisionCheck:unsubscribeCollisionCheck,
        checkCollision:checkCollision
    };

};
