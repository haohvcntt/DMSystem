import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { StudentSchedule } from '../models/personal-schedule';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import * as _ from 'lodash'; // Import lodash

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    TagModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    AutoCompleteModule,
    InputGroupModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  courses: any[] = [];
  studentSchedule: StudentSchedule[] = [];
  displayedColumns: string[] = ['courseName', 'teacherName', 'roomName', 'date'];
  dataSource = new MatTableDataSource<StudentSchedule>(this.studentSchedule);

  // paginator
  length = 50;
  pageSize = 500;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  selectedItem: any;
  suggestions: any[] = [];

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkNBM0I3MEY5OTZBRTQwMkNCNkU3QzI1MkMyNUJCNDI3OzFjYjZhNDc5Yjk4OTQ0MzU4Y2JkMmE3Y2E2MTM5OTU2OzIwMjQxMDI1MTcwNzAzIiwibmJmIjoxNzI5ODUwODIzLCJleHAiOjE3MzI1MjkyMjMsImlhdCI6MTcyOTg1MDgyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.A9jVh-k06XJCnCjL9GPZAveiliP8nKhK1fk_qBVcx5k'; // Replace with your token

  constructor(private _dashboardService: DashboardService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadStudentSchedule();
    this.getCourse().subscribe(res => {
      this.courses = res;
    });
  }

  loadStudentSchedule(): void {
    this._dashboardService.getPersonalSchedule(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.studentSchedule = data;
      this.dataSource.data = this.studentSchedule;
    });
  }

  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadStudentSchedule();
  }

  search(event: AutoCompleteCompleteEvent): void {
    this.getSuggestions(event.query).subscribe((data: string[]) => {
      // Filter suggestions to match the query for better accuracy and remove duplicates
      this.suggestions = Array.from(new Set(data.filter(item => item.toLowerCase().includes(event.query.toLowerCase()))));
    });
  }

  // Load data từ API để tìm kiếm
  getSuggestions(query: string): Observable<string[]> {
    const url = 'https://iu.cmc-u.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan';
    const params = {
      strQLSV_NguoiHoc_Id: 'D5EBE41E05FD4C7CA511C6FCD6773C68',
      strNgayBatDau: '01-01-2022',
      strNgayKetThuc: '10-08-2024'
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<{ Data: any[] }>(url, { params, headers })
      .pipe(
        map(res => {
          if (Array.isArray(res.Data)) {
            return res.Data.map(item => item.TENHOCPHAN);
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
            const rawData = res.Data.map((item: any) => ({
              id: item.DANGKY_LOPHOCPHAN_ID,
              courseName: item.TENHOCPHAN,
              teacherName: item.GIANGVIEN,
              roomName: item.TENPHONGHOC,
              date: item.THUHOC
            }));

            const courses = _.groupBy(rawData, (item: { courseName: any; }) => item.courseName);
            var courseNames = Object.keys(courses);
            return courseNames; // Ensure a value is returned
          } else {
            return [];
          }
        })
      );
  }

}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}