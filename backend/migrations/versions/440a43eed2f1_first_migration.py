"""first migration

Revision ID: 440a43eed2f1
Revises: 
Create Date: 2025-06-26 19:36:14.356249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '440a43eed2f1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('docente',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=50), nullable=False),
    sa.Column('apellido', sa.String(length=50), nullable=False),
    sa.Column('correo', sa.String(length=100), nullable=False),
    sa.Column('telefono', sa.String(length=20), nullable=True),
    sa.Column('pais', sa.String(length=50), nullable=True),
    sa.Column('departamento', sa.String(length=50), nullable=True),
    sa.Column('provincia', sa.String(length=50), nullable=True),
    sa.Column('grado_academico', sa.String(length=50), nullable=True),
    sa.Column('institucion_educativa', sa.String(length=100), nullable=True),
    sa.Column('contraseña', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('correo')
    )
    op.create_table('estudiante',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('apellido', sa.String(length=100), nullable=False),
    sa.Column('correo', sa.String(length=100), nullable=False),
    sa.Column('contraseña', sa.String(length=255), nullable=False),
    sa.Column('carrera', sa.String(length=100), nullable=True),
    sa.Column('universidad', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('correo')
    )
    op.create_table('curso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.Column('id_docente', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_docente'], ['docente.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inscripcion',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_estudiante', sa.Integer(), nullable=False),
    sa.Column('id_curso', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_curso'], ['curso.id'], ),
    sa.ForeignKeyConstraint(['id_estudiante'], ['estudiante.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tema',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_curso', sa.Integer(), nullable=False),
    sa.Column('enlaces_videos', sa.Text(), nullable=True),
    sa.Column('texto_pdf', sa.Text(), nullable=True),
    sa.Column('notas', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['id_curso'], ['curso.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tarea',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('titulo', sa.String(length=200), nullable=True),
    sa.Column('descripcion', sa.Text(), nullable=False),
    sa.Column('tipo_tarea', sa.String(length=50), nullable=False),
    sa.Column('restricciones', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('codigo_plantilla', sa.Text(), nullable=True),
    sa.Column('fecha_publicacion', sa.DateTime(), nullable=False),
    sa.Column('fecha_entrega', sa.Date(), nullable=True),
    sa.Column('hora_entrega', sa.Time(), nullable=True),
    sa.Column('id_tema', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_tema'], ['tema.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('resolucion',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_tarea', sa.Integer(), nullable=False),
    sa.Column('id_estudiante', sa.Integer(), nullable=False),
    sa.Column('codigo', sa.Text(), nullable=True),
    sa.Column('resultado', sa.Text(), nullable=True),
    sa.Column('fecha_envio', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['id_estudiante'], ['estudiante.id'], ),
    sa.ForeignKeyConstraint(['id_tarea'], ['tarea.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('resolucion')
    op.drop_table('tarea')
    op.drop_table('tema')
    op.drop_table('inscripcion')
    op.drop_table('curso')
    op.drop_table('estudiante')
    op.drop_table('docente')
    # ### end Alembic commands ###
