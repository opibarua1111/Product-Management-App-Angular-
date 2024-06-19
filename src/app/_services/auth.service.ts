import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environment.apiUrl;
  private accountUrl = this.baseUrl + 'Account/';
  private productUrl = this.baseUrl + 'Product/';

  get<T>(url: string) {
    return this.http.get<any>(url);
  }
  post<T>(url: any, model: any) {
    return this.http.post(url, model);
  }
  put<T>(url: any, model: any) {
    return this.http.put(url, model);
  }
  delete<T>(url: string) {
    return this.http.delete<any>(url);
  }

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.post(this.accountUrl + 'register', model);
  }

  login(model: any) {
    return this.post(this.accountUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user!=undefined && user!="") {
          debugger;
          localStorage.setItem('uid', user.data.id);
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('name', user.data.name);
        }
      })
    );
  }

  //#region Product
  getProductList(model: any) {
    return this.post(this.productUrl + 'getProductList', model);
  }
  //#endregion

}
