import subprocess
import docker

class Contenedor:
    def __init__(self, id, instancia):
        self.cliente_docker = docker.from_env()
        self.id = id
        self.instancia = instancia
        self.ip = ''
        self.limpiado = False

    def ejecutar_codigo(self, job, callback):

        # resultado = subprocess.run(['docker', 'run', '--rm'])
        # resultado = subprocess.run(["docker", "run", "--rm", "-v", f"{os.getcwd()}/backend/sandbox/archivos_compilacion:/app", "sandbox", "python", f'{self.archivo_py}'], 
        #                 capture_output=True, text=True)
        # if resultado.stderr:
        #     self.formatoErrores(resultado.stderr)
        # else:
        #     print(resultado.stdout.strip())
        print(f'hola llego tu { job }')

    def getInstancia(self):
        return self.instancia
    
    def setIp(self, newIP):
        self.ip = newIP

    def cleanUp(self, callback):

        ### parar
        # remover
        # marcar como limpio
        if self.limpiado == True:
            print('esta limpio')
        else:
            print('esta en ejecusion')