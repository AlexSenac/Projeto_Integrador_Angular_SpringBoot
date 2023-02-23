
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API = "/api/users";

  constructor(private httpClient:HttpClient) { }

  list() {
    return this.httpClient.get<Users[]>(this.API)
      .pipe(
        first(),
        //delay(5000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Users>(`${this.API}/${id}`);
  }

  save(record: Partial<Users>) {
    // console.log(record);
    if (record._id) {
      // console.log('update');
      return this.update(record);
    }
    // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Users>) {
    return this.httpClient.post<Users>(this.API, record).pipe(first());
  }

  private update(record: Partial<Users>) {
    return this.httpClient.put<Users>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  getUserData(username:string, password:string) {
    return this.httpClient.get('/api/users')
  }
}



