package com.example.employeeManagement.controller.Model;
import com.example.employeeManagement.Model.employee;
import com.example.employeeManagement.Service.employeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
//@CrossOrigin(origins = "http://localhost:63342")
 class employeeController {
    private final employeeService service;
    public employeeController(employeeService service) { this.service = service; }

    @GetMapping
    public List<employee> getAllEmployees() { return service.getAllEmployees(); }

    @GetMapping("/{id}")
    public employee getEmployee(@PathVariable String id) { return service.getEmployeeById(id); }

    @PostMapping
    public employee createEmployee(@RequestBody employee employee) { return service.addEmployee(employee); }

    @PutMapping("/{id}")
    public employee updateEmployee(@PathVariable String id, @RequestBody employee employee) {
        employee.setId(id);
        return service.updateEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable String id) { service.deleteEmployee(id); }
}
