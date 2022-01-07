const mysql = require("mysql");
const Promise = require("bluebird");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
    host:"localhost",
    user:"palash",
    password:"password",
    database:"wptexam",
};

const record ={
    sender: "palash",
    receiver:"omkar",
    database:"wptexam"

}

const addRecord = async(record) =>{
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    const sql =`insert into message (sender, receiver, msg) values (?,?,?)`;
    await connection.queryAsync(sql, [record.sender,record.receiver,record.msg]);
    await connection.queryAsync();
    await connection.endAsync();
    console.log("message record added...");
}

addRecord();

const getRecord = async() =>{
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    const sql=`select * from message`;
    const list = await connection.queryAsync(sql, []);
    await connection.queryAsync();
    await connection.endAsync();
    console.log("list of record");
    console.log(list);
    return list;
}
getRecord();

module.exports= { addRecord, getRecord};