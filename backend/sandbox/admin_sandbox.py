from Container import Contenedor
import time
import uuid

class AdminSandbox:
    def __init__(self, docker):
        self.cliente_docker = docker
        self.codigos_espera = [] 
        self.contenedores_disponibles = []
        self.contenedores_listos = []
        self.tiempo_limite = 10

# Creamos el contenedor
    def _crear_contenedor(self, cb):
        try:
            contenedor_nuevo = self.cliente_docker.containers.create(
                image='sandbox_phy_academy',
                stdin_open = True,
                tty = True,
                mem_limit = '128m',
                network_disabled= True,
            )
            id = str(uuid.uuid4())
            contenedor = Contenedor(id, contenedor_nuevo)
            self.contenedores_listos.append(contenedor)
        except ValueError as e:
            print(f'Error al crear contenedor: {e}')
            
# Registrar contenedores creados a lista de disponibles
    def registrar_contenedor(self, contenedor):
        if len(self.contenedores_listos) > 0:
            posicion_contenedor = self.contenedores_listos.index(contenedor)
            contenedor_aux = self.contenedores_listos.pop(posicion_contenedor)
            self.contenedores_disponibles.push(contenedor_aux)
        
        if len(self.codigos_espera) > 0:
            print(f'Cantidad de trabajos en espera: {len(self.codigos_espera)}')
            primera_tarea = self.codigos_espera.pop(0)
            self._ejecutar_trabajo(primera_tarea, 0)
        else:
            print('no hay trabajos en espera')

# ejecutar el codigo del array de contenedores disponibles
    def _ejecutar_trabajo(self, tarea, cb):
        if len(self.contenedores_disponibles) > 0:
            contenedor = self.contenedores_disponibles.pop(0)
            contenedor.ejecutar_codigo(tarea, 'callback')
        else:
            print(f'no hay contenedores disponibles {len(self.contenedores_disponibles)}')

    def verificar(self):
        print(len(self.contenedores_listos))