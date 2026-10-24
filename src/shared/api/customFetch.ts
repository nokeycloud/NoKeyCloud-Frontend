import { backendBaseUrl } from "@/shared/config";
import { addCsrfHeader, invalidateCsrfToken, isSafeMethod } from "./csrf";
import { setGuest } from "@/entities/session";

let refreshInFlight: Promise<boolean> | null = null;

async function send(url: string, options: RequestInit): Promise<Response> {
  const credentials = options.credentials ?? "include";
  return fetch(url, { ...options, credentials });
}

async function sendWithCsrf(
  url: string,
  options: RequestInit,
): Promise<Response> {
  return send(url, await addCsrfHeader(options));
}

async function sendWithCsrfRetry(
  url: string,
  options: RequestInit,
): Promise<Response> {
  let response = await sendWithCsrf(url, options);

  if (response.status === 403 && !isSafeMethod(options.method)) {
    invalidateCsrfToken();
    response = await sendWithCsrf(url, options);
  }

  return response;
}

async function performRefresh(): Promise<boolean> {
  try {
    const refreshResponse = await sendWithCsrfRetry(
        `${backendBaseUrl}/api/Authenticate/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        },
    );

    if (refreshResponse.ok) {
      return true;
    }

    invalidateCsrfToken();
    setGuest();
    return false;
  } catch (error) {
    console.error("Silent token refresh failed:", error);
    return false;
  }
}

function ensureRefreshed(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = performRefresh().finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
}

export async function customFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const requestOptions: RequestInit = { ...options };
  const isAuthCall =
    /\/api\/Authenticate\/(login|refresh|logout|register)/i.test(url);

  let response = await sendWithCsrfRetry(url, requestOptions);

  if (response.status === 401 && !isAuthCall) {
    const refreshed = await ensureRefreshed();

    if (refreshed) {
      response = await sendWithCsrfRetry(url, requestOptions);
    }
  }

  return response;
}