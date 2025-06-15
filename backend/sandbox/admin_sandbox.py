from backend.sandbox.Container import Contenedor
import time
import uuid

class AdminSandbox:
    def __init__(self, docker):
        self.cliente_docker = docker
        self.codigos_espera = [] 
        self.contenedores_disponibles = []
        self.contenedores_listos = []
        self.tiempo_limite = 10
        self.respuesta = ''

#iniciar piscina de contenedores con tamano n
    def inicializador(self, tamano):
        if tamano <= 0:
            print('Tamano invalido de Contenedores')
        else:
            for i in range(tamano):
                self.crear_contenedor()

# Creamos el contenedor
    def iniciar_contenedor(self):
        try:
            contenedor_nuevo = self.cliente_docker.containers.create(
                image='sandbox_phy_academy1',
                stdin_open = True,
                tty = True,
                mem_limit = '50m',
                network_disabled= False,
                user= 'sandboxuser',
                ports ={'3000/tcp': 3000}
            )
            id = str(uuid.uuid4())
            obj_contenedor = Contenedor(id, contenedor_nuevo)
            self.contenedores_listos.append(obj_contenedor)
            return obj_contenedor
        except ValueError as e:
            print(f'Error al crear contenedor: {e}')

# Arranca el contenedor
    def arrancar_contenedor(self, contenedor):
        try:
            contenedor.get_instancia().start()
        except Exception as e:
            print(f'Error al iniciar el contenedor {e}')

# Obtiene la informacion del contenedor, la ip
    def get_info_contenedor(self, contenedor):
        contenedor.get_instancia().reload()
        informacion = contenedor.get_instancia().attrs
        obtener_ip = informacion.get('NetworkSettings',{}).get('IPAddress', '')
        if obtener_ip == '':
            contenedor.limpiar_contenedor()
        else:
            print(obtener_ip)
            contenedor.set_ip(obtener_ip)

# Registrar contenedores creados a lista de disponibles
    def registrar_contenedor(self, contenedor):
        if len(self.contenedores_listos) > 0:
            posicion_contenedor = self.contenedores_listos.index(contenedor)
            contenedor_aux = self.contenedores_listos.pop(posicion_contenedor)
            self.contenedores_disponibles.append(contenedor_aux)
        
        if len(self.codigos_espera) > 0:
            print(f'Cantidad de trabajos en espera: {len(self.codigos_espera)}')
            primer_codigo = self.codigos_espera.pop(0)
            self.ejecutar_trabajo(primer_codigo)
        else:
            print('no hay trabajos en espera')

# Verificar si hay un contendor libre
    def encolar_trabajo(self, codigo):
        if len(self.contenedores_disponibles) == 0:
            print('No hay contenedore disponibles')
            self.codigos_espera.append(codigo)
        else:
            self.ejecutar_trabajo(codigo)
            return self.respuesta

# ejecutar el codigo del array de contenedores disponibles
    def ejecutar_trabajo(self, codigo):
        if len(self.contenedores_disponibles) == 0:
            print(f'no hay contenedores disponibles {len(self.contenedores_disponibles)}')
        
        contenedor = self.contenedores_disponibles.pop(0)
        self.respuesta = contenedor.ejecutar_codigo(codigo)
        self.limpiar_contenedores(contenedor)

#Eliminar los contenedores
    def limpiar_contenedores(self, contenedor):
        contenedor.limpiar_contenedor()
        print('Contenedor limpio')

# Funcion para crear el proceso de contenedores
    def crear_contenedor(self):
        contenedor = self.iniciar_contenedor()
        self.arrancar_contenedor(contenedor)
        self.get_info_contenedor(contenedor)
        # delay aca 
        time.sleep(1) 
        self.registrar_contenedor(contenedor)

    def verificar(self):
        print(len(self.contenedores_listos))
        print(len(self.contenedores_disponibles))