'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @jsx wp.element.createElement */

exports.Controls = Controls;

var _PannelUltimateBgControl = require('../common/PannelUltimateBgControl.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Controls(args) {

  /* definitions */

  var props = args.propsObject;

  var __ = wp.i18n.__;
  var _wp$blockEditor = wp.blockEditor,
      MediaUpload = _wp$blockEditor.MediaUpload,
      MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
      MediaPlaceholder = _wp$blockEditor.MediaPlaceholder,
      MediaReplaceFlow = _wp$blockEditor.MediaReplaceFlow;
  var _wp$blockEditor2 = wp.blockEditor,
      BlockVerticalAlignmentToolbar = _wp$blockEditor2.BlockVerticalAlignmentToolbar,
      BlockControls = _wp$blockEditor2.BlockControls,
      InspectorControls = _wp$blockEditor2.InspectorControls,
      AlignmentToolbar = _wp$blockEditor2.AlignmentToolbar;
  var _wp$components = wp.components,
      Button = _wp$components.Button,
      ToolbarGroup = _wp$components.ToolbarGroup,
      Toolbar = _wp$components.Toolbar,
      ToolbarButton = _wp$components.ToolbarButton,
      Dashicon = _wp$components.Dashicon,
      SVG = _wp$components.SVG,
      Path = _wp$components.Path,
      PanelBody = _wp$components.PanelBody,
      PanelRow = _wp$components.PanelRow,
      SelectControl = _wp$components.SelectControl,
      RangeControl = _wp$components.RangeControl,
      ToggleControl = _wp$components.ToggleControl,
      Dropdown = _wp$components.Dropdown,
      CheckboxControl = _wp$components.CheckboxControl;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useEffect = _wp$element.useEffect,
      Fragment = _wp$element.Fragment;

  /* functions */

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      prevent_start = _useState2[0],
      set_prevent_start = _useState2[1];

  function stop() {
    jQuery("#img-gallery-" + props.clientId).slick('unslick');
  }
  function start() {
    var responsiveOptions = [];
    if (props.attributes.responsiveSM) responsiveOptions.push({
      breakpoint: 576, settings: { slidesToShow: props.attributes.slidesToShowSM, slidesToScroll: props.attributes.slidesToScrollSM }
    });
    if (props.attributes.responsiveMD) responsiveOptions.push({
      breakpoint: 768, settings: { slidesToShow: props.attributes.slidesToShowMD, slidesToScroll: props.attributes.slidesToScrollMD }
    });
    if (props.attributes.responsiveLG) responsiveOptions.push({
      breakpoint: 960, settings: { slidesToShow: props.attributes.slidesToShowLG, slidesToScroll: props.attributes.slidesToScrollLG }
    });
    if (props.attributes.responsiveXL) responsiveOptions.push({
      breakpoint: 1140, settings: { slidesToShow: props.attributes.slidesToShowXL, slidesToScroll: props.attributes.slidesToScrollXL }
    });
    jQuery("#img-gallery-" + props.clientId).not('.slick-initialized').slick({
      slidesToShow: props.attributes.slidesToShow,
      slidesToScroll: props.attributes.slidesToScroll,
      arrows: props.attributes.arrows,
      dots: props.attributes.dots,
      infinite: props.attributes.infinite,
      autoplay: props.attributes.autoplay,
      centerMode: props.attributes.centerMode,
      adaptiveHeight: props.attributes.adaptiveHeight,
      variableWidth: props.attributes.variableWidth,
      fade: props.attributes.fade,
      responsive: responsiveOptions
    });
    jQuery(document).on('click', '#img-gallery-' + props.clientId + ' [data-toggle="lightbox"]', function (event) {
      event.preventDefault();
      jQuery(this).ekkoLightbox();
    });
  }
  useEffect(function () {
    if (prevent_start != true) start();
  });

  function mediaReplace(newcontent) {
    set_prevent_start(true);
    var ids = [],
        urls = [],
        thumbs = [],
        mds = [],
        lgs = [],
        captions = [],
        alts = [];
    stop();
    newcontent.forEach(function (newcontentItem) {
      ids.push(newcontentItem.id);
      urls.push(newcontentItem.url);
      captions.push(newcontentItem.caption);
      if (newcontentItem.sizes.hasOwnProperty('thumbnail')) {
        thumbs.push(newcontentItem.sizes.thumbnail.url);
      } else {
        thumbs.push(newcontentItem.url);
      }
      if (newcontentItem.sizes.hasOwnProperty('medium')) {
        mds.push(newcontentItem.sizes.medium.url);
      } else {
        mds.push(newcontentItem.url);
      }
      if (newcontentItem.sizes.hasOwnProperty('large')) {
        lgs.push(newcontentItem.sizes.large.url);
      } else {
        lgs.push(newcontentItem.url);
      }
      alts.push(newcontentItem.alt);
    });
    props.setAttributes({
      mediaID: ids,
      mediaURL: urls,
      mediaTHUMB: thumbs,
      mediaMEDIUM: mds,
      mediaLARGE: lgs,
      mediaCAPTION: captions,
      mediaALT: alts
    });
    set_prevent_start(false);
  }

  function safelySetAttribute(attribute, newcontent) {
    set_prevent_start(true);
    stop();
    props.setAttributes(_defineProperty({}, attribute, newcontent));
    set_prevent_start(false);
  }

  /* output controls */

  return wp.element.createElement(
    Fragment,
    null,
    wp.element.createElement(
      BlockControls,
      null,
      wp.element.createElement(
        ToolbarGroup,
        null,
        wp.element.createElement(MediaUpload, {
          multiple: 'add',
          gallery: true,
          value: props.attributes.mediaID,
          onSelect: mediaReplace,
          render: function render(_ref) {
            var open = _ref.open;
            return wp.element.createElement(
              Button,
              { className: 'components-button components-toolbar-button', onClick: open },
              ' Edit Gallery '
            );
          }
        })
      )
    ),
    wp.element.createElement(
      InspectorControls,
      null,
      wp.element.createElement(
        PanelBody,
        { title: __('Style options') },
        wp.element.createElement(SelectControl, {
          label: 'Slider image size',
          options: [{ label: 'Thumbnail', value: 'THUMB' }, { label: 'Medium', value: 'MEDIUM' }, { label: 'Large', value: 'LARGE' }, { label: 'Full size', value: 'FULL' }],
          value: props.attributes.sliderImageSize,
          onChange: function onChange(newcontent) {
            return safelySetAttribute('sliderImageSize', newcontent);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Open Image In modal'),
          checked: props.attributes.openInModal,
          onChange: function onChange() {
            return safelySetAttribute('openInModal', !props.attributes.openInModal);
          }
        }),
        props.attributes.openInModal && wp.element.createElement(SelectControl, {
          label: 'Modal image size',
          options: [{ label: 'Thumbnail', value: 'THUMB' }, { label: 'Medium', value: 'MEDIUM' }, { label: 'Large', value: 'LARGE' }, { label: 'Full size', value: 'FULL' }],
          value: props.attributes.modalImageSize,
          onChange: function onChange(newcontent) {
            return safelySetAttribute('modalImageSize', newcontent);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Show caption'),
          checked: props.attributes.showCaption,
          onChange: function onChange() {
            return safelySetAttribute('showCaption', !props.attributes.showCaption);
          }
        })
      ),
      wp.element.createElement(
        PanelBody,
        { title: __('Default full screen options') },
        wp.element.createElement(RangeControl, {
          beforeIcon: 'columns',
          label: __('Slides to show'),
          value: props.attributes.slidesToShow,
          onChange: function onChange(newcontent) {
            return safelySetAttribute('slidesToShow', newcontent);
          },
          min: 1,
          max: 10
        }),
        wp.element.createElement(RangeControl, {
          beforeIcon: 'share-alt2',
          label: __('Slides to scroll'),
          value: props.attributes.slidesToScroll,
          onChange: function onChange(newcontent) {
            return safelySetAttribute('slidesToScroll', newcontent);
          },
          min: 1,
          max: 10
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Arrows'),
          checked: props.attributes.arrows,
          onChange: function onChange() {
            return safelySetAttribute('arrows', !props.attributes.arrows);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Dots'),
          checked: props.attributes.dots,
          onChange: function onChange() {
            return safelySetAttribute('dots', !props.attributes.dots);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Infinite'),
          checked: props.attributes.infinite,
          onChange: function onChange() {
            return safelySetAttribute('infinite', !props.attributes.infinite);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Autoplay'),
          checked: props.attributes.autoplay,
          onChange: function onChange() {
            return safelySetAttribute('autoplay', !props.attributes.autoplay);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Center Mode'),
          checked: props.attributes.centerMode,
          onChange: function onChange() {
            return safelySetAttribute('centerMode', !props.attributes.centerMode);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Adaptive Height'),
          checked: props.attributes.adaptiveHeight,
          onChange: function onChange() {
            return safelySetAttribute('adaptiveHeight', !props.attributes.adaptiveHeight);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Variable Width'),
          checked: props.attributes.variableWidth,
          onChange: function onChange() {
            return safelySetAttribute('variableWidth', !props.attributes.variableWidth);
          }
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Fade'),
          checked: props.attributes.fade,
          onChange: function onChange() {
            return safelySetAttribute('fade', !props.attributes.fade);
          }
        })
      ),
      wp.element.createElement(
        PanelBody,
        { title: __('Responsive options') },
        wp.element.createElement(CheckboxControl, {
          label: __('Add breakpoint' + ' SM'),
          checked: props.attributes.responsiveSM,
          onChange: function onChange() {
            return safelySetAttribute('responsiveSM', !props.attributes.responsiveSM);
          }
        }),
        props.attributes.responsiveSM && wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(RangeControl, {
            beforeIcon: 'columns',
            label: __('Slides to show'),
            value: props.attributes.slidesToShowSM,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToShowSM', newcontent);
            },
            min: 1,
            max: 10
          }),
          wp.element.createElement(RangeControl, {
            beforeIcon: 'share-alt2',
            label: __('Slides to scroll'),
            value: props.attributes.slidesToScrollSM,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToScrollSM', newcontent);
            },
            min: 1,
            max: 10
          })
        ),
        wp.element.createElement(CheckboxControl, {
          label: __('Add breakpoint' + ' MD'),
          checked: props.attributes.responsiveMD,
          onChange: function onChange() {
            return safelySetAttribute('responsiveMD', !props.attributes.responsiveMD);
          }
        }),
        props.attributes.responsiveMD && wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(RangeControl, {
            beforeIcon: 'columns',
            label: __('Slides to show'),
            value: props.attributes.slidesToShowMD,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToShowMD', newcontent);
            },
            min: 1,
            max: 10
          }),
          wp.element.createElement(RangeControl, {
            beforeIcon: 'share-alt2',
            label: __('Slides to scroll'),
            value: props.attributes.slidesToScrollMD,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToScrollMD', newcontent);
            },
            min: 1,
            max: 10
          })
        ),
        wp.element.createElement(CheckboxControl, {
          label: __('Add breakpoint' + ' LG'),
          checked: props.attributes.responsiveLG,
          onChange: function onChange() {
            return safelySetAttribute('responsiveLG', !props.attributes.responsiveLG);
          }
        }),
        props.attributes.responsiveLG && wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(RangeControl, {
            beforeIcon: 'columns',
            label: __('Slides to show'),
            value: props.attributes.slidesToShowLG,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToShowLG', newcontent);
            },
            min: 1,
            max: 10
          }),
          wp.element.createElement(RangeControl, {
            beforeIcon: 'share-alt2',
            label: __('Slides to scroll'),
            value: props.attributes.slidesToScrollLG,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToScrollLG', newcontent);
            },
            min: 1,
            max: 10
          })
        ),
        wp.element.createElement(CheckboxControl, {
          label: __('Add breakpoint' + ' XL'),
          checked: props.attributes.responsiveXL,
          onChange: function onChange() {
            return safelySetAttribute('responsiveXL', !props.attributes.responsiveXL);
          }
        }),
        props.attributes.responsiveXL && wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(RangeControl, {
            beforeIcon: 'columns',
            label: __('Slides to show'),
            value: props.attributes.slidesToShowXL,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToShowXL', newcontent);
            },
            min: 1,
            max: 10
          }),
          wp.element.createElement(RangeControl, {
            beforeIcon: 'share-alt2',
            label: __('Slides to scroll'),
            value: props.attributes.slidesToScrollXL,
            onChange: function onChange(newcontent) {
              return safelySetAttribute('slidesToScrollXL', newcontent);
            },
            min: 1,
            max: 10
          })
        )
      )
    )
  );
}
//# sourceMappingURL=controls.js.map