#!/usr/bin/env python3
"""Tiny dev server for London School with content save/load API.

Serves static files AND provides two endpoints:
  GET  /api/content  — returns saved content edits as JSON
  POST /api/content  — saves content edits (JSON body) to content.json

Run:  python3 server.py
Then:  http://localhost:8080/editor.html  (edit)
       http://localhost:8080/              (view with saved edits)
"""

import http.server
import json
import os

PORT = 8080
DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DIR, 'content.json')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        if self.path == '/api/content':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, 'r') as f:
                    self.wfile.write(f.read().encode())
            else:
                self.wfile.write(b'{}')
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/content':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            try:
                data = json.loads(body)
                with open(DATA_FILE, 'w') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"ok":true}')
            except json.JSONDecodeError:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error":"invalid json"}')
            return
        self.send_response(405)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


if __name__ == '__main__':
    print(f'London School dev server at http://localhost:{PORT}')
    print(f'  Editor:  http://localhost:{PORT}/editor.html')
    print(f'  Site:    http://localhost:{PORT}/')
    print(f'  Content: saved to {DATA_FILE}')
    http.server.HTTPServer(('', PORT), Handler).serve_forever()
