import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http:HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTasks`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createTask`, task);
  }

  updateTask(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTask/${id}`, {status});
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTask/${id}`);
  }

}
