import json
import re
import sys
import threading
import unittest
from functools import partial
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from serve import GameRequestHandler


class ServerTests(unittest.TestCase):
    def test_current_assets_replace_cached_responses(self):
        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(GameRequestHandler, directory=str(ROOT))
        )
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        connection = HTTPConnection(*server.server_address, timeout=5)
        try:
            app_url = re.search(r'src="\./(app\.js\?v=[^"]+)"', (ROOT / "index.html").read_text()).group(1)
            game_url = re.search(r"from '\./(game\.js\?v=[^']+)'", (ROOT / "app.js").read_text()).group(1)
            self.assertEqual(urlsplit(app_url).query, urlsplit(game_url).query)
            for path in ("/", "/" + app_url, "/" + game_url, "/content/grammar-exercises.json"):
                with self.subTest(path=path):
                    connection.request("GET", path, headers={
                        "If-Modified-Since": "Wed, 01 Jan 2100 00:00:00 GMT",
                        "If-None-Match": '"old-version"',
                    })
                    response = connection.getresponse()
                    body = response.read()
                    self.assertEqual(response.status, 200)
                    self.assertEqual(response.getheader("Cache-Control"), "no-store")
                    filename = urlsplit(path).path.lstrip("/") or "index.html"
                    self.assertEqual(body, (ROOT / filename).read_bytes())
                    if path.endswith(".json"):
                        expected = json.loads((ROOT / path.lstrip("/")).read_text())
                        self.assertEqual(json.loads(body), expected)
        finally:
            connection.close()
            server.shutdown()
            worker.join()
            server.server_close()


if __name__ == "__main__":
    unittest.main()
