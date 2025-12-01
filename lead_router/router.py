from __future__ import annotations

from dataclasses import dataclass, field
from typing import Callable, Dict, Iterable, List

from .models import Lead, Route, RoutedLead


Predicate = Callable[[Lead], bool]


@dataclass
class LeadRule:
    """Rule that evaluates whether a lead should go to a route."""

    name: str
    route: Route
    sources: Iterable[str] | None = None
    metadata_matches: Dict[str, str] = field(default_factory=dict)
    predicate: Predicate | None = None

    def matches(self, lead: Lead) -> bool:
        """Return True if the rule applies to the lead."""

        if self.sources is not None and lead.source not in set(self.sources):
            return False

        for key, expected in self.metadata_matches.items():
            if lead.details.get(key) != expected:
                return False

        if self.predicate is not None and not self.predicate(lead):
            return False

        return True


class LeadRouter:
    """Routes leads according to a collection of ordered rules."""

    def __init__(self, rules: List[LeadRule], default_route: Route):
        if not rules:
            raise ValueError("At least one rule is required")

        self.rules = rules
        self.default_route = default_route

    def route(self, lead: Lead) -> RoutedLead:
        """Return the route chosen for the lead along with the rule used."""

        for rule in self.rules:
            if rule.matches(lead):
                return RoutedLead(lead=lead, route=rule.route, rule_used=rule.name)

        return RoutedLead(lead=lead, route=self.default_route, rule_used="default")

    @classmethod
    def from_config(
        cls,
        *,
        routes: Dict[str, Dict[str, object]],
        rules: List[Dict[str, object]],
        default_route: str,
        predicates: Dict[str, Predicate] | None = None,
    ) -> "LeadRouter":
        """Create a router using dictionary-based configuration.

        Parameters
        ----------
        routes:
            Mapping of route identifiers to configuration dictionaries that map
            to the :class:`lead_router.models.Route` fields.
        rules:
            Ordered list of rule dictionaries. Each rule must include a
            ``route`` key that references a route identifier. Optional keys are
            ``name`` (defaults to the route id), ``sources``,
            ``metadata_matches``, and ``predicate`` (name of a registered
            predicate function).
        default_route:
            Identifier referencing the route that should be used when no rule
            matches.
        predicates:
            Mapping of predicate names to callables that accept a
            :class:`lead_router.models.Lead` instance.
        """

        predicate_registry = predicates or {}
        route_objs = {key: Route(**config) for key, config in routes.items()}

        if default_route not in route_objs:
            raise KeyError(f"Default route '{default_route}' is not defined")

        rule_objs: List[LeadRule] = []
        for rule_cfg in rules:
            route_id = rule_cfg.get("route")
            if route_id not in route_objs:
                raise KeyError(f"Route '{route_id}' referenced by a rule is not defined")

            predicate_name = rule_cfg.get("predicate")
            predicate_fn = None
            if predicate_name:
                if predicate_name not in predicate_registry:
                    raise KeyError(f"Unknown predicate '{predicate_name}'")
                predicate_fn = predicate_registry[predicate_name]

            rule_objs.append(
                LeadRule(
                    name=rule_cfg.get("name", route_id),
                    route=route_objs[route_id],
                    sources=rule_cfg.get("sources"),
                    metadata_matches=rule_cfg.get("metadata_matches", {}),
                    predicate=predicate_fn,
                )
            )

        return cls(rules=rule_objs, default_route=route_objs[default_route])
