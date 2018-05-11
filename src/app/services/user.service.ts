import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // getList(): Promise<any> {}

  getOne(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/users/${id}`, options)
      .toPromise();
  }

  update(user): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/users/${user._id}`, user, options)
      .toPromise();
  }

  // delete(user): Promise<any> {}
}
