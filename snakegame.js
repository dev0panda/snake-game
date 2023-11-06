
const fps = 20


var cv = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.height = 800;  
        this.canvas.width = 800;
        this.ctx = this.canvas.getContext("2d");   
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.t = 0;
        this.twait = 0;
        this.wdt = 0
        this.hgt = 0
        this.interval = setInterval(gameloop, 1000/fps);
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#101820";
        this.ctx.fillRect(0, 0, 800, 800);      
    }
}

cv.start()
//spa for snake pixel array
spa = []


startcoords = [20, 20]
c = cv.ctx
wid = 20
hig = 20
spacing = Math.ceil(60/Math.max(wid, hig))
size = Math.ceil(600/Math.max(wid, hig))

function start(headpos, fruitpos) {
head = headpos
snake = [head]
fruit = fruitpos
direction = 0
}


function randompos() {
    return Math.floor(wid*hig*Math.random())
}

function updatesnake() {
    if ( (snake.includes(head+direction) && direction) || (head%wid+direction != (head+direction)%wid && Math.abs(direction) == 1) || head<0 || head>wid*hig) {
        //console.log(head%wid+direction, (head+direction)%wid)
        start(randompos(), randompos())
        
    } else {
    head += direction
    snake.push(head)
    if (head != fruit) {
    n = snake.reverse()
    n.pop()
    snake = n.reverse()
    } else {
        console.log(snake.length)
        while (snake.includes(fruit)) {
        fruit = randompos()
        }
    }
}
}

function populate(w, h) {
    spa = []
    for (i=0; i<w; i++) {
        for (j=0; j<h; j++) {
            if (snake.includes(spa.length)) {
                spa.push(1)
            }
            else if (spa.length == fruit) {
                spa.push(2)
            }
             else {spa.push(0)}
        }
    }
}

function screen(arr, w, h) {
    for (i=0; i<w; i++) {
        for (j=0; j<h; j++) {
            if (arr[j*w+i] == 0) {c.fillStyle = "#243260"}
            if (arr[j*w+i] == 1) {c.fillStyle = "#FF0000"}
            if (arr[j*w+i] == 2) {c.fillStyle = "#00FF00"}
            c.fillRect(startcoords[0]+i*(size+spacing), startcoords[1]+j*(size+spacing), size, size)
            //console.log(i*(size+spacing), j*(size+spacing))
        }
    }
}

start(2*hig+1, 8*hig + 10)

function gameloop() {
    
    document.body.onkeydown  = function(e) {
        if (e.keyCode == 37 && direction!=1) {direction = -1}
        if (e.keyCode == 38 && direction!=wid) {direction = -wid}
        if (e.keyCode == 39 && direction!=-1) {direction = 1}
        if (e.keyCode == 40 && direction!=-wid) {direction = wid}
    }
    
    cv.clear()
    populate(wid, hig)
    updatesnake()
    screen(spa, wid, hig)
}       


