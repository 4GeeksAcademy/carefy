"""empty message

Revision ID: c232a27a26e0
Revises: 
Create Date: 2024-08-14 16:14:13.124079

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c232a27a26e0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.Column('lastname', sa.String(length=250), nullable=True),
    sa.Column('phone', sa.String(length=250), nullable=True),
    sa.Column('location', sa.String(length=250), nullable=True),
    sa.Column('role', sa.String(length=250), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('companions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=False),
    sa.Column('photo', sa.String(length=250), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('province', sa.String(length=250), nullable=False),
    sa.Column('availability_hours', sa.Boolean(), nullable=True),
    sa.Column('availability_days', sa.Boolean(), nullable=True),
    sa.Column('availability_weeks', sa.Boolean(), nullable=True),
    sa.Column('availability_live_in', sa.Boolean(), nullable=True),
    sa.Column('experience', sa.String(length=250), nullable=False),
    sa.Column('service_cost', sa.Integer(), nullable=False),
    sa.Column('facebook', sa.String(length=250), nullable=True),
    sa.Column('instagram', sa.String(length=250), nullable=True),
    sa.Column('twitter', sa.String(length=250), nullable=True),
    sa.Column('linkedin', sa.String(length=250), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('lastname', sa.String(length=250), nullable=False),
    sa.Column('phone', sa.String(length=250), nullable=False),
    sa.Column('photo', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=False),
    sa.Column('birthdate', sa.String(length=250), nullable=False),
    sa.Column('dependency', sa.String(length=250), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('province', sa.String(length=250), nullable=False),
    sa.Column('availability', sa.String(length=250), nullable=False),
    sa.Column('tags', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('max_cost', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'REJECTED', 'OK', name='status'), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favourite_companions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('companion_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['companion_id'], ['companions.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inscriptions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('companion_id', sa.Integer(), nullable=False),
    sa.Column('ad_id', sa.Integer(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['ad_id'], ['ads.id'], ),
    sa.ForeignKeyConstraint(['companion_id'], ['companions.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('inscriptions')
    op.drop_table('favourite_companions')
    op.drop_table('ads')
    op.drop_table('patients')
    op.drop_table('companions')
    op.drop_table('users')
    # ### end Alembic commands ###
