const path = require('path');
const express = require('express');
const app = express();
var pandoc = require('node-pandoc');
const db = require('./db-request');

pandoc_args = ['-f', 'markdown', '-t', 'html', '-o', 'api.html'];
pandoc("README.md", pandoc_args, function(result, err) {
    if (err) {
        console.log('pandoc exited with status code ' + err);
    } else {}
});

db.init();

function bad_request(res) {
    res.status(400).send('Bad Request');
}

function internal_server_error(res) {
    res.status(500).send('Internal Server Error');
}

function to_array(array) {
    return array.split(',');
}

function handle_promise(res, req, promise) {
    serialize = req.query.serialize;
    if (promise) {
        promise.then(data => {
            if (serialize) {
                var bin = data.serializeBinary();
                var buf = Buffer.alloc(bin.length);
                buf.set(bin);
                res.send(buf);
            } else {
                res.send(data.toObject());
            }
        }).catch(e => {
            console.log(e);
            bad_request(res);
        })
    } else {
        internal_server_error(res);
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "api.html"));
});

app.get('/api/quotes', (req, res) => {
    tagsQuery = req.query.tags;
    tags = to_array(tagsQuery);
    if (tags) {
        handle_promise(res, req, db.getQuotes(tags));
    } else {
        bad_request(res);
    }
});

app.get('/api/author', (req, res) => {
    tags = req.query.tags;
    if (tags) {
        for (tag of tags) {
            console.log(tag);
        }
        res.send(tags);
    } else {
        bad_request(res);
    }
});
app.listen(3000).on("close", () => {
    if (err) {
        console.log(err);
    }
    db.close();
});