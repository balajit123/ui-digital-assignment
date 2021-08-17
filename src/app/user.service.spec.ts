import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const usersMock =[
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    }
];

describe(`UserService`, () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('User service tests', () => {

    it('getUsers should call the users api', () => {
      service.getUsers().subscribe(result => {
        expect(typeof result).toBe('Array');
      });
      const httpRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(httpRequest.request.method).toEqual("GET");
      httpRequest.flush(usersMock);
    });

    it('getUserPosts should call the posts api', () => {
      service.getUserPosts(1).subscribe(result => {
        expect(typeof result).toBe('Array');
      })
      const httpRequest = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/posts?userId=1`);
      expect(httpRequest.request.method).toEqual("GET");
      httpRequest.flush([]);
    });

    it('getCommentsOfPost should call the posts api', () => {
      service.getCommentsOfPost(1).subscribe(result => {
        expect(typeof result).toBe('Array');
      })
      const httpRequest = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/posts/1/comments`);
      expect(httpRequest.request.method).toEqual("GET");
      httpRequest.flush([]);
    });

  });

});
