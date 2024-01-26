<div align="center">
   <img width="160" src="https://s2.loli.net/2024/01/26/R1PsCVoMhykEali.png" alt="logo">
</div>

# InkCloud Clipboard

![Made with React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js)
![UI Framework: Next UI](https://img.shields.io/badge/Next%20UI-blue?style=flat)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![npm](https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=flat)
[![License: GPL v3](https://img.shields.io/github/license/garethng/cloud_paste.svg?style=flat)](LICENSE)
[![release](https://img.shields.io/github/v/release/garethng/cloud_paste?style=flat)]((https://github.com/garethng/cloud_paste/releases))


Cloud Paste is a simple web application that allows you to copy and paste text between devices. It is built using Native HTML and JavaScript, and uses AWS DynamoDB to store the data.

The API is built using AWS API Gateway and AWS Lambda.

## How to use
You can use vercel to deploy this application to your own domain. You will need to create a DynamoDB table and an API Gateway API with a Lambda function to handle the requests.

Try this [Demo](https://cloud-paste-two.vercel.app) for preview.

## API
The API is very simple. It has two endpoints, one for getting the data and one for setting the data.

### GET
`/get_clipboard?userid=123&method=query`

The GET endpoint is used to get the data from the database. It takes two query parameters, `userid`, which is the ID of the data you want to get. It returns a JSON object with the data.

Due to the way the API Gateway works, you will need to set the `method` query parameter to `query` to use this endpoint.

### SET
`/add_to_clipboard?userid=123&clipboard=Hello%20World&method=update&index_time=2023-11-11`

The SET endpoint is used to set the data in the database. It takes three query parameters, `userid`, which is the ID of the data you want to set, `clipboard`, which is the data you want to set, and `method`, which is the method you want to use to set the data. It returns a JSON object with the noteid.

### DELETE
`/delete_clipboard?userid=123&method=delete&note_id=123`

The DELETE endpoint is used to delete the data in the database. It takes three query parameters, `userid`, which is the ID of the data you want to delete, `method`, which is the method you want to use to delete the data, and `nodt_id`, which is the note id of the data you want to delete. It returns a JSON object with the data.

## TODO
- [ ] Add support for multiple users
- [ ] Add support for images
- [x] Add support for long paste strings
- [x] Add support for deleting data
- [x] Use Other Open Source Frontend Frameworks
- [x] Beautify the website

## Release History
This project's release history can be found in [Release](https://github.com/garethng/cloud_paste/releases) for more information


## License
This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.
