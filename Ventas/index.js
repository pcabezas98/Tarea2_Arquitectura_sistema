const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

exports.handler = (e, cta, callback) => {
  let form = e.body;
  let id = new Date().getTime();

  
  var params = {
    TableName: 'solicitud_venta',
    Item: {
        id: id.toString(),
        nombre_comprador: form.nombre,
        producto: form.producto,
    },
    ConditionExpression: 'attribute_not_exists(id)'
  };  
  docClient.put(params, function(err, data){
       if(err){
          //callback(err,null);
          callback(err,"Error en la venta");
      }else{
        const response = {
          statusCode: 200,
          body: JSON.stringify("Venta Creada"),
        };
        callback(null, response);
      }      
  });
};
