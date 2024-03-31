import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsersList(searchTerm: string): Observable<User[]> {
    const url = `${this.apiUrl}?q=${searchTerm}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data as User[])
    );
  }

  
}
