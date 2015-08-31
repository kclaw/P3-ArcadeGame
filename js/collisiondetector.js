var CollisionDetector = function(canvas) {

    function isCollided(obj1,obj2){
        if(!obj1||!obj2||!obj1.boundx||!obj2.boundx||!obj1.boundy||!obj2.boundy){
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
       // var left = canvas.width - obj.x - obj.width;
        if(!obj||!obj.boundx||!obj.boundwidth)
            return false;
        //var coord = getCoordinatesinCanvas(obj);
        if(obj.boundx>canvas.width||obj.boundx<0)
            return true;
        return false;
    };

    function isAboveCeiling(obj){
        if(!obj||!obj.boundy||!obj.boundheight)
            return false;
        //var coord= getCoordinatesinCanvas(obj);
        if(obj.boundy>canvas.height||obj.boundy<0)
            return true;
        return false;
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
        isCollided: function(obj1,obj2){
            return isCollided(obj1,obj2);
        },
        isOutOfWall: function(obj){
            return isOutOfWall(obj);
        },
        isAboveCeiling: function(obj){
            return isAboveCeiling(obj);
        }
    };

};
