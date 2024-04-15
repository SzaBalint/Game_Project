import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  displayedColumns: string[] = ['username','difficulty','time'];
  dataSourceAll = new MatTableDataSource();
  dataSourceHigh = new MatTableDataSource();
  dataSourceOwn = new MatTableDataSource();
  gameSize = 3;

  constructor(private gameService:GameService){}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
      this.initializeData();
      this.dataSourceAll.sort = this.sort;
  }

  changeGameSize(){
    this.initializeData();
  }

  initializeData(){
    this.gameService.getResults(this.gameSize).subscribe(results=>{
      this.dataSourceAll = new MatTableDataSource(results);
    });
    this.gameService.getHighResults(this.gameSize).subscribe(results=>{
      this.dataSourceHigh = new MatTableDataSource(results);
    });

    const currentUser = localStorage.getItem("currentUser");
    if(currentUser){
      const username = JSON.parse(currentUser).username;
      this.gameService.getOwnResults(username,this.gameSize).subscribe(results=>{
        this.dataSourceOwn = new MatTableDataSource(results);
      });
    }
  }

  onSortChange(event: Sort) {
    // Get the active sort column and direction
    const activeSortColumn = event.active;
    const sortDirection = event.direction;
    console.log(activeSortColumn);
    console.log(sortDirection);
    // Apply sorting to your data source based on the active column and direction
    // For example, you can sort your dataSource array here
    // Example:
    this.dataSourceAll.sort = this.sort;
    this.dataSourceHigh.sort = this.sort;
    this.dataSourceOwn.sort = this.sort;
  }
}
