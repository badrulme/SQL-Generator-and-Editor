package me.badrul.SqlTools.scriptRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.activation.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping("/run-script")
    public String runScript(@RequestBody String sc) {
        try {
            db.execute(sc);
        } catch (Exception e) {
            return e.toString();
        }
//        db.execute("create table test(no number)");
//        jdbcTemplate.execute("drop table test");
//        scrDao.runScript();
        return "Success";

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
        return db.queryForList(" SELECT INFO_NO,SCHEMA_NAME FROM DATABASE_INFO");
//       return  scrDao.getDatabaseInfo();
    }
}
