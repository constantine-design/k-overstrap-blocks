'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _commonFunctions = require('../common/common-functions.js');

var _PannelUltimateBgControl = require('../common/PannelUltimateBgControl.js');

var _controls = require('./controls.js');

/** @jsx wp.element.createElement */

var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var InnerBlocks = wp.blockEditor.InnerBlocks;
var ResizableBox = wp.components.ResizableBox;
var useSelect = wp.data.useSelect;
var _wp$blockEditor = wp.blockEditor,
    BlockControls = _wp$blockEditor.BlockControls,
    InspectorControls = _wp$blockEditor.InspectorControls;
var _wp$element = wp.element,
    useState = _wp$element.useState,
    Fragment = _wp$element.Fragment;


var SectionBlockIcon = function SectionBlockIcon() {
  return wp.element.createElement(
    'svg',
    { width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    wp.element.createElement('path', { d: 'M18 2H2V18H18V2Z', fill: '#C4C4C4', stroke: '#6000FF', 'stroke-width': '2' }),
    wp.element.createElement('path', { d: 'M11 5H5V8H11V5Z', fill: '#C4C4C4', stroke: '#6000FF', 'stroke-width': '2' }),
    wp.element.createElement('path', { d: 'M15 12H9V15H15V12Z', fill: '#C4C4C4', stroke: '#6000FF', 'stroke-width': '2' })
  );
};

/*============================================================================*/
/*                        bootstrap Section Block begin                       */
/*============================================================================*/

var ConditionalWrapper = function ConditionalWrapper(_ref) {
  var condition = _ref.condition,
      wrapper = _ref.wrapper,
      children = _ref.children;
  return condition ? wrapper(children) : children;
};

registerBlockType('k-blocks-bs-section/k-blocks', {
  title: __('Section Bootstrap'),
  icon: SectionBlockIcon,
  category: 'k-common-blocks',
  parent: ['core/post-content'], // only root block
  supports: { align: ['full'], anchor: true, html: false },
  attributes: {
    align: { type: 'string' },
    valign: { type: 'string', default: 'center' },
    color: { type: 'string', default: 'inherit' },
    bgColor: { type: 'string', default: 'transparent' },
    bgGradient: { type: 'string', default: false },
    bgImage: { type: 'string' },
    bgImageId: { type: 'integer', default: 0 },
    bgImageType: { type: 'string', default: 'cover' },
    bgImageFocal: { type: 'object', default: { x: '0.5', y: '0.5' } },
    className: { type: 'string', default: '' },
    anchor: { type: 'string' },
    isSectionWide: { type: 'boolean', default: false },
    sectionMinHeight: { type: 'integer', default: 0 },
    minHeight: { type: 'integer', default: 0 }
  },

  /*=============================================================================*/
  /*                                    EDIT                                     */
  /*=============================================================================*/

  edit: function edit(props) {
    var atts = props.attributes;

    var _useState = useState(),
        _useState2 = _slicedToArray(_useState, 2),
        tempHeight = _useState2[0],
        setTempHeight = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        isResizing = _useState4[0],
        setIsResizing = _useState4[1];

    var hasInnerBlocks = useSelect(function (select) {
      return select('core/block-editor').getBlocks(props.clientId).length > 0;
    }, [props.clientId]);

    return wp.element.createElement(
      Fragment,
      null,
      wp.element.createElement(_controls.Controls, { propsObject: props }),
      wp.element.createElement(
        'div',
        {
          className: "k-bs-section-block " + (!atts.isSectionWide ? "" : "container-fluid clearfix ") + atts.className,
          style: {
            color: atts.color,
            backgroundColor: atts.bgColor,
            backgroundImage: (atts.bgGradient ? atts.bgGradient : 'none') + ',' + (atts.bgImage ? "url('" + atts.bgImage + "')" : 'none'),
            backgroundSize: atts.bgImageType == 'cover' ? 'auto, cover' : atts.bgImageType == 'cover' ? 'auto, contain' : 'auto, auto',
            backgroundRepeat: atts.bgImageType != 'repeat' ? 'no-repeat,no-repeat' : 'no-repeat,repeat',
            backgroundPosition: atts.bgImageType != 'repeat' ? 'center,' + atts.bgImageFocal.x * 100 + '% ' + atts.bgImageFocal.y * 100 + '%' : 'center,center',
            display: atts.minHeight ? 'flex' : 'block',
            flexDirection: atts.minHeight ? 'column' : 'unset',
            justifyContent: atts.minHeight ? 'center' : 'unset',
            minHeight: atts.minHeight ? atts.minHeight + 'Rem' : 'unset'
          }
        },
        wp.element.createElement(
          ConditionalWrapper,
          {
            condition: atts.minHeight,
            wrapper: function wrapper(children) {
              return wp.element.createElement(
                'div',
                { className: 'k-bs-section-block-inner-content' },
                ' ',
                children,
                ' '
              );
            }
          },
          wp.element.createElement(
            ConditionalWrapper,
            {
              condition: !atts.isSectionWide,
              wrapper: function wrapper(children) {
                return wp.element.createElement(
                  'div',
                  { className: "k-bs-section-block-container container clearfix" },
                  ' ',
                  children,
                  ' '
                );
              }
            },
            wp.element.createElement(InnerBlocks, {
              renderAppender: hasInnerBlocks ? undefined : function () {
                return wp.element.createElement(InnerBlocks.ButtonBlockAppender, null);
              }
            })
          )
        )
      )
    );
  },


  /*===========================================================================*/
  /*                                   SAVE                                    */
  /*===========================================================================*/

  save: function save(props) {
    var atts = props.attributes;
    return wp.element.createElement(
      'div',
      {
        className: "k-bs-section-block " + (!atts.isSectionWide ? "" : "container-fluid clearfix ") + atts.className,
        style: {
          color: atts.color,
          backgroundColor: atts.bgColor,
          backgroundImage: (atts.bgGradient ? atts.bgGradient : 'none') + ',' + (atts.bgImage ? "url('" + atts.bgImage + "')" : 'none'),
          backgroundSize: atts.bgImageType == 'cover' ? 'auto, cover' : atts.bgImageType == 'cover' ? 'auto, contain' : 'auto, auto',
          backgroundRepeat: atts.bgImageType != 'repeat' ? 'no-repeat,no-repeat' : 'no-repeat,repeat',
          backgroundPosition: atts.bgImageType != 'repeat' ? 'center,' + atts.bgImageFocal.x * 100 + '% ' + atts.bgImageFocal.y * 100 + '%' : 'center,center',
          display: atts.minHeight ? 'flex' : 'block',
          flexDirection: atts.minHeight ? 'column' : 'unset',
          justifyContent: atts.minHeight ? 'center' : 'unset',
          minHeight: atts.minHeight ? atts.minHeight + 'Rem' : 'unset'
        }
      },
      wp.element.createElement(
        ConditionalWrapper,
        {
          condition: atts.minHeight,
          wrapper: function wrapper(children) {
            return wp.element.createElement(
              'div',
              { className: 'k-bs-section-block-inner-content' },
              ' ',
              children,
              ' '
            );
          }
        },
        wp.element.createElement(
          ConditionalWrapper,
          {
            condition: !atts.isSectionWide,
            wrapper: function wrapper(children) {
              return wp.element.createElement(
                'div',
                { className: "k-bs-section-block-container container clearfix" },
                ' ',
                children,
                ' '
              );
            }
          },
          wp.element.createElement(InnerBlocks.Content, null)
        )
      )
    );
  }
});
//# sourceMappingURL=block.js.map