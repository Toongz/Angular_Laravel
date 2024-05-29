import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { WatchMovieComponent } from './components/watch-movie/watch-movie.component';
import { CheckAdminGuard } from './guards/check-admin.guard';

import { AddEditMovieComponent } from './components/management/movie-manage/add-edit-movie/add-edit-movie.component';
import { ShowMovieComponent } from './components/management/movie-manage/show-movie/show-movie.component';
import { ManagementComponent } from './components/management/movie-manage/management.component';

import { ShowCategoryComponent } from './components/management/category-manage/show-category/show-category.component';
import { AddCategoryComponent } from './components/management/category-manage/add-category/add-category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent} ,
  {path: 'detail/:id', component: DetailComponent},
  {path: 'movie/:id', component: WatchMovieComponent},
  {path: 'user', component: UserComponent },
  {path: 'search', component: SearchComponent },
  {path: 'management', component: ManagementComponent ,
    children: [
      { path: 'movies',component: ShowMovieComponent  },
      { path: 'categories', component: ShowCategoryComponent }

    ],
    canActivate: [CheckAdminGuard]},
 
  
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    DetailComponent,
    WatchMovieComponent,
    AddEditMovieComponent,
    ShowMovieComponent,
    ManagementComponent,

    ShowCategoryComponent,
    AddCategoryComponent,
    NavbarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    CheckAdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
