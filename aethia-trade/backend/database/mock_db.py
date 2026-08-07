# Hackathon-ready simple in-memory session database
class MockDB:
    def __init__(self):
        self.profiles = {}
        self.receipts = {}
        self.portfolios = {}

    def save_profile(self, wallet: str, profile: dict):
        self.profiles[wallet] = profile

    def get_profile(self, wallet: str) -> dict:
        return self.profiles.get(wallet)

    def save_receipt(self, receipt_id: str, receipt: dict):
        self.receipts[receipt_id] = receipt

    def get_receipt(self, receipt_id: str) -> dict:
        return self.receipts.get(receipt_id)

db_instance = MockDB()
