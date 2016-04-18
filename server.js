var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var dataManager = require('./nodejsonapi');

var app = express();
var port = 8080;
var ipaddress = '0.0.0.0';



var server = http.createServer(app);
server.listen(port, ipaddress, function (){
  console.log('Server Listening on port: 8080');
});



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







app.use('/locations', dataManager.create({
  type: 'locations',
  table: 'locations',
  property: 'locations',
  relationships: [
    {
      type: 'people',
      table: 'locations_x_people'
    }
  ]
}));

app.use('/people', dataManager.create({
  type: 'people',
  table: 'people',
  property: 'people',
  relationships: [
    {
      type: 'jobs',
      field: 'job'
    }
  ]
}));

app.use('/job', dataManager.create({
  type: 'jobs',
  table: 'jobs',
  property: 'job'
}));













var useVersioning = true;
var versionDate = 0;//+new Date();
var people = getPeople();


function getPeople() {
  return [
    {
      id: 0,
      name: 'Broobsin',
      age: 28,
      email: 'ben@benjaminrubin.com',
      jobs: [
        {id: 1, title: 'Developer'},
        {id: 2, title: 'Pizza Developer'},
        {id: 3, title: 'Moon Dancer'}
      ]
    },
    {
      id: 1,
      name: 'Neb Nibur',
      age: 41,
      email: 'neb@nimajnednibur.moc',
      jobs: [
        {id: 4, title: 'Living in moms basement'}
      ]
    }
  ];
}


function getPeopleJSONAPI() {
  return {
    data: [
      {
        id: 0,
        type: 'people',
        attributes: {
          name: 'Broobsin',
          age: 28,
          email: 'ben@benjaminrubin.com'
        },
        relationships: {
          jobs: {
            data: [
              {id: 1, type: 'job'},
              {id: 2, type: 'job'},
              {id: 3, type: 'job'}
            ]
          }
        }
      },
      {
        id: 1,
        type: 'people',
        attributes: {
          name: 'Neb Nibur',
          age: 41,
          email: 'neb@nimajnednibur.moc'
        },
        relationships: {
          jobs: {
            data: [
              {id: 4, type: 'job'}
            ]
          }
        }
      }
    ],
    included: [
      {
        id: 1,
        type: 'job',
        attributes: {
          title: 'Developer'
        }
      },
      {
        id: 2,
        type: 'job',
        attributes: {
          title: 'Pizza Developer'
        }
      },
      {
        id: 3,
        type: 'job',
        attributes: {
          title: 'Moon Dancer'
        }
      },
      {
        id: 4,
        type: 'job',
        attributes: {
          title: 'Living in moms basement'
        }
      }
    ]
  };
}



app.get('/people', function (req, res) {
  people = getPeopleJSONAPI();
  var handShake = false;

  // if no versioning is being used
  if (useVersioning === false) {
    res.set({
      // 'd-m-handshake': true,
      'd-m-versioning': false
    });

    res.send(people);

  // check version
  } else if (req.headers['d-m-handshake'] !== undefined) {
    var clientDate = parseInt(req.headers['d-m-version'] || -1);
    var serverDate = versionDate;

    // tell client not to get new copy of date
    if (serverDate === clientDate) {
      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true
      });
    // tell client to not get a new copy of data
    // tell client to send up its data
    } else if (serverDate < clientDate) {
      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true,
        'd-m-post-update': serverDate
      });
    } else {
      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true,
        'd-m-get-update': false // TODO change back to true, and make sure the versions are working
      });
    }

    handShake = true;
  }



  if (handShake === true) {
    res.end();
  } else {
    if (useVersioning === true) {
      res.set({
        'd-m-versioning': true,
        'Cache-Control': 'public, max-age=31557600', // 31557600
        'd-m-last-updated': versionDate
      });


      res.send(people);
    }
  }
});



app.post('/people/:id', function (req, res) {
  var id = req.params.id
  console.log(id, req.body);
  people.push(req.body);


  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
});

app.put('/people/:peopleId/relationships/jobs/:id', function (req, res) {
  var id = req.params.id

  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
  // res.status(500).end();
});



app.post('/jobs/:id', function (req, res) {
  var id = req.params.id
  console.log(id, req.body);


  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
  // res.status(500).end();
});

app.put('/jobs/:id', function (req, res) {
  var id = req.params.id
  console.log(id, req.body);


  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
  // res.status(500).end();
});

app.delete('/jobs/:id', function (req, res) {
  var id = req.params.id
  console.log(id, req.body);


  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
  // res.status(500).end();
});

app.put('/people/:id', function (req, res) {
  var id = req.params.id



  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
});










// --- old ----


var theData = getData();

function getData() {
  return [
    {
      id: 0,
      name: 'Broobsin',
      age: 28,
      email: 'ben@benjaminrubin.com',
      nested: {
        item: 'This is nested'
      },
      arr: [
        {id: 12, ordinal: 1},
        {id: 13, ordinal: 2},
        {id: 14, ordinal: 3}
      ]
    },
    {
      id: 1,
      name: 'Neb Nibur',
      age: 41,
      email: 'neb@nimajnednibur.moc'
    }
  ];
}


app.get('/get', function (req, res) {
  // theData = getData();
  var handShake = false;

  // if no versioning is being used
  if (useVersioning === false) {
    res.set({
      'd-m-handshake': true,
      'd-m-versioning': false
    });

    res.send(theData);

  // check version
  } else if (req.headers['d-m-handshake'] !== undefined) {
    // these should both be utc millaseconds
    var clientDate = parseInt(req.headers['d-m-version'] || -1);
    var serverDate = versionDate;

    console.log('get', clientDate, serverDate);


    // tell client not to get new copy of date
    if (serverDate === clientDate) {

      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true
      });
    // tell client to not get a new copy of data
    // tell client to send up its data
    } else if (serverDate < clientDate) {
      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true,
        'd-m-post-update': serverDate
      });
    } else {
      res.set({
        'd-m-handshake': true,
        'd-m-versioning': true,
        'd-m-get-update': true
      });
    }

    handShake = true;
  }


  if (handShake === true) {
    res.end();
  } else {
    if (useVersioning === true) {
      res.set({
        'd-m-versioning': true,
        'Cache-Control': 'public, max-age=31557600', // 31557600
        'D-M-Last-Updated': versionDate
      });


      res.send(theData);
    }
  }
});




app.post('/add', function (req, res){
  var obj = req.body[0];

  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });

  if (obj.id === undefined) {
    obj.id = 42;
    theData.push(obj);
    res.send([{id: 42}]);
  } else {
    theData.forEach(function (item) {
      if (item.id === obj.id) {
        item.arr.push(obj.arr[0]);
      }
    });
    res.end();

    console.log(JSON.stringify(theData));
  }
});

app.put('/update', function (req, res){
  console.log(JSON.stringify(req.body));
  updateItem(req.body);

  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });
  res.end();
});


app.delete('/remove/:ids(*)', function (req, res) {
  var ids = req.params.ids.split(';');
  var id;
  var i = 0;
  var length = ids.length;

  while (i < length) {
    id = ids[i];
    i++;

    if (id.indexOf('/') === -1) {
      theData = theData.filter(function (item) {
        if (ids.indexOf(item.id.toString()) > -1) { return false; }
        return true;
      });
    } else {
      id = id.split('/');
      id[0] = parseInt(id[0]);


      theData.forEach(function (item) {
        if (item.id === id[0] && item[id[1]] instanceof Array) {
          item[id[1]] = item[id[1]].filter(function (sub) {
            if (typeof sub === 'object' && sub.id === parseInt(id[2])) {
              return false;
            } else if (sub == id[2]) {
              return false;
            }

            return true;
          });
        }

      });
    }
  }


  versionDate = +new Date();
  res.set({
    'd-m-version': versionDate
  });

  res.end();
});

function updateItem(data) {
  data.forEach(function (item) {
    var src = getItem(item.id);
    if (src !== undefined) {
      extend(src, item);
    }
  });
}

function getItem(id) {
  var i = 0;
  var length = theData.length;

  while (i < length) {
    if (theData[i].id === id) {
      return theData[i];
    }
    i++;
  }

  return undefined;
}

function extend(dst, src) {
  Object.keys(src).forEach(function (key) {
    dst[key] = src[key];
  });

  console.log(dst);
}



module.exports = app;
