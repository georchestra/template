Configure mapfishapp print
==========================

To configure the look of the mapfishapp print:
- config.yaml: composition of all layouts
- background_*.pdf: background images for each layout

Composition of the layouts
==========================

The file `config.yaml` configure the composition of each layout. For detailed documentation on configuration, see http://www.mapfish.org/doc/print/configuration.html.

All the elements of the printed PDF are defined in this file, with the only exception of the decoration images (see  the "Background PDF" section). This includes size and position of the map, map elements (scalebar, arrow, map overview), map title, legend, date, scale, projection, sources, and free text comments.

The whole arrangement is done using the **pt** unit (see the "How to manage the different units" section for more details). The base of the layouts is done with multiples of 6pt: the big margins are 12pt, and the small margins (between texts) are 6pt. We use also 20pt as big font (title) and 10pt as small font. The borders are 1pt.

In `config.yaml`, the origin (0, 0) is at bottom left.

Background PDF
==============

The background PDF is intended to contain only decoration, as logos for example, and nothing more. Source files in ODG format (editable with Libre Office) are available in the `sources` directory. Use them for generating the PDF files.

How to manage the different units
=================================

The unit used in config.yaml is the **point** (**pt**). See http://en.wikipedia.org/wiki/Point_%28typography%29 for more details. The point is a length unit (like the inch or the cm), not a digital unit (like the pixel). It is defined as `1/72 inch`, ie. `2.54/72 cm`.

The A4 format is `21cm x 29.7cm`, ie `595pt x 842pt`. It is recommended to design all the layout thinking with the point unit.

LibreOffice uses the cm unit, therefore when designing the background ODG, convert manually the pt dimensions to cm. Take care of the margins, you need to set them to 0cm in the ODG file in order to use the same dimensions as in `config.yaml`.

Gimp provides the pt scale, you may use it in order to measure the dimensions in the PDF.

Be careful: in LibreOffice and Gimp, the origin is at top left, whereas in `config.yaml`, the origin is at bottom left.
