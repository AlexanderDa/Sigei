import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Category, CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-category.new',
  templateUrl: './category.new.page.html',
  styleUrls: ['./category.new.page.scss'],
})
export class CategoryNewPage implements OnInit {


  category: Category;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.refreshCategory();
  }

  private refreshCategory(): void {
    this.category = {
      name: undefined,
      description: undefined,
    };
  }

  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
    });
    loading.present();
    this.categoryService.post(this.category)
      .then(async () => {
        this.refreshCategory();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Categoría guardada.',
          duration: 2000
        });
        toast.present();
      });
  }

  goBack() {
    this.navCtrl.back();
  }

}
