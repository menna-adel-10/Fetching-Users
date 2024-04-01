import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

   getUsersList(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data as User[])
    );
  }


  getData(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data as User[])
    );
  }

getUserDetails(id: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        return response.data as User; 
      })
    );
  }


}
