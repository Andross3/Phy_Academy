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
    if codigo.endswith('.py') and codigo != 'automatizar.py':
        # listaCodigos.append(codigo)
        resultado = subprocess.run(["docker", "run", "--rm", "-v", os.getcwd() + ":/app", "sandbox", "python", f'{codigo}'], 
                        capture_output=True, text=True)
        if resultado.stderr:
            formatoErrores(resultado.stderr)
            
        else:
            resultados.append(resultado.stdout)
        

# print(resultados)
