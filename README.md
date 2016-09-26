# revolve-json-elasticsearch
Converts revolve 2016-json to elasticsearch json


Use migrate.js to convert downloaded json-file to a format better suited for elasticsearch. 
The migration-util is designed for the 2016-logformat. Note that the resulting file will have to be split
into multiple files when it becomes too large. From memory I think about 350 lines should be a good limit (`split -l 360 <input>`). 

migrate.js requires node to run, run with `node migrate.js`. Note that the name of the input file is hardcoded 
into the file (`big.json`). 

## Mapping
The mapping file needs to be reworked to be able to correctly fit the data into elasticsearch (AFAIK). 
In early testing I was not able to perform meaningful queries on the data in Kibana, Timelion, or Grafana. 

