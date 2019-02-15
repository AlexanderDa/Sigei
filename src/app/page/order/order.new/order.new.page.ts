import { Component, OnInit, Provider } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Product, ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';
import { Order, OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order.new',
  templateUrl: './order.new.page.html',
  styleUrls: ['./order.new.page.scss'],
})
export class OrderNewPage implements OnInit {

  providers: Provider[] = [];
  products: Product[] = [];
  order: Order = undefined;

  constructor(
    public nav: NavController,
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

  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
    });
    loading.present();
    this.orderService.post(this.order)
      .then(async () => {
        this.refreshOrder();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Proveedor guardado.',
          duration: 2000
        });
        toast.present();
      });
  }
  goBack() {
    this.nav.back();
  }
}
