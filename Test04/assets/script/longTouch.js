// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 每个圆只允许点击一次
        this.yuanStatus = true,
        // 色号初始值
        this.colorRank = 0,
        this.touchFlag = false,
        this.touchStartTime = null;
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            this.touchFlag = true;
            this.touchStartTime = new Date();
        },this);
        this.node.on(cc.Node.EventType.TOUCH_END,function(){
            this.touchFlag = false;
            this.yuanStatus = false;
            this.touchStartTime = null;
        },this);
    },

    // start () {
    // },
    touchHold(){
        if(this.yuanStatus&&this.touchFlag && this.touchStartTime !=null){
            let touchHoldTime = new Date();
            let milliseconds = touchHoldTime.getTime() - this.touchStartTime.getTime();
            let color1 = Math.floor(Math.random()*255);
            let color2 = Math.floor(Math.random()*255);
            let color3 = Math.floor(Math.random()*255);
            cc.log(milliseconds);
            
            this.node.width += 1;
            this.node.height +=1;
            this.colorRank +=1
            if(this.colorRank>50){
                this.node.color = new cc.Color(color1,color2,color3);
                this.colorRank = 0;
            };
            // if (milliseconds>300){
            //     this.touchFlag = false;
            //     // this.node.x +=1;
            //     this.node.width += 1;
            // }
        }
    },

    update (dt) {
        if(this.touchFlag){
            this.touchHold();
        }
    },
});
