import { Component, OnInit, ɵConsole } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProviderService, Provider } from 'src/app/service/provider.service';
import { Router, Route } from '@angular/router';
@Component({
  selector: 'app-list.provider',
  templateUrl: './list.provider.page.html',
  styleUrls: ['./list.provider.page.scss'],
})
export class ProviderPage implements OnInit {

  providers: Provider[] = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public providerService: ProviderService
  ) { }

  ngOnInit() {
    this.find();
  }

  find(): void {
    this.providerService.get().subscribe((res: any) => {
      this.providers = res;
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
            console.log('Delete canceled provider.');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando',
            });
            loading.present();
            this.providerService.delete(id)
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


  edit(id: string) {
    let route = this.router.url; // .substring(0, this.router.url.length - 4);
    route = `${route}/edit/${id}`;
    console.log(route);
    this.router.navigateByUrl(route);
  }
}
