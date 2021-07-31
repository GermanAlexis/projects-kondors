import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor( private http: HttpClient ) { }

  get(){
    return this.http.get(`${base_url}/users`)
  }
  getUser(uid: string){
    return this.http.get(`${base_url}/users/${uid}`)
  }

  getUserById(uid: number){
    return this.http.get(`${base_url}/users/filter/${uid}`)
  }

  createUser(data: any) {
    return this.http.post(`${base_url}/users`, data )
  }

  put(uid: string, data:any) {
    return this.http.put(`${base_url}/users/${uid}`, data)
  }

  deleteUser(uid: string){
    return this.http.delete(`${base_url}/users/${uid}`)
  }
}
