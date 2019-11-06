package me.badrul.SqlTools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SqlToolsApplication implements WebMvcConfigurer {

  public static void main(String[] args) {
    SpringApplication.run(SqlToolsApplication.class, args);
//        SpringApplication sa = new SpringApplication(SqlToolsApplication.class);
//        sa.setAdditionalProfiles("server.port", "3333");
//        sa.run(args);

  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
  }

}
