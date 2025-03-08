#!/usr/bin/env python3
import sys
import json
from bs4 import BeautifulSoup

def extract_servers(html_content):
    soup = BeautifulSoup(html_content, "lxml")
    
    ul_elements = soup.find_all("ul", attrs={"dir": "auto"})
    
    servers = []
    for ul in ul_elements:
        for li in ul.find_all("li", recursive=False):
            strong = li.find("strong")
            if strong:
                a_tag = strong.find("a")
                if a_tag:
                    name = a_tag.get_text(strip=True)
                    href = a_tag.get("href")
                    githubUrl = f"https://github.com{href}" if href and href.startswith("/") else href
                else:
                    name = strong.get_text(strip=True)
                    githubUrl = None
            else:
                name = li.get_text(strip=True)
                githubUrl = None

            description = li.get_text(separator=" ", strip=True)
            if name in description:
                description = description.replace(name, "").strip()
            if description.startswith("-"):
                description = description[1:].strip()

            servers.append({
                "name": name,
                "description": description,
                "githubUrl": githubUrl
            })
    return servers

def main():
    if len(sys.argv) < 2:
        print("Usage: python parse-servers.py path/to/servers.html")
        sys.exit(1)
    
    html_file = sys.argv[1]
    with open(html_file, "r", encoding="utf8") as f:
        html_content = f.read()
    
    servers = extract_servers(html_content)
    print(json.dumps(servers, indent=2))

if __name__ == "__main__":
    main()
