package com.example.employeeManagement.Service;


import com.example.employeeManagement.Model.employee;
import com.example.employeeManagement.Repository.employeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class employeeService {

    private final employeeRepository repository;

    public employeeService(employeeRepository repository) {
        this.repository = repository;
    }

    public List<employee> getAllEmployees() { return repository.findAll(); }
    public employee getEmployeeById(String id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found")); }
    public employee addEmployee(employee employee) { return repository.save(employee); }
    public employee updateEmployee(employee employee) { return repository.save(employee); }
    public void deleteEmployee(String id) { repository.deleteById(id); }
}