import type { Request, Response } from "express";

const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

export default async function handler(req: Request, res: Response) {
  const action = (req.query.action as string) || "";

  // ── action=login → return Steam redirect URL ──────────────────
  if (action === "login") {
    const host = (req.headers["x-forwarded-host"] as string) || (req.headers.host as string) || "";
    const proto = (req.headers["x-forwarded-proto"] as string) || "https";
    const baseUrl = `${proto}://${host}`;

    const returnTo = `${baseUrl}/api/steam-auth?action=callback`;

    const params = new URLSearchParams({
      "openid.ns": "http://specs.openid.net/auth/2.0",
      "openid.mode": "checkid_setup",
      "openid.return_to": returnTo,
      "openid.realm": baseUrl,
      "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
      "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    });

    const steamUrl = `${STEAM_OPENID_URL}?${params.toString()}`;

    res.json({ url: steamUrl });
    return;
  }

  // ── action=callback → validate and redirect back ──────────────
  if (action === "callback") {
    const queryParams: Record<string, string> = {};
    Object.entries(req.query).forEach(([key, value]) => {
      if (typeof value === "string") queryParams[key] = value;
    });

    const validationParams = new URLSearchParams(queryParams);
    validationParams.set("openid.mode", "check_authentication");

    const validationRes = await fetch(STEAM_OPENID_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: validationParams.toString(),
    });

    const validationText = await validationRes.text();
    const isValid = validationText.includes("is_valid:true");

    if (!isValid) {
      res.redirect("/?auth=error#cabinet");
      return;
    }

    // Extract Steam ID from claimed_id
    const claimedId = queryParams["openid.claimed_id"] || "";
    const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);
    const steamId = steamIdMatch ? steamIdMatch[1] : null;

    if (!steamId) {
      res.redirect("/?auth=error#cabinet");
      return;
    }

    // Redirect back with steamId in query
    res.redirect(`/?auth=success&steamId=${steamId}#cabinet`);
    return;
  }

  res.status(400).json({ error: "Unknown action. Use ?action=login or ?action=callback" });
}
