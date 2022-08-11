# Smart Age Calculator

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6e057888e4234d5fae98d01aeb23da08)](https://www.codacy.com/gh/gthankgod/howold/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gthankgod/howold&utm_campaign=Badge_Grade) [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

<hr/>
<details open="open">
<summary>Table of Contents</summary>

- [Smart Age Calculator](#smart-age-calculator)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Usage](#usage)
      - [NodeJS](#nodejs)
      - [Javascript](#javascript)
      - [PHP](#php)
      - [Java](#java)
  - [Contributing](#contributing)
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

#### NodeJS

```js
var request = require("request");
var options = {
  method: "GET",
  url: "https://backend-age-calculator.herokuapp.com/howold?dob=1993-09-06",
  headers: {},
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

#### Javascript

```js
function calculateAge(dob) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://philage-service.herokuapp.com/howold?dob={dob}",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

const age = calculateAge("436504400000"); // returns 38
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

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## License

Copyright (c) 2022 ThankGod George
Licensed under the MIT license.
