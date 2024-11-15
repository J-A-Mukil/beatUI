import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/services/project.service';
import { Project } from '../project';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent {
  id!: number;
  project!: Project
  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.project = new Project();
    this.projectService.getProjectById(this.id).subscribe( data => {
      this.project = data;
    });
  }
}
