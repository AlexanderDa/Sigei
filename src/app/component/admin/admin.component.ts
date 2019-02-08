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
      title: 'Dashboard',
      url: '/admin/dashboard'
    },
    {
      title: 'Categorías',
      url: '/admin/category'
    },
    {
      title: 'Productos',
      url: '/admin/product'
    }
    ,
    {
      title: 'Proveedores',
      url: '/admin/provider'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
