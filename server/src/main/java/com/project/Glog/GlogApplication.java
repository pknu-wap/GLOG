package com.project.Glog;

import com.project.Glog.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class GlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(GlogApplication.class, args);
	}

}
