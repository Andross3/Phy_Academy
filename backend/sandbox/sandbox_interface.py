# from backend.sandbox.Container import Contenedor
from backend.sandbox.admin_sandbox import AdminSandbox
import docker

class Sandbox:
    def __init__(self, tamano_pool, codigo):
        self.tamano_pool = tamano_pool
        self.cliente_docker = docker.from_env()
        self.admin_sandbox = AdminSandbox(self.cliente_docker)
        self.codigo = codigo

    def crear_pool(self):
        self.admin_sandbox.inicializador(self.tamano_pool)

    def correr_codigo(self):
        self.admin_sandbox.codigos_espera.append(self.codigo)
    
    def respuesta(self):
        return self.admin_sandbox.respuesta
    
    def limpiar_pool(self):
        self.admin_sandbox.limpiar_contenedores()


# codigo = "print('sofia')"

# prueba1 = Sandbox(1, codigo)
# prueba1.correr_codigo()
# prueba1.crear_pool()
# print(prueba1.respuesta())