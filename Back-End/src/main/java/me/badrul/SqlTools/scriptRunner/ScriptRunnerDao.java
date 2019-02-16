package me.badrul.SqlTools.scriptRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ScriptRunnerDao {

    @Autowired
    private JdbcTemplate db;

    public List getDatabaseInfo() {
        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT INFO,HOST_NAME FROM DATABASE_INFO");
        Map<String, Object> params = new HashMap<>();
        return db.queryForList(sql.toString(), params);
    }

    public void runScript() {

        db.execute("create table test(no number)");

    }
}
