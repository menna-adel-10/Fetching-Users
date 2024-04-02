import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  private usersCache: Map<number, any> = new Map();

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    if (this.usersCache.has(page)) {
      return of(this.usersCache.get(page));
    } else {
      return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
        tap(users => this.usersCache.set(page, users)),
        catchError(this.handleError<any>('getUsers', []))
      );
    }
  }

  getUser(id: number): Observable<any> {
    if (this.usersCache.has(id)) {
      return of(this.usersCache.get(id));
    } else {
      return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        tap(user => this.usersCache.set(id, user)),
        catchError(this.handleError<any>('getUser'))
      );
    }
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
