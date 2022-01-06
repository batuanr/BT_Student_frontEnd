import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Student} from '../model/Student';
import {Gender} from '../model/Gender';
const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  status: any;
  getStatus(): any{
    return this.status;
  }
  setStatus(status: string): void {
    this.status = status;
  }
  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]>{
    return this.http.get<Student[]>(API);
  }
  getGender(): Observable<Gender[]>{
    return this.http.get<Gender[]>(API + '/gender');
  }
  create(student: Student): Observable<Student>{
    return this.http.post<Student>(API + '/create', student);
  }
  update(id: number, student: Student): Observable<Student>{
    return this.http.put<Student>(API + '/update/' + id, student);
  }
  findById(id: number): Observable<Student>{
    return this.http.get<Student>(API + '/' + id);
  }
  delete(id: number): Observable<Student>{
    return this.http.delete<Student>(API + '/delete/' + id);
  }
}
