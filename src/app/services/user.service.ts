import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private baseUrl = 'https://tapman-matuki.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getList(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/users`, options)
      .toPromise();
  }

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

  addFavorite(beerId): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {
      beer: beerId
    };
    return this.httpClient.post(`${this.baseUrl}/users/me/favorites`, data, options)
      .toPromise();
  }

  removeFavorite(beerId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/users/me/favorites/${beerId}`, options)
      .toPromise();
  }

  delete(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/users/${userId}`, options)
      .toPromise();
  }
  // delete(user): Promise<any> {}
}
