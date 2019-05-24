var chess = document.getElementById("chess");
var context = chess.getContext('2d');
var title = document.getElementById("title");
var m = true;
var over = false;
var chessBoard = [];
var flag = true;
var myWin = [];
var computerWin = [];
var player1Win = [];
var player2Win = [];


function change1(){
    flag = false;
    clearCanvas();
    title.innerHTML="双人对战"
    init();
}
function change2(){
    flag = true;
    clearCanvas();
    title.innerHTML="电脑对战"
    init();
}

//赢法数组
var wins = [];
for(var i=0;i<15;i++){
    wins[i] = [];
    for(var j=0;j<15;j++){
        wins[i][j] = [];
    }
}
//直线
var count = 0;
for(var i =0;i<15;i++){
    for(var j =0;j<11;j++){
        for(var k =0;k<5;k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

//竖线
for(var i =0;i<15;i++){
    for(var j =0;j<11;j++){
        for(var k =0;k<5;k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

//斜线
for(var i =0;i<11;i++){
    for(var j =0;j<11;j++){
        for(var k =0;k<5;k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}

//反斜线
for(var i =0;i<11;i++){
    for(var j =14;j>3;j--){
        for(var k =0;k<5;k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

function init(){
    m = true;
    over = false;
    context.strokeStyle = "#bfbfbf";
    drawLine();
    for(var i=0;i<15;i++){
        chessBoard[i] = [];
        for(var j=0;j<15;j++){
           chessBoard[i][j] = 0;
        }
    }
    for(var i=0;i<count;i++){
        myWin[i] = 0;
        computerWin[i] = 0;
        player1Win[i] = 0;
        player2Win[i] = 0;
    }
}
init();
chess.onclick = function(e){
    if(flag){
        if(over){
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        if(chessBoard[i][j] == 0){
            chesses(i,j,m);
            chessBoard[i][j] = 1;
        }
    
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = -1;
                if(myWin[k] == 5){
                    alert("YOU WIN!");
                    over = true;
                }
            }
        }
    
        if(!over){
            m = !m;
            computerAI();
        }
        
    }else{
        if(over){
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        if(chessBoard[i][j] == 0){
            chesses(i,j,m);
            if(m){
                chessBoard[i][j] = 1;
            }else{
                chessBoard[i][j] = 2;
            }
        }
        
        if(m){
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    player1Win[k]++;
                    player2Win[k] = -1;
                    if(player1Win[k] == 5){
                        alert("BLACK WIN!");
                        over = true;
                    }
                }
            }
        }else{
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    player2Win[k]++;
                    player1Win[k] = -1;
                    if(player2Win[k] == 5){
                        alert("WHITE WIN!");
                        over = true;
                    }
                }
            }
        }
        
    
        if(!over){
            m = !m;
        }
    }
}


// 背景水印
// var logo = new Image();
// logo.src = "";
// logo.onload = function(){
    //     context.drawImage(logo, 0, 0, 450, 450);
    //     drawLine();
    // }
    

//划线
function drawLine(){
    for(var i=0;i<15;i++){
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();
    
        context.moveTo(15, 15+ i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();
    }
}

//棋子
function chesses(i,j,m){
    context.beginPath();
    context.arc(15+i*30, 15+j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2, 13,15+i*30+2, 15+j*30-2,0);
    if(m){
        //黑子
        gradient.addColorStop(0,"#0a0a0a");
        gradient.addColorStop(1,"#636766");
    }else{
        //白子
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
}

function clearCanvas()
{  
    chess.height=chess.height; //更新画布高度，达到刷新的效果
}  

//AI
function computerAI(){
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0;
    var v = 0;
    for(var i=0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0;j<15;j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j] == 0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }

                        if(computerWin[k] == 1){
                            myScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            myScore[i][j] += 420;
                        }else if(computerWin[k] == 3){
                            myScore[i][j] += 2100;
                        }else if(computerWin[k] == 4){
                            myScore[i][j] += 20000;
                        }
                    }
                }

                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }

                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    chesses(u,v,m);
    chessBoard[u][v] = 2;

    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] = -1;
            if(computerWin[k] == 5){
                alert("COMPUTER WIN!");
                over = true;
            }
        }
    }
    if(!over){
        m = !m;
    }
}