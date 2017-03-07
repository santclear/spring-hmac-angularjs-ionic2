#HMAC Implementation using Spring, AngularJS and Ionic 2

#Stack
- Spring Boot
- Spring Security
- Spring MVC
- Angular 2.2.0

#Features
- Token based authentication
- Json Web Token
- HMAC implementation
- HMAC Filter used by Spring Security
- HMAC Factory for AngularJS
- Security utility class
- Cors configured

#Credentials
sinaldasorte/sant => role ADMIN
admin/sant => role ADMIN
manager/sant => role MANAGER
user/sant => role USER

#To run Java unit tests
````bash
$ mvn test
````

#To run the application angular-spring-hmac-angular2
````bash
$ mvn spring-boot:run
````
- Npm modules should be automatically installed and typescript files compiled (see pom.xml file)
- Then go to http://localhost:8080

#To run the application spring-hmac-ionic2
````bash
$ npm install
$ ionic serve
- Then go to http://localhost:8100
- More info http://ionicframework.com/docs/v2/api/
````

###Credits

[Red Froggy](https://github.com/RedFroggy)

