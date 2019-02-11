import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/service/category.service';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category.detail',
  templateUrl: './category.detail.page.html',
  styleUrls: ['./category.detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {

  categoriesData: Category[] = []; // All categories
  categories: Category[] = []; // Search result
  error: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.find();
  }

  find(): void {
    this.categoryService.get().subscribe((res: any) => {
      this.categories = res;
      this.categoriesData = res;
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
            console.log('Delete canceled category.');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando',
            });
            loading.present();
            this.categoryService.delete(id)
              .then(async () => {
                loading.dismiss();
                const toast = await this.toastCtrl.create({
                  message: 'Categoría eliminada.',
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
    this.categories = this.categoriesData;

    if (val && val.trim() !== '') {
      this.categories = [];
      this.categories = this.categoriesData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if (this.categories.length === 0) {
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
