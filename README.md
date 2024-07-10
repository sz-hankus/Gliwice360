# Gliwice360

## How I obtained the city's boundaries
I used the openstreetmap database and a tool called `polygons.openstreetmap.fr`.

First, I obtained my city's relation ID on `openstreetmap.org`.
Then, all I had to do was download the city's boundaries using the 
above-mentioned tool:

```shell
wget "http://polygons.openstreetmap.fr/get_geojson.py?id=2103532&params=0"
```

