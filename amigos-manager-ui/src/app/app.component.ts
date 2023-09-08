import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
    public employees: Employee[];
    public editEmployee: Employee;
    public deleteEmployee: Employee;

    constructor(private employeeService: EmployeeService){}
 
    ngOnInit()
    {
      this.getEmployees();
    }

    public getEmployees(): void 
    {
      this.employeeService.getEmployees().subscribe(
        (response: Employee[]) => { this.employees = response; },
        (error: HttpErrorResponse) => { alert(error.message); }
                                                  );
    }


    public onAddEmployee(addForm: NgForm): void
    {
      document.getElementById('add-employee-form').click(); // This manually closes the modal AFTER the 'submit' button is pressed
      this.employeeService.addEmployee(addForm.value).subscribe(
          (Response: Employee) => 
            {
              console.log(Response);
              this.getEmployees();
              addForm.reset();
            },
     
          (error: HttpErrorResponse) => 
            {
              alert(error.message);
              addForm.reset();
            }
      );
    }

    public onUpdateEmployee(employee: Employee): void
    {
      this.employeeService.updateEmployee(employee).subscribe(
          (Response: Employee) => 
            {
              console.log(Response);
              this.getEmployees();
            },
     
          (error: HttpErrorResponse) => 
            {
              alert(error.message);
            }
      );
    }

    public onDeleteEmployee(employeeId: number): void
    {
      //document.getElementById('delete-employee-form').click();
      this.employeeService.deleteEmployee(employeeId).subscribe(
          (Response: void) => 
            {
              console.log(Response);
              this.getEmployees();
            },
     
          (error: HttpErrorResponse) => 
            {
              alert(error.message);
            }
      );
    }


    public searchEmployees(key: string): void
    {
      const results: Employee[] = [];
      console.log(key);

      // If "ANY" characters typed in the search bar match  "ANY" employee variable characters
      // then it will return a number greater than -1. If no similliar letter are found, -1 is returned
      for( const employee of this.employees)
      {
        if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
            || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
            || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        {
          results.push(employee);
        }
      }
      
      this.employees = results;
      
      if (results.length === 0 || !key)
      {
        this.getEmployees();
      }

    }



    public onOpenModal(employee: Employee, mode: string): void
    {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
      
      if (mode === 'add')
      {
        button.setAttribute('data-target', '#addEmployeeModal');
        //                                  "addEmployeeModal"
      }

      if (mode === 'edit')
      {
        this.editEmployee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
        //button.style.display = 'flex';     updateEmployeeModal
      }
  
      if (mode === 'delete')
      {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
        //button.style.display = 'flex';
      }
      
      container.appendChild(button);
      button.click();
    }



}



