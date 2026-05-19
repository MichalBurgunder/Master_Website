import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SquaresComponent } from './components/squares/squares.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { DaysOfComputerComponent } from './components/daysofcomputer/daysofcomputer.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'squares', component: SquaresComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: 'daysofcomputer/:id', component: DaysOfComputerComponent },
  { path: 'thoughts', component: CategoryPageComponent, data: { categoryId: 1 } },
  { path: '365daysofcomputer', component: CategoryPageComponent, data: { categoryId: 2 } },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
