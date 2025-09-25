package com.example.employeeManagement.Repository;
import com.example.employeeManagement.Model.employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface employeeRepository extends MongoRepository<employee,String> {
}
