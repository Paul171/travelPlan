# Travel Plan #

* ReactJS as a front-end development
* ruby on rails as a back-end development
* communicate using REST API
* Redis as a DB server

## Database Structure
* travel_plan
 - country
 - loc
 - date_time
 - note  

## Improvements/Enhancement
* add Web component/Polymer in the future development

## MongoDB for data storage
* `rails g mongoid:config` : create config/mongoid.yml file
* `rails g model <class_name> <field_name>...`: to create `app/models/<class_name>.rb`, test files under `test/models` and `test/fixures`. You will see the field and class in there
* `rails g controller <controller_name> index new create edit update destroy`: create a controller file and the actions for accessing the controller
