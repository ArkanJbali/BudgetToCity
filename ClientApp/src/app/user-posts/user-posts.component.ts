import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { PostsServiceService } from '../services/posts-service.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Posts[];
  postForm: FormGroup;
  baseURL;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private toastrService: ToastrService, private postsService: PostsServiceService) {
    this.baseURL = baseUrl;
    this.getPosts();
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      //postID: new FormControl(),
      postTitle: new FormControl(),
      postContent: new FormControl(),
      postTime: new FormControl(),
      isApproved: new FormControl(),
      userName: new FormControl(),
      userEmail: new FormControl()
    });
    this.postForm = this.formBuilder.group({
      //postID: [1],
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
      postTime: [null],
      isApproved: [0],
      userName: ['', Validators.required],
      userEmail: ['', Validators.required]
    });
  }
  onSubmit(newEvent) {
    if (this.postForm.valid) {
      this.postForm.controls.postTime.setValue(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.m'));
      console.log('posts form: ', this.postForm.value);
     this.addPost();
    } else {
      this.toastrService.error('Should fill all required fields', 'Error');
    }
  }
  addPost() {
    this.postsService.saveBlogPost(this.postForm.value)
      .subscribe(data => {
        console.log(data);
        this.toastrService.success('Thank you for your comment.', 'Post');
        this.getPosts();
        this.postForm.reset();
        this.postForm = this.formBuilder.group({
          //postID: [1],
          postTitle: ['', Validators.required],
          postContent: ['', Validators.required],
          postTime: [null],
          isApproved: [0],
          userName: ['', Validators.required],
          userEmail: ['', Validators.required]
        });
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error adding comment'));
  }
  getPosts() {
    this.postsService.getBlogPosts()
      .subscribe(data => {
        this.posts = data as Posts[];
        console.log(data);
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
}
export interface Posts {
  postTitle: string;
  postContent: string;
  postTime: Date;
  isApproved: number;
  userName: string;
  userEmail: string;
}
