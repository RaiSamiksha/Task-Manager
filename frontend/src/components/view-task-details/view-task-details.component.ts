import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-view-task-details',
  imports: [CommonModule],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.css',
})
export class ViewTaskDetailsComponent implements OnInit {
  task: any = null;
  project: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const taskName = this.route.snapshot.paramMap.get('taskName');
    console.log('Task Name from route:', taskName);
    if (taskName) {
      const result = this.storageService.getTaskByName(taskName);
      if (result) {
        this.task = result.task;
        this.project = result.project;
        console.log('Task:', this.task);
        console.log('Project:', this.project);
      }
    }
    this.loading = false;
  }

  goBack() {
    if (this.project) {
      this.router.navigate(['/project-details', this.project.projectName]);
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  editTask() {
    if (this.task) {
      this.router.navigate(['/create-update-task', this.task.taskName]);
    }
  }

  deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.storageService.deleteTask(
        this.project.projectName,
        this.task.taskName
      );
      this.goBack();
    }
  }

  updateTaskStatus(newStatus: string) {
    if (this.task && this.project) {
      this.task.status = newStatus;
      this.storageService.updateTask(
        this.project.projectName,
        this.task.taskName,
        { status: newStatus }
      );
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'not-started':
        return '#ffeaa7';
      case 'in-progress':
        return '#74b9ff';
      case 'completed':
        return '#00b894';
      default:
        return '#ddd';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low':
        return '#00b894';
      case 'medium':
        return '#fdcb6e';
      case 'high':
        return '#e17055';
      default:
        return '#ddd';
    }
  }

  navigateToProject() {
    if (this.project) {
      this.router.navigate(['/project-details', this.project.projectName]);
    }
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }
}
