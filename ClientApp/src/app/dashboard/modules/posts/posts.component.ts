import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private toastrService: ToastrService, ) {
    this.baseURL = baseUrl;
    this.getPosts();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  getPosts() {
    this.http.get(this.baseURL + 'api/UsersPosts').subscribe(result => {
      this.posts = result as Posts[];
      console.log(result);
      this.dataSource = new MatTableDataSource<Posts>(this.posts);
    }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
  updatePost(post) {
    this.currentPost = post;
    console.log('update', post);
    this.checkUpdatePost = true;
 

      //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      //return this.http.put<Posts>('/UpdateEmployeeDetails/',post, httpOptions);
  }
  deletePost(postID) {
    console.log('delete', postID);
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //return this.http.delete<number>('/UpdateEmployeeDetails?+id=' + postID, httpOptions);
  }
  createOrUpdatePost(form) {
    console.log('Form: ', form);
    
    if (this.currentPost && this.currentPost.postID) {
      form.value.id = this.currentPost.postID;
      console.log('Form: ', form);
      this.updatePost(form.value);
      this.toastrService.success('This Post is updated Successfully', 'Update');
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
