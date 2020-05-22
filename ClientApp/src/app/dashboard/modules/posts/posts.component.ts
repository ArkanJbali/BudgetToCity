import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PostsServiceService } from '../../../services/posts-service.service';
import { Posts } from '../../../models/Posts.model';

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
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private toastrService: ToastrService,
    private postsService: PostsServiceService,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.baseURL = baseUrl;
    this.getPosts();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  refreshTable() {
    this.postsService.getBlogPosts()
      .subscribe(data => {
        this.posts = data;
        this.dataSource.data = data;
        this.changeDetectorRefs.detectChanges();
        //this.dataSource = new MatTableDataSource<Posts>(this.posts);

      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
  getPosts() {
    this.postsService.getBlogPosts()
      .subscribe(data => {
        this.posts = data;
        this.dataSource = new MatTableDataSource<Posts>(this.posts);
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
  updatePost(post) {
    this.currentPost = post;
    this.checkUpdatePost = true;
    
  }
  deletePost(postID) {
    console.log('delete', postID);
    this.postsService.deleteBlogPost(postID).subscribe((data) => {
      this.refreshTable();
    }, error => console.log(error));
    
  }
  createOrUpdatePost(form) {
    
    if (this.currentPost && this.currentPost.postID) {
      form.value.id = this.currentPost.postID;
      this.updatePost(form.value);

      this.postsService.updateBlogPost(form.value.id, form.value)
        .subscribe((data) => {
          this.refreshTable();
          this.toastrService.success('This Post is updated Successfully', 'Update');
        }, error => console.log(error));
      
      
      this.checkUpdatePost = false;
    } else {
      //to create new post should remove the condition from html
      this.toastrService.success('This Post is created Successfully', 'Create new post');
    }
    form.reset();
  }
}

