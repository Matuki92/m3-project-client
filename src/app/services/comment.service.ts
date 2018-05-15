import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  delete(comment): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/comments/${comment._id}`, options)
      .toPromise();
  }

  getByUser(user): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/comments/user/${user._id}`, options)
      .toPromise();
  }
}
