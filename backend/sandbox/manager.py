import docker
# para el tiempo limite
import time
# para tener una id unica
import uuid
##Variables
cliente_docker = docker.from_env()
trabajos_espera = []
contenedores_disponibles = []
arrancando_contenedores = []
tiempo_limite = 10

def crear_sandbox(cant_sandbox):
    try:
        for i in range(cant_sandbox):
            id_contenedor = f'sandbox_{i+1}'
            contenedor = cliente_docker.containers.run(
                image= 'sandbox_academy',
                name = id_contenedor,
                command = 'tail -f /dev/null',
                detach = True,
                stdin_open = True,
                tty = True,
                mem_limit = '128m',
                network_disabled= True,
            )
    except Exception as e :
        print(f'Error al crear el contenedor sandbox {e}')

def eliminar_contenedor(id_contenedor):
    contenedor = cliente_docker.containers.get(id_contenedor)
    contenedor.stop()
    contenedor.remove(force=True)
    print(f'contenedor {id_contenedor} eliminado')

crear_sandbox(3)
time.sleep(10)
eliminar_contenedor('sandbox_2')