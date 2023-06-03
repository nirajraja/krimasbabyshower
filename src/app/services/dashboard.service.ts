import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serviceUrl: string = 'https://npate-heroku-ui-service.herokuapp.com/api/v1/';
  //serviceUrl: string = '/api/v1/';
  constructor(private http: HttpClient) { }

  validateInfo(un: string, pwd: string) {

    let url: string = this.serviceUrl + 'qw/' + un + '/' + pwd + '/asd';

    return this.http.post(url, {});
  }

}
