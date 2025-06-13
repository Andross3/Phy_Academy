class Trabajo:
    def __init__(self, code, callback, timeoutMs=10000):
        self.code = code
        self.callback = callback
        self.timeoutMs = timeoutMs
    
    def imprimir(self):
        return f"este es el codigo {self.code}"