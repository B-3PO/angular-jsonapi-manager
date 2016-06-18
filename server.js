var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dataManager = require('./emja');

var app = express();
var port = 8080;
var ipaddress = '0.0.0.0';



dataManager.addDatabase({
  host: '127.0.0.1',
  user: 'tester',
  password: 'testTester',
  database: 'datamanager',
  connectionLimit: 10,
  default: true
});


var server = http.createServer(app);
server.listen(port, ipaddress, function (){
  console.log('Server Listening on port: 8080');
});



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



dataManager.addType({
  name: 'locations',
  table: 'locations',
  attributes: {
    name: {dataType: dataManager.dataType.STRING},
    city: {dataType: dataManager.dataType.STRING},
    state: {dataType: dataManager.dataType.STRING}
  },
  relationships: [
    {
      type: 'people',
      manyToMany: true
    }
  ]
});

dataManager.addType({
  name: 'people',
  table: 'people',
  attributes: {
    name: {
      dataType: 'string',
      build: [
        {field: 'first', dataType: dataManager.dataType.STRING},
        {join: ' '},
        {field: 'last', dataType: dataManager.dataType.STRING}
      ]
    },
    age: {dataType: dataManager.dataType.INT},
    email: {dataType: dataManager.dataType.STRING},
    working: {dataType: dataManager.dataType.BOOLEAN}
  },
  relationships: [
    {
      type: 'jobs',
      field: 'job',
      single: true
    }
  ]
});

dataManager.addType({
  name: 'jobs',
  table: 'jobs',
  attributes: {
    title: {dataType: dataManager.dataType.STRING},
    pay: {dataType: dataManager.dataType.CURRENCY}
  }
});



dataManager.addType({
  name: 'tester',
  table: 'tester',
  attributes: {
    name: {dataType: dataManager.dataType.STRING}
  }
});




app.use('/locations', dataManager.CreateResource({
  name: 'locations',
  type: 'locations',
  relationships: {
    people: {resource: 'people'},
    tester: {
      resource: 'tester',
      manyToMany: true
    }
  }
}));

app.use('/people', dataManager.CreateResource({
  name: 'people',
  type: 'people',
  relationships: {
    job: {resource: 'job'},
    tester: {
      resource: 'tester',
      manyToMany: true
    }
  }
}));

app.use('/job', dataManager.CreateResource({
  name: 'job',
  type: 'jobs'
}));


app.use('/tester', dataManager.CreateResource({
  name: 'tester',
  type: 'tester'
}));
