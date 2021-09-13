import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Cars } from 'src/app/cars';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit{
  cars: Cars[] = [];
  displayedColumns: string[] = ['manufacturer', 'model', 'motor_capacity', 'color', 'design', 'manufacture_date', 'website'];
  constructor(private carService: CarServiceService){
    carService.getCars();
  }
  ngOnInit() {
    this.carService.carSubject.subscribe((cars) => {
      this.cars = cars;
    });
    this.carService.getCars();
  }
  formatDate(date:number) {
    return moment(date).format('YYYY-MM-DD');
  }
}