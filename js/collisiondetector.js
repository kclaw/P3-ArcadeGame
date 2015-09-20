var CollisionDetector = function (canvas) {

    var self = this;
    /*handle callback function(s) when is across the x-axis*/
    this.enterBelowBoundaryXAxisHandler = [];
    /*handle callback function(s) when not crossing the x-axis*/
    this.leaveBelowBoundaryXAxisHandler = [];

    /*handle callback function(s) when runs out of canvas's width*/
    this.enterAboveBoundaryXAxisHandler = [];
    /*handke callback function(s) when not running out of canvas's width*/
    this.leaveAboveBoundaryXAxisHandler = [];

    /*handle callback function(s) when runs out of canvas's height*/
    this.enterBelowBoundaryYAxisHandler = [];
    /*handle callback function(s) when not running out of the y-axis*/
    this.leaveBelowBoundaryYAxisHandler = [];

    /*handle callback function(s) when crossing the y-axis*/
    this.enterAboveBoundaryYAxisHandler = [];
    /*handle callback function(s) when not crossing the y-axis*/
    this.leaveAboveBoundaryYAxisHandler = [];

    /*handle callback function(s) when collision occurs*/
    this.collisionHandler = [];

    /*This function checks whether is collided between obj1 and obj2.
     *  It returns true when collision is happened. Otherwise,it returns false
     */
    function isCollided(obj1, obj2) {
        if (!isObjectWithBound(obj1) || !isObjectWithBound(obj2)) {
            console.error("error: parameter not matches");
            return false;
        }
        if (obj1.boundx < obj2.boundx + obj2.boundwidth && obj1.boundx + obj1.boundwidth > obj2.boundx && obj1.boundy < obj2.boundy + obj2.boundheight && obj1.boundy + obj1.boundheight > obj2.boundy) {
            // The objects are touching
            return true;
        }
        return false;
    }

    /*This function checks obj whether is go beyound canvas width.
     * It returns true when obj is go beyound canvas width. Otherwise,it returns false.
     */
    function isOutOfWall(obj) {
        if (!isObjectWithBound(obj))
            return false;
        if (obj.boundx > canvas.width || obj.boundx < 0)
            return true;
        return false;
    }

    /*This function checks obj whether is inside canvas depending on its boundx and boundy value
     * It returns true when obj is inside canvas. Otherwise,it returns false.
     */
    function isInsideCanvas(obj) {
        if (!isObjectWithBound(obj))
            return false;
        if (obj.boundx + obj.boundwidth < canvas.width && obj.boundx + obj.boundwidth > 0 && obj.boundy + obj.boundheight < canvas.height && obj.boundy + obj.boundheight > 0)
            return true;
        return false;
    }

    /*This function checks obj whether is above y-axis according to its boundy value
     * It returns true when obj is above y-axis. Otherwise,it returns false.
     */
    function isAboveCeiling(obj) {
        if (!isObjectWithBound(obj))
            return false;
        if (obj.boundy > canvas.height || obj.boundy < 0)
            return true;
        return false;
    }

    /*
     * This function add callback function(s) to corresponding handler(s) related to boundary checking.
     */
    function subscribeBoundaryCheck(when, type, obj, action) {
        console.log('subscribeBoundaryCheck: ' + type);
        if (typeof (when) === 'string' && typeof (type) === 'string' && isObjectWithBound(obj) && isFunction(action)) {
            switch (type) {
            case 'lowerx':
                if (when == 'enter')
                    self.enterBelowBoundaryXAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                else if (when == 'leave')
                    self.leaveBelowBoundaryXAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                console.log('subsribe:' + obj + ' with action:' + action + 'when:' + when);
                break;
            case 'abovex':
                if (when == 'enter')
                    self.enterAboveBoundaryXAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                else
                    self.leaveAboveBoundaryXAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                break;
            case 'lowery':
                if (when == 'enter')
                    self.enterBelowBoundaryYAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                else if (when == 'leave')
                    self.leaveBelowBoundaryYAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                break;
            case 'abovey':
                if (when == 'enter')
                    self.enterAboveBoundaryYAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                else if (when == 'leave')
                    self.leaveAboveBoundaryYAxisHandler.push({
                        'object': obj,
                        'event': action
                    });
                break;
            }
        } else {
            console.error("subsribeBoundaryCheck: parameter not matches");
        }
    }

    /*
     * This function remove callback function(s) from collsion handler.
     */
    function unsubscribeBoundaryCheck(obj) {}

    /*
     * This function add callback function(s) to collision handler
     */
    function subscribeCollisionCheck(obj1, obj2, callback) {
        self.collisionHandler.push({
            'object1': obj1,
            'object2': obj2,
            'event': callback
        });
    }

    /*
     * This function remove callback function(s) from collision handler.
     */
    function unsubscribeCollisionCheck(obj1, obj2) {
        console.log('before' + self.collisionHandler.length);
        for (var check in self.collisionHandler) {
            var object = self.collisionHandler[check];
            if (object.object1 == obj1 && object.object2 == obj2)
                self.collisionHandler.splice(check, 1);
        }
        console.log('after' + self.collisionHandler.length);
    }

    /* This function checks both collision and boundary based on situation.
    It would trigger callbacks function inside handler when matches corresponding situation.*/
    function checkCollision() {
        self.enterBelowBoundaryXAxisHandler.forEach(function (handler) {
            if (handler.object.boundx <= 101) {
                console.log('below x-asis boundary is triggered');
                handler.event();
            } else {
                self.leaveBelowBoundaryXAxisHandler.forEach(function (handler) {
                    handler.event();
                });
            }
        });
        self.enterAboveBoundaryXAxisHandler.forEach(function (handler) {
            if (handler.object.boundx + handler.object.boundwidth + 101 >= canvas.width) {
                console.log('above x-axis boundary is triggered');
                handler.event();
            } else {
                self.leaveAboveBoundaryXAxisHandler.forEach(function (handler) {
                    handler.event();
                });
            }
        });
        self.enterBelowBoundaryYAxisHandler.forEach(function (handler) {
            if (handler.object.boundy + handler.object.boundheight >= canvas.height - 83) {
                console.log('below y-axis boundary is triggered');
                handler.event();
            } else {
                self.leaveBelowBoundaryYAxisHandler.forEach(function (handler) {
                    handler.event();
                });
            }
        });
        self.enterAboveBoundaryYAxisHandler.forEach(function (handler) {
            if (handler.object.boundy <= 83) {
                console.log('above y-axis boundary is triggered');
                handler.event();
            } else {
                self.leaveAboveBoundaryYAxisHandler.forEach(function (handler) {
                    handler.event();
                });
            }
        });
        self.collisionHandler.forEach(function (handler) {
            if (isCollided(handler.object1, handler.object2)) {
                console.log('collision is detected');
                handler.event();
            }
        });
    }

    /* This function validate objects with boundx,boundy,boundwidth,boundheight properties
     * It returns true when all properties are found.Otherwise,it returns false.
     */
    function isObjectWithBound(obj) {
        if ('boundx' in obj && 'boundy' in obj && 'boundwidth' in obj && 'boundheight' in obj)
            return true;
        return false;
    }
    /*This function validate obj whether is function
     * It returns true when obj is a function. Otherwise,it returns false.
     */
    function isFunction(obj) {
        return obj && {}.toString.call(obj) == '[object Function]';
    }
    /*
     * This function retrieve position of obj in term of x and y
     */
    function getCoordinatesinCanvas(obj) {
        var rect = canvas.getBoundingClientRect();
        if (!obj || !obj.boundx || !obj.boundy)
            return;
        var x = (obj.boundx - rect.left) / (rect.right - rect.left) * canvas.width;
        var y = (obj.boundy - rect.top) / (rect.bottom - rect.top) * canvas.height;
        return {
            x: x,
            y: y
        };
    }

    return {
        subscribeBoundaryCheck: subscribeBoundaryCheck,
        subscribeCollisionCheck: subscribeCollisionCheck,
        unsubscribeCollisionCheck: unsubscribeCollisionCheck,
        checkCollision: checkCollision,
        isOutOfWall: isOutOfWall
    };

};
