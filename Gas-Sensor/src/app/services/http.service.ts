import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
    public getMusicFileNames(api: string): Observable<any> {
      let result =  this.http.get(environment.endpoint + api);
      return result;
    }
   
}
