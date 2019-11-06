package me.badrul.SqlTools.utils;

import java.util.Arrays;

public class UtilStringConversion {

  public static String getCamelCaseLowerFromSnakeCase(String text) {
    String camelCase = "";
    int i = 0;
    for (String s : text.toUpperCase().split("_")) {
      camelCase += i == 0 ? s.toLowerCase() : s.charAt(0) + s.substring(1).toLowerCase();
      i++;
    }
    return camelCase;
  }

  public static String getCamelCaseUpperFromSnakeCase(String text) {
    String camelCase = "";
    int i = 0;
    for (String s : text.toUpperCase().split("_")) {
      camelCase += i == 0 ? s.toUpperCase().charAt(0) + s.toLowerCase().substring(1) : s.charAt(0) + s.substring(1).toLowerCase();
      i++;
    }
    return camelCase;
  }

  public static String getSnakeCaseLowerFromSnakeCase(String text) {
    return text.replaceAll("([A-Z])", "_$1").toLowerCase();
  }

  public static String getSnakeCaseUpperFromSnakeCase(String text) {
    return text.replaceAll("([A-Z])", "_$1").toUpperCase();
  }

  public static void main(String[] args) {
    System.out.println(getCamelCaseLowerFromSnakeCase("badrul_alam"));
    System.out.println(getCamelCaseUpperFromSnakeCase("badrul_alam"));
    System.out.println(getSnakeCaseLowerFromSnakeCase("badrulAlam"));

//    System.out.println("badrul_alam".toLowerCase().replaceAll("_(.)","$1"+"".toUpperCase()));

  }
}
