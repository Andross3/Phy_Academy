class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'rootPhyAcademy'
    SQLALCHEMY_DATABASE_URI = (
        'postgresql://root:rootPhyAcademy@db:5432/postgres'
    )
