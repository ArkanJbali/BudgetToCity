import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PostsServiceService } from '../../../services/posts-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Posts[];
  currentPost: Posts = { postID: null, postTitle: null, postContent: null, postTime: null, isApproved: null, userName: null, userEmail: null };
  checkUpdatePost: boolean = false;
  displayedColumns: string[] = ['Post ID','Title', 'Content', 'DateTime', 'isApproved', 'User Name', 'Email', 'Edit'];
  dataSource = new MatTableDataSource<Posts>(this.posts);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  baseURL;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private toastrService: ToastrService, private postsService: PostsServiceService) {
    this.baseURL = baseUrl;
    this.getPosts();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  getPosts() {
    this.postsService.getBlogPosts()
      .subscribe(data => {
        this.posts = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Posts>(this.posts);
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
    //this.http.get(this.baseURL + 'api/UsersPosts').subscribe(result => {
    //  this.posts = result as Posts[];
    //  console.log(result);
    //  this.dataSource = new MatTableDataSource<Posts>(this.posts);
    //}, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
  updatePost(post) {
    this.currentPost = post;
    console.log('update', post);
    this.checkUpdatePost = true;
    
  }
  deletePost(postID) {
    console.log('delete', postID);
    this.postsService.deleteBlogPost(postID).subscribe((data) => {
      console.log('res: ', data);
    }, error => console.log(error));
    this.getPosts();
  }
  createOrUpdatePost(form) {
    console.log('Form: ', form);
    
    if (this.currentPost && this.currentPost.postID) {
      form.value.id = this.currentPost.postID;
      console.log('Form: ', form);
      this.updatePost(form.value);

      this.postsService.updateBlogPost(form.value.id, form.value)
        .subscribe((data) => {
          console.log(data);
          
          this.toastrService.success('This Post is updated Successfully', 'Update');
        }, error => console.log(error));




      
      this.getPosts();
      this.checkUpdatePost = false;
    } else {
      //to create new post should remove the condition from html
      this.toastrService.success('This Post is created Successfully', 'Create new post');
      this.getPosts();
    }
  }
}
export interface Posts {
  postID: number;
  postTitle: string;
  postContent: string;
  postTime: Date;
  isApproved: number;
  userName: string;
  userEmail: string;
}
