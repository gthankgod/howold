[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6e057888e4234d5fae98d01aeb23da08)](https://www.codacy.com/gh/gthankgod/howold/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gthankgod/howold&amp;utm_campaign=Badge_Grade)
# Smart Age Calculator
<div align="center">
<br />

[![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/dec0dOS/amazing-github-template/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![made with hearth by dec0dOS](https://img.shields.io/badge/made%20with%20%E2%99%A5%20by-dec0dOS-ff1414.svg?style=flat-square)](https://github.com/dec0dOS)

</div>
<hr/>
***
<details open="open">
<summary>Table of Contents</summary>

- [Smart Age Calculator](#smart-age-calculator)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Usage](#usage)
      - [CURL](#curl)
      - [Javascript](#javascript)
      - [PHP](#php)
      - [Java](#java)
  - [License](#license)

</details>



## Getting Started

### Prerequisites

The recommended way to use this service is programmatically fetching from the resource or using an API client source like postman, thunderclient e.t.c.

The base url is `https://backend-age-calculator.herokuapp.com`

The easiest way to using the feature is by calling the API resource via the terminal:

```sh
curl --location --request GET 'https://backend-age-calculator.herokuapp.com/howold?dob=1993-09-06'
```

### Usage 
#### CURL
```curl
      curl --location --request GET 'https://backend-age-calculator.herokuapp.com/howold?dob=1993-09-06'
```
#### Javascript
```js
  
      function calculateAge(dob){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        fetch("https://philage-service.herokuapp.com/howold?dob={dob}", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

      const age = calculateAge('436504400000'); // returns 38
```

#### PHP
```php
  
      <?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://backend-age-calculator.herokuapp.com/howold?dob=1993-09-06',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
; // returns 38
```

#### Java
```java
  
      OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "");
Request request = new Request.Builder()
  .url("https://backend-age-calculator.herokuapp.com/howold?dob=1993-09-06")
  .method("GET", body)
  .build();
Response response = client.newCall(request).execute();
```

## License

This project is licensed under the **MIT license**. 

See [LICENSE](LICENSE) for more information.
