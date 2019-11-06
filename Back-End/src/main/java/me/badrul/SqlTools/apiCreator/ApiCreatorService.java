package me.badrul.SqlTools.apiCreator;

import me.badrul.SqlTools.utils.UtilStringConversion;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ApiCreatorService {
  private final ApiCreatorDao apiCreatorDao;

  public ApiCreatorService(ApiCreatorDao apiCreatorDao) {
    this.apiCreatorDao = apiCreatorDao;
  }

  public void getColumnDetails(String tableName, String baseFileName) {
    String repository, service;
    String tabName = UtilStringConversion.getCamelCaseUpperFromSnakeCase(tableName);
    String tabNameLower = UtilStringConversion.getCamelCaseLowerFromSnakeCase(tableName);
    if (baseFileName==null) {
      baseFileName = tabName;
    }
    repository =
        "package com.nahalit.nahalapimanager.repository;\n" +
            "\n" +
            "import com.nahalit.nahalapimanager.model." + tabName + ";\n" +
            "import org.springframework.data.jpa.repository.JpaRepository;\n" +
            "import org.springframework.stereotype.Repository;\n" +
            "\n" +
            "@Repository\n" +
            "public interface " + tabName + "Repository extends JpaRepository<" + tabName + ",Long> {\n" +
            "\n" +
            "}";
    System.out.println(repository);
    service =
        "package com.nahalit.nahalapimanager.service;\n" +
            "\n" +
            "import com.nahalit.nahalapimanager.exception.ResourceNotFoundException;\n" +
            "import com.nahalit.nahalapimanager.repository." + tabName + ";\n" +
            "import com.nahalit.nahalapimanager.utillibrary.UtillDate;\n" +
            "import com.nahalit.nahalapimanager.model." + tabName + ";\n" +
            "import org.springframework.beans.factory.annotation.Autowired;\n" +
            "import org.springframework.stereotype.Service;\n" +
            "\n" +
            "import java.text.ParseException;\n" +
            "import java.util.HashMap;\n" +
            "import java.util.List;\n" +
            "import java.util.Map;\n" +
            "import java.util.concurrent.RejectedExecutionException;\n" +
            "\n" +
            "@Service\n" +
            "public class " + baseFileName + " {\n" +
            "\n" +
            "  private " + tabName + "Repository " + tabNameLower + "Repository;\n" +
            "  private AuthService authService;\n" +
            "\n" +
            "  @Autowired\n" +
            "  public RL1001Service(" + tabName + "Repository " + tabNameLower + "Repository, AuthService authService) {\n" +
            "    this." + tabNameLower + "Repository = " + tabNameLower + "Repository;\n" +
            "    this.authService = authService;\n" +
            "  }\n" +
            "\n" +
            "\n" +
            "  // " + tabName + " Setup\n" +
            "  public List<" + tabName + "> getAll" + tabName + "() {\n" +
            "    return this." + tabNameLower + "Repository.findAll();\n" +
            "  }\n" +
            "\n" +
            "  public " + tabName + " get" + tabName + "(Long facingNo) throws ResourceNotFoundException {\n" +
            "    return this." + tabNameLower + "Repository.findById(facingNo).orElseThrow(() -> new ResourceNotFoundException(\"Transaction not found for this id:\" + facingNo));\n" +
            "  }\n" +
            "\n" +
            "  public " + tabName + " save" + tabName + "(" + tabName + " " + tabNameLower + ") throws ParseException {\n" +
            "    " + tabNameLower + ".setSsCreatedOn(UtillDate.getDateTime());\n" +
            "    " + tabNameLower + ".setSsModifiedOn(null);\n" +
            "    " + tabNameLower + ".setSsCreator(authService.getUserNo());\n" +
            "    return this." + tabNameLower + "Repository.save(" + tabNameLower + ");\n" +
            "  }\n" +
            "\n" +
            "  public List<" + tabName + "> save" + tabName + "List(List<" + tabName + "> " + tabNameLower + "List) {\n" +
            "    return this." + tabNameLower + "Repository.saveAll(" + tabNameLower + "List);\n" +
            "  }\n" +
            "\n" +
            "  public " + tabName + " update" + tabName + "(" + tabName + " " + tabNameLower + ") throws ResourceNotFoundException, ParseException {\n" +
            "    " + tabName + " oldData = this." + tabNameLower + "Repository.findById(" + tabNameLower + ".getFacingNo()).orElseThrow(() -> new ResourceNotFoundException(\"Transaction not found for this:\" + " + tabNameLower + ".getFacingNo()));\n" +
            "    " + tabNameLower + ".setSsModifiedOn(UtillDate.getDateTime());\n" +
            "    " + tabNameLower + ".setSsCreatedOn(oldData.getSsCreatedOn());\n" +
            "    " + tabNameLower + ".setSsModifier(authService.getUserNo());\n" +
            "    return this." + tabNameLower + "Repository.save(" + tabNameLower + ");\n" +
            "  }\n" +
            "\n" +
            "  public Map delete" + tabName + "(Long facingNo) {\n" +
            "\n" +
            "    this." + tabNameLower + "Repository.findById(facingNo).orElseThrow(() -> new RejectedExecutionException(\"Transaction not found for this id: \" + facingNo));\n" +
            "\n" +
            "    this." + tabNameLower + "Repository.deleteById(facingNo);\n" +
            "    Map<String, String> deleteMessage = new HashMap<>();\n" +
            "    deleteMessage.put(\"deleteStatus\", \"" + tabName + " Deleted Successfully\");\n" +
            "    return deleteMessage;\n" +
            "  }\n" +
            "\n" +
            "}\n";
    List mapData = this.apiCreatorDao.getColumnList(tableName);
    for (Object map : mapData) {
      Map colMap = (Map) map;
      System.out.println("Column Name: " + colMap.get("COLUMN_NAME") + ", Data Type: " + colMap.get("DATA_TYPE"));
    }
  }
}
