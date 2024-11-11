import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { map, Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service'; // Import DashboardService
import { StudentSchedule } from '../models/personal-schedule';

interface ApiResponse {
  Data: any[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,       
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  dashboardData: any;
  courses: any[] = [];
  studentSchedule: StudentSchedule[] = [];
  selectedItem: any;
  suggestions: any[] = [];
  rows = 10; // Default page size

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkNBM0I3MEY5OTZBRTQwMkNCNkU3QzI1MkMyNUJCNDI3Ozc5ZjliMWI1YmQzMDQxMjY4YTg5NTM3NTkyMzVlNzk4OzIwMjQxMTA4MDg1OTA0IiwibmJmIjoxNzMxMDMxMTQ0LCJleHAiOjE3MzM2MjMxNDQsImlhdCI6MTczMTAzMTE0NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.6iFxv7WOF01HdVkfT3isiVm6Kn-U1ugh4ywE7gxCABA'; // Replace with your token

  constructor(private _dashboardService: DashboardService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudentSchedule(0, this.rows);
    this.getCourse().subscribe(res => {
      this.courses = res;
    });
  }

  // Load data based on pagination
  loadStudentSchedule(pageIndex: number, pageSize: number): void {
    this._dashboardService.getPersonalSchedule(pageIndex, pageSize).subscribe((data: any) => {
      this.studentSchedule = data;
    });
  }

  // Handles p-table page event
  onPage(event: any): void {
    this.loadStudentSchedule(event.first, event.rows);
  }

  clear(table: any) {
    table.clear();
  }

  filterGlobal(event: Event, table: any) {
    const target = event.target as HTMLInputElement;
    table.filterGlobal(target.value, 'contains');
  }

  search(event: any): void {
    this.getSuggestions(event.query).subscribe((data: string[]) => {
      this.suggestions = Array.from(new Set(data.filter(item => item.toLowerCase().includes(event.query.toLowerCase()))));
    });
  }

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
    return this.http.get<ApiResponse>(url, { params, headers }) // Use ApiResponse type
      .pipe(
        map((res: ApiResponse) => {
          if (Array.isArray(res.Data)) {
            return res.Data.map(item => item.TENHOCPHAN);
          } else {
            return [];
          }
        })
      );
  }

  getCourse(): Observable<any[]> {
    const url = 'https://iu.cmc-u.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan';
    const params = {
      strQLSV_NguoiHoc_Id: 'D5EBE41E05FD4C7CA511C6FCD6773C68',
      strNgayBatDau: '01-01-2022',
      strNgayKetThuc: '10-08-2024'
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<ApiResponse>(url, { params, headers }) // Use ApiResponse type
      .pipe(
        map((res: ApiResponse) => {
          if (Array.isArray(res.Data)) {
            return res.Data.map(item => ({
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
}