# Cloud Paste

Cloud Paste is a simple web application that allows you to copy and paste text between devices. It is built using Native HTML and JavaScript, and uses AWS DynamoDB to store the data.

The API is built using AWS API Gateway and AWS Lambda.

## How to use
You can use vercel to deploy this application to your own domain. You will need to create a DynamoDB table and an API Gateway API with a Lambda function to handle the requests.

## API
The API is very simple. It has two endpoints, one for getting the data and one for setting the data.

### GET
`/get_clipboard?userid=123&method=query`

The GET endpoint is used to get the data from the database. It takes two query parameters, `userid`, which is the ID of the data you want to get. It returns a JSON object with the data.

Due to the way the API Gateway works, you will need to set the `method` query parameter to `query` to use this endpoint.

### SET
`/add_to_clipboard?userid=123&clipboard=Hello%20World&method=update`

The SET endpoint is used to set the data in the database. It takes three query parameters, `userid`, which is the ID of the data you want to set, `clipboard`, which is the data you want to set, and `method`, which is the method you want to use to set the data. It returns a JSON object with the data.

## TODO
- [ ] Add support for images
- [ ] Add support for deleting data
- [ ] user accounts
- [ ] Add support for other databases
- [ ] Beautify the website

## Version History
* 0.0.1
    * Initial Release
    * Support single user
    * Support text only
    * Support AWS DynamoDB


## License
This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.