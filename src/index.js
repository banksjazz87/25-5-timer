import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//function that converts minutes to seconds
function currentSeconds(x){
    var minutes = parseFloat(x);
    var secondsPerMin = 60;
    return secondsPerMin *= minutes;
}

//function to find the number of minutes
function minutes(totalSeconds){
    var secondsPerMin = 60;
    var minutesFromSeconds = Math.floor(parseInt(totalSeconds) / secondsPerMin);

    var minString = minutesFromSeconds.toString();

    if(minString.length === 1){
        return "0" + minString;
    }else{
        return minString;
    }
}


//function to find the total number of seconds remaining, after the minutes are deduced
function seconds(totalSeconds){
    var secondsPerMin = 60;
    var currentMinutes = Math.floor(parseFloat(totalSeconds) / secondsPerMin);
    var remainder = parseFloat(totalSeconds) - currentMinutes * secondsPerMin;

   var secString = remainder.toString();

    if(secString.length === 1){
        return '0' + secString;
    }else{
        return secString;
    }
}

// function to ensure there are two digits in the minutes section while incrementing and decrementing the sessions length.
function checkNumOfDigits(num){

    let stringOfNum = num.toString();

        if(stringOfNum.length === 1){
            return "0" + stringOfNum;
        }else{
            return stringOfNum;
        }
}

function playBeep(){
    let x = document.getElementById("beep");
    x.play();
}

function pauseBeep(){
    let x = document.getElementById("beep");
    x.pause();
}

function resetBeep(){
    let x = document.getElementById("beep");
    x.currentTime = 0;
}


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <h1 id={this.props.idName}>
                25 + 5 Timer
            </h1>
        )
    }
}

class TimeText extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <p id={this.props.idName} 
               class={this.props.className}
               >
                {this.props.currentText}
            </p>
        )
    }
}

class SessionTypeText extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    } 
    render(){
        return(
            <p id={this.props.idName}
               class={this.props.className}
               >
               {this.props.currentText}
               {this.props.text}
            </p>
        )
    }   
}

class TimeDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return ( 
          <h1 id={this.props.idName} 
              class={this.props.className}
              >
                {this.props.startMinutes + ":" + this.props.startSeconds}
          </h1>
        )
    }
}

class ChangeLengthDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <h2 id={this.props.idName}>
                {this.props.setTime}
            </h2>
        )
    }
}

class Buttons extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <button id={this.props.idName}
                    class={this.props.className} 
                    onClick={this.props.globalOnClick}
                    >
                {this.props.text}
            </button>
        )
    }
}

class Alarm extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return(
            <audio id={this.props.idName}>
                <source src="https://alarm-sound-effect.s3.us-east-2.amazonaws.com/cuckoo-clock.mp3" type="audio/mp3"/>
            </audio>
        )
    }
}

class Application extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            minutes: "25",
            seconds: "00",
            text: "Session",
 
            breakTime: "5",
            breakSeconds: " ",
            runningBreak: false,

            sessionTime: "25",
            sessionSeconds: "",
            runningSession: false,
            
            timerOn: false,
            operation: "Start",
            totalSeconds: ""
        }

        this.resetOnClick = this.resetOnClick.bind(this);
        this.breakIncrementOnClick = this.breakIncrementOnClick.bind(this);
        this.breakDecrementOnClick = this.breakDecrementOnClick.bind(this);
        this.sessionIncrementOnClick = this.sessionIncrementOnClick.bind(this);
        this.sessionDecrementOnClick = this.sessionDecrementOnClick.bind(this);
        this.startPauseOnClick = this.startPauseOnClick.bind(this);
        this.timerStart = this.timerStart.bind(this);   
    }

    //this function is called every second, see componentDidMount line 290
    timerStart(){
       if(this.state.timerOn && this.state.totalSeconds === ""){

        let newTimeInSeconds = currentSeconds(this.state.sessionTime) - 1;
        let newSessionMinutes = minutes(newTimeInSeconds);
        let newSessionSeconds = seconds(newTimeInSeconds);

            this.setState({
                minutes: newSessionMinutes,
                seconds: newSessionSeconds,
                totalSeconds: newTimeInSeconds -1,
                runningSession: true,
                text: "Session"
            })

        }else if(this.state.timerOn && this.state.totalSeconds > -1 && this.state.runningSession){

        let newSessionMinutes = minutes(this.state.totalSeconds);
        let newSessionSeconds = seconds(this.state.totalSeconds);

            this.setState({
                minutes: newSessionMinutes,
                seconds: newSessionSeconds,
                totalSeconds: this.state.totalSeconds - 1
            });

       }else if(this.state.timerOn && parseInt(this.state.totalSeconds) < 0 && this.state.runningSession){

        let newTimeInSeconds = currentSeconds(this.state.breakTime);
        let newBreakMinutes = minutes(newTimeInSeconds);
        let newBreakSeconds = seconds(newTimeInSeconds);

            this.setState({
                minutes: newBreakMinutes,
                seconds: newBreakSeconds,
                totalSeconds: newTimeInSeconds - 1,
                runningSession: false,
                runningBreak: true,
                text: "Break"
            })

       }else if(this.state.timerOn && parseInt(this.state.totalSeconds) > -1 && this.state.runningBreak){

        let newBreakMinutes = minutes(this.state.totalSeconds);
        let newBreakSeconds = seconds(this.state.totalSeconds);

            this.setState({
                minutes: newBreakMinutes,
                seconds: newBreakSeconds,
                totalSeconds: this.state.totalSeconds - 1,
                runningBreak: true 
            })   

        }else if(this.state.timerOn && parseInt(this.state.totalSeconds) < 0 && this.state.runningBreak){

           let newTimeInSeconds = currentSeconds(this.state.sessionTime);
           let newSessionSeconds = seconds(newTimeInSeconds);
           let newSessionMinutes = minutes(newTimeInSeconds);
           
            this.setState({
                minutes: newSessionMinutes,
                seconds: newSessionSeconds,
                totalSeconds: newTimeInSeconds -1,
                runningBreak: false,
                runningSession: true,
                text: "Session"
            })

        }else{

            this.setState({
                minutes: this.state.minutes,
                seconds: this.state.seconds,
                totalSeconds: this.state.totalSeconds
            })
        } 
    }

    componentDidMount(){
        this.timerId = setInterval(this.timerStart, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    resetOnClick(){
        this.setState({
            minutes: "25",
            seconds: "00",
            text: "Session",
 
            breakTime: "5",
            breakSeconds:"",

            sessionTime: "25",
            sessionSeconds: "",

            timerOn: false,
            operation: "Start",
            totalSeconds: ""
        });
        pauseBeep();
        resetBeep();
    }

    breakIncrementOnClick(){
        let number = parseFloat(this.state.breakTime);

        if(number < 60){
            this.setState({
                breakTime: number + 1
            }) 
        }else{
            this.setState({
                breakTime: this.state.breakTime
            })
        }  
    }
    
    breakDecrementOnClick(){
        let number = parseFloat(this.state.breakTime);

        if(number > 2){
            this.setState({
                breakTime: number - 1
            })
        }else{
            this.setState({
                breakTime: 1
            })
        }
    }

    sessionIncrementOnClick(){
        let number = parseFloat(this.state.sessionTime);

        if(number < 60){
            this.setState({
                minutes: checkNumOfDigits(number + 1),
                sessionTime: number + 1
            });
        }else{
            this.setState({
                sessionTime: this.state.sessionTime
            });
        }
    }

    sessionDecrementOnClick(){
        let number = parseFloat(this.state.sessionTime);

        if(number > 1){
            this.setState({
                minutes: checkNumOfDigits(number - 1),
                sessionTime: number - 1
            });
        }else{
            this.setState({
                sessionTime: 1
            })
        }
    }

    startPauseOnClick(){ 
        let paused = document.getElementById("beep").paused;
        let currentAudio = document.getElementById("beep").currentTime;
        let audioEnded = document.getElementById("beep").ended;

         if(this.state.timerOn){

            this.setState({
                timerOn: false,
                operation: "Start"   
            });
            pauseBeep();
        }else if(paused === true && audioEnded === false && currentAudio > 0){
            this.setState({
                timerOn: true,
                operation: "Pause"
            });
            playBeep();
        }else{
            this.setState({
                timerOn: true, 
                operation: "Pause"
            })
            resetBeep();
        }
    }

    render(){
        let currentTotal = this.state.totalSeconds;
        let timeRunning = this.state.timerOn;
        /*let paused = document.getElementById("beep").paused;
        let currentAudio = document.getElementById("beep").currentTime;
        let audioEnded = document.getElementById("beep").ended;*/


        function playSound(){
            if(currentTotal === -1 && timeRunning){
                playBeep();
           /* }else if(timeRunning === false && currentAudio > 0 && audioEnded === false){
                pauseBeep();
            }else if()*/
        }
    }
            playSound();

        return(
        <div>
            <Alarm idName="beep" />

            <Header idName="header" />

        <div id="container">

          <div id="top-time">
            <TimeText 
                idName="timer-label"
                currentText={this.state.text} />
            <TimeDisplay 
                idName="time-left" 
                startMinutes={this.state.minutes}
                startSeconds={this.state.seconds}
                currentTime={this.state.runningTime} />

            <Buttons 
                idName="start_stop"
                className="time" 
                text={this.state.operation}
                globalOnClick={this.startPauseOnClick} />
            <Buttons 
                idName="reset"
                className="time" 
                globalOnClick={this.resetOnClick} text="Reset" />
          </div>

          <div id="break-content">
           
            <SessionTypeText 
                idName="break-label" 
                text="Break Length" />
            <ChangeLengthDisplay 
                idName="break-length" 
                setTime={this.state.breakTime} />
            <Buttons 
                idName="break-increment" 
                className="change-time"
                text="+" 
                globalOnClick={this.breakIncrementOnClick} />
            <Buttons 
                idName="break-decrement"
                className="change-time" 
                text="-" 
                globalOnClick={this.breakDecrementOnClick} 
                currentTime={this.state.breakTime} />
          </div>

          <div id="session-content">
            <SessionTypeText 
                idName="session-label"
                text="Session Length" /> 
            <ChangeLengthDisplay 
                idName="session-length" 
                setTime={this.state.sessionTime} />
            <Buttons 
                idName="session-increment" 
                className="change-time" 
                text="+" 
                globalOnClick={this.sessionIncrementOnClick} />
            <Buttons 
                idName="session-decrement"
                className="change-time"  
                text="-" 
                globalOnClick={this.sessionDecrementOnClick} />
          </div>
        </div>   
        </div>
        )
    }
    }
ReactDOM.render( 
    <Application / > ,
    document.getElementById('root')
);


