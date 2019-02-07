import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Product, ProductService } from 'src/app/service/product.service';
import { Category, CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product.new',
  templateUrl: './product.new.page.html',
  styleUrls: ['./product.new.page.scss'],
})
export class ProductNewPage implements OnInit {

  categories: Category[] = [];
  product: Product;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public categoryService: CategoryService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.refreshProduct();
    this.findCategories();
  }

  private refreshProduct(): void {
    this.product = {
      name: undefined,
      category: {
        name: undefined,
        description: undefined
      },
      stock: undefined,
      purchasePrice: undefined,
      salePrice: undefined,
    };
  }

  private findCategories(): void {
    this.categoryService.get().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
    });

  }

  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
    });
    loading.present();
    this.productService.post(this.product)
      .then(async () => {
        this.refreshProduct();
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
