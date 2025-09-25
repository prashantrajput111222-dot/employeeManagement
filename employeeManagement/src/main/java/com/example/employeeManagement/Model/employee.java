package com.example.employeeManagement.Model;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class employee {
    @Id
    private String id;

    private String name;
    private String email;
    private String jobTitle;
    private String phone;
    private String imageUrl;
}
