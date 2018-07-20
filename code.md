---
layout: default
---

# Open-Source all the Things!

Quick version: my code is availabe on [Github](https://github.com/TomDonoghue), and indexed [here](https://github.com/TomDonoghue/Roadmap).

I work mostly in Python and aim to release code for all my projects, for transparency, and also in case it may be useful to anyone else. Project specific codebases will linked out through the [research page](research.html), but I'll link to more general (project-agnostic) code here.

All code is hosted on Github, either on my [personal page](https://github.com/TomDonoghue), or the [Voytek Lab page](https://github.com/voytekresearch).

### FOOOF: Fitting Oscillations & One-Over F

I am the lead developer on [FOOOF](https://github.com/voytekresearch/fooof), a project out of the Voytek lab for parameterizing neural power spectra. FOOOF is a Python package that takes as input frequeny-representations of neural time series data, and uses an efficient iterative algorithm to parameterize them in terms of physiological informative features - specically, into putative oscillatory components, and the aperiodic (1/f) background.

### LISC: Literature Scanner

Some of my projects include collecting and systematically analyzing text-data, particularly academic papers. To facilitate this work, I have developed a module to systematically search and collect scientific paper, using the Pubmed EUtils API, and which also includes some simple analyses tools for collected papers.

Currently, LISC is hosted [here](https://github.com/neurohackweek/DataDrivenCognitiveOntology).

Example project that can be done with this kind of tool include [ERP-SCANR](https://github.com/TomDonoghue/ERP_SCANR), our automated meta-analysis of ERP research.

### Psychopy Templates

I mainly use [Psychopy](http://www.psychopy.org) for running behavioural experiments, usually with concurrent EEG recordings. To do so, I have a set of [templates](https://github.com/TomDonoghue/psychopy_templates) that structure a consistent organization that I new use for all my tasks.

These outlines were developed, and are most relevant to, psychophysics experiments that include behavioural thresholding followed by a series of experiment blocks.

These templates also include support for running online experiments related and as described in my [Phase Projects](research.html).

### Oscillation Visualization

For a class project, I worked on a very basic website with a set of visualizations to help 'see' some common ideas in electrophysiology and time series analysis. The resulting website can be viewed [here](http://icogsci1.ucsd.edu/~tdonoghu/), and the Github repository is [here](https://github.com/TomDonoghue/osc_viz).

### Teaching Materials

I also write and release code and tutorials for use in classes and as educational materials, which are more fully described [here](teaching.html). These include, for example, quickstart materials for [learning and using Python](https://github.com/TomDonoghue/PythonBootcamp), and a set of [tutorial materials for data science](https://github.com/COGS108/Tutorials).