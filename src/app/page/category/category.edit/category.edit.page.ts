import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { CategoryService, Category } from 'src/app/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category.edit',
  templateUrl: './category.edit.page.html',
  styleUrls: ['./category.edit.page.scss'],
})
export class CategoryEditPage implements OnInit {
  category: Category;

  constructor(
    public nav: NavController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    public categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.refreshCategory();
    this.findById(this.route.snapshot.paramMap.get('id'));
  }

  private refreshCategory(): void {
    this.category = {
      name: undefined,
      description: undefined
    };
  }

  findById(id: string) {
    this.categoryService.getById(id).subscribe((res: any) => {
      this.category = res;
    });
  }


  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Editando',
    });
    loading.present();
    this.categoryService.put(this.category, this.route.snapshot.paramMap.get('id'))
      .then(async () => {
        this.refreshCategory();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Categoría editada.',
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
