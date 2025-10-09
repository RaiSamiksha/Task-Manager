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
  selector: 'app-projects',
  imports: [
    MatRow,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  displayedColumns = [
    'position',
    'projectName',
    'deleteProject',
    'editProject',
    'viewProjectDetails',
  ];
  dataSource = new MatTableDataSource<any>([]);
  private router = inject(Router);
  allProjects: any[] = [];

  constructor(private storageservice: StorageService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.allProjects = this.storageservice.getProjects();
    this.dataSource.data = this.allProjects.map((proj: any, index: number) => ({
      position: index + 1,
      projectName: proj.projectName || '',
    }));
    console.log(this.allProjects);
  }

  deleteProject(project: any) {
    this.storageservice.deleteProject(project.projectName);
    this.allProjects = this.storageservice.getProjects();
    this.dataSource.data = this.allProjects.map((proj: any, index: number) => ({
      position: index + 1,
      projectName: proj.projectName || '',
    }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createProject() {
    this.router.navigate(['/create-update-project']);
  }

  viewProjectDetails(project: any) {
    this.router.navigate(['/project-details', project.projectName]);
  }

  editProject(project: any) {
    this.router.navigate(['/create-update-project', project.projectName]);
  }
}
