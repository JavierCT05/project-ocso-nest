import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { last } from 'rxjs';
import { v4 as uuid} from "uuid";

@Injectable()
export class EmployeesService {
  private  Employees: CreateEmployeeDto[] =  [
  {
    id: uuid(),
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "4423556590"
  },
  {
    id: uuid(),
    name: "Jose",
    lastName: "Perez",
    phoneNumber: "4423556576"
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid()
  
    this.Employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //Retorne todos los empleados
    return this.Employees;
  }

  findOne(id: string) {
    const employee = this.Employees.filter((employee) =>employee.id== id) [0];
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: string) {
    this.findOne(id)
    this.Employees = this.Employees.filter((Employee)=> Employee.id != id);
    return this.Employees;
  }
}
