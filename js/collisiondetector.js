var CollisionDetector = function(canvas) {
    function isCollided(obj1,obj2){
        if(!obj1||!obj2||!obj1.x||!obj2.x||!obj1.y||!obj2.y){
            console.error("error: parameter not matches");
            return false;
        }
        if (obj1.x < obj2.x + obj2.width  && obj1.x + obj1.width  > obj2.x &&  obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y) {
            // The objects are touching
            return true;
        }
        return false;
    };
    function isOutOfWall(obj){
       // var left = canvas.width - obj.x - obj.width;
        if(!obj||!obj.x||!obj.width)
            return false;
        //var coord = getCoordinatesinCanvas(obj);
        if(obj.x>canvas.width||obj.x<0)
            return true;
        return false;
    };
    function isAboveCeiling(obj){
        if(!obj||!obj.y||!obj.height)
            return false;
        //var coord= getCoordinatesinCanvas(obj);
        if(obj.y>canvas.height||obj.y<0)
            return true;
        return false;
    };
    function getCoordinatesinCanvas(obj){
        var rect = canvas.getBoundingClientRect();
        if(!obj||!obj.x||!obj.y)
            return;
        var x = (obj.x-rect.left)/(rect.right-rect.left)*canvas.width;
        var y = (obj.y-rect.top)/(rect.bottom-rect.top)*canvas.height;
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
