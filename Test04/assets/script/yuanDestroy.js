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
        button:cc.Button,
        default:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.button.node.on('click',this.yuanDestroy,this);
    },

    // start () {

    // },
    yuanDestroy(){
        let DrawingBoardchildren = this.node.parent.getChildByName('DrawingBoard').children;
        for(let i=0;i<DrawingBoardchildren.length;i++){
            let child = DrawingBoardchildren[i];
            cc.log(child.name);
            if(child.name.search("yuan")!=-1){
                cc.log(child.name);
                child.destroy();
            };
            // cc.log(child.name);
        };
    },
    // yuanDestroy(button){
    //     this.node.on(cc.Node.EventType.TOUCH_START, function (button) {
    //         cc.log("按钮点击…………")
    //      })
    // },

    // update (dt) {},
});
