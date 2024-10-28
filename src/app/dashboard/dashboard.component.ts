import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../services/dashboard.service';
import { StudentSchedule } from '../models/personal-schedule';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonModule
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
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadStudentSchedule();
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
