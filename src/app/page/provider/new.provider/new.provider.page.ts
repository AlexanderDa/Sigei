import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from '@ionic/angular';
import { Provider, ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-new.provider',
  templateUrl: './new.provider.page.html',
  styleUrls: ['./new.provider.page.scss'],
})
export class NewProviderPage implements OnInit {

  provider: Provider;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public providerService: ProviderService
  ) { }

  ngOnInit() {
    this.refreshProvider();
  }

  private refreshProvider(): void {
    this.provider = {
      name: undefined,
      telephone: undefined,
      address: undefined,
      contactLastName: undefined,
      contactFirstName: undefined,
      contactEmail: undefined,
      contactTelephone: undefined,
    };
  }

  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
    });
    loading.present();
    this.providerService.post(this.provider)
      .then(async () => {
        this.refreshProvider();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Proveedor guardado.',
          duration: 2000
        });
        toast.present();
      });
  }

  goBack() {
    this.navCtrl.back();
  }

}
