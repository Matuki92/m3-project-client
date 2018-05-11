import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  add(comment): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/comments/add`, comment, options)
      .toPromise();
  }

  delete(comment): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/comments/${comment._id}`, options)
      .toPromise();
  }
}
