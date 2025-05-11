import os, re
import subprocess



def formatoErrores(texto_error_capturado):
    lineas_error = re.findall(r'File ".*", line (\d+)', texto_error_capturado)
    tipo_error = re.search(r'(\w+Error|Exception): (.+)', texto_error_capturado)
    descripcion_error = tipo_error.group(2) if tipo_error else texto_error_capturado.strip()

    print(f'Linea: {lineas_error[-1]}')
    print(f'Tipo: {tipo_error.group(1)}')
    print(f'Descripcion del error: {descripcion_error}')

ruta_actual = os.getcwd()
print(ruta_actual)

resultados = []

for codigo in os.listdir():

    if codigo.endswith('.txt') and codigo != 'automatizar.py':

        # Cambiar nombre de archivo de .txt a .py (crear una copia con extensión .py)
        codigo_py = codigo.replace('.txt', '.py')
        with open(codigo, 'r') as archivo_original:
            contenido = archivo_original.read()
        
        with open(codigo_py, 'w') as archivo_nuevo:
            archivo_nuevo.write(contenido)

        # listaCodigos.append(codigo)
        resultado = subprocess.run(["docker", "run", "--rm", "-v", os.getcwd() + ":/app", "sandbox", "python", f'{codigo_py}'], 
                        capture_output=True, text=True)
        if resultado.stderr:
            formatoErrores(resultado.stderr)
            
        else:
            resultados.append(resultado.stdout)
        

# print(resultados)
