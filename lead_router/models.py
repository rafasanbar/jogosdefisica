from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class Lead:
    """Information provided by a potential customer."""

    name: str
    email: str
    source: str
    details: Dict[str, str] = field(default_factory=dict)


@dataclass
class Route:
    """Target that should receive the lead."""

    name: str
    owner_team: str
    webhook_url: str | None = None
    tags: List[str] = field(default_factory=list)


@dataclass
class RoutedLead:
    """Association between a lead and the route chosen for it."""

    lead: Lead
    route: Route
    rule_used: str
