import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './app-router/app-router.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { AlertifyService } from './services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CreatePostComponent,
    PostsListComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    AlertifyService,
    NgxSpinnerService,
    ErrorInterceptor,
    AuthInterceptor,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
