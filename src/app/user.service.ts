import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PostComment, User, UserPost} from "./data.model";

const serviceUrl = 'https://jsonplaceholder.typicode.com/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get(serviceUrl + "users")
      .pipe(map((result) => {
        return result as User[]
      }));
  }

  getUserPosts(userId: number): Observable<UserPost[]> {
    return this.httpClient.get(serviceUrl + `posts?userId=${userId}`)
      .pipe(map((result) => {
        return result as UserPost[];
      }));
  }

  getCommentsOfPost(postId: number): Observable<PostComment[]> {
    return this.httpClient.get(serviceUrl + `posts/${postId}/comments`)
      .pipe(map((result) => {
        return result as PostComment[];
      }));
  }
}
