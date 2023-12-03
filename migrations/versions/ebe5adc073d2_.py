"""empty message

Revision ID: ebe5adc073d2
Revises: cb39a7c81acd
Create Date: 2023-12-03 13:21:16.850552

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebe5adc073d2'
down_revision = 'cb39a7c81acd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('documents', schema=None) as batch_op:
        batch_op.add_column(sa.Column('document_file', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('documents', schema=None) as batch_op:
        batch_op.drop_column('document_file')

    # ### end Alembic commands ###
