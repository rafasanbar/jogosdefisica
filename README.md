# Lead routing engine

This project provides a small, configuration-driven routing engine for leads. It lets you
assign incoming leads to destinations (sales teams, marketing desks, or support
queues) based on the source of the lead, metadata, or custom predicates.

## Usage

Define your routes and rules, then pass a :class:`Lead` through the router:

```python
from lead_router import Lead, LeadRouter, LeadRule, Route

routes = {
    "marketing": Route(name="Marketing", owner_team="Marketing"),
    "sales": Route(name="Sales", owner_team="Sales"),
    "support": Route(name="Support", owner_team="Support"),
}

rules = [
    LeadRule(name="ad_campaigns", route=routes["marketing"], sources=["facebook", "google"]),
    LeadRule(name="high_value", route=routes["sales"], metadata_matches={"company_size": "1000+"}),
    LeadRule(name="tickets", route=routes["support"], sources=["helpdesk"]),
]

router = LeadRouter(rules=rules, default_route=routes["marketing"])

lead = Lead(name="Ana", email="ana@example.com", source="facebook")
assignment = router.route(lead)
print(assignment.route.name)  # Marketing
```

You can also build a router from dictionaries, making it easier to drive the
configuration from a database or environment variables:

```python
from lead_router import Lead, LeadRouter

CONFIG = {
    "routes": {
        "b2c": {"name": "B2C", "owner_team": "Sales"},
        "vip": {"name": "VIP Desk", "owner_team": "Specialists"},
        "default": {"name": "General", "owner_team": "Ops"},
    },
    "rules": [
        {"route": "vip", "predicate": "is_vip"},
        {"route": "b2c", "sources": ["landing"], "metadata_matches": {"country": "BR"}},
    ],
    "default_route": "default",
}

router = LeadRouter.from_config(
    routes=CONFIG["routes"],
    rules=CONFIG["rules"],
    default_route=CONFIG["default_route"],
    predicates={"is_vip": lambda lead: lead.details.get("vip") is True},
)

lead = Lead(name="VIP Customer", email="vip@example.com", source="event", details={"vip": True})
assignment = router.route(lead)
print(assignment.route.name)  # VIP Desk
```

## Development

1. Install dependencies: `python -m pip install -e .[dev]`
2. Run the tests: `pytest`
