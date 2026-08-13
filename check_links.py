import os
import re

workspace = r"c:\Users\ADMIN\Documents\dev june\legal-and-vakil-web-june-2026"
html_files = [f for f in os.listdir(workspace) if f.endswith(".html")]

services = [
    "Private Limited Company",
    "LLP Registration",
    "One Person Company",
    "Public Limited Company",
    "Section 8 Company",
    "Business Registration License",
    "Nidhi Company Registration",
    "Indian Subsidiary Registration"
]

for filename in html_files:
    filepath = os.path.join(workspace, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        # Find all a tags
        matches = re.findall(r'<a\s+[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>', content, re.DOTALL)
        for href, text in matches:
            text_clean = re.sub(r'<[^>]*>', '', text).strip()
            if text_clean in services:
                if href == "#":
                    print(f"UNMAPPED in {filename}: {text_clean} -> {href}")

print("Search complete.")
