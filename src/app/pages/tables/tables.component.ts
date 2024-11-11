import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { DashboardService } from '../../services/dashboard.service';
import { StudentSchedule } from '../../models/personal-schedule';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';




export interface CourseData {
  courseName: string;
  teacherName: string;
  roomName: string;
  date: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesComponent implements OnInit {

  dashboardData: any;
  studentSchedule: StudentSchedule[] = [];
  displayedColumns: string[] = ['courseName', 'teacherName', 'roomName', 'date'];
  dataSource: StudentSchedule[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 500;

  get paginatedData(): CourseData[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.dataSource.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

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
      this.dataSource = data;
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