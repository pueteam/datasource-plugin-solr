Solr Datasource for Grafana
===========================

This plugin for [Grafana](http://grafana.org) provides an advanced datasource for querying Solr server >= 4. This datasource also provides support for the Solr version bundled with [Cloudera CDH 5.X](https://www.cloudera.com).

This project is open source pursuant to the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
It is copyright (C) 2018 by PUE Team.

Installation
------------

The easiest way to install this plugin is to clone or unzip this repository on the grafana plugins folder. For example:

```bash
cd /var/lib/grafana/plugins
git clone https://github.com/pueteam/datasource-plugin-solr
```

Then restart grafana to reload the plugins folder.

Configuration
-------------

1. Add a new datasource and choose "Solr" as the type.

2. Fill in the "Url" and other server parameters. If you run Solr in a kerberized cluster, you'll need LDAP authentication enabled, and provide the credentials here.

3. Optionally, add the collection to use. This is required if you plan to use templates.

4. Click "Test Connection" to verify that you entered the information correctly.

5. Cick "Save".

Queries
-------

First, select the query type. You can choose between `standard` and `group`. The `standard` query is the default.

- **Standard Queries**: The `standard` queries will execute regular queries against Solr. You'll need to fill the `Collection`, the `Timestamp` field, the `Fields` list (space or comma separated) and the `Query` in the Solr format `*:*`.

- **Group Queries**: The `group` type allows you to group results by `Group By Field` parameter. You'll also need to fill the `Group Value Field` and this parameter should be **numeric**. You can also limit the `Max Group Rows` results.

Template Support
----------------

This plugin supports Templates/Variables to be used, for example, in the `Query` parameter. You'll need to specify the `Collection` parameter in the `Datasource` parameters.

```bash
CR:$CR AND city:$city
```

Autocompletion Support
----------------------

This plugin supports auto completion for the Query Parameters.

Annotation Support
------------------

This plugin also supports Annotations. You'll need to provide:

- Collection
- Query
- Tags
- Title
- Text
- Time

Development
-----------

To compile, run the following commands:

```bash
npm install
grunt
```

To install in your Grafana server locally, either point Grafana at the repository directory by
editing `grafana.ini` to contain:

```bash
[plugin.solr]
path = /path/to/some/directory/datasource-plugin-solr
```

Or symlink the repository directory into the Grafana server's plugin directory:

```bash
cd /path/to/grafana/data/plugins
ln -s /path/to/some/directory/datasource-plugin-solr .
```

Then restart the Grafana server.

Contributors
------------

- Sergio Rodriguez de Guzman
