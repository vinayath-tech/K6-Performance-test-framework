# K6-Performance-test-framework

Example Performance testing framework built using K6. This framework consists of different performance test script example like Smoke, Load & Stress.
Tests were written to focus on performance of the API's (ie http_req_duration, http_req_failed) listed in official K6 examples (https://test-api.k6.io/). 

## Getting started
Clone the repo
```
> git clone https://github.com/vinayath-tech/K6-Performance-test-framework.git
> cd K6-Performance-test-framework
> npm install
```

## Performance test types
This framework contains below test type
- Smoke test ([#Smoke test](https://github.com/vinayath-tech/K6-Performance-test-framework/edit/main/README.md#smoke-test))
- Load test ([#Load test](https://github.com/vinayath-tech/K6-Performance-test-framework/edit/main/README.md#load-test))
- Stress test ([#Stress test](https://github.com/vinayath-tech/K6-Performance-test-framework/edit/main/README.md#stress-test))

All tests are located within ***_performance-tests_*** folder

#### Smoke test
Smoke tests are a performance testing type that have a minimal load, and they are used to verify that the system works well under minimal load and to gather baseline performance values.

##### Configuration 
  ```
  > VU- 1
  > Duration - 3 Secs
  ```

##### Smoke test execution 
To Execute locally, run below command
```
npm run test:smoke
```

To Execute smoke test from your local machine against cloud, run below command
```
npm run test:cloud-smoke
```

##### Smoke test results

Threshold conditions to pass the smoke test are :-
  - 95 percentile of http request duration should be less than 3 secs
  - Http request fail rate should be less than 1%

![Screenshot (23)](https://github.com/user-attachments/assets/12b43bbf-3493-4ed5-8299-dd77334c25f9)

Console output of smoke test results

![Screenshot (22)](https://github.com/user-attachments/assets/6d586e85-3b3d-4213-8588-bf8dffc20cfa)


#### Load test
##### Configuration 
  ```
  Stage 1 :-
    > Target - 5 users 
    > Duration - 5 Secs

  Stage 2 :-
    > Target - 5 users 
    > Duration - 30 Secs

  Stage 3 :-
    > Target - 0 users 
    > Duration - 5 Secs
  ```

##### Load test execution 
To Execute locally, run below command
```
npm run test:load
```

To Execute load test from your local machine against cloud, run below command
```
npm run test:cloud-load
```

##### Load test results

Threshold conditions to pass the load test are :-
  - 95 percentile of http request duration for User registration group should be less than 10 secs
  - 95 percentile of http request duration for User login group should be less than 5 secs
  - Http request fail rate should be less than 1%
    
![Screenshot (38)](https://github.com/user-attachments/assets/15477903-130a-4402-b9d1-b8c0e2582b84)


Console output of load test results

![Screenshot (39)](https://github.com/user-attachments/assets/043d74ae-24bf-4cb8-8edf-8e151afee473)

#### Stress test
##### Configuration 
  ```
  Stage 1 :-
    > Target - 8 users 
    > Duration - 5 Secs

  Stage 2 :-
    > Target - 8 users 
    > Duration - 30 Secs

  Stage 3 :-
    > Target - 0 users 
    > Duration - 5 Secs
  ```

##### Stress test execution 
To Execute locally, run below command
```
npm run test:stress
```

To Execute stress test from your local machine against cloud, run below command
```
npm run test:cloud-stress
```

##### Stress test results

Threshold conditions to pass the load test are :-
  - 95 percentile of http request duration for User registration group should be less than 10 secs
  - 95 percentile of http request duration for User login group should be less than 5 secs
  - Http request fail rate should be less than 1%

![Screenshot (40)](https://github.com/user-attachments/assets/141a86f8-c33c-427c-b67f-385e8fb06e4d)

Console output of Stress test results

![Screenshot (41)](https://github.com/user-attachments/assets/af1a4d96-59ec-4e7d-816c-918784ffc152)
