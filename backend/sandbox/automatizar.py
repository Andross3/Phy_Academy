import os
import re
import subprocess
from typing import List, Dict

class Compilar_Codigo:
    PALABRAS_RESERVADAS = {
        'while': 'No está permitido usar bucles while en este ejercicio',
        'for': 'No está permitido usar bucles for en este ejercicio',
        'import': 'No está permitido importar módulos externos',
        'eval': 'La función eval() no está permitida por seguridad',
        'exec': 'La función exec() no está permitida por seguridad',
        # Agrega más palabras reservadas según necesites
    }

    def __init__(self, string_codigo: str, restricciones: List[str] = None):
        self.codigo = string_codigo
        self.archivo_py = 'pepe.py'
        self.restricciones = restricciones if restricciones else []
        self.errores_restricciones: List[Dict[str, str]] = []

    def verificar_restricciones(self) -> bool:
        """Verifica si el código viola alguna restricción de palabras reservadas"""
        for palabra in self.restricciones:
            if palabra.lower() in self.PALABRAS_RESERVADAS:
                # Usamos una expresión regular para buscar la palabra como palabra completa
                if re.search(rf'\b{palabra}\b', self.codigo, re.IGNORECASE):
                    self.errores_restricciones.append({
                        'palabra': palabra,
                        'mensaje': self.PALABRAS_RESERVADAS[palabra.lower()],
                        'linea': self._encontrar_linea(palabra)
                    })
        
        return len(self.errores_restricciones) == 0

    def _encontrar_linea(self, palabra: str) -> int:
        """Encuentra la línea donde aparece la palabra restringida"""
        lineas = self.codigo.split('\n')
        for num_linea, linea in enumerate(lineas, 1):
            if re.search(rf'\b{palabra}\b', linea, re.IGNORECASE):
                return num_linea
        return 0

    def convertir(self) -> bool:
        """Convierte el código a archivo solo si pasa las restricciones"""
        if not self.verificar_restricciones():
            return False
            
        carpeta_destino = "sandbox/archivos_compilacion"
        os.makedirs(carpeta_destino, exist_ok=True)
        ruta_archivo = os.path.join(carpeta_destino, self.archivo_py)
        with open(ruta_archivo, "w", encoding="utf-8") as archivo:
            archivo.write(self.codigo)
        return True

    def compilar(self):
        if not self.convertir():
            for error in self.errores_restricciones:
                print(f"Error de restricción - Línea {error['linea']}:")
                print(f"Palabra prohibida: '{error['palabra']}'")
                print(f"Motivo: {error['mensaje']}")
            return False

        resultado = subprocess.run(
            ["docker", "run", "--rm", "-v", f"{os.getcwd()}/sandbox/archivos_compilacion:/app", 
             "sandbox", "python", f'{self.archivo_py}'], 
            capture_output=True, text=True
        )
        
        if resultado.stderr:
            self.formatoErrores(resultado.stderr)
            return False
        else:
            print('Compilación exitosa')
            return True
        
    def formatoErrores(self, texto_error_capturado: str):
        lineas_error = re.findall(r'File ".*", line (\d+)', texto_error_capturado)
        tipo_error = re.search(r'(\w+Error|Exception): (.+)', texto_error_capturado)
        descripcion_error = tipo_error.group(2) if tipo_error else texto_error_capturado.strip()

        print(f'Error de compilación - Línea: {lineas_error[-1]}')
        print(f'Tipo: {tipo_error.group(1) if tipo_error else "Error"}')
        print(f'Descripción: {descripcion_error}')