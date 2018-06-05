//IScroll自定义扩展
var utils = IScroll.utils;
IScroll.prototype.doScrollEnd = function (e) { },
IScroll.prototype._end = function (e) {
    if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
    }

    if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
    }

    var point = e.changedTouches ? e.changedTouches[0] : e,
        momentumX,
        momentumY,
        duration = utils.getTime() - this.startTime,
        newX = Math.round(this.x),
        newY = Math.round(this.y),
        distanceX = Math.abs(newX - this.startX),
        distanceY = Math.abs(newY - this.startY),
        time = 0,
        easing = '';

    this.isInTransition = 0;
    this.initiated = 0;
    this.endTime = utils.getTime();

    // reset if we are outside of the boundaries
    if (this.resetPosition(this.options.bounceTime)) {
        return;
    }

    this.scrollTo(newX, newY);	// ensures that the last position is rounded

    // we scrolled less than 10 pixels
    if (!this.moved) {
        if (this.options.tap) {
            utils.tap(e, this.options.tap);
        }

        if (this.options.click) {
            utils.click(e);
        }

        this._execEvent('scrollCancel');
        this.doScrollEnd(this);
        return;
    }

    if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
        this._execEvent('flick');
        this.doScrollEnd(this);
        return;
    }

    // start momentum animation if needed
    if (this.options.momentum && duration < 300) {
        momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
        momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
        newX = momentumX.destination;
        newY = momentumY.destination;
        time = Math.max(momentumX.duration, momentumY.duration);
        this.isInTransition = 1;
    }


    if (this.options.snap) {
        var snap = this._nearestSnap(newX, newY);
        this.currentPage = snap;
        time = this.options.snapSpeed || Math.max(
                Math.max(
                    Math.min(Math.abs(newX - snap.x), 1000),
                    Math.min(Math.abs(newY - snap.y), 1000)
                ), 300);
        newX = snap.x;
        newY = snap.y;

        this.directionX = 0;
        this.directionY = 0;
        easing = this.options.bounceEasing;
    }
    // INSERT POINT: _end
    if (newX != this.x || newY != this.y) {
        // change easing function when scroller goes out of the boundaries
        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
            easing = utils.ease.quadratic;
        }

        this.scrollTo(newX, newY, time, easing);
        this.doScrollEnd(this);
        return;
    }
    this._execEvent('scrollEnd');
    this.doScrollEnd(this);
}