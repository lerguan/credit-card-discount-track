"""create User table

Revision ID: 1207c21905f7
Revises: b9775a14aea8
Create Date: 2023-10-05 01:21:55.286823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1207c21905f7'
down_revision = 'b9775a14aea8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('email', name=op.f('uq_users_email'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
