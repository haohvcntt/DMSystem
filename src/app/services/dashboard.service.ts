import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { groupBy, map, Observable, of } from 'rxjs';
import { StudentSchedule } from '../models/personal-schedule';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = `${environment.apiBaseUrl}/dashboard`;
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkNBM0I3MEY5OTZBRTQwMkNCNkU3QzI1MkMyNUJCNDI3OzFjYjZhNDc5Yjk4OTQ0MzU4Y2JkMmE3Y2E2MTM5OTU2OzIwMjQxMDI1MTcwNzAzIiwibmJmIjoxNzI5ODUwODIzLCJleHAiOjE3MzI1MjkyMjMsImlhdCI6MTcyOTg1MDgyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.A9jVh-k06XJCnCjL9GPZAveiliP8nKhK1fk_qBVcx5k';
  constructor(private http: HttpClient) { }

  getDashboardData() {
    return this.http.get(`${this.baseUrl}`);
  }

  getHello(): Observable<any> {
    return of("Hello World!");
  }

  getPersonalSchedule(page: number, pageSize: number): Observable<StudentSchedule[]> {
    const url = 'https://iu.cmc-u.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan';
    const params = {
      strQLSV_NguoiHoc_Id: 'D5EBE41E05FD4C7CA511C6FCD6773C68',
      strNgayBatDau: '01-01-2022',
      strNgayKetThuc: '10-08-2024'
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Replace with your actual token
    });
    return this.http.get<{ Data: any[] }>(url, { params, headers })
    .pipe(
      map(res => {
        if (Array.isArray(res.Data)) {
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          return res.Data.slice(startIndex, endIndex).map((item: any) => ({
            id: item.DANGKY_LOPHOCPHAN_ID,
            courseName: item.TENHOCPHAN,
            teacherName: item.GIANGVIEN,
            roomName: item.TENPHONGHOC,
            date: item.THUHOC
          }));
        } else {
          return [];
        }
      })
    );
  }

  getCourse(): Observable<any> {
    const url = 'https://iu.cmc-u.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan';
    const params = {
      strQLSV_NguoiHoc_Id: 'D5EBE41E05FD4C7CA511C6FCD6773C68',
      strNgayBatDau: '01-01-2022',
      strNgayKetThuc: '10-08-2024'
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Replace with your actual token
    });
    return this.http.get<{ Data: any[] }>(url, { params, headers })
    .pipe(
      map(res => {
        if (Array.isArray(res.Data)) {
          var rawData = res.Data.map((item: any) => ({
            id: item.DANGKY_LOPHOCPHAN_ID,
            courseName: item.TENHOCPHAN,
            teacherName: item.GIANGVIEN,
            roomName: item.TENPHONGHOC,
            date: item.THUHOC
          }));

          var courses = _.groupBy(rawData, (item: { courseName: any; }) => item.courseName);
          return courses; // Ensure a value is returned

        } else {
          return [];
        }
      })
    );
  }
}
