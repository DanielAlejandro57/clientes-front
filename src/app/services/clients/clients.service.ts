import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {


  baseURL: string = "http://localhost:8080/api/v1/";
  constructor(private http: HttpClient) { }


  createClient(newUser: Client) {
    const endpoint = this.baseURL + "addClient";
    return new Promise(resolve => {
      this.http.post(endpoint, newUser).subscribe((data: any) => {
        resolve(data);
      }, error => {
        if (error.status == 200) {
          resolve(error.error.text);
        }
        else { resolve(0); }
      });
    });
  }


  getClients() {
    return this.http.get<any[]>(this.baseURL + "getClients");
  }

  getBySharedKey(sharedKey: string): Observable<any> {
    return this.http.get(this.baseURL + 'getBySharedKey?sharedKey=' + sharedKey)
  }


}
