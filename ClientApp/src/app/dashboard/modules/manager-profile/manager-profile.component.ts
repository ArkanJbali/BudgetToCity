import { Component, OnInit } from '@angular/core';
import { HotelManager } from '../../../models/HotelManager.model';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  hotelManager: HotelManager = { id: 1, managerName: 'Tariq', managerEmail: 'tariq@gmail.com', hotelID: 124, hotelName: 'Tariq Hotel', hotelDescription: 'Best hotel in Nazareth since 1882.' };

  constructor() { }

  ngOnInit() {
  }

}
