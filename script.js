function lerp( a, b, alpha ) {
    return a + alpha * ( b - a )
}   

const TOTALTIME = 2400000;
// miliseconds
let totalTimeSpent = 0;
let currentTimeSpent = 0;

let schedule = [
    {
        title: "Theory pg. 54",
        color: "var(--bs-info)",
        time: TOTALTIME/20*3,
    },
    {
        title: "Etude 1",
        color: "var(--bs-indigo)",
        time: TOTALTIME/20*7,
    },
    {
        title: "Etude 2",
        color: "var(--bs-blue)",
        time: TOTALTIME/20*9.5,
    },
    {
        title: "Whatever you want",
        color: "var(--bs-green)",
        time: TOTALTIME/20*0.5,
    },
    {
        title: "Practice Done!",
        color: "var(--bs-orange)",
        time: 0.1,
    },
]

let currIdx = 0

document.querySelector('.skip-btn').addEventListener('click', changeEvent, true)

function changeEvent(skip){
    let hasSkipped = skip || false;

    if(currIdx === schedule.length - 1){
        return;
    }
    currIdx++;
    currentTimeSpent = 0;
    updateText()
    updateScreen()

    if(hasSkipped){
        schedule[currIdx].time += schedule[currIdx-1].time - currentTimeSpent;
        console.log("TIME"+schedule[currIdx].time)
        console.log(schedule[currIdx])
    }
}
function updateScreen(){
    let progressbar = document.querySelector('.progress-bar');
    let time = currentTimeSpent / schedule[currIdx].time * 100;
    progressbar.setAttribute('style', 'width: '+time+'%;')
    progressbar.setAttribute('w', time)
}
function updateText(){
    document.body.setAttribute('style', '--color1: '+schedule[currIdx].color+';')
    document.querySelector('.sch-title').innerHTML = schedule[currIdx].title
}

document.querySelector('.start-btn').setAttribute('onclick', 'start()')

function start(){
    document.querySelector('.container').setAttribute('started', 'true')

    setInterval(function(){
        if(currentTimeSpent >= schedule[currIdx].time){
            changeEvent()
        }
        currentTimeSpent += 100;
        totalTimeSpent += 100;
    
        updateScreen()
    }, 100)
    
    updateScreen()
    updateText()
}
