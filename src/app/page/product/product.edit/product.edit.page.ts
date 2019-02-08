import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ProductService, Product } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product.edit',
  templateUrl: './product.edit.page.html',
  styleUrls: ['./product.edit.page.scss'],
})
export class ProductEditPage implements OnInit {

  categories: Category[] = [];
  product: Product;

  constructor(
    public nav: NavController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public productService: ProductService
  ) {
  }

  ngOnInit() {
    this.refreshProduct();
    this.findCategories();
    this.findById(this.route.snapshot.paramMap.get('id'));
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

  findById(id: string) {
    this.productService.getById(id).subscribe((res: any) => {
      this.product = res;
    });
  }


  async save(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Editando',
    });
    loading.present();
    this.productService.put(this.product, this.route.snapshot.paramMap.get('id'))
      .then(async () => {
        this.refreshProduct();
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
