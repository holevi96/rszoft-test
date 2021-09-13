import { Injectable, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCarComponent } from '../components/add-car/add-car.component';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Cars } from '../cars';
import { Subject } from 'rxjs';
import {mockCars} from '../cars'
@Injectable({
  providedIn: 'root'
})

export class CarServiceService {

  constructor(public dialog: MatDialog, @Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public carSubject = new Subject<Cars[]>();
  STORAGE_KEY = 'cars';
  public getCars(){
      let cars = this.storage.get(this.STORAGE_KEY);
      if(!cars){
        cars = mockCars
        this.storage.set(this.STORAGE_KEY, cars);
      } 
      this.carSubject.next(cars); 
  }
  public addCar(){ 
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((car) => {
      let cars = this.storage.get(this.STORAGE_KEY) || [];
      let carToStore = {...car}
      carToStore.manufacture_date = carToStore.manufacture_date.unix()*1000;
      cars.push(carToStore);
      this.storage.set(this.STORAGE_KEY, cars);
      this.getCars();
    });

  }
}
