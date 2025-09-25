package com.example.employeeManagement;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class corsconfig  {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(@NotNull CorsRegistry registry) {
                    registry.addMapping("/**")  // allow all endpoints
                            .allowedOrigins("http://localhost:63342") // frontend origin
                            .allowedMethods("GET","POST","PUT","DELETE","OPTIONS");
                }
            };
        }
    }


