package me.badrul.SqlTools.QueryBuilder;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "http://192.168.111.11:4200")
@RestController
public class QueryBuilderController {

    @Autowired
    private JdbcTemplate db;

    @GetMapping("/get-table-list")
    public List getTableList() {
        try {
            return db.queryForList("SELECT TABLE_NAME FROM USER_TABLES");
        } catch (Exception ex) {
            return (List) ex;
        }
    }

    @GetMapping("/get-column-list")
    public List getColumnList(@RequestParam String tableName) {
        try {
            return db.queryForList("SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '" + tableName + "'");
        } catch (Exception ex) {
            return (List) ex;
        }

    }

    @GetMapping("/get-has-table")
    public List getHasTable(@RequestParam String tableName) {
        try {
            return db.queryForList("SELECT NVL((SELECT 1 HASTABLE FROM USER_TABLES WHERE TABLE_NAME = '" + tableName + "'),0)HASTABLE FROM DUAL");
        } catch (Exception ex) {
            return (List) ex;
        }
    }

    @GetMapping("/get-hash-column-name")
    public List getHashColumnName(@RequestParam String tableName, @RequestParam String columnName) {
        try {
            return db.queryForList("SELECT NVL((SELECT 1 FROM USER_TAB_COLUMNS\n"
                    + "WHERE TABLE_NAME='" + tableName + "' AND COLUMN_NAME='" + columnName + "'),0)HAS_COLUMN_NAME FROM DUAL");
        } catch (Exception ex) {
            return (List) ex;
        }
    }
}
