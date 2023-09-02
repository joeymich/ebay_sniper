import uuid
import datetime

from sqlalchemy import Column, String, DateTime, Integer, UUID, ForeignKey
from sqlalchemy.orm import Mapper
from sqlalchemy.engine import Connection

from app.extensions import db
from app.tasks import snipe_listing


class Snipe(db.Model):
    __tablename__ = 'snipe'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    max_bid = Column(Integer, nullable=False)
    offset = Column(Integer, nullable=True, default=7)
    status = Column(String(255), nullable=True, default='SCHEDULED')
    
    # Listing data
    ebay_item_number = Column(String(255), nullable=True)
    title = Column(String(255))
    
    seller = Column(String(255))
    seller_feedback = Column(Integer)
    
    current_bid = Column(Integer)
    bid_count = Column(Integer)
    
    shipping_cost = Column(Integer)
    
    ending_at = Column(DateTime)
    
    # # Celery task id, uuid
    # task_id = Column(String(36))
    
    # Foreign key
    user_id = Column(UUID, ForeignKey('user.id', ondelete='cascade'))
    
    # Time
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    deleted_at = Column(DateTime)
    
    
    # def __init__(self):
    #     print('creating snipe')
        
        
    def __del__(self):
        print('deleting snipe')
            
    
# @db.event.listens_for(Snipe, 'after_insert')
# def create_snipe_task(mapper: Mapper, connection: Connection, target: Snipe) -> None:
#     task = snipe_listing.apply_async((target.ebay_item_number, target.max_bid), eta=target.ending_at)
#     task_id = task.id
#     target.task_id = task_id
#     connection.commit()


# @db.event.listens_for(Snipe, 'after_update')
# def update_snipe_task(mapper: Mapper, connection: Connection, target: Snipe) -> None:
#     pass


# @db.event_listens_for(Snipe, 'after_delete')
# def delete_snipe_task(mapper: Mapper, connection: Connection, target: Snipe) -> None:
#     pass
    