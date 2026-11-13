import xml.etree.ElementTree as ET

# Read current shatranj-logo.svg
with open('public/shatranj-logo.svg', 'r') as f:
    svg_data = f.read()

# Verify parse
root = ET.fromstring(svg_data)
print("Current SVG lines:", len(svg_data.splitlines()), "Root tag:", root.tag)
