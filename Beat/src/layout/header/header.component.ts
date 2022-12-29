import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnInit{
  


  accessString ="001111000000";
  accessArray : string[]=[...this.accessString];
  count =0;
  element=document.getElementsByClassName("accessibility-options");


  getEntity !: any;
  childrenArray ! :any;
  childrendivs!:any;
  childCount=0;
  accessChildren=0;
  char ! :any;
  searchText !: string;

  //Function for the search bar 

  onSearchText(event : any){
    if(event.key==="Enter")
         console.log(this.searchText);
  }


  // diffeent accessibility for different entitlement roles
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

  }
  
  
 constructor(){
 
  
 }

ngOnInit(){

}
  ngAfterViewInit(): void {
    this.accessibility();
    
  }  
  
}