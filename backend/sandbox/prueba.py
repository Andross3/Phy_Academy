# from trabajo import Trabajo
from Container import Contenedor
from admin_sandbox import AdminSandbox
import docker


cliente_docker = docker.from_env() 

prueba1 = AdminSandbox(cliente_docker)
prueba1.inicializador(1)
prueba1.verificar()
# cont = cliente_docker.containers.get('silly_mccarthy')
# cont1 = cliente_docker.containers.get('tender_borg')
# info = cont.attrs
# info2 = cont1.attrs
# # ip = info.get('NetworkSettings', {}).get('IPAddress', '')
# # ip2 = info2.get('NetworkSettings', {}).get('IPAddress', '')

# # print(ip, ip2)

# informacion = cont.attrs
# print(informacion.get('NetworkSettings',{}))
# print(informacion.get('NetworkSettings',{}).get('IPAddress', ''))
# # if (informacion.get('data')):
# #     print('no hay')