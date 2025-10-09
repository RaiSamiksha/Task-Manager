import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create-project',
  imports: [ReactiveFormsModule],
  templateUrl: './create-update-project.component.html',
  styleUrls: ['./create-update-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  projectForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
  });

  isEditMode = false;
  originalProjectName: string | null = null;

  constructor(
    private storageService: StorageService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const projectName = this.route.snapshot.paramMap.get('projectName');

    if (projectName) {
      this.isEditMode = true;
      this.originalProjectName = projectName;

      const project = this.storageService.getProjectByName(projectName);
      console.log(project);
      if (project) {
        this.projectForm.patchValue(project);
      }
    }
  }

  onProjectSubmit() {
    const project = this.projectForm.value;

    if (this.isEditMode && this.originalProjectName) {
      this.storageService.updateProject(this.originalProjectName, project);
      console.log('Project Updated:', project);
    } else {
      this.storageService.addProject(project);
      console.log('Project Created:', project);
    }

    this.projectForm.reset();
    this.router.navigate(['/']); // navigate back to list
  }
}
