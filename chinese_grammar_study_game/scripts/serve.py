"""Serve the static game. Use --host 0.0.0.0 to play from a phone on your LAN."""

import argparse
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class GameRequestHandler(SimpleHTTPRequestHandler):
    """Always serve current local files, including imported JavaScript modules."""

    def do_GET(self):
        # Old cached responses may send validators from before no-store was enabled.
        for header in ("If-Modified-Since", "If-None-Match"):
            if header in self.headers:
                del self.headers[header]
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    handler = partial(GameRequestHandler, directory=str(root))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Jù is ready at http://{args.host}:{args.port}", flush=True)
    print(f"Serving {root}", flush=True)
    dataset = json.loads((root / "content/grammar-exercises.json").read_text(encoding="utf-8"))
    print(f"Exercise bank: {dataset['counts']['rules']} rules, {dataset['counts']['exercises']:,} exercises", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()
