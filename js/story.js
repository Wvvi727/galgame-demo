export const story = {

    start: {
        type: "text",

        texts:[

            "睜開眼睛，映入視野的是一片平常的光景。",

            "溫暖而明亮的燈光下，你坐在深胡桃木色的桌前。\n空氣中飄散著一股烘烤的芬芳——是咖啡豆的氣味。",

            "這裡是咖啡廳嗎？可你前一刻不是還在......",

            "還在......",

            "還在......什麼？想不起來了。",

            "和這裡使人忍不住放鬆的氣氛一比，前一刻在做甚麼似乎也顯得沒那麼重要了。",

            "環顧四週，這裡還挺熱鬧的，可以說是座無虛席。\n店員從你身邊匆匆走過，似乎並沒有注意到你。"

        ],

        next: "choice"
    },

    choice: {
        type: "choice",
        texts: ["你決定主動向店員搭話。要招呼誰過來呢？"],

        choices: [
            {
                text: "在客桌間靈活穿梭、老鼠耳朵的淺藍髮店員。",
                next: "encore_start",
                character: "encore",
            }

        ]
    },

    encore_start: {
        type: "text",

        character: {
            id: "encore",
            left: "30%",
            bottom: "-20",
            height: "120%",
            speed: "1s"
        },

        texts: [

            "你對她招了招手。",

            "她注意到你的招呼，蹦跳著來到你的位置桌邊。",

            "在她靠近時，你也看清了她胸前的員工名牌，她叫做Encore。",

        ],

        next: "encore_day1_01"
    },

    encore_day1_01: {
        type: "choice",

        speaker: "encore",
        character: {
            id: "encore",
            left: "65%",
            bottom: "20",
            height: "120%",
            speed: "2s"
        },

        texts: ["您好！有需要什麼幫助嗎？"],

        choices: [
            {
                text: "「有推薦的餐點嗎？」",
                next: "encore_day1_02"
            },
            {
                text: "「抱歉，叫錯人了。」",
                next: "encore_return"
            }
        ]
    },

    encore_return: {
        type: "text",

        texts: ["她理解地點點頭，蹦跳著回到她的工作崗位。"],

        next: "test_multi"
    },

    encore_day1_02: {
        type: "choice",

        speaker: "encore",
        character: {
            id: "encore",
            expression: "smile",
            left: "65%",
            bottom: "20",
            height: "120%",
            speed: "1s"
        },

        texts: [
            
            "「那您真是問對人了！全部都很推薦！」"
        
        ],

        choices: [
            {
                text: "「......」",
                next: "encore_day1_03"
            },

            {
                text: "「有更推薦的幾樣嗎？」",
                next: "encore_day1_04"
            }
        ]
    },

    encore_day1_03: {
        type: "text",

        character: {
            id: "encore",
            left: "65%",
            bottom: "20",
            height: "120%"
        },

        texts:["她對你的沉默有些疑惑，歪著頭看著你。"],

        next: "end"
    },

    encore_day1_04: {
        type: "text",

        character: {
            id: "encore",
            left: "65%",
            bottom: "20",
            height: "120%",
            speed: "1.2s"
        },

        texts: ["她看上去對這個問題有些困擾。"],

        next: "end"
    },


    end: {
        type: "text",

        texts: ["未完工。"],

        next: null
    },

    test_multi: {
    
        type: "text",

        character: [

            {
        
                id: "encore", 
                expression: "normal",           
                left: "30%",          
                bottom: "0%",          
                height: "120%",           
                speed: "1s",
                zIndex: 2
            },
       
            {
           
                id: "test",       
                expression: "normal",          
                left: "70%",        
                bottom: "0%",        
                height: "110%",      
                speed: "1s",
                zIndex: 3
            }

        ],
  
        speaker: "encore",
 
        texts: [  
            "測試一下兩個角色同時出現。"
        ],

    
        next: "test_multi_02"
    },

    test_multi_02: {

        type: "text",
 
        character: [
       
            {
          
                id: "encore",
                expression: "smile",        
                left: "40%",       
                bottom: "0%",        
                height: "120%",        
                speed: "1.5s",
                zIndex: 2
            },
  
            {
           
                id: "test",   
                expression: "normal",       
                left: "70%",          
                bottom: "0%",          
                height: "110%",          
                speed: "1s" ,
                zIndex: 3
            }

        ],
    
        speaker: "test",
   
        texts: [  
            "我講話。"
        ],
    
        next: "end"

    },

};