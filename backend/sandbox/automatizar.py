import os, re
import subprocess

class Compilar_Codigo:

    def __init__(self, string_codigo):
        self.codigo = string_codigo
        self.archivo_py = 'user.py'

    def convertir(self):
        carpeta_destino = os.path.join(os.path.dirname(__file__), "archivos_compilacion")
        os.makedirs(carpeta_destino, exist_ok=True)
        ruta_archivo = os.path.join(carpeta_destino, self.archivo_py)
        with open(ruta_archivo, "w", encoding="utf-8") as archivo:
            archivo.write(self.codigo)

    def compilar(self):
        ruta_relativa = os.path.join(os.path.dirname(__file__), "archivos_compilacion")
        ruta_absoluta = os.path.abspath(ruta_relativa)
        resultado = subprocess.run([
            "docker", "run", "--rm",
            "-v", f"{ruta_absoluta}:/app",
            "sandbox", "python", f'{self.archivo_py}'
        ], capture_output=True, text=True)

        if resultado.stderr:
            self.formatoErrores(resultado.stderr)
        else:
            print('todo bien')

    def formatoErrores(self, texto_error_capturado):
        lineas_error = re.findall(r'File ".*", line (\d+)', texto_error_capturado)
        tipo_error = re.search(r'(\w+Error|Exception): (.+)', texto_error_capturado)
        descripcion_error = tipo_error.group(2) if tipo_error else texto_error_capturado.strip()

        if lineas_error:
            print(f'Linea: {lineas_error[-1]}')
        else:
            print('Linea: no detectada')

        if tipo_error:
            print(f'Tipo: {tipo_error.group(1)}')
        print(f'Descripcion del error: {descripcion_error}')


# Ejemplo de uso
if __name__ == "__main__":
    import sys

    codigo_recibido = sys.stdin.read()
    prueba = Compilar_Codigo(codigo_recibido)
    prueba.convertir()
    prueba.compilar()
