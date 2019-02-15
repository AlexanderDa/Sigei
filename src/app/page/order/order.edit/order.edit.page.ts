import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order.edit',
  templateUrl: './order.edit.page.html',
  styleUrls: ['./order.edit.page.scss'],
})
export class OrderEditPage implements OnInit {

  constructor(
    public nav: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.nav.back();
  }
}
