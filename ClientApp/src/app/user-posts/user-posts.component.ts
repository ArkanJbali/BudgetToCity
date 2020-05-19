import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Posts[];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/UsersPosts').subscribe(result => {
      this.posts = result as Posts[];
      console.log(result);
    }, error => console.log(error));
  }

  ngOnInit() {
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
