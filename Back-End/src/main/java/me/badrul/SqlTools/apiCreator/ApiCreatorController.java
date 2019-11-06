package me.badrul.SqlTools.apiCreator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("api-creator")
public class ApiCreatorController {

  private final ApiCreatorService apiCreatorService;

  public ApiCreatorController(ApiCreatorService apiCreatorService) {
    this.apiCreatorService = apiCreatorService;
  }


  @GetMapping("api-creator")
  public void getApiData(@RequestParam String talbeName, @RequestParam(value = "baseFileName", required = false) String baseFileName) {
    apiCreatorService.getColumnDetails(talbeName, baseFileName);
  }
}
