import { Component, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    taskName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    taskDescription: new FormControl(''),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });
  isEditMode!: boolean;
  projectName!: string;
  originalTaskName!: string;

  constructor(
    private storageService: StorageService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  allProjects: any[] = [];

  ngOnInit() {
    this.allProjects = this.storageService.getProjects();

    const projectName = this.route.snapshot.paramMap.get('projectName');
    const taskName = this.route.snapshot.paramMap.get('taskName');

    if (projectName && taskName) {
      this.isEditMode = true;
      this.projectName = projectName;
      this.originalTaskName = taskName;

      const tasks = this.storageService.getTasks(projectName);
      const task = tasks.find((t) => t.taskName === taskName);

      if (task) {
        this.taskForm.patchValue(task);
      }
    }
  }

  task: any = {};

  onTaskSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;

      if (this.isEditMode) {
        this.storageService.updateTask(
          this.projectName,
          this.originalTaskName,
          task
        );
        console.log('Task updated:', task);
      } else {
        this.storageService.addTask(task.projectName ?? '', task);
        console.log('Task created:', task);
      }

      this.taskForm.reset();
      this.router.navigate(['/tasks']); // go back to tasks list
    }
  }
}
