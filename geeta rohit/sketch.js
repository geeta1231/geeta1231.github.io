// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC-nMiaRWpspqMEmG9idc2myiL1hPRpHqI",
    authDomain: "monsieur-99fdf.firebaseapp.com",
    databaseURL: "https://monsieur-99fdf.firebaseio.com",
    projectId: "monsieur-99fdf",
    storageBucket: "monsieur-99fdf.appspot.com",
    messagingSenderId: "262233137334",
    appId: "1:262233137334:web:83b1b6cc9d3164e8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let scoreboard = {  }
let roses = document.getElementById("mine")
let x
let y
let a
let b
let r
let n
let m
let t
let direction_s1
let direction_m1
let direction_g2
let direction_d2
let direction_e3
let direction_f3
let score
let luna
let level
let time




function setup() {
  createCanvas(windowWidth, windowHeight)
  x = 125
  y = 245
  a = 335
  b = 403
  r = [132,425,227]
  n = [545,628,877]
  m = 333
  t = 423
  direction_s1 = 1
  direction_m1 = 1
  direction_e3 = 1
  direction_f3 = 1
  score= 0
  direction_g2 = [1,1,1,1,1,1,1,1]
  direction_d2 = [1,1,1,1,1,1,1,1]
  luna = 3
  level = 1
  time = 60
}

function draw() {
  if (time > 0) {
  background(152,251,152);
  fill(255,192,203)
  circle(x,y,25)
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 12
  }  
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 12
  }  
  if (keyIsDown(UP_ARROW)) {
    y = y - 12
  } 
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 12
  }
  fill(128, 255, 212)
  circle(a,b,22)
  a = a + 6 *direction_s1
  b = b + 4 *direction_m1
  if ( a > width || a<0) {
	direction_s1 = direction_m1 * -1
  }
  if ( b > height || b<0) {
	direction_m1 = direction_s1 * +1
  }
  if (dist( x,y , a, b ) < 25 + 32) {
	 score = score  + 5
  }
  
  fill(0,0,0)
  text("score: " + score, 55, 60)
  text("level: " + level, 55, 100)
  text("time: " + time.toFixed(1), 55, 140)
  



for (i=0; i<luna; i=i+1) {
      fill(199, 234, 70)
      circle(r[i],n[i],15)
      r[i] = r[i] + 5 *direction_g2[i]
      n[i] = n[i] + 4 *direction_d2[i]
      if ( r[i] > width || r[i]<0) {
        direction_g2[i] = direction_d2[i] * -1
      }
      if ( n[i] > height || n[i]<0) {
        direction_d2[i] = direction_g2[i] * +1
      }
      if (dist( x,y , r[i], n[i] ) < 25 + 33) {
         score = score - 1
      }
} 
  fill(255,102,102)
  circle(m,t,20)
  m = m + 12 *direction_e3
  t = t + 10 *direction_f3
  if ( m > width || m<0) {
	direction_e3 = direction_f3 * -1
  }
  if ( t > height || t<0) {
	direction_f3 = direction_e3 * +1
  }
  if (dist( x,y , m, t ) < 25 + 35) {
	 score = score  - 1
     
  }
  if (score > 100 && level == 1) {
luna = luna + 3
level = 2
      r.push.apply(r, [225, 330,550])
      n.push.apply(n, [445, 670,323])
}
  if (score > 200 && level == 2) {
luna = luna + 4
level = 3
      r.push.apply(r, [225, 330,550,666])
      n.push.apply(n, [445, 670,323,723])
}
  if (score > 300 && level == 3) {
luna = luna + 5
level = 4
      r.push.apply(r, [225, 330,550,666,444])
      n.push.apply(n, [445, 670,323,723,588])
}
  if (score > 400 && level == 4) {
luna = luna + 6
level = 4
      r.push.apply(r, [225, 330,550,666,444,362])
      n.push.apply(n, [445, 670,323,723,588,542])
}
  time = time - 0.05

  } 
  
  else {
    roses.innerHTML = "Name? <input id='mine2'><button onclick='restart()'>Restart</button> <button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>";noLoop()
	
    
  }

}

function restart() { 
        let mine = document.getElementById("mine2")
		name = mine.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 60
		score = 0
		loop();
		roses.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }

function generate_alltime_leaderboard() {
  	let alltime_leaderboard = { }
  	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
  		snapshot.forEach(function(data) {
  		alltime_leaderboard[data.key] = data.val()
  		});
      	});
  	if (Object.values(alltime_leaderboard).length > 0) {
  	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
      	}
  }
generate_alltime_leaderboard()
   


}

