# Author: Timi
# File: kaagle.py
# Created: 2026-02-27T14:03:34.157Z
# Description: Desc

import kagglehub

# Download latest version
path = kagglehub.dataset_download("uom190346a/food-ingredients-and-allergens")

print("Path to dataset files:", path)