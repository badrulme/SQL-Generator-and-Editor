package me.badrul.SqlTools.apiCreator;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class ApiCreatorDao {
  //  private final NamedParameterJdbcTemplate db;
  private final JdbcTemplate db;

  public ApiCreatorDao(JdbcTemplate db) {
    this.db = db;
  }

  public List getColumnList(String tableName) {
    return db.queryForList("SELECT COLUMN_NAME,DATA_TYPE FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "'");
  }
}
