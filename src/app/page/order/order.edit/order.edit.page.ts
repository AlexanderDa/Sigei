import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Provider } from '@angular/compiler/src/compiler_facade_interface';
import { Product, ProductService } from 'src/app/service/product.service';
import { Order, OrderService } from 'src/app/service/order.service';
import { ProviderService } from 'src/app/service/provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order.edit',
  templateUrl: './order.edit.page.html',
  styleUrls: ['./order.edit.page.scss'],
})
export class OrderEditPage implements OnInit {

  providers: Provider[] = [];
  products: Product[] = [];
  order: Order;

  constructor(
    public nav: NavController,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public providerService: ProviderService,
    public productService: ProductService,
    public orderService: OrderService
  ) { }


  ngOnInit() {
    this.refreshOrder();
    this.loadProviders();
    this.loadProducts();
    this.findById(this.route.snapshot.paramMap.get('id'));
  }

  private refreshOrder(): void {
    this.order = {
      provider: {
        name: undefined,
        telephone: undefined,
        address: undefined,
        contactLastName: undefined,
        contactFirstName: undefined,
        contactEmail: undefined,
        contactTelephone: undefined,
      },
      product: {
        name: undefined,
        category: {
          name: undefined,
          description: undefined
        },
        stock: undefined,
        purchasePrice: undefined,
        salePrice: undefined,
      },
      quantity: undefined,
      unitPrice: undefined,
      orderNumber: undefined,
      delivered: false,
      deliveryDate: undefined,
    };
  }

  loadProviders(): void {
    this.providerService.get().subscribe((res: any) => {
      this.providers = res;
    });
  }

  loadProducts(): void {
    this.productService.get().subscribe((res: any) => {
      this.products = res;
    });
  }


  findById(id: string) {
    this.productService.getById(id).subscribe((res: any) => {
      this.order = res;
    });
  }
  goBack() {
    this.nav.back();
  }
}
