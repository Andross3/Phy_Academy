import os, re
import subprocess

class Compilar_Codigo:

    def __init__(self, string_codigo):
        self.codigo = string_codigo
        self.archivo_py = 'pepe.py'

    def convertir(self):
        carpeta_destino = "sandbox/archivos_compilacion"
        # os.makedirs(carpeta_destino, exist_ok=True)
        ruta_archivo = os.path.join(carpeta_destino, self.archivo_py)
        with open(ruta_archivo, "w", encoding="utf-8") as archivo:
            archivo.write(self.codigo)

    def compilar(self):
        resultado = subprocess.run(["docker", "run", "--rm", "-v", f"{os.getcwd()}/sandbox/archivos_compilacion:/app", "sandbox", "python", f'{self.archivo_py}'], 
                        capture_output=True, text=True)
        if resultado.stderr:
            self.formatoErrores(resultado.stderr)
            # print('error')
        else:
            print('todo bien')
        
    def formatoErrores(self, texto_error_capturado):
        lineas_error = re.findall(r'File ".*", line (\d+)', texto_error_capturado)
        tipo_error = re.search(r'(\w+Error|Exception): (.+)', texto_error_capturado)
        descripcion_error = tipo_error.group(2) if tipo_error else texto_error_capturado.strip()

        print(f'Linea: {lineas_error[-1]}')
        print(f'Tipo: {tipo_error.group(1)}')
        print(f'Descripcion del error: {descripcion_error}')