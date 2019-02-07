import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from '@ionic/angular';
import { ProviderService, Provider } from 'src/app/service/provider.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit.provider',
  templateUrl: './edit.provider.page.html',
  styleUrls: ['./edit.provider.page.scss'],
})
export class EditProviderPage implements OnInit {

  provider: Provider;

  constructor(
    public nav: NavController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    public providerService: ProviderService
  ) {
  }

  ngOnInit() {
    this.refreshProvider();
    this.findById(this.route.snapshot.paramMap.get('id'));
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

  findById(id: string) {
    this.providerService.getById(id).subscribe((res: any) => {
      this.provider = res;
    });
  }


  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Editando',
    });
    loading.present();
    this.providerService.put(this.provider, this.route.snapshot.paramMap.get('id'))
      .then(async () => {
        this.refreshProvider();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Proveedor editado.',
          duration: 2000
        });
        toast.present();
        this.goBack();
      });
  }


  goBack() {
    this.nav.back();
  }
}
