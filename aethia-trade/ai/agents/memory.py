# Memory store simulating agent state persistence
_memory_db = {}

def save_to_memory(key: str, val: any):
    _memory_db[key] = val

def load_from_memory(key: str, default: any = None) -> any:
    return _memory_db.get(key, default)

def get_all_keys() -> list:
    return list(_memory_db.keys())
