package me.badrul.SqlTools.scriptRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.activation.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScriptRunnerController {

    private ScriptRunnerDao scrDao;

//    @Autowired
//    DataSource dataSource;
    @Autowired
    private JdbcTemplate db;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }

    @PostMapping("/run-script")
    public String runScript(@RequestBody String sc) {
        try {
            db.execute(sc);
        } catch (Exception e) {
            String n = e.toString();
            if (n.contains("ORA")) {
                n = n.substring(n.lastIndexOf("ORA"));
            } 
            return n;
        }
//        db.execute("create table test(no number)");
//        jdbcTemplate.execute("drop table test");
//        scrDao.runScript();
        return "Successfully executed";

    }

    @GetMapping("/get-dabase-info")
    public List getDatabaseInfo() {

////        jdbcTemplate.execute("create table test(no number)");
//        jdbcTemplate.execute("drop table test");
//        return "Success";
////        return scrDao.getDatabaseInfo();
//        StringBuilder sql = new StringBuilder();
//        sql.append(" SELECT HOST_NAME FROM DATABASE_INFO");
//        Map<String, Object> params = new HashMap<>();
//        return db.queryForList(sql.toString(), params);
        return db.queryForList(" SELECT INFO_NO,SCHEMA_NAME FROM DATABASE_INFO WHERE NVL(ACTIVE_FLAG,0)=1");
//       return  scrDao.getDatabaseInfo();
    }
}
