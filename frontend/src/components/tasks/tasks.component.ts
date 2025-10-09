import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTableDataSource,
  MatRow,
  MatTableModule,
} from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  imports: [
    MatRow,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  displayedColumns = [
    'position',
    'projectName',
    'taskName',
    'status',
    'priority',
    'deleteTask',
    'editTask',
    'viewTaskDetails',
  ];
  dataSource = new MatTableDataSource<any>([]);
  private router = inject(Router);
  allProjects: any[] = [];

  constructor(private storageservice: StorageService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.allProjects = this.storageservice.getProjects();
    this.dataSource.data = this.allProjects.flatMap(
      (proj: any, index: number) => {
        // If project has tasks
        if (proj.tasks && proj.tasks.length > 0) {
          return proj.tasks.map((task: any, taskIndex: number) => ({
            position: index + 1,
            projectName: proj.projectName || '',
            taskName: task.taskName || '',
            status: task.status || '',
            priority: task.priority || '',
          }));
        }
        return [];
      }
    );

    console.log('datasource', this.dataSource.data);
    console.log(this.allProjects);
  }

  deleteTask(task: any) {
    this.storageservice.deleteTask(task.projectName, task.taskName);
    this.allProjects = this.storageservice.getProjects();
    this.dataSource.data = this.allProjects.flatMap(
      (proj: any, index: number) => {
        if (proj.tasks && proj.tasks.length > 0) {
          return proj.tasks.map((t: any, taskIndex: number) => ({
            position: index + 1,
            projectName: proj.projectName || '',
            taskName: t.taskName || '',
            status: t.status || '',
            priority: t.priority || '',
          }));
        }
        return [];
      }
    );

    console.log('datasource after delete', this.dataSource.data);
  }

  // Removed duplicate editTask method

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createTask() {
    this.router.navigate(['/create-task']);
  }

  viewTaskDetails(task: any) {
    this.router.navigate(['/view-task-details', task.taskName]);
  }

  editTask(task: any) {
    this.router.navigate(['/create-task', task.projectName, task.taskName]);
  }
}
