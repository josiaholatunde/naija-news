import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { FormMode } from 'src/app/models/FormMode';
import { forkJoin } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  categories = [];
  @ViewChild('postFormControl') postFormControl: NgForm;
  postFormGroup: FormGroup;
  formMode = FormMode.Create;
  currentPost: Post;
  imagePreview: string | ArrayBuffer;
  postId: string;

  constructor(private postService: PostService, private alertify: AlertifyService, private router: Router,
     private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.initializeFormGroup();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.formMode = FormMode.Edit;
        const postId = paramMap.get('postId');
        forkJoin( this.postService.getPost(postId),
          this.categoryService.getCategories())
          .subscribe(([res, res2]) => {
              const {id, title, description, category, dateCreated, imagePath} = res.post;
              this.postId = id;
              this.categories = res2.categories;
              this.postFormGroup.setValue({
                title,
                description,
                category,
                image: imagePath
              });
              this.alertify.success(res.message);
            }, err => this.alertify.error('Error in fetching Post'));
      } else {
        this.categoryService
        .getCategories()
        .subscribe(res => this.categories = res.categories);

        this.formMode = FormMode.Create;
      }
      console.log(this.categories);
    });

  }
  initializeFormGroup() {
    this.postFormGroup = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(65)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      category: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
  }
  createPost() {
    if (this.postFormGroup.invalid) {
      return;
    }
    if (this.formMode === FormMode.Create) {
      this.postService
      .createPost(this.postFormGroup.value)
      .subscribe(message => {
        this.alertify.success(message);
      }, err => this.alertify.error(err),
      () => {
        this.postFormGroup.reset();
        this.router.navigate(['posts']);
      });
    } else {
      console.log('Form Mode', this.formMode);
      this.postService
      .editPost({...this.postFormGroup.value, id: this.postId})
      .subscribe((message) => {
        this.alertify.success(message);
      }, err => this.alertify.error(err),
      () => {
        this.postFormGroup.reset();
        this.router.navigate(['posts']);
      });
    }

  }
  onImagePicked(event: Event) {
    const elem = (event.target as HTMLInputElement).files[0];
    this.postFormGroup.patchValue({
      image: elem
    });
    this.postFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(elem);
  }

}
