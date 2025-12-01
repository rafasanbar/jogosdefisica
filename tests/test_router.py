import pytest

from lead_router import Lead, LeadRouter, LeadRule, Route


def test_routes_by_source_and_metadata():
    marketing = Route(name="Marketing", owner_team="Marketing", tags=["ad"])
    enterprise = Route(name="Enterprise Sales", owner_team="Sales", tags=["b2b"])
    support = Route(name="Support", owner_team="Support")

    router = LeadRouter(
        rules=[
            LeadRule(name="ads", route=marketing, sources=["facebook", "google"]),
            LeadRule(name="enterprise", route=enterprise, metadata_matches={"company_size": "1000+"}),
            LeadRule(name="support", route=support, sources=["helpdesk"]),
        ],
        default_route=marketing,
    )

    lead = Lead(name="Ana", email="ana@example.com", source="facebook")
    result = router.route(lead)
    assert result.route is marketing
    assert result.rule_used == "ads"

    enterprise_lead = Lead(
        name="Big Co Contact",
        email="contact@bigco.com",
        source="inbound",
        details={"company_size": "1000+"},
    )
    result = router.route(enterprise_lead)
    assert result.route is enterprise
    assert result.rule_used == "enterprise"

    support_lead = Lead(name="Issue Reporter", email="user@help.com", source="helpdesk")
    result = router.route(support_lead)
    assert result.route is support

    fallback_lead = Lead(name="Newsletter", email="news@example.com", source="newsletter")
    result = router.route(fallback_lead)
    assert result.route is marketing
    assert result.rule_used == "default"


def test_from_config_with_predicates():
    config = {
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

    def is_vip(lead: Lead) -> bool:
        return lead.details.get("vip") is True

    router = LeadRouter.from_config(
        routes=config["routes"],
        rules=config["rules"],
        default_route=config["default_route"],
        predicates={"is_vip": is_vip},
    )

    vip_lead = Lead(name="VIP Customer", email="vip@example.com", source="event", details={"vip": True})
    assert router.route(vip_lead).route.name == "VIP Desk"

    br_lead = Lead(
        name="Brazil Landing", email="br@example.com", source="landing", details={"country": "BR"}
    )
    assert router.route(br_lead).route.name == "B2C"

    default_lead = Lead(name="Other", email="other@example.com", source="referral")
    assert router.route(default_lead).route.name == "General"


def test_missing_configuration_raises_errors():
    config = {
        "routes": {"general": {"name": "General", "owner_team": "Ops"}},
        "rules": [{"route": "missing"}],
        "default_route": "general",
    }

    with pytest.raises(KeyError):
        LeadRouter.from_config(routes=config["routes"], rules=config["rules"], default_route="general")

    with pytest.raises(KeyError):
        LeadRouter.from_config(routes={}, rules=[], default_route="unknown")

    with pytest.raises(ValueError):
        LeadRouter(rules=[], default_route=Route(name="General", owner_team="Ops"))
