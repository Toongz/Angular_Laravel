import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {
  CategoryList:any = [];
  ModalTitle: string = "";
  ActivateAddEditMovieComp: boolean = false;
  category: Category = new Category();
  constructor(private cagtegoryService: CategoryService){}

  ngOnInit(){
    this.refreshCategoryList();
  }
  addClick(){
    this.ModalTitle = "Add category";
    this.ActivateAddEditMovieComp = true;
  }
  deleteClick(item: any){
    if(confirm("Are you sure?")){
      this.cagtegoryService.delete(item).subscribe(data => {
        alert(JSON.stringify(data));
        this.refreshCategoryList();
      });
    }
  }
  closeClick(){
    this.ActivateAddEditMovieComp=false;
    this.refreshCategoryList();
  }
  refreshCategoryList(){
    this.cagtegoryService.getCategories().subscribe((data:any) => {
      this.CategoryList = data;
    });
  }




}
