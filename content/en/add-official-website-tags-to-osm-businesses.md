---
title: "Add official website tags to OSM businesses with JOSM"
summary: "Use the WebsiteWizard plugin in JOSM to find and verify official URLs for named shops and amenities lacking website tags. Download a small area via Overpass, search each candidate, confirm the correct site, and upload with a survey citation. About one million U.S."
lang: en
story: add-official-website-tags-to-osm-businesses
publishedAt: 2026-09-13T12:50:24.238Z
sourceUrl: "https://high5apps.github.io/josm-plugin-website-wizard/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [osm, josm, website, mapping]
generatedBy: dots-studio/dots-3-note-preview:free
---
The tutorial guides you through adding an official website tag to a business or amenity in OpenStreetMap, a process that takes about 15 minutes. It recommends JOSM, the Java OpenStreetMap Editor, over the browser-based iD editor because JOSM supports plugins that automate the most tedious parts of the workflow. The download is about 365 MB.

After installing JOSM, you enable the `WebsiteWizard` plugin from the preferences dialog. This plugin adds a search button next to the `website` tag field. When you select a node or way, the plugin queries DuckDuckGo for the feature's name and location, then presents candidate URLs. You still have to verify that the result is the actual official site , not a Facebook page, a Yelp listing, or a third-party aggregator , before accepting it.

The author demonstrates the workflow on the Wallingford neighborhood in Seattle, adding 66 new website tags in a single session. To replicate this, you download a small area of interest (AOI) , no larger than a few city blocks , using the Overpass API query built into JOSM. The example query targets shops and amenities that have a name and address but lack a website tag:

```
name=* ((amenity=* "addr:housenumber"=*) | shop=*) -website=* -"contact:website"=*
```

Once the data loads, you step through each candidate, run the plugin search, confirm the URL, and move to the next. When you upload the changeset, the comment should describe the action and cite the source as `survey`, even though the verification happened remotely. The convention signals to other mappers that a human checked the data on the ground or via authoritative sources.

The changes propagate to every free service built on OSM worldwide. There are roughly one million businesses in the United States that still need this treatment.

## What is not known

- Whether `WebsiteWizard` is compatible with every JOSM release.
- How to validate a URL when no clear official site exists.
- How to handle sites that are not in English or are not indexed by DuckDuckGo.
- Whether copying a URL from a website into OSM raises any licensing or terms-of-service issues.
- Whether the downloaded AOI extract already includes elements that have a `website` tag but were filtered out by the query.
