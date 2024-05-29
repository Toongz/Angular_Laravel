import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  @Input() category: Category = new Category();
  constructor(private categoryService: CategoryService){}
  addCategory(){
    this.categoryService.addCategory(this.category).subscribe(data =>
      {
        alert(data.toString());   
      });
  }
  
}
