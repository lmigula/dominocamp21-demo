---
pagination:
    data: fakenames
    size: 1
    alias: name
layout: detail.njk
permalink: "names/{{ name['@unid'] | slug }}/"
eleventyComputed:
  title: "{{ name['FirstName']}} {{ name['LastName']}}"
---