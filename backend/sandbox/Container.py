import requests

class Contenedor:
    def __init__(self, id, instancia):
        self.id = id
        self.instancia = instancia
        self.ip = ''
        self.limpio = False
# ejecuta el codigo en un contenedor
    def ejecutar_codigo(self, codigo):
        # url_sandbox = f'http://192.168.0.3:3000/' # en produccion
        url_sandbox = f'http://localhost:3000/' # en pruebas
        payload = {
            "code": codigo,
            "timeoutMs": 1000,
        }
        
        try:
            respuesta = requests.post(url=url_sandbox, json=payload, timeout=5)
            respuesta.raise_for_status()
            data = respuesta.json()
            return data
            # print(data)
        except requests.exceptions.RequestException as e:
            # print(e)
            return f'Error al conectar al sandbox {e}'

# Obtener instancia (sandbox)
    def get_instancia(self):
        return self.instancia
# insertar ip
    def set_ip(self, newIP):
        self.ip = newIP
# limpiar contenedor
    def limpiar_contenedor(self):
        if self.limpio == True:
            print('esta limpio')
        else:
            try:
                self.instancia.stop()
                self.instancia.remove(force=True)
                self.limpio = True
            except Exception as e:
                print(f"Error en limpiar sandbox {e}")
