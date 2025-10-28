import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateProjectComponent } from '../components/create-update-project/create-update-project.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { ViewProjectDetailsComponent } from '../components/view-project-details/view-project-details.component';
import { ViewTaskDetailsComponent } from '../components/view-task-details/view-task-details.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-update-project', component: CreateProjectComponent },
  {
    path: 'create-update-project/:projectName',
    component: CreateProjectComponent,
  },
  {
    path: 'create-task/:projectName/:taskName',
    component: CreateTaskComponent,
  },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  {
    path: 'project-details/:projectName',
    component: ViewProjectDetailsComponent,
  },
  { path: 'view-task-details/:taskName', component: ViewTaskDetailsComponent },
  { path: 'user-management', component: UserManagementComponent },
];
