import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'app/services/shared.service';
import { SearchService } from 'app/services/search.service';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements AfterViewInit, OnInit{
  
//getting value from cookie 

  accessString ='';
  accessArray : string[]=[];
  count =0;
  element=document.getElementsByClassName("accessibility-options");
  empId !: any;
  

  getEntity !: any;
  childrenArray ! :any;
  childrendivs!:any;
  childCount=0;
  accessChildren=0;
  char ! :any;
  searchText : string ='';

  employees : any=[];

  id ! :number;
  name! :string; 
  data ! :any
  constructor(private httpClient :HttpClient, private authservice : AuthService, private sharedData :SharedService, public router :Router, public search :SearchService,
    private empService :EmployeeService){
  }
  
ngOnInit(){

  this.empService.getEmployeeList().subscribe(response=>{
    this.employees=response;
    console.log(this.employees);
  })

}
 


  //Function for the search bar 
  
  onSearchText(){
    document.getElementById("employeeList")?.setAttribute("style","display:block");
      //  this.search.getSearchedData(this.searchText).subscribe(response=>{
      //   this.employees=response;
      //   console.log(this.employees)
      //   console.log(event.target.blur());
      //  })
  }
  
  clickthis(){
    document.getElementById("employeeList")?.setAttribute("style","display:none");
  }

  toProfile(e :any){
    e=Number(e);
    this.router.navigate(['/profile', e]);
  }
  
  
  // different accessibility for different entitlement roles
   accessibility() {

    this.char=this.accessArray;
    this.getEntity= this.element[0].children;
  
   //disable the whole employee, organization and project option for the user
   if(this.char[0]==='0' && this.char[1]==='0' && this.char[2]==='0' && this.char[3]==='0')
   {
   this.getEntity[0].setAttribute("style","display:none");
   }
   
   if(this.char[4]==='0' && this.char[5]==='0' && this.char[6]==='0' && this.char[7]==='0')
   {
   this.getEntity[1].setAttribute("style","display:none");
   }

   if(this.char[8]==='0' && this.char[9]==='0' && this.char[10]==='0' && this.char[11]==='0')
   {
   this.getEntity[2].setAttribute("style","display:none");
   }


   this.childrenArray= this.element[0].children[this.childCount].getElementsByTagName('li');
   
   this.accessArray.forEach((char,index)=>{
    
            if(index%4===0 && index>0)
            {
               this.childCount++;
               this.accessChildren=0;
               this.childrenArray= this.element[0].children[this.childCount].getElementsByTagName('li');
            }

            if(char==='0')
            {
                this.childrenArray[this.accessChildren].setAttribute('style','display:none');
            }
            
            this.accessChildren++;

   })



   //displaying list


  }
  
  
  ngAfterViewInit(){
    this.sharedData.currentValue.subscribe(ID =>{
      this.accessString=ID;
      this.accessString=this.accessString.split(',').join("");
      this.accessArray=[...this.accessString];

      //setting update employee character
      this.sharedData.setEmpUpdate(this.accessArray[2]);

      //setting update project character
      this.sharedData.setProjectUpdate(this.accessArray[6]);
      this.sharedData.currentProjectUpdate.subscribe((x)=>
      console.log(x));

      //setting update organization character
      this.sharedData.setOrgUpdate(this.accessArray[10]);
      this.sharedData.currentOrgUpdate.subscribe((x)=>{

      })

    });
    this.accessibility();
    
  }  
  

  getDetails(){
    this.empId=Number(localStorage.getItem('empId'));
    if(document.getElementById("profile_list")?.style.display==='block'){
            document.getElementById("profile_list")?.setAttribute("style",'display: none');
    }
    else
    {
      document.getElementById("profile_list")?.setAttribute("style",'display: block');
    }
    
  }
  
  showProfile(){
    this.router.navigate(['/profile', this.empId ]);
    document.getElementById("profile_list")?.setAttribute("style",'display: none');
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);
    document.getElementById("profile_list")?.setAttribute("style",'display: none');
  }
}


