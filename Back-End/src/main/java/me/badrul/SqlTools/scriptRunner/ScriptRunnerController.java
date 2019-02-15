package me.badrul.SqlTools.scriptRunner;



import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScriptRunnerController {

//    @Autowired
//    DataSource dataSource;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }

//    @RequestMapping("/hello")
//    public String hello() {
//
//        jdbcTemplate.execute("create table test(no number)");
////        jdbcTemplate.execute("drop table test");
//        return "Success";
//
//    }
}
