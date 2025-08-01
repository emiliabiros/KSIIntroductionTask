from pydantic import BaseModel, ConfigDict

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)