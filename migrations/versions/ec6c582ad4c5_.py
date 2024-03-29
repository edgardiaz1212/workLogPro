"""empty message

Revision ID: ec6c582ad4c5
Revises: 272615edb62b
Create Date: 2024-01-09 15:46:26.733753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec6c582ad4c5'
down_revision = '272615edb62b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pendings_units', schema=None) as batch_op:
        batch_op.add_column(sa.Column('provider', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pendings_units', schema=None) as batch_op:
        batch_op.drop_column('provider')

    # ### end Alembic commands ###
