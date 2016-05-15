# jQuery Fit Image

Resize image to fit container 

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/nmietkiewicz/jquery-fitimage/master/dist/jquery.fitimage.min.js
[max]: https://raw.githubusercontent.com/nmietkiewicz/jquery-fitimage/master/dist/jquery.fitimage.js

In your web page:

```html
<img src="image.jpg" fitimage="200,300" id="container" />

<script src="jquery.js"></script>
<script src="dist/jquery.fitimage.min.js"></script>
<script>
jQuery(function($) {
  $('#container').fitimage();
});
</script>
```
