import {AfterViewInit, Component} from '@angular/core';
import {UserService} from "../user.service";
import {User, UserPost} from '../data.model';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {
  users: User[] = [];
  userPosts: UserPost[] = [];
  selectedUser = '';
  pageSize = 3;
  pagedPosts: UserPost[] = [];
  allLoaded = false;
  postStates: number[] = [];

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(usersApiResult => {
      this.users = [...usersApiResult.filter((value, index) => index < 6)];
    });
  }

  getUserFirstName(userName: string): string {
    return userName.substring(0, userName.indexOf(' '));
  }

  fetchUserPosts(user: User): void {
    this.clearUserData().subscribe(value => {
      this.selectedUser = user.name;
      this.userService.getUserPosts(user.id).subscribe(userPosts => {
        this.userPosts = [...userPosts];
        this.pagedPosts = [...userPosts.slice(0, this.pageSize)]
      });
    });
  }

  loadAllPosts(): void {
    this.allLoaded = true;
    this.pagedPosts = [...this.userPosts];
  }

  loadComments(post: UserPost): void {
    if (!post.comments){
      this.userService.getCommentsOfPost(post.id).subscribe(postComments => {
        post.comments = postComments;
      });
    }
    if (this.isExpanded(post.id)) {
      this.postStates.splice(this.postStates.indexOf(post.id), 1);
    } else {
      this.postStates.push(post.id);
    }
  }

  isExpanded(postId: number): boolean {
    return this.postStates.filter(value => value === postId).length > 0;
  }

  clearUserData(): Observable<string> {
    this.userPosts = [];
    this.pagedPosts = [];
    this.postStates = [];
    this.allLoaded = false;
    return of('user data cleared');
  }
}
