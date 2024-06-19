import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  isDataGridShow = true;
  isBtnCreateShow = true;
  addNewFormValue: boolean = false;
  length = 10;
  searchValue = '';
  pageNo = 1;
  recordsTotal = 0;

  tableData: any;

  productForm!: FormGroup;
  productVariantsForm!: FormGroup;

  productVariantsData: any;
  formArray: any;
  addToGridButtonText: string = "Add to Grid";


  constructor(private authService: AuthService, private toastrService: ToastrService, private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.CreateProductForm();
    this.getProductList();
  }
  CreateProductForm() {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      Brand: ['', Validators.required],
      Type: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.nullValidator],
      Stock: ['', Validators.nullValidator],
    });
  }
  CreateProductvariantsForm() {
    return this.productVariantsForm = this.fb.group({
      Color: ['', Validators.required],
      Specification: ['', Validators.required],
      Size: ['', Validators.required],
      Price: ['', Validators.nullValidator],
      Description: ['', Validators.nullValidator],
      Image: ['', Validators.nullValidator],
      Stock: ['', Validators.nullValidator],
    });
  }
  getProductList() {
    let model = {
      page: this.pageNo,
      length: this.length,
      searchValue: this.searchValue
    }
    this.authService.getProductList(model).subscribe((res: any) => {
      res = JSON.parse(res.data);
      this.tableData = res.Products;
      this.recordsTotal = res.TotalItems;
      console.log(this.tableData);
    }, error => {
      console.log(error);
      this.toastrService.error('', "Data can't found");
    });
  }

  remove(ProductId: string,arg1: string) {
    throw new Error('Method not implemented.');
  }
  edit(ProductId: string) {

  }
  dRemove(_t70: any,_t71: number) {
  throw new Error('Method not implemented.');
  }
  dEdit(_t70: any) {
  throw new Error('Method not implemented.');
  }
  addDetailsFormModel() {
    this.formArray.push(this.CreateProductvariantsForm());
  }
  closeProductVariants() {
    this.addNewFormValue = false;
    this.formArray = [];
    this.addToGridButtonText = "Add to Grid";
  }
  removeVoucherDetailsField(index: number) {
    this.formArray = this.formArray.filter((x: any, i: number) => i != index);
    // const alreadySelectIndex = this.coas.findIndex(c => c.assignIndex == index);
    // if (alreadySelectIndex !== -1) {
    //   this.coas[alreadySelectIndex].assignIndex = -1;
    //   this.coas[alreadySelectIndex].disabled = false;
    // }
  }
  addToGrid() {
    for (const formGroup of this.formArray) {
      const Color = formGroup.get('Color')?.value;
      const Specification = formGroup.get('Specification')?.value;
      const Size = formGroup.get('Size')?.value;
      if (Color == '' || Specification == '' || Size == '') {
        this.toastrService.warning('Warning', 'Fillup existing field');
        return;
      }
    }
    if (this.addToGridButtonText.toLowerCase() != 'update') {

      this.formArray.push(this.CreateProductvariantsForm());
    }
    else {
      const userId = localStorage.getItem('uid');

      for (const formGroup of this.formArray) {
        const VariantId = formGroup.get('VariantId')?.value;
        const Color = formGroup.get('Color')?.value;
        const Specification = formGroup.get('Specification')?.value;
        const Size = formGroup.get('Size')?.value;
        const Description = formGroup.get('Description')?.value;
        const Price = formGroup.get('Price')?.value;
        const Image = formGroup.get('Image')?.value;
        const Stock = formGroup.get('Stock')?.value;
        const index = this.productVariantsData.findIndex((c: any) => c?.VariantId == VariantId);
        this.productVariantsData[index].Color = Color;
        this.productVariantsData[index].Specification = Specification;
        this.productVariantsData[index].Size = Size;
        this.productVariantsData[index].Description = Description;
        this.productVariantsData[index].Price = Price;
        this.productVariantsData[index].Image = Image;
        this.productVariantsData[index].Stock = Stock;
      }
      this.addNewFormValue = false;
      this.formArray = [];
      this.addToGridButtonText = "Add to Grid";
    }
  }
  saveOrUpdateVariants_NewApproach(){}
  Create() {
    this.CreateProductForm();
    this.isDataGridShow = false;
    this.isBtnCreateShow = false;
  }
  Close() {
    const url = this.router.url;
    this.router.navigateByUrl('/SidebarComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
    this.isDataGridShow = true;
    this.isBtnCreateShow = true;
  }
  EditShow() {
    this.isDataGridShow = false;
    this.isBtnCreateShow = false;
  }
}
