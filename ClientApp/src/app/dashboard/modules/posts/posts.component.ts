import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Posts[];
  displayedColumns: string[] = ['Post ID','Title', 'Content', 'DateTime', 'isApproved', 'User Name', 'Email'];
  dataSource = new MatTableDataSource<Posts>(this.posts);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/UsersPosts').subscribe(result => {
      this.posts = result as Posts[];
      console.log(result);
      this.dataSource = new MatTableDataSource<Posts>(this.posts);
    }, error => console.log(error));
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
