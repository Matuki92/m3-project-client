import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BeerService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  listAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/beers`, options)
      .toPromise();
  }

  listActive(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/beers/active`, options)
      .toPromise();
  }

  getOne(id: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/beers/${id}`, options)
      .toPromise();
  }

  addBeer(beer): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/beers/add`, beer, options)
      .toPromise();
  }

  addComment(beerId, text): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {
      text,
      beerId
    }
    return this.httpClient.post(`${this.baseUrl}/beers/comments/add`, data, options)
      .toPromise();
  }

  update(beer): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/beers/${beer._id}`, beer, options)
      .toPromise();
  }

  delete(beer): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/beers/${beer._id}`, options)
      .toPromise();
  }
}
