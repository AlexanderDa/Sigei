import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProductService, Product } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product.detail',
  templateUrl: './product.detail.page.html',
  styleUrls: ['./product.detail.page.scss'],
})
export class ProductDetailPage implements OnInit {


  productsData: Product[] = []; // All products
  products: Product[] = []; // Search result
  error: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.find();
  }

  find(): void {
    this.productService.get().subscribe((res: any) => {
      this.products = res;
      this.productsData = res;
    });
  }

  async delete(id: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '¿Está seguro?',
      message: 'Una vez que se elimine, ¡no podrá recuperar el registro!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Delete canceled product.');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando',
            });
            loading.present();
            this.productService.delete(id)
              .then(async () => {
                loading.dismiss();
                const toast = await this.toastCtrl.create({
                  message: 'Producto eliminado.',
                  duration: 2000
                });
                toast.present();
              });
          }
        }
      ]
    });

    await alert.present();
  }


  edit(id: string) {
    let route = this.router.url;
    route = `${route}/edit/${id}`;
    this.router.navigateByUrl(route);
  }

  search(ev: any): void {
    const val = ev.target.value;
    this.error = '';
    this.products = this.productsData;

    if (val && val.trim() !== '') {
      this.products = [];
      this.products = this.productsData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if (this.products.length === 0) {
        this.error = `No se encontró resultados para "${val}"`;
      }
    }
  }
}
