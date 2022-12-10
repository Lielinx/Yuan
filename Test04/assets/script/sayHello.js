// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// let Sprite = cc.Class({
//     name:"sprite",
//     print:function(){
//         cc.log("print function");
//     }
// });

// let SpriteSon = cc.Class({
//     extends:Sprite
// });

cc.Class({
    extends: cc.Component,

    properties: {
        score:{
            default:null,
            type:cc.Node,
            displayName:"得分",
            tooltip:"描述得分数",
            visible:false,
        },
        names:{
            default:[],
            type:[cc.String],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 每个圆只允许点击一次
        this.yuanStatus = false,
        // 色号初始值
        this.colorRank = 0,
        this.touchFlag = false,
        this.touchStartTime = null;
        this.fnum = 1; 
        //圆的节点名称
        this.FirstyuanName = "yuan"
        //圆的序号
        this.yuanNum = 0
        

        cc.log("onload>>>")
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            this.yuanNum += 1;
            this.yuanStatus = true,
            this.touchFlag = true;
            this.touchStartTime = new Date();
            var posx = event.getLocationX();
            var posy = event.getLocationY();
            let self = this;
            cc.loader.loadRes("bg",cc.SpriteFrame,function(err,spriteFrame){
                let node = new cc.Node("sprite");
                let sp = node.addComponent(cc.Sprite);
                // let sp = node.addComponent("longTouch");
                sp.spriteFrame = spriteFrame;
                node.parent = self.node;
                //node.color = new cc.Color(123,56,152);
                cc.log(posx);
                node.x = posx;
                node.y = posy;
                node.width = 50;
                node.height = 50;
                // node.addComponent("longTouch");
                // let color1 = Math.floor(Math.random()*255);
                // let color2 = Math.floor(Math.random()*255);
                // let color3 = Math.floor(Math.random()*255);
                // node.width = Math.floor(Math.random()*100);
                // node.height = Math.floor(Math.random()*100);
                // node.color = new cc.Color(color1,color2,color3);
                // node.spriteFrame()
            });
        },this); 
        this.node.on(cc.Node.EventType.TOUCH_END,function(){
            this.touchFlag = false;
            this.yuanStatus = false;
            this.touchStartTime = null;
            cc.log("松开屏幕……");
        },this); 
    },
    onEnable(){
        cc.log("onEnable^^^")
    },
    // start () {
    //     cc.log("start*****");
        // let sprite = new Sprite();

        // cc.log(sprite);
        // cc.log(sprite instanceof Sprite);
        // sprite.print();

        // let spriteSon = new SpriteSon();
        // spriteSon.print();
        //关闭节点
        // this.node.active = false;
        //销毁节点节点
        //  this.node.destroy();
        // let children = this.node.children;
        // for(let i=0;i<children.length;i++){
        //     let child = children[i];
        //     cc.log(child.name);
        // };

        //查找单个子节点
        // let childByName = this.node.getChildByName("Cannon");
        // cc.log(childByName.name);
    // },
    touchHold(yuanName){
        if(this.yuanStatus&&this.touchFlag && this.touchStartTime !=null){
            let touchHoldTime = new Date();
            let milliseconds = touchHoldTime.getTime() - this.touchStartTime.getTime();
            let color1 = Math.floor(Math.random()*255);
            let color2 = Math.floor(Math.random()*255);
            let color3 = Math.floor(Math.random()*255);
            // this.node.width += 1;
            // this.node.height += 1;
            this.colorRank +=1
            if(this.colorRank>0){
                let children = this.node.children;
                let child = children[-1];
                for(let i=0;i<children.length;i++){
                    child = children[i];
                };
                child.width += 1;
                child.height += 1;
                child.name = yuanName;
                this.fnum += 1;
                if(this.fnum%10==2){
                    cc.log(this.fnum);
                    cc.log(child.name)
                    child.color = new cc.Color(color1,color2,color3);
                };
                // this.node.color = new cc.Color(color1,color2,color3);
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
            let yuanName = this.FirstyuanName + this.yuanNum;
            this.touchHold(yuanName);
        }
    },
    // lateUpdate(dt){
    //     this.node.rotation += 20;
    // },
    onDisable(){
        cc.log("ondisable^");
    },
    onDestroy(){
        cc.log("ondestroy>>>");
    },
});
