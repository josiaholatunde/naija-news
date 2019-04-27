import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './app-router/app-router.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { AlertifyService } from './services/alertify.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CreatePostComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
