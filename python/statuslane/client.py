from __future__ import annotations
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

class StatusLaneError(Exception):
    def __init__(self, message: str, *, code: str | None = None, status: int | None = None) -> None:
        super().__init__(message); self.code = code; self.status = status

class StatusLaneClient:
    def __init__(self, api_key: str | None = None, base_url: str | None = None, *, timeout: float = 30.0) -> None:
        self.api_key = api_key or os.environ.get("TALOCODE_API_KEY")
        self.base_url = (base_url or os.environ.get("TALOCODE_BASE_URL") or "https://api.talocode.site").rstrip("/")
        self.timeout = timeout
    def _request(self, method: str, path: str, body: dict[str, Any] | None = None) -> dict[str, Any]:
        headers = {"Content-Type": "application/json"}
        if self.api_key: headers["Authorization"] = f"Bearer {self.api_key}"
        request = urllib.request.Request(f"{self.base_url}{path}", data=json.dumps(body).encode() if body is not None else None, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                return json.loads(response.read().decode() or "{}")
        except urllib.error.HTTPError as error:
            try: detail = json.loads(error.read().decode()); message = detail.get("error", str(error)); code = detail.get("code")
            except Exception: message, code = str(error), None
            raise StatusLaneError(message, code=code, status=error.code) from error
    def health(self): return self._request("GET", "/v1/statuslane/health")
    def pricing(self): return self._request("GET", "/v1/statuslane/pricing")
    def capabilities(self): return self._request("GET", "/v1/statuslane/capabilities")
    def create_monitor(self, name: str, url: str, **kwargs: Any): return self._request("POST", "/v1/statuslane/monitors", {"name": name, "url": url, **kwargs})
    def list_monitors(self): return self._request("GET", "/v1/statuslane/monitors")
    def get_monitor(self, monitor_id: str): return self._request("GET", f"/v1/statuslane/monitors/{urllib.parse.quote(monitor_id, safe='')}")
    def check_monitor(self, monitor_id: str): return self._request("POST", f"/v1/statuslane/monitors/{urllib.parse.quote(monitor_id, safe='')}/check", {})
    def history(self, monitor_id: str): return self._request("GET", f"/v1/statuslane/monitors/{urllib.parse.quote(monitor_id, safe='')}/history")
    def open_incident(self, monitor_id: str, note: str | None = None): return self._request("POST", f"/v1/statuslane/monitors/{urllib.parse.quote(monitor_id, safe='')}/incident", {"note": note})
    def resolve_incident(self, incident_id: str): return self._request("POST", f"/v1/statuslane/incidents/{urllib.parse.quote(incident_id, safe='')}/resolve", {})

def create_statuslane_client(api_key: str | None = None, base_url: str | None = None, **kwargs: Any) -> StatusLaneClient:
    return StatusLaneClient(api_key=api_key, base_url=base_url, **kwargs)
