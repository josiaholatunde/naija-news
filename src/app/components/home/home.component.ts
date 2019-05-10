import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[];
  mainPosts = [];
  latestPosts = [];

  constructor(private categoryService: CategoryService,
    private postService: PostService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.categories;
      this.categories.forEach(cat => {
        cat.posts = [];
        this.postService.getPostsPerCategory(cat.id).subscribe((res2) => {
            cat.posts = res2.posts;
        });
      });
      console.log('Categories', this.categories[1]);

      for (let i = 0; i < 4; i++) {
        this.postService.getLatestPost(this.categories[i].id)
        .subscribe(result => {
          this.mainPosts.push(result.post);
          this.latestPosts.push(result.post);
          console.log('Posts Main', this.mainPosts);
        });
        if (i === 3) {
          this.latestPosts.splice(0, 1);
        }
      }
    });

  }

}
