class UserSetter:
  def __init__(self) -> None:
    self.items = 0
    
  def get(self):
    items = {}
    for i in range(10):
      items[i] = i
    items["db"] = self.items 
    
    return items