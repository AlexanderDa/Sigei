import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'horizontalBar';
  public barChartLegend: true;

  public barChartData: any[] = [{ data: [] }];

  constructor(public productService: ProductService) { }


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('ejecutado');
    const chartData = [];
    const values: number[] = [];
    this.productService.get().subscribe((res: any) => {
      this.barChartLabels = [];
      for (const item of res) {
        this.barChartLabels.push(item.name);
        values.push(item.stock);
      }
      chartData.push({ data: values, label: 'Stock de productos' });
      this.barChartData[0] = chartData[0];
    });
  }


}
