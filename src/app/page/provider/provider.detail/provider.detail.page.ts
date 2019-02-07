import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProviderService, Provider } from 'src/app/service/provider.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-provider.detail',
  templateUrl: './provider.detail.page.html',
  styleUrls: ['./provider.detail.page.scss'],
})
export class ProviderDetailPage implements OnInit {


  providers: Provider;

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
    let route = this.router.url;
    route = `${route}/edit/${id}`;
    this.router.navigateByUrl(route);
  }

}
