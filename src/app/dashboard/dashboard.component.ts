import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../services/dashboard.service';
import { StudentSchedule } from '../models/personal-schedule';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import {PaginatorModule} from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonModule,
    PaginatorModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  studentSchedule: StudentSchedule[] = [];
  displayedColumns: string[] = ['courseName', 'teacherName', 'roomName', 'date'];
  dataSource = new MatTableDataSource<StudentSchedule>(this.studentSchedule);

  // paginator
  length = 50;
  pageSize = 500;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];;
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private _dashboardService: DashboardService) { }

  countries: any[] | undefined;

    selectedCountry: string | undefined;

  ngOnInit(): void {
    this.loadStudentSchedule();
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
  }

  ngAfterViewInit(): void {
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
}