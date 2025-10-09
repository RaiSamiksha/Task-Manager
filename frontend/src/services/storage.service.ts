import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  // private storageKey = 'projects';

  // =======================
  // PROJECT FUNCTIONS
  // =======================

  getProjects(): any[] {
    return JSON.parse(localStorage.getItem('projects') || '[]');
  }

  saveProjects(projects: any[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  addProject(project: any): void {
    const projects = this.getProjects();
    projects.push({ ...project, tasks: [] }); // attach empty tasks list
    this.saveProjects(projects);
  }

  getProjectByName(projectName: string): any | null {
    const projects = this.getProjects();
    return projects.find((p) => p.projectName === projectName) || null;
  }

  updateProject(oldName: string, updatedProject: any) {
    let projects = this.getProjects();
    const index = projects.findIndex((p) => p.projectName === oldName);

    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedProject };
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }

  deleteProject(projectName: string): void {
    let projects = this.getProjects();
    projects = projects.filter((p) => p.projectName !== projectName);
    this.saveProjects(projects);
  }

  // =======================
  // TASK FUNCTIONS
  // =======================

  addTask(projectName: string, task: any): void {
    const projects = this.getProjects();
    const project = projects.find((p) => p.projectName === projectName);
    if (project) {
      project.tasks.push(task);
      this.saveProjects(projects);
    }
  }

  getTasks(projectName: string): any[] {
    const project = this.getProjectByName(projectName);
    return project ? project.tasks : [];
  }

  deleteTask(projectName: string, taskName: string): void {
    const projects = this.getProjects();
    const project = projects.find((p) => p.projectName === projectName);
    if (project) {
      project.tasks = project.tasks.filter((t: any) => t.taskName !== taskName);
      this.saveProjects(projects);
    }
  }

  getTaskByName(taskName: string): { task: any; project: any } | null {
    const projects = this.getProjects();
    for (const project of projects) {
      const task = project.tasks.find((t: any) => t.taskName === taskName);
      if (task) {
        return { task, project };
      }
    }
    return null;
  }

  updateTask(projectName: string, oldTaskName: string, updatedTask: any) {
    const projects = this.getProjects();
    const project = projects.find((p) => p.projectName === projectName);

    if (project && project.tasks) {
      const index = project.tasks.findIndex(
        (t: any) => t.taskName === oldTaskName
      );
      if (index > -1) {
        project.tasks[index] = updatedTask;
        localStorage.setItem('projects', JSON.stringify(projects));
      }
    }
  }
}
