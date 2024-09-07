import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { last } from 'rxjs';

@Injectable()
export class EmployeesService {
  private  Employees: CreateEmployeeDto[] =  [
  {
    id: 1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "4423556590"
  },
  {
    id: 2,
    name: "Jose",
    lastName: "Perez",
    phoneNumber: "4423556576"
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.Employees.length + 1
  
    this.Employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //Retorne todos los empleados
    return this.Employees;
  }

  findOne(id: number) {
    const employee = this.Employees.filter((employee) =>employee.id== id) [0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate={
      ...employeeToUpdate,
      ...updateEmployeeDto,
      
    }
    this.Employees = this.Employees.map((employee)=>{
      if (employee.id == id){
        employee =employeeToUpdate
      }
      return employee

    })
    return employeeToUpdate;
  }

  remove(id: number) {
    this.Employees = this.Employees.filter((Employee)=> Employee.id != id);
    return this.Employees;
  }
}
