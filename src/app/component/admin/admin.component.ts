import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/admin/'
    },
    {
      title: 'Categorías',
      url: '/admin/category'
    },
    {
      title: 'Proveedores',
      url: '/admin/provider'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
