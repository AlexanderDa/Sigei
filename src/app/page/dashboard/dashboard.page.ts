import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // comun

  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: true;

  // chart stock
  public stockChartType = 'horizontalBar';
  public stockChartLabels: string[] = [];
  public stockChartData: any[] = [{ data: [] }];

  // chart order

  public orderChartType = 'horizontalBar';
  public orderChartLabels: string[] = [];
  public orderChartData: any[] = [{ data: [] }];

  constructor(
    public productService: ProductService,
    public orderService: OrderService
  ) { }


  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    const chartData = [];
    const values: number[] = [];
    this.productService.get().subscribe((res: any) => {
      this.stockChartLabels = [];
      for (const item of res) {
        this.stockChartLabels.push(item.name);
        values.push(item.stock);
      }
      chartData.push({ data: values, label: 'Stock de productos' });
      this.stockChartData[0] = chartData[0];
    });
  }


  loadOrders(): void {
    const chartData = [];
    const values: number[] = [];
    this.orderService.get().subscribe((res: any) => {

      this.orderChartLabels = [];
      for (const item of res) {
        this.orderChartLabels.push(item.product.name);
        values.push(item.quantity);
      }
      chartData.push({ data: values, label: 'Número de ordenes' });
      this.orderChartData[0] = chartData[0];
      console.log(this.orderChartData);
      console.log(this.orderChartLabels);
    });
  }


}
