// host.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../environments/environment';

@Injectable()
export class HostService {
private apiUrl = "http://127.0.0.1:5000"

  constructor(private http: HttpClient) { }

  getHosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/hosts`);
  }

  createHost(hostData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/hosts`, hostData);
  }

  updateHost(hostId: string, hostData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/hosts/${hostId}`, hostData);
  }

  deleteHost(hostId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/hosts/${hostId}`);
  }
}
