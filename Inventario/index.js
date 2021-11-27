const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

exports.handler = (e, cta, callback) => {
    let form = e.body;
    var params = {
        TableName: 'inventario',
    };  
    let datos;
    docClient.scan(params, function(err, data){
        if(err){
            callback(err,'No producto');
        }else{
            datos = data;
            
            for(var i = 0; i < datos.Items.length; i++) {
                var obj = datos.Items[i];
                
                if(obj.nombre == form.producto){
                    
                    const response = {
                        statusCode: 200,
                        body: JSON.stringify("Producto encontrado"),
                        cantidad: obj.cantidad,
                                
                    };
                    callback(null, response);
                }
            }
        }      
    });
};
