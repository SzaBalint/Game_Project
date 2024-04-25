import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { GameService } from 'src/app/services/game.service';

export interface Result {
  row: string;
  col: string;
  pressed: string | null;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public gameSize = 3; // x != 0 && x <= gameSize
  topNumbers: number[] = [];
  topNumbersToShow : number[] = [];
  sideNumbers: number[] = [];
  buttonToggleStates: boolean[][] = [];
  showNotCorrect = false;
  value = 3;
  isStarted = false;
  startText = "START";

  constructor(public dialog: MatDialog,private gameService:GameService) {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  changeGameSize(event:any){
    this.gameSize = event;
    this.initializeTable();
  }

  ngOnInit() {
    this.initializeTable();
  }

  initializeTable(){
    this.topNumbers = [];
    this.topNumbersToShow = [];
    this.sideNumbers = [];

    for (let i = 0; i < this.gameSize+1; i++) {
      this.topNumbersToShow.push(0);
      if(i!=0){
        this.sideNumbers.push(0)
      }
    }

    this.resetClock();
    this.resetButtonToggleState();

    console.log("top");
    console.log(this.topNumbersToShow);
    console.log("side");
    console.log(this.sideNumbers);
  }

  generateTable() {
    this.topNumbers = [];
    this.topNumbersToShow = [];
    this.sideNumbers = [];

    this.buttonToggleStates = [];

    let topNumbersSum = 0;
    let sideNumbersSum = 0;
    let matrix: number[][] = [];

    for (let i = 0; i < this.gameSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.gameSize; j++) {
        matrix[i][j] = this.getRandomNumber(0, 1);
      }
    }

    for (let i = 0; i < this.gameSize; i++) {
      for (let j = 0; j < this.gameSize; j++) {
        if(matrix[i][j]==1){
          sideNumbersSum++;
        }
      }
      this.sideNumbers.push(sideNumbersSum);
      sideNumbersSum = 0;
    }

    for (let i = 0; i < this.gameSize; i++) {
      for (let j = 0; j < this.gameSize; j++) {
        if(matrix[j][i]==1){
          topNumbersSum++;
        }
      }
      this.topNumbers.push(topNumbersSum);
      topNumbersSum = 0;
    }

    this.resetButtonToggleState();

    this.topNumbers.unshift(0);
    this.topNumbersToShow = [...this.topNumbers];
    this.topNumbers.splice(0, 1);
  }

  resetButtonToggleState() {
    for (let i = 0; i < this.gameSize; i++) {
      this.buttonToggleStates[i] = Array(this.gameSize).fill(false);
    }
  }

  checkCorrect(){
    let buttons = document.getElementsByClassName("correct");
    let corrects: Result[] = [];

    Array.from(buttons).forEach(button => {
      let correct : Result = {
        row: button.children[0].id.substring(0,1), //row and coloumn id
        col: button.children[0].id.substring(2,3),
        pressed: button.children[0].ariaPressed
      }
      corrects.push(correct);
    });

    let selectedTopSums:number[] = [];
    let selectedSideSums:number[] = [];

    for (let i = 0; i < this.gameSize; i++) {
      selectedTopSums[i] = 0;
      selectedSideSums[i] = 0;
    }

    let topCount = 0;
    let sideCount = 0;
    let sum = 0;
    for (let i = 0; i < corrects.length; i++) {
      if(corrects[i].pressed == "true"){
        selectedTopSums[topCount]+=1;
        selectedSideSums[sideCount]+=1;
        sum++;
      }
      topCount++;
      if(topCount == this.gameSize){
        topCount = 0;
        sideCount++;
      }
    }

    console.log(this.topNumbers);
    console.log(selectedTopSums);
    console.log(this.sideNumbers);
    console.log(selectedSideSums);

    let isWin;
    if(this.arraysAreEqual(this.topNumbers,selectedTopSums) && this.arraysAreEqual(this.sideNumbers,selectedSideSums)){
      isWin = true;
      this.showNotCorrect = false;

      const currentUser = localStorage.getItem("currentUser");
      if(currentUser){
        const username = JSON.parse(currentUser).username;
        const time = this.min + ":" + this.sec + ":" + this.ms;
        this.gameService.addScore(username,this.gameSize,time).subscribe(results=>{
        });
        this.openDialog(this.gameSize,time);
      }
      return isWin;
    }
    else {
      isWin = false;
      this.showNotCorrect = true;
      return isWin;
      }
  }

  arraysAreEqual(arr1:number[], arr2:number[]) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}


  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  title ='timer'

  ms: any = '0' +0;
  sec: any = '0' +0;
  min: any = '0' +0;

  startTimer: any;
  running = false;

  resetClock(){
    this.ms= '0' +0;
    this.sec= '0' +0;
    this.min= '0' +0;
  }

  start(): void{
    this.showNotCorrect = false;
    this.startText = "RESTART";
    this.isStarted = true;
    if(this.running){
      this.ms= '0' +0;
      this.sec= '0' +0;
      this.min= '0' +0;
    }
    this.generateTable();

    if(!this.running){
      this.running = true;
      this.startTimer = setInterval(() =>{
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if(this.ms === 100){
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if(this.sec === 60){
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
      }, 10);
    }
  }

  refresh(){
    this.isStarted = false;
    this.initializeTable();
    clearInterval(this.startTimer);
    this.running = false;
    this.showNotCorrect = false;
    this.startText = "START";
  }

  timer(): void{

  }

  stop(): void{
    if(this.checkCorrect()){
      clearInterval(this.startTimer);
    this.running = false;
    }
    else {
      console.log("nem jó");
    }

  }

  openDialog(difficulty:number,time:string) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data :{difficulty:difficulty,time:time}
  });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.initializeTable();
      this.isStarted = false;
      this.startText = "START";
    });
  }
}

