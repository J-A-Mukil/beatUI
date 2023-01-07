import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from 'app/services/organization.service';
import { organization } from '../organization';


@Component({
  selector: 'app-organizationlist',
  templateUrl: './organizationlist.component.html',
  styleUrls: ['./organizationlist.component.css']
})
export class OrganizationlistComponent {
  organizations: organization[]=[];
  orgArray : any=[];
  employees : any=[];

  constructor(private organizationService: OrganizationService,
    private router: Router) { }



  ngOnInit(): void {
    this.getOrganizations();
  }

  private getOrganizations(){
    this.organizationService.getOrganizationsList().subscribe(data => {
      this.orgArray = data;
      console.log(this.orgArray)
    });
  }

  organizationDetails(id: number){
    this.router.navigate(['view-organization', id]);
  }

  updateOrganization(id: number){
    this.router.navigate(['update-organization', id]);
  }

  organizationHierarchy(id :number)
  {
    this.router.navigate(['hierarchy', id]);
  }
}