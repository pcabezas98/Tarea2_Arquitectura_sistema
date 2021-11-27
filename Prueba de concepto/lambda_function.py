import json
import requests

def lambda_handler(event, context):
    #response = requests.get("https://fdjhg55ch2.execute-api.us-east-2.amazonaws.com/Tarea2/ventas")

    ### DEFINIMOS EL NOMBRE PARA LLAMAR A LA PRIMERA API
    datos = event

    body = json.dumps(datos)
    headers = {'Content-Type': 'application/json'}

    ## CREAMOS LA VENTA
    response = requests.post('https://fdjhg55ch2.execute-api.us-east-2.amazonaws.com/Tarea2/ventas',headers=headers ,data = body)

    ### CONSULTAMOS SI EXISTE EN EL INVENTARIO
    body_2 = json.dumps({'body':{'producto':datos['body']['producto']}})
    response_2 = requests.post('https://fdjhg55ch2.execute-api.us-east-2.amazonaws.com/Tarea2/inventario',headers=headers ,data = body_2)

    ### AGREGAMOS EL PRODUCTO A LA BODEGA
    nueva_cantidad = int(response_2.json()['cantidad'])+1
    body_3 = json.dumps({'producto':{'nombre':datos['body']['producto'],'cantidad':nueva_cantidad }})
    response_3 = requests.put('https://fdjhg55ch2.execute-api.us-east-2.amazonaws.com/Tarea2/pedido_bodega',headers=headers ,data = body_3)

    
    return {
        'statusCode': 200,
        'body1': response.json(),
        'body2': response_2.json(),
        'body3': response_3.json()
    }
    


    