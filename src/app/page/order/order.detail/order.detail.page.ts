import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/service/order.service';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order.detail',
  templateUrl: './order.detail.page.html',
  styleUrls: ['./order.detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  ordersData: Order[] = []; // All orders
  orders: Order[] = []; // Search result
  error: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.find();
  }

  find(): void {
    this.orderService.get().subscribe((res: any) => {
      this.orders = res;
      this.ordersData = res;
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
            console.log('Delete canceled order.');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando',
            });
            loading.present();
            this.orderService.delete(id)
              .then(async () => {
                loading.dismiss();
                const toast = await this.toastCtrl.create({
                  message: 'Proveedor eliminado.',
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




  search(ev: any): void {
    const val = ev.target.value;
    this.error = '';
    this.orders = this.ordersData;

    if (val && val.trim() !== '') {
      this.orders = [];
      this.orders = this.ordersData.filter((item) => {
        return (item.product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if (this.orders.length === 0) {
        this.error = `No se encontró resultados para "${val}"`;
      }
    }
  }


  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.delete(id);
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.router.navigateByUrl(`${this.router.url}/edit/${id}`);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
