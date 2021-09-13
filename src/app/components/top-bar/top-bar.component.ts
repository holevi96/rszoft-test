import { Component } from '@angular/core';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  constructor(private carService: CarServiceService){}
  addCar(){
    this.carService.addCar();
  }
}