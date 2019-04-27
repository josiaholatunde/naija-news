import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CreatePostComponent } from '../components/create-post/create-post.component';
import { PostsListComponent } from '../components/posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'posts', component: PostsListComponent
  },
  {
    path: 'posts/create', component: CreatePostComponent
  },
  {
    path: 'posts/edit/:postId', component: CreatePostComponent
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
