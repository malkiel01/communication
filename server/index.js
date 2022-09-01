const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
    host: "mbe-works.com",
    user: "mbeplusc_communi",
    password: "gxfv16be",
    database: "mbeplusc_communication"
})

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/', (req, res) => {res.send('result')})


// --------------------------------------------------------------------------------------
// address start

app.get('/api/get-cities', (req, res) => {
    const sqlCities = "SELECT * FROM `CITIES`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.get('/api/get-streets', (req, res) => {
    const sqlCities = "SELECT * FROM `STREETS`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.get('/api/get-streets-for-city', (req, res) => {
    const sqlCities = "SELECT * FROM `STREETS` WHERE STREETS.city_num = 1046;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.post('/api/insesrt-cities', (req, res) => {
    console.log('Limit file size: '+bodyParser.limit)
    
    const data = req.body.data

    if(data !== undefined && data.length > 0) {
        db.query(`TRUNCATE TABLE CITIES`, (err, res) => {
            if (err === null) {
                data.forEach(item => {
                    let query = `
                    INSERT INTO CITIES(num_city, code_city, name, name2, type_city, postcode5, postcode7, distribution_code, distribution_rate, data_update, is_active) 
                                VALUES (?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, 
                        [item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8],item[9],true], 
                        (err, res) => {
                        console.log(err,res);
                    })
                });
            }
        })
    }
 })

// address end
// --------------------------------------------------------------------------------------
// supplier start

app.get('/api/get-suppliers', (req, res) => {
    const sqlCities = "SELECT * FROM `SUPPLIERS`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.post('/api/insesrt-supplier', (req, res) => {
    const name = req.body.name
    const type = req.body.type
    console.log(req.body.type === true);

    const sqlInsert = "INSERT INTO `SUPPLIERS`(`name`, `type`, `display`, `is_active`) VALUES (?,?,?,?);"
    
    db.query(sqlInsert, [req.body.name, 0, true, true], (err, res) => {
        console.log(res);
    })
 })
 

 app.put('/api/update-supplier', (req, res) => {
    const sql = [
        req.body.name,
        req.body.type,
        1,
        req.body.id,
    ]
    const sqlInsert = 'UPDATE `SUPPLIERS` SET `name` = ?, `type` = ?, `display` = ? WHERE `SUPPLIERS`.`id` = ?;';
    db.query(sqlInsert, sql, (err, res) => {
        console.log(sqlInsert)
})
 })
// supplier end
// --------------------------------------------------------------------------------------
// rules start

app.get('/api/get-rules', (req, res) => {
    const sqlCities = "SELECT * FROM `RULES`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

app.post('/api/insesrt-rule', (req, res) => {
    const sql = [
        req.body.supplierId,
        req.body.infrastructure,
        req.body.supplierMainId,
        true
    ]
    
    const sqlInsert = 'INSERT INTO `RULES`( `supplierId`, `infrastructure`, `supplierMainId`, `is_active`)VALUES (?,?,?,?);';
    
    db.query(sqlInsert, sql, (err, res) => {
            console.log(err,res);
    })
 })

 app.put('/api/update-rule', (req, res) => {
    const sql = [
        req.body.supplierId,
        req.body.infrastructure,
        req.body.supplierMainId,
        req.body.id,
    ]
    const sqlInsert = 'UPDATE `RULES` SET `supplierId` = ?, `infrastructure` = ?, `supplierMainId` = ? WHERE `RULES`.`id` = ?;';
    db.query(sqlInsert, sql, (err, res) => {
        console.log(sqlInsert)
})
 })

// rules end
// --------------------------------------------------------------------------------------
// companies start

// app.get('/api/get-companies', (req, res) => {
//     const sqlCities = "SELECT * FROM `COMPANIES`;";
//     db.query(sqlCities, (err, result) => {
//         res.send(result)
//     })
//  })
//  app.post('/api/insesrt-suppliers', (req, res) => {
//     const name = req.body.name
//     const type = req.body.type

//     const sqlInsert = "INSERT INTO `SUPPLIERS`(`name`, `type`) VALUES (?,?);"
    
//     db.query(sqlInsert, [name, type], (err, res) => {
//         res.send(res)
//     })
//  })






app.listen(3001, () => {
    console.log('running 3001 ports');
})