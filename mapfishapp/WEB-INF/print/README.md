Configure mapfishapp print
==========================

To configure the look of your printed PDFs, have a look at those files in [this directory](./):
- config.yaml: composition of all layouts
- background_*.pdf: background images for each layout

Composition of the layouts
==========================

The `config.yaml` file manages the composition of the layouts. For detailed documentation on how to configure, see the reference URL: http://www.mapfish.org/doc/print/configuration.html.

All the elements of the printed PDF are defined in this file, with the only exception of the ornamental images (see  the "Background PDF" section). This includes size and position of the map, map elements (scalebar, arrow, map overview), map title, legend, date, scale, projection, sources, and free text comments.

The whole arrangement is done using the **pt** unit (see the "How to manage the different units" section for more details). The base of the layouts is done with multiples of 6pt: the big margins are 12pt, and the small margins (between texts) are 6pt. We use also 20pt for big font (title) and 10pt for small font. The borders are 1pt.

Note that in `config.yaml`, the origin (0pt, 0pt) is at bottom left.

The only difference between A4, A3 and Letter is the size of the map. The other elements are placed exactly in the same manner among layouts.

Two files are provided to help understand the print pattern and fill the `config.yaml` file:
- `pattern/pattern.odg` - diagram of the pattern used for print, as defined in `config.yaml` (open with LibreOffice Draw)
- `pattern/pattern_dimensions.ods` - computation of the dimensions of the pattern (open with LibreOffice Calc) - modify the free parameters (green cells) and go to the « config.yaml » tab to see the values to include in the `config.yaml` file.

Background PDF
==============

The background PDF is solely intended for ornamental content, such as logos. Source files in ODG format (open with Libre Office) are available in the `sources/` directory. Use them for generating the PDF files.

How to manage the different units
=================================

The unit used in config.yaml is the **point (pt)**. See http://en.wikipedia.org/wiki/Point_%28typography%29 for more details. The point is a length unit (like the inch or the cm), not a digital unit (like the pixel). It is defined as `1/72 inch`, ie. `2.54/72 cm`. For example, the A4 format is `21cm x 29.7cm`, ie `595pt x 842pt`. It is recommended to design all the layout thinking with the point unit.

LibreOffice uses the cm unit by default, but you can change to points in "Tools -> Options -> LibreOffice Draw -> General -> Measure Unit -> Point". Take care of the page margins, you need to set them to 0 in the ODG file in order to use the same dimensions as in `config.yaml`.

Gimp also provides the pt unit, you may use it to measure the dimensions in the PDF.

Be careful: in LibreOffice and Gimp, the origin (0pt, 0pt) is at top left, whereas in `config.yaml`, the origin is at bottom left.
