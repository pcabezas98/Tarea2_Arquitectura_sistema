const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

exports.handler = (e, cta, callback) => {
  let form = e.producto;
  
  var params = {
    TableName: 'inventario',
    Item: {
        nombre: form.nombre,
        cantidad: parseInt(form.cantidad),
    },
    ConditionExpression: 'attribute_exists(nombre)'
  };  
  docClient.put(params, function(err, data){
       if(err){
          //callback(err,null);
          callback("No existe el dato",err);
      }else{
          callback(null, "Información actualizada");
      }      
  });    
};