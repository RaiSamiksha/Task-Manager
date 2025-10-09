import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-project-details',
  imports: [CommonModule],
  templateUrl: './view-project-details.component.html',
  styleUrl: './view-project-details.component.css',
})
export class ViewProjectDetailsComponent {
  constructor(
    private storageservice: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  project: any;
  ngOnInit() {
    const projectName = this.route.snapshot.paramMap.get('projectName');
    console.log('Project Name from route:', projectName);
    if (projectName) {
      this.project = this.storageservice.getProjectByName(projectName);
      console.log(this.project);
    }
  }

  editTask(task: any) {
    console.log('Editing task:', task);
    // Add your edit task logic here
    // You can navigate to edit form or open a modal
  }

  deleteTask(task: any) {
    console.log('Deleting task:', task);
    if (confirm('Are you sure you want to delete this task?')) {
      // Find and remove the task from the project
      const taskIndex = this.project.tasks.findIndex((t: any) => t === task);
      if (taskIndex > -1) {
        this.project.tasks.splice(taskIndex, 1);
        // You can add logic here to save the updated project back to storage
        console.log('Task deleted successfully');
      }
    }
  }

  // Chart calculation methods
  getStatusCount(status: string): number {
    if (!this.project?.tasks) return 0;
    return this.project.tasks.filter((task: any) => task.status === status)
      .length;
  }

  getStatusPercentage(status: string): number {
    const total = this.project?.tasks?.length || 0;
    if (total === 0) return 0;
    return (this.getStatusCount(status) / total) * 100;
  }

  getNotStartedArc(): number {
    const percentage = this.getStatusPercentage('not-started');
    return (percentage / 100) * 502; // 502 is the circumference (2 * π * 80)
  }

  getInProgressArc(): number {
    const percentage = this.getStatusPercentage('in-progress');
    return (percentage / 100) * 502;
  }

  getCompletedArc(): number {
    const percentage = this.getStatusPercentage('completed');
    return (percentage / 100) * 502;
  }

  navigateToTask(task: any) {
    this.router.navigate(['/view-task-details', task.taskName]);
  }
}
