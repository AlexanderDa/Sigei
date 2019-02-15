import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order.new',
  templateUrl: './order.new.page.html',
  styleUrls: ['./order.new.page.scss'],
})
export class OrderNewPage implements OnInit {

  constructor(
    public nav: NavController
  ) { }


  ngOnInit() {
  }

  goBack() {
    this.nav.back();
  }
}
