"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fafafa",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 12, color: "#001c8e" }}>
            Travelora is unavailable
          </h1>
          <p style={{ color: "#6e6e6e", marginBottom: 24 }}>
            A fatal error happened while rendering this page.{" "}
            {error.digest && <small>({error.digest})</small>}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#febc12",
              border: 0,
              padding: "12px 24px",
              borderRadius: 999,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
