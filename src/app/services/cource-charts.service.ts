import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourceChartsService {

  private apiUrl  = 'https://54s06fdp-3520.inc1.devtunnels.ms/user/Get_Dashboard/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMjY1ODE1MH0.p52PtHJiV9Mejc3HDRU_K565fjqFT1839_UR686Zj8I'
    })
  };

  constructor(private http: HttpClient) { }

  getcourceData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }
}
