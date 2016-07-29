---
layout: post
comments: true
title:  "Extracting time series data from a published figure"
excerpt: "Rather than extreme zooming on small figure panels, using simple image processing, we can extract an estimate of signals plotted in papers."
date:   2016-07-29 00:00:00
mathjax: true
---

<html>
<head><meta charset="utf-8" />
<title>Extract time series from a published figure</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

<style type="text/css">
    /*!
*
* Twitter Bootstrap
*
*//*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;font-size:10px;-webkit-tap-highlight-color:transparent}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,optgroup,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0;vertical-align:middle}svg:not(:root){overflow:hidden}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre,textarea{overflow:auto}code,kbd,pre,samp{font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,:after,:before{background:0 0!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:" (" attr(href)")"}abbr[title]:after{content:" (" attr(title)")"}a[href^="javascript:"]:after,a[href^="#"]:after{content:""}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}select{background:#fff!important}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}@font-face{font-family:'Glyphicons Halflings';src:url(../components/bootstrap/fonts/glyphicons-halflings-regular.eot);src:url(../components/bootstrap/fonts/glyphicons-halflings-regular.eot?#iefix)format('embedded-opentype'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.woff2)format('woff2'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.woff)format('woff'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.ttf)format('truetype'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular)format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:"\2a"}.glyphicon-plus:before{content:"\2b"}.glyphicon-eur:before,.glyphicon-euro:before{content:"\20ac"}.glyphicon-minus:before{content:"\2212"}.glyphicon-cloud:before{content:"\2601"}.glyphicon-envelope:before{content:"\2709"}.glyphicon-pencil:before{content:"\270f"}.glyphicon-glass:before{content:"\e001"}.glyphicon-music:before{content:"\e002"}.glyphicon-search:before{content:"\e003"}.glyphicon-heart:before{content:"\e005"}.glyphicon-star:before{content:"\e006"}.glyphicon-star-empty:before{content:"\e007"}.glyphicon-user:before{content:"\e008"}.glyphicon-film:before{content:"\e009"}.glyphicon-th-large:before{content:"\e010"}.glyphicon-th:before{content:"\e011"}.glyphicon-th-list:before{content:"\e012"}.glyphicon-ok:before{content:"\e013"}.glyphicon-remove:before{content:"\e014"}.glyphicon-zoom-in:before{content:"\e015"}.glyphicon-zoom-out:before{content:"\e016"}.glyphicon-off:before{content:"\e017"}.glyphicon-signal:before{content:"\e018"}.glyphicon-cog:before{content:"\e019"}.glyphicon-trash:before{content:"\e020"}.glyphicon-home:before{content:"\e021"}.glyphicon-file:before{content:"\e022"}.glyphicon-time:before{content:"\e023"}.glyphicon-road:before{content:"\e024"}.glyphicon-download-alt:before{content:"\e025"}.glyphicon-download:before{content:"\e026"}.glyphicon-upload:before{content:"\e027"}.glyphicon-inbox:before{content:"\e028"}.glyphicon-play-circle:before{content:"\e029"}.glyphicon-repeat:before{content:"\e030"}.glyphicon-refresh:before{content:"\e031"}.glyphicon-list-alt:before{content:"\e032"}.glyphicon-lock:before{content:"\e033"}.glyphicon-flag:before{content:"\e034"}.glyphicon-headphones:before{content:"\e035"}.glyphicon-volume-off:before{content:"\e036"}.glyphicon-volume-down:before{content:"\e037"}.glyphicon-volume-up:before{content:"\e038"}.glyphicon-qrcode:before{content:"\e039"}.glyphicon-barcode:before{content:"\e040"}.glyphicon-tag:before{content:"\e041"}.glyphicon-tags:before{content:"\e042"}.glyphicon-book:before{content:"\e043"}.glyphicon-bookmark:before{content:"\e044"}.glyphicon-print:before{content:"\e045"}.glyphicon-camera:before{content:"\e046"}.glyphicon-font:before{content:"\e047"}.glyphicon-bold:before{content:"\e048"}.glyphicon-italic:before{content:"\e049"}.glyphicon-text-height:before{content:"\e050"}.glyphicon-text-width:before{content:"\e051"}.glyphicon-align-left:before{content:"\e052"}.glyphicon-align-center:before{content:"\e053"}.glyphicon-align-right:before{content:"\e054"}.glyphicon-align-justify:before{content:"\e055"}.glyphicon-list:before{content:"\e056"}.glyphicon-indent-left:before{content:"\e057"}.glyphicon-indent-right:before{content:"\e058"}.glyphicon-facetime-video:before{content:"\e059"}.glyphicon-picture:before{content:"\e060"}.glyphicon-map-marker:before{content:"\e062"}.glyphicon-adjust:before{content:"\e063"}.glyphicon-tint:before{content:"\e064"}.glyphicon-edit:before{content:"\e065"}.glyphicon-share:before{content:"\e066"}.glyphicon-check:before{content:"\e067"}.glyphicon-move:before{content:"\e068"}.glyphicon-step-backward:before{content:"\e069"}.glyphicon-fast-backward:before{content:"\e070"}.glyphicon-backward:before{content:"\e071"}.glyphicon-play:before{content:"\e072"}.glyphicon-pause:before{content:"\e073"}.glyphicon-stop:before{content:"\e074"}.glyphicon-forward:before{content:"\e075"}.glyphicon-fast-forward:before{content:"\e076"}.glyphicon-step-forward:before{content:"\e077"}.glyphicon-eject:before{content:"\e078"}.glyphicon-chevron-left:before{content:"\e079"}.glyphicon-chevron-right:before{content:"\e080"}.glyphicon-plus-sign:before{content:"\e081"}.glyphicon-minus-sign:before{content:"\e082"}.glyphicon-remove-sign:before{content:"\e083"}.glyphicon-ok-sign:before{content:"\e084"}.glyphicon-question-sign:before{content:"\e085"}.glyphicon-info-sign:before{content:"\e086"}.glyphicon-screenshot:before{content:"\e087"}.glyphicon-remove-circle:before{content:"\e088"}.glyphicon-ok-circle:before{content:"\e089"}.glyphicon-ban-circle:before{content:"\e090"}.glyphicon-arrow-left:before{content:"\e091"}.glyphicon-arrow-right:before{content:"\e092"}.glyphicon-arrow-up:before{content:"\e093"}.glyphicon-arrow-down:before{content:"\e094"}.glyphicon-share-alt:before{content:"\e095"}.glyphicon-resize-full:before{content:"\e096"}.glyphicon-resize-small:before{content:"\e097"}.glyphicon-exclamation-sign:before{content:"\e101"}.glyphicon-gift:before{content:"\e102"}.glyphicon-leaf:before{content:"\e103"}.glyphicon-fire:before{content:"\e104"}.glyphicon-eye-open:before{content:"\e105"}.glyphicon-eye-close:before{content:"\e106"}.glyphicon-warning-sign:before{content:"\e107"}.glyphicon-plane:before{content:"\e108"}.glyphicon-calendar:before{content:"\e109"}.glyphicon-random:before{content:"\e110"}.glyphicon-comment:before{content:"\e111"}.glyphicon-magnet:before{content:"\e112"}.glyphicon-chevron-up:before{content:"\e113"}.glyphicon-chevron-down:before{content:"\e114"}.glyphicon-retweet:before{content:"\e115"}.glyphicon-shopping-cart:before{content:"\e116"}.glyphicon-folder-close:before{content:"\e117"}.glyphicon-folder-open:before{content:"\e118"}.glyphicon-resize-vertical:before{content:"\e119"}.glyphicon-resize-horizontal:before{content:"\e120"}.glyphicon-hdd:before{content:"\e121"}.glyphicon-bullhorn:before{content:"\e122"}.glyphicon-bell:before{content:"\e123"}.glyphicon-certificate:before{content:"\e124"}.glyphicon-thumbs-up:before{content:"\e125"}.glyphicon-thumbs-down:before{content:"\e126"}.glyphicon-hand-right:before{content:"\e127"}.glyphicon-hand-left:before{content:"\e128"}.glyphicon-hand-up:before{content:"\e129"}.glyphicon-hand-down:before{content:"\e130"}.glyphicon-circle-arrow-right:before{content:"\e131"}.glyphicon-circle-arrow-left:before{content:"\e132"}.glyphicon-circle-arrow-up:before{content:"\e133"}.glyphicon-circle-arrow-down:before{content:"\e134"}.glyphicon-globe:before{content:"\e135"}.glyphicon-wrench:before{content:"\e136"}.glyphicon-tasks:before{content:"\e137"}.glyphicon-filter:before{content:"\e138"}.glyphicon-briefcase:before{content:"\e139"}.glyphicon-fullscreen:before{content:"\e140"}.glyphicon-dashboard:before{content:"\e141"}.glyphicon-paperclip:before{content:"\e142"}.glyphicon-heart-empty:before{content:"\e143"}.glyphicon-link:before{content:"\e144"}.glyphicon-phone:before{content:"\e145"}.glyphicon-pushpin:before{content:"\e146"}.glyphicon-usd:before{content:"\e148"}.glyphicon-gbp:before{content:"\e149"}.glyphicon-sort:before{content:"\e150"}.glyphicon-sort-by-alphabet:before{content:"\e151"}.glyphicon-sort-by-alphabet-alt:before{content:"\e152"}.glyphicon-sort-by-order:before{content:"\e153"}.glyphicon-sort-by-order-alt:before{content:"\e154"}.glyphicon-sort-by-attributes:before{content:"\e155"}.glyphicon-sort-by-attributes-alt:before{content:"\e156"}.glyphicon-unchecked:before{content:"\e157"}.glyphicon-expand:before{content:"\e158"}.glyphicon-collapse-down:before{content:"\e159"}.glyphicon-collapse-up:before{content:"\e160"}.glyphicon-log-in:before{content:"\e161"}.glyphicon-flash:before{content:"\e162"}.glyphicon-log-out:before{content:"\e163"}.glyphicon-new-window:before{content:"\e164"}.glyphicon-record:before{content:"\e165"}.glyphicon-save:before{content:"\e166"}.glyphicon-open:before{content:"\e167"}.glyphicon-saved:before{content:"\e168"}.glyphicon-import:before{content:"\e169"}.glyphicon-export:before{content:"\e170"}.glyphicon-send:before{content:"\e171"}.glyphicon-floppy-disk:before{content:"\e172"}.glyphicon-floppy-saved:before{content:"\e173"}.glyphicon-floppy-remove:before{content:"\e174"}.glyphicon-floppy-save:before{content:"\e175"}.glyphicon-floppy-open:before{content:"\e176"}.glyphicon-credit-card:before{content:"\e177"}.glyphicon-transfer:before{content:"\e178"}.glyphicon-cutlery:before{content:"\e179"}.glyphicon-header:before{content:"\e180"}.glyphicon-compressed:before{content:"\e181"}.glyphicon-earphone:before{content:"\e182"}.glyphicon-phone-alt:before{content:"\e183"}.glyphicon-tower:before{content:"\e184"}.glyphicon-stats:before{content:"\e185"}.glyphicon-sd-video:before{content:"\e186"}.glyphicon-hd-video:before{content:"\e187"}.glyphicon-subtitles:before{content:"\e188"}.glyphicon-sound-stereo:before{content:"\e189"}.glyphicon-sound-dolby:before{content:"\e190"}.glyphicon-sound-5-1:before{content:"\e191"}.glyphicon-sound-6-1:before{content:"\e192"}.glyphicon-sound-7-1:before{content:"\e193"}.glyphicon-copyright-mark:before{content:"\e194"}.glyphicon-registration-mark:before{content:"\e195"}.glyphicon-cloud-download:before{content:"\e197"}.glyphicon-cloud-upload:before{content:"\e198"}.glyphicon-tree-conifer:before{content:"\e199"}.glyphicon-tree-deciduous:before{content:"\e200"}.glyphicon-cd:before{content:"\e201"}.glyphicon-save-file:before{content:"\e202"}.glyphicon-open-file:before{content:"\e203"}.glyphicon-level-up:before{content:"\e204"}.glyphicon-copy:before{content:"\e205"}.glyphicon-paste:before{content:"\e206"}.glyphicon-alert:before{content:"\e209"}.glyphicon-equalizer:before{content:"\e210"}.glyphicon-king:before{content:"\e211"}.glyphicon-queen:before{content:"\e212"}.glyphicon-pawn:before{content:"\e213"}.glyphicon-bishop:before{content:"\e214"}.glyphicon-knight:before{content:"\e215"}.glyphicon-baby-formula:before{content:"\e216"}.glyphicon-tent:before{content:"\26fa"}.glyphicon-blackboard:before{content:"\e218"}.glyphicon-bed:before{content:"\e219"}.glyphicon-apple:before{content:"\f8ff"}.glyphicon-erase:before{content:"\e221"}.glyphicon-hourglass:before{content:"\231b"}.glyphicon-lamp:before{content:"\e223"}.glyphicon-duplicate:before{content:"\e224"}.glyphicon-piggy-bank:before{content:"\e225"}.glyphicon-scissors:before{content:"\e226"}.glyphicon-bitcoin:before,.glyphicon-btc:before,.glyphicon-xbt:before{content:"\e227"}.glyphicon-jpy:before,.glyphicon-yen:before{content:"\00a5"}.glyphicon-rub:before,.glyphicon-ruble:before{content:"\20bd"}.glyphicon-scale:before{content:"\e230"}.glyphicon-ice-lolly:before{content:"\e231"}.glyphicon-ice-lolly-tasted:before{content:"\e232"}.glyphicon-education:before{content:"\e233"}.glyphicon-option-horizontal:before{content:"\e234"}.glyphicon-option-vertical:before{content:"\e235"}.glyphicon-menu-hamburger:before{content:"\e236"}.glyphicon-modal-window:before{content:"\e237"}.glyphicon-oil:before{content:"\e238"}.glyphicon-grain:before{content:"\e239"}.glyphicon-sunglasses:before{content:"\e240"}.glyphicon-text-size:before{content:"\e241"}.glyphicon-text-color:before{content:"\e242"}.glyphicon-text-background:before{content:"\e243"}.glyphicon-object-align-top:before{content:"\e244"}.glyphicon-object-align-bottom:before{content:"\e245"}.glyphicon-object-align-horizontal:before{content:"\e246"}.glyphicon-object-align-left:before{content:"\e247"}.glyphicon-object-align-vertical:before{content:"\e248"}.glyphicon-object-align-right:before{content:"\e249"}.glyphicon-triangle-right:before{content:"\e250"}.glyphicon-triangle-left:before{content:"\e251"}.glyphicon-triangle-bottom:before{content:"\e252"}.glyphicon-triangle-top:before{content:"\e253"}.glyphicon-console:before{content:"\e254"}.glyphicon-superscript:before{content:"\e255"}.glyphicon-subscript:before{content:"\e256"}.glyphicon-menu-left:before{content:"\e257"}.glyphicon-menu-right:before{content:"\e258"}.glyphicon-menu-down:before{content:"\e259"}.glyphicon-menu-up:before{content:"\e260"}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}body{margin:0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;line-height:1.42857143;color:#000;background-color:#fff}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:focus,a:hover{color:#23527c;text-decoration:underline}a:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}figure{margin:0}.carousel-inner>.item>a>img,.carousel-inner>.item>img,.img-responsive,.thumbnail a>img,.thumbnail>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:3px}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:18px;margin-bottom:18px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:18px;margin-bottom:9px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:9px;margin-bottom:9px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:33px}.h2,h2{font-size:27px}.h3,h3{font-size:23px}.h4,h4{font-size:17px}.h5,h5{font-size:13px}.h6,h6{font-size:12px}p{margin:0 0 9px}.lead{margin-bottom:18px;font-size:14px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:19.5px}}.small,small{font-size:92%}.mark,mark{background-color:#fcf8e3;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:hover{background-color:#e4b9b9}.page-header{padding-bottom:8px;margin:36px 0 18px;border-bottom:1px solid #eee}ol,ul{margin-top:0;margin-bottom:9px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none;margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:18px}dd,dt{line-height:1.42857143}dt{font-weight:700}dd{margin-left:0}@media (min-width:541px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:9px 18px;margin:0 0 18px;font-size:inherit;border-left:5px solid #eee}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#777}blockquote .small:before,blockquote footer:before,blockquote small:before{content:'\2014 \00A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0;text-align:right}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:''}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:'\00A0 \2014'}address{margin-bottom:18px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:monospace}code{padding:2px 4px;font-size:90%;background-color:#f9f2f4;border-radius:2px}kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:1px;box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;box-shadow:none}pre{display:block;padding:8.5px;margin:0 0 9px;word-break:break-all;word-wrap:break-word;color:#333;background-color:#f5f5f5;border:1px solid #ccc;border-radius:2px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:0;padding-right:0}@media (min-width:768px){.container{width:768px}}@media (min-width:992px){.container{width:940px}}@media (min-width:1200px){.container{width:1140px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:0;padding-right:0}.row{margin-left:0;margin-right:0}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-left:0;padding-right:0}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}table{background-color:transparent}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:18px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover{background-color:#f5f5f5}table col[class*=col-]{position:static;float:none;display:table-column}table td[class*=col-],table th[class*=col-]{position:static;float:none;display:table-cell}.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#f5f5f5}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#dff0d8}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#d9edf7}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#fcf8e3}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#f2dede}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}.table-responsive{overflow-x:auto;min-height:.01%}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:13.5px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset{padding:0;margin:0;border:0;min-width:0}legend{display:block;width:100%;padding:0;margin-bottom:18px;font-size:19.5px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px \9;line-height:normal}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=file]:focus,input[type=checkbox]:focus,input[type=radio]:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}output{display:block;padding-top:7px;font-size:13px;line-height:1.42857143;color:#555}.form-control{display:block;width:100%;height:32px;padding:6px 12px;font-size:13px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:2px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date],input[type=time],input[type=datetime-local],input[type=month]{line-height:32px}.input-group-sm input[type=date],.input-group-sm input[type=time],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],input[type=date].input-sm,input[type=time].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=time],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],input[type=date].input-lg,input[type=time].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg{line-height:45px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:18px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox],.radio input[type=radio],.radio-inline input[type=radio]{position:absolute;margin-left:-20px;margin-top:4px \9}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:400;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}.checkbox-inline.disabled,.checkbox.disabled label,.radio-inline.disabled,.radio.disabled label,fieldset[disabled] .checkbox label,fieldset[disabled] .checkbox-inline,fieldset[disabled] .radio label,fieldset[disabled] .radio-inline,fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.form-control-static{padding-top:7px;padding-bottom:7px;margin-bottom:0;min-height:31px}.form-control-static.input-lg,.form-control-static.input-sm{padding-left:0;padding-right:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.input-sm{height:30px;line-height:30px}select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.form-group-sm .form-control{height:30px;line-height:30px}select[multiple].form-group-sm .form-control,textarea.form-group-sm .form-control{height:auto}.form-group-sm .form-control-static{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;min-height:30px}.input-lg{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.input-lg{height:45px;line-height:45px}select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.form-group-lg .form-control{height:45px;line-height:45px}select[multiple].form-group-lg .form-control,textarea.form-group-lg .form-control{height:auto}.form-group-lg .form-control-static{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;min-height:35px}.has-feedback{position:relative}.has-feedback .form-control{padding-right:40px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:32px;height:32px;line-height:32px;text-align:center;pointer-events:none}.input-lg+.form-control-feedback{width:45px;height:45px;line-height:45px}.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;border-color:#3c763d;background-color:#dff0d8}.has-success .form-control-feedback{color:#3c763d}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;border-color:#8a6d3b;background-color:#fcf8e3}.has-warning .form-control-feedback{color:#8a6d3b}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:#a94442}.has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;border-color:#a94442;background-color:#f2dede}.has-error .form-control-feedback{color:#a94442}.has-feedback label~.form-control-feedback{top:23px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#404040}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:7px}.form-horizontal .checkbox,.form-horizontal .radio{min-height:25px}.form-horizontal .form-group{margin-left:0;margin-right:0}.form-horizontal .has-feedback .form-control-feedback{right:0}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:7px}.form-horizontal .form-group-lg .control-label{padding-top:14.33px}.form-horizontal .form-group-sm .control-label{padding-top:6px}}.btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:13px;line-height:1.42857143;border-radius:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn.active,.btn:active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;pointer-events:none;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn-default.active,.btn-default.focus,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default.disabled.active,.btn-default.disabled.focus,.btn-default.disabled:active,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled],.btn-default[disabled].active,.btn-default[disabled].focus,.btn-default[disabled]:active,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default,fieldset[disabled] .btn-default.active,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:active,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#fff;border-color:#ccc}.btn-default .badge{color:#fff;background-color:#333}.btn-primary{color:#fff;background-color:#337ab7;border-color:#2e6da4}.btn-primary.active,.btn-primary.focus,.btn-primary:active,.btn-primary:focus,.btn-primary:hover,.open>.dropdown-toggle.btn-primary{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary.disabled.active,.btn-primary.disabled.focus,.btn-primary.disabled:active,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled],.btn-primary[disabled].active,.btn-primary[disabled].focus,.btn-primary[disabled]:active,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary,fieldset[disabled] .btn-primary.active,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:active,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#337ab7;border-color:#2e6da4}.btn-primary .badge{color:#337ab7;background-color:#fff}.btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.btn-success.active,.btn-success.focus,.btn-success:active,.btn-success:focus,.btn-success:hover,.open>.dropdown-toggle.btn-success{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success.disabled.active,.btn-success.disabled.focus,.btn-success.disabled:active,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled],.btn-success[disabled].active,.btn-success[disabled].focus,.btn-success[disabled]:active,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success,fieldset[disabled] .btn-success.active,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:active,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}.btn-success .badge{color:#5cb85c;background-color:#fff}.btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.btn-info.active,.btn-info.focus,.btn-info:active,.btn-info:focus,.btn-info:hover,.open>.dropdown-toggle.btn-info{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info.disabled.active,.btn-info.disabled.focus,.btn-info.disabled:active,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled],.btn-info[disabled].active,.btn-info[disabled].focus,.btn-info[disabled]:active,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info,fieldset[disabled] .btn-info.active,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:active,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}.btn-info .badge{color:#5bc0de;background-color:#fff}.btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.btn-warning.active,.btn-warning.focus,.btn-warning:active,.btn-warning:focus,.btn-warning:hover,.open>.dropdown-toggle.btn-warning{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning.disabled.active,.btn-warning.disabled.focus,.btn-warning.disabled:active,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled],.btn-warning[disabled].active,.btn-warning[disabled].focus,.btn-warning[disabled]:active,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning,fieldset[disabled] .btn-warning.active,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:active,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}.btn-warning .badge{color:#f0ad4e;background-color:#fff}.btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.btn-danger.active,.btn-danger.focus,.btn-danger:active,.btn-danger:focus,.btn-danger:hover,.open>.dropdown-toggle.btn-danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger.disabled.active,.btn-danger.disabled.focus,.btn-danger.disabled:active,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled],.btn-danger[disabled].active,.btn-danger[disabled].focus,.btn-danger[disabled]:active,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger,fieldset[disabled] .btn-danger.active,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:active,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}.btn-danger .badge{color:#d9534f;background-color:#fff}.btn-link{color:#337ab7;font-weight:400;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#23527c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#777;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}.btn-group-sm>.btn,.btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:1px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height,visibility;transition-property:height,visibility;-webkit-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;transition-timing-function:ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:13px;text-align:left;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:2px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:8px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{text-decoration:none;color:#262626;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;outline:0;background-color:#337ab7}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#777;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid;content:""}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:541px){.navbar-right .dropdown-menu{left:auto;right:0}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:2px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-bottom-left-radius:2px;border-top-right-radius:0;border-top-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio],[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:45px;line-height:45px}select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn,textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn,textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn{height:auto}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:13px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:2px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:1px}.input-group-addon.input-lg{padding:10px 16px;font-size:17px;border-radius:3px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li.disabled>a{color:#777}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#777;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#eee;border-color:#337ab7}.nav .nav-divider{height:1px;margin:8px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:2px 2px 0 0}.nav-tabs>li>a:hover{border-color:#eee #eee #ddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#555;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent;cursor:default}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px;margin-right:0;border-radius:2px}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0;border-bottom:1px solid #ddd;border-radius:2px 2px 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:2px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#337ab7}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:2px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}.nav-tabs-justified>li>a{border-bottom:1px solid #ddd;border-radius:2px 2px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:30px;margin-bottom:18px;border:1px solid transparent}.navbar-collapse{overflow-x:visible;padding-right:0;padding-left:0;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-device-width:540px)and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-static-top{z-index:1000;border-width:0 0 1px}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}@media (min-width:541px){.navbar{border-radius:2px}.navbar-header{float:left}.navbar-collapse{width:auto;border-top:0;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-left:0;padding-right:0}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-fixed-bottom,.navbar-fixed-top,.navbar-static-top{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:6px 0;font-size:17px;line-height:18px;height:30px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}.navbar-toggle{position:relative;float:right;margin-right:0;padding:9px 10px;margin-top:-2px;margin-bottom:-2px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:2px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:541px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:0}.navbar-toggle{display:none}}.navbar-nav{margin:3px 0}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:18px}@media (max-width:540px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:18px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:541px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:6px;padding-bottom:6px}}.navbar-form{padding:10px 0;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);margin:-1px 0}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:540px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-radius:2px 2px 0 0}.navbar-btn{margin-top:-1px;margin-bottom:-1px}.navbar-btn.btn-sm{margin-top:0;margin-bottom:0}.navbar-btn.btn-xs{margin-top:4px;margin-bottom:4px}.navbar-text{margin-top:6px;margin-bottom:6px}@media (min-width:541px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}.navbar-text{float:left;margin-left:0;margin-right:0}.navbar-left{float:left!important;float:left}.navbar-right{float:right!important;float:right;margin-right:0}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}.navbar-default .navbar-brand{color:#777}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}.navbar-default .navbar-nav>li>a,.navbar-default .navbar-text{color:#777}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#ddd}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#ddd}.navbar-default .navbar-toggle .icon-bar{background-color:#888}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#e7e7e7}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{background-color:#e7e7e7;color:#555}@media (max-width:540px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#777}.navbar-default .navbar-link:hover{color:#333}.navbar-default .btn-link{color:#777}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#333}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#222;border-color:#080808}.navbar-inverse .navbar-brand{color:#9d9d9d}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>li>a,.navbar-inverse .navbar-text{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#333}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#333}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#101010}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{background-color:#080808;color:#fff}@media (max-width:540px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}.navbar-inverse .navbar-link{color:#9d9d9d}.navbar-inverse .navbar-link:hover{color:#fff}.navbar-inverse .btn-link{color:#9d9d9d}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#fff}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#444}.breadcrumb{padding:8px 15px;margin-bottom:18px;list-style:none;background-color:#f5f5f5;border-radius:2px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:"/\00a0";padding:0 5px;color:#5e5e5e}.breadcrumb>.active{color:#777}.pagination{display:inline-block;padding-left:0;margin:18px 0;border-radius:2px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;line-height:1.42857143;text-decoration:none;color:#337ab7;background-color:#fff;border:1px solid #ddd;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:2px;border-top-left-radius:2px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:2px;border-top-right-radius:2px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7;cursor:default}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;background-color:#fff;border-color:#ddd;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:17px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:1px;border-top-left-radius:1px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:1px;border-top-right-radius:1px}.pager{padding-left:0;margin:18px 0;list-style:none;text-align:center}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;background-color:#fff;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;color:#fff;line-height:1;vertical-align:baseline;white-space:nowrap;text-align:center;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding:30px 15px;margin-bottom:30px;color:inherit;background-color:#eee}.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:20px;font-weight:200}.jumbotron>hr{border-top-color:#d5d5d5}.container .jumbotron,.container-fluid .jumbotron{border-radius:3px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding:48px 0}.container .jumbotron,.container-fluid .jumbotron{padding-left:60px;padding-right:60px}.jumbotron .h1,.jumbotron h1{font-size:58.5px}}.thumbnail{display:block;padding:4px;margin-bottom:18px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail a>img,.thumbnail>img{margin-left:auto;margin-right:auto}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#337ab7}.thumbnail .caption{padding:9px;color:#000}.alert{padding:15px;margin-bottom:18px;border:1px solid transparent;border-radius:2px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#dff0d8;border-color:#d6e9c6;color:#3c763d}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#2b542c}.alert-info{background-color:#d9edf7;border-color:#bce8f1;color:#31708f}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#245269}.alert-warning{background-color:#fcf8e3;border-color:#faebcc;color:#8a6d3b}.alert-warning hr{border-top-color:#f7e1b5}.alert-warning .alert-link{color:#66512c}.alert-danger{background-color:#f2dede;border-color:#ebccd1;color:#a94442}.alert-danger hr{border-top-color:#e4b9c0}.alert-danger .alert-link{color:#843534}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:18px;margin-bottom:18px;background-color:#f5f5f5;border-radius:2px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:18px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{zoom:1;overflow:hidden}.media-body{width:10000px}.media-object{display:block}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-right-radius:2px;border-top-left-radius:2px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:2px;border-bottom-left-radius:2px}a.list-group-item{color:#555}a.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover{text-decoration:none;color:#555;background-color:#f5f5f5}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{background-color:#eee;color:#777;cursor:not-allowed}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:18px;background-color:#fff;border:1px solid transparent;border-radius:2px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:1px;border-top-left-radius:1px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:15px;color:inherit}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:1px;border-bottom-left-radius:1px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:1px;border-top-left-radius:1px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:1px;border-bottom-left-radius:1px}.list-group+.panel-footer,.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel>.panel-collapse>.table caption,.panel>.table caption,.panel>.table-responsive>.table caption{padding-left:15px;padding-right:15px}.panel>.table-responsive:first-child>.table:first-child,.panel>.table:first-child{border-top-right-radius:1px;border-top-left-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-left-radius:1px;border-top-right-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:1px}.panel>.table-responsive:last-child>.table:last-child,.panel>.table:last-child{border-bottom-right-radius:1px;border-bottom-left-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-left-radius:1px;border-bottom-right-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:1px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ddd}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:18px}.panel-group .panel{margin-bottom:0;border-radius:2px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:2px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:3px}.well-sm{padding:9px;border-radius:1px}.close{float:right;font-size:19.5px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:3px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.43px}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:1.4;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;border-radius:2px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{bottom:0;right:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:1.42857143;text-align:left;background-color:#fff;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:3px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2);white-space:normal}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:13px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:2px 2px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:""}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#999;border-top-color:rgba(0,0,0,.25);bottom:-11px}.popover.top>.arrow:after{content:" ";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#fff}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#999;border-right-color:rgba(0,0,0,.25)}.popover.right>.arrow:after{content:" ";left:1px;bottom:-10px;border-left-width:0;border-right-color:#fff}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,.25);top:-11px}.popover.bottom>.arrow:after{content:" ";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25)}.popover.left>.arrow:after{content:" ";right:1px;border-right-width:0;border-left-color:#fff;bottom:-10px}.carousel{position:relative}.carousel-inner{position:relative;overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>a>img,.carousel-inner>.item>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-moz-transition:-moz-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;-moz-perspective:1000;perspective:1000}.carousel-inner>.item.active.right,.carousel-inner>.item.next{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);left:0}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);left:0}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);left:0}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:.5;filter:alpha(opacity=50);font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)}.carousel-control:focus,.carousel-control:hover{outline:0;color:#fff;text-decoration:none;opacity:.9;filter:alpha(opacity=90)}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;z-index:5;display:inline-block}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;margin-top:-10px;line-height:1;font-family:serif}.carousel-control .icon-prev:before{content:'\2039'}.carousel-control .icon-next:before{content:'\203a'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #fff;border-radius:10px;cursor:pointer;background-color:transparent}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#fff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before,.btn-toolbar:after,.btn-toolbar:before,.clearfix:after,.clearfix:before,.container-fluid:after,.container-fluid:before,.container:after,.container:before,.dl-horizontal dd:after,.dl-horizontal dd:before,.form-horizontal .form-group:after,.form-horizontal .form-group:before,.item_buttons:after,.item_buttons:before,.modal-footer:after,.modal-footer:before,.nav:after,.nav:before,.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before,.pager:after,.pager:before,.panel-body:after,.panel-body:before,.row:after,.row:before{content:" ";display:table}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dl-horizontal dd:after,.form-horizontal .form-group:after,.item_buttons:after,.modal-footer:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.navbar:after,.pager:after,.panel-body:after,.row:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}.visible-xs-block{display:block!important}.visible-xs-inline{display:inline!important}.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px)and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}.visible-sm-block{display:block!important}.visible-sm-inline{display:inline!important}.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px)and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}.visible-md-block{display:block!important}.visible-md-inline{display:inline!important}.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}.visible-lg-block{display:block!important}.visible-lg-inline{display:inline!important}.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px)and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px)and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}.hidden-print{display:none!important}}/*!
*
* Font Awesome
*
*//*!
 *  Font Awesome 4.2.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */@font-face{font-family:'FontAwesome';src:url(../components/font-awesome/fonts/fontawesome-webfont.eot?v=4.2.0);src:url(../components/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.2.0)format('embedded-opentype'),url(../components/font-awesome/fonts/fontawesome-webfont.woff?v=4.2.0)format('woff'),url(../components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.2.0)format('truetype'),url(../components/font-awesome/fonts/fontawesome-webfont.svg?v=4.2.0#fontawesomeregular)format('svg');font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);-webkit-transform:scale(-1,1);-ms-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);-webkit-transform:scale(1,-1);-ms-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\f000"}.fa-music:before{content:"\f001"}.fa-search:before{content:"\f002"}.fa-envelope-o:before{content:"\f003"}.fa-heart:before{content:"\f004"}.fa-star:before{content:"\f005"}.fa-star-o:before{content:"\f006"}.fa-user:before{content:"\f007"}.fa-film:before{content:"\f008"}.fa-th-large:before{content:"\f009"}.fa-th:before{content:"\f00a"}.fa-th-list:before{content:"\f00b"}.fa-check:before{content:"\f00c"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\f00d"}.fa-search-plus:before{content:"\f00e"}.fa-search-minus:before{content:"\f010"}.fa-power-off:before{content:"\f011"}.fa-signal:before{content:"\f012"}.fa-cog:before,.fa-gear:before{content:"\f013"}.fa-trash-o:before{content:"\f014"}.fa-home:before{content:"\f015"}.fa-file-o:before{content:"\f016"}.fa-clock-o:before{content:"\f017"}.fa-road:before{content:"\f018"}.fa-download:before{content:"\f019"}.fa-arrow-circle-o-down:before{content:"\f01a"}.fa-arrow-circle-o-up:before{content:"\f01b"}.fa-inbox:before{content:"\f01c"}.fa-play-circle-o:before{content:"\f01d"}.fa-repeat:before,.fa-rotate-right:before{content:"\f01e"}.fa-refresh:before{content:"\f021"}.fa-list-alt:before{content:"\f022"}.fa-lock:before{content:"\f023"}.fa-flag:before{content:"\f024"}.fa-headphones:before{content:"\f025"}.fa-volume-off:before{content:"\f026"}.fa-volume-down:before{content:"\f027"}.fa-volume-up:before{content:"\f028"}.fa-qrcode:before{content:"\f029"}.fa-barcode:before{content:"\f02a"}.fa-tag:before{content:"\f02b"}.fa-tags:before{content:"\f02c"}.fa-book:before{content:"\f02d"}.fa-bookmark:before{content:"\f02e"}.fa-print:before{content:"\f02f"}.fa-camera:before{content:"\f030"}.fa-font:before{content:"\f031"}.fa-bold:before{content:"\f032"}.fa-italic:before{content:"\f033"}.fa-text-height:before{content:"\f034"}.fa-text-width:before{content:"\f035"}.fa-align-left:before{content:"\f036"}.fa-align-center:before{content:"\f037"}.fa-align-right:before{content:"\f038"}.fa-align-justify:before{content:"\f039"}.fa-list:before{content:"\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\f03b"}.fa-indent:before{content:"\f03c"}.fa-video-camera:before{content:"\f03d"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\f03e"}.fa-pencil:before{content:"\f040"}.fa-map-marker:before{content:"\f041"}.fa-adjust:before{content:"\f042"}.fa-tint:before{content:"\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\f044"}.fa-share-square-o:before{content:"\f045"}.fa-check-square-o:before{content:"\f046"}.fa-arrows:before{content:"\f047"}.fa-step-backward:before{content:"\f048"}.fa-fast-backward:before{content:"\f049"}.fa-backward:before{content:"\f04a"}.fa-play:before{content:"\f04b"}.fa-pause:before{content:"\f04c"}.fa-stop:before{content:"\f04d"}.fa-forward:before{content:"\f04e"}.fa-fast-forward:before{content:"\f050"}.fa-step-forward:before{content:"\f051"}.fa-eject:before{content:"\f052"}.fa-chevron-left:before{content:"\f053"}.fa-chevron-right:before{content:"\f054"}.fa-plus-circle:before{content:"\f055"}.fa-minus-circle:before{content:"\f056"}.fa-times-circle:before{content:"\f057"}.fa-check-circle:before{content:"\f058"}.fa-question-circle:before{content:"\f059"}.fa-info-circle:before{content:"\f05a"}.fa-crosshairs:before{content:"\f05b"}.fa-times-circle-o:before{content:"\f05c"}.fa-check-circle-o:before{content:"\f05d"}.fa-ban:before{content:"\f05e"}.fa-arrow-left:before{content:"\f060"}.fa-arrow-right:before{content:"\f061"}.fa-arrow-up:before{content:"\f062"}.fa-arrow-down:before{content:"\f063"}.fa-mail-forward:before,.fa-share:before{content:"\f064"}.fa-expand:before{content:"\f065"}.fa-compress:before{content:"\f066"}.fa-plus:before{content:"\f067"}.fa-minus:before{content:"\f068"}.fa-asterisk:before{content:"\f069"}.fa-exclamation-circle:before{content:"\f06a"}.fa-gift:before{content:"\f06b"}.fa-leaf:before{content:"\f06c"}.fa-fire:before{content:"\f06d"}.fa-eye:before{content:"\f06e"}.fa-eye-slash:before{content:"\f070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\f071"}.fa-plane:before{content:"\f072"}.fa-calendar:before{content:"\f073"}.fa-random:before{content:"\f074"}.fa-comment:before{content:"\f075"}.fa-magnet:before{content:"\f076"}.fa-chevron-up:before{content:"\f077"}.fa-chevron-down:before{content:"\f078"}.fa-retweet:before{content:"\f079"}.fa-shopping-cart:before{content:"\f07a"}.fa-folder:before{content:"\f07b"}.fa-folder-open:before{content:"\f07c"}.fa-arrows-v:before{content:"\f07d"}.fa-arrows-h:before{content:"\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\f080"}.fa-twitter-square:before{content:"\f081"}.fa-facebook-square:before{content:"\f082"}.fa-camera-retro:before{content:"\f083"}.fa-key:before{content:"\f084"}.fa-cogs:before,.fa-gears:before{content:"\f085"}.fa-comments:before{content:"\f086"}.fa-thumbs-o-up:before{content:"\f087"}.fa-thumbs-o-down:before{content:"\f088"}.fa-star-half:before{content:"\f089"}.fa-heart-o:before{content:"\f08a"}.fa-sign-out:before{content:"\f08b"}.fa-linkedin-square:before{content:"\f08c"}.fa-thumb-tack:before{content:"\f08d"}.fa-external-link:before{content:"\f08e"}.fa-sign-in:before{content:"\f090"}.fa-trophy:before{content:"\f091"}.fa-github-square:before{content:"\f092"}.fa-upload:before{content:"\f093"}.fa-lemon-o:before{content:"\f094"}.fa-phone:before{content:"\f095"}.fa-square-o:before{content:"\f096"}.fa-bookmark-o:before{content:"\f097"}.fa-phone-square:before{content:"\f098"}.fa-twitter:before{content:"\f099"}.fa-facebook:before{content:"\f09a"}.fa-github:before{content:"\f09b"}.fa-unlock:before{content:"\f09c"}.fa-credit-card:before{content:"\f09d"}.fa-rss:before{content:"\f09e"}.fa-hdd-o:before{content:"\f0a0"}.fa-bullhorn:before{content:"\f0a1"}.fa-bell:before{content:"\f0f3"}.fa-certificate:before{content:"\f0a3"}.fa-hand-o-right:before{content:"\f0a4"}.fa-hand-o-left:before{content:"\f0a5"}.fa-hand-o-up:before{content:"\f0a6"}.fa-hand-o-down:before{content:"\f0a7"}.fa-arrow-circle-left:before{content:"\f0a8"}.fa-arrow-circle-right:before{content:"\f0a9"}.fa-arrow-circle-up:before{content:"\f0aa"}.fa-arrow-circle-down:before{content:"\f0ab"}.fa-globe:before{content:"\f0ac"}.fa-wrench:before{content:"\f0ad"}.fa-tasks:before{content:"\f0ae"}.fa-filter:before{content:"\f0b0"}.fa-briefcase:before{content:"\f0b1"}.fa-arrows-alt:before{content:"\f0b2"}.fa-group:before,.fa-users:before{content:"\f0c0"}.fa-chain:before,.fa-link:before{content:"\f0c1"}.fa-cloud:before{content:"\f0c2"}.fa-flask:before{content:"\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\f0c5"}.fa-paperclip:before{content:"\f0c6"}.fa-floppy-o:before,.fa-save:before{content:"\f0c7"}.fa-square:before{content:"\f0c8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\f0c9"}.fa-list-ul:before{content:"\f0ca"}.fa-list-ol:before{content:"\f0cb"}.fa-strikethrough:before{content:"\f0cc"}.fa-underline:before{content:"\f0cd"}.fa-table:before{content:"\f0ce"}.fa-magic:before{content:"\f0d0"}.fa-truck:before{content:"\f0d1"}.fa-pinterest:before{content:"\f0d2"}.fa-pinterest-square:before{content:"\f0d3"}.fa-google-plus-square:before{content:"\f0d4"}.fa-google-plus:before{content:"\f0d5"}.fa-money:before{content:"\f0d6"}.fa-caret-down:before{content:"\f0d7"}.fa-caret-up:before{content:"\f0d8"}.fa-caret-left:before{content:"\f0d9"}.fa-caret-right:before{content:"\f0da"}.fa-columns:before{content:"\f0db"}.fa-sort:before,.fa-unsorted:before{content:"\f0dc"}.fa-sort-desc:before,.fa-sort-down:before{content:"\f0dd"}.fa-sort-asc:before,.fa-sort-up:before{content:"\f0de"}.fa-envelope:before{content:"\f0e0"}.fa-linkedin:before{content:"\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\f0e2"}.fa-gavel:before,.fa-legal:before{content:"\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\f0e4"}.fa-comment-o:before{content:"\f0e5"}.fa-comments-o:before{content:"\f0e6"}.fa-bolt:before,.fa-flash:before{content:"\f0e7"}.fa-sitemap:before{content:"\f0e8"}.fa-umbrella:before{content:"\f0e9"}.fa-clipboard:before,.fa-paste:before{content:"\f0ea"}.fa-lightbulb-o:before{content:"\f0eb"}.fa-exchange:before{content:"\f0ec"}.fa-cloud-download:before{content:"\f0ed"}.fa-cloud-upload:before{content:"\f0ee"}.fa-user-md:before{content:"\f0f0"}.fa-stethoscope:before{content:"\f0f1"}.fa-suitcase:before{content:"\f0f2"}.fa-bell-o:before{content:"\f0a2"}.fa-coffee:before{content:"\f0f4"}.fa-cutlery:before{content:"\f0f5"}.fa-file-text-o:before{content:"\f0f6"}.fa-building-o:before{content:"\f0f7"}.fa-hospital-o:before{content:"\f0f8"}.fa-ambulance:before{content:"\f0f9"}.fa-medkit:before{content:"\f0fa"}.fa-fighter-jet:before{content:"\f0fb"}.fa-beer:before{content:"\f0fc"}.fa-h-square:before{content:"\f0fd"}.fa-plus-square:before{content:"\f0fe"}.fa-angle-double-left:before{content:"\f100"}.fa-angle-double-right:before{content:"\f101"}.fa-angle-double-up:before{content:"\f102"}.fa-angle-double-down:before{content:"\f103"}.fa-angle-left:before{content:"\f104"}.fa-angle-right:before{content:"\f105"}.fa-angle-up:before{content:"\f106"}.fa-angle-down:before{content:"\f107"}.fa-desktop:before{content:"\f108"}.fa-laptop:before{content:"\f109"}.fa-tablet:before{content:"\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\f10b"}.fa-circle-o:before{content:"\f10c"}.fa-quote-left:before{content:"\f10d"}.fa-quote-right:before{content:"\f10e"}.fa-spinner:before{content:"\f110"}.fa-circle:before{content:"\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\f112"}.fa-github-alt:before{content:"\f113"}.fa-folder-o:before{content:"\f114"}.fa-folder-open-o:before{content:"\f115"}.fa-smile-o:before{content:"\f118"}.fa-frown-o:before{content:"\f119"}.fa-meh-o:before{content:"\f11a"}.fa-gamepad:before{content:"\f11b"}.fa-keyboard-o:before{content:"\f11c"}.fa-flag-o:before{content:"\f11d"}.fa-flag-checkered:before{content:"\f11e"}.fa-terminal:before{content:"\f120"}.fa-code:before{content:"\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\f123"}.fa-location-arrow:before{content:"\f124"}.fa-crop:before{content:"\f125"}.fa-code-fork:before{content:"\f126"}.fa-chain-broken:before,.fa-unlink:before{content:"\f127"}.fa-question:before{content:"\f128"}.fa-info:before{content:"\f129"}.fa-exclamation:before{content:"\f12a"}.fa-superscript:before{content:"\f12b"}.fa-subscript:before{content:"\f12c"}.fa-eraser:before{content:"\f12d"}.fa-puzzle-piece:before{content:"\f12e"}.fa-microphone:before{content:"\f130"}.fa-microphone-slash:before{content:"\f131"}.fa-shield:before{content:"\f132"}.fa-calendar-o:before{content:"\f133"}.fa-fire-extinguisher:before{content:"\f134"}.fa-rocket:before{content:"\f135"}.fa-maxcdn:before{content:"\f136"}.fa-chevron-circle-left:before{content:"\f137"}.fa-chevron-circle-right:before{content:"\f138"}.fa-chevron-circle-up:before{content:"\f139"}.fa-chevron-circle-down:before{content:"\f13a"}.fa-html5:before{content:"\f13b"}.fa-css3:before{content:"\f13c"}.fa-anchor:before{content:"\f13d"}.fa-unlock-alt:before{content:"\f13e"}.fa-bullseye:before{content:"\f140"}.fa-ellipsis-h:before{content:"\f141"}.fa-ellipsis-v:before{content:"\f142"}.fa-rss-square:before{content:"\f143"}.fa-play-circle:before{content:"\f144"}.fa-ticket:before{content:"\f145"}.fa-minus-square:before{content:"\f146"}.fa-minus-square-o:before{content:"\f147"}.fa-level-up:before{content:"\f148"}.fa-level-down:before{content:"\f149"}.fa-check-square:before{content:"\f14a"}.fa-pencil-square:before{content:"\f14b"}.fa-external-link-square:before{content:"\f14c"}.fa-share-square:before{content:"\f14d"}.fa-compass:before{content:"\f14e"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\f150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\f151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\f152"}.fa-eur:before,.fa-euro:before{content:"\f153"}.fa-gbp:before{content:"\f154"}.fa-dollar:before,.fa-usd:before{content:"\f155"}.fa-inr:before,.fa-rupee:before{content:"\f156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\f157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\f158"}.fa-krw:before,.fa-won:before{content:"\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\f15a"}.fa-file:before{content:"\f15b"}.fa-file-text:before{content:"\f15c"}.fa-sort-alpha-asc:before{content:"\f15d"}.fa-sort-alpha-desc:before{content:"\f15e"}.fa-sort-amount-asc:before{content:"\f160"}.fa-sort-amount-desc:before{content:"\f161"}.fa-sort-numeric-asc:before{content:"\f162"}.fa-sort-numeric-desc:before{content:"\f163"}.fa-thumbs-up:before{content:"\f164"}.fa-thumbs-down:before{content:"\f165"}.fa-youtube-square:before{content:"\f166"}.fa-youtube:before{content:"\f167"}.fa-xing:before{content:"\f168"}.fa-xing-square:before{content:"\f169"}.fa-youtube-play:before{content:"\f16a"}.fa-dropbox:before{content:"\f16b"}.fa-stack-overflow:before{content:"\f16c"}.fa-instagram:before{content:"\f16d"}.fa-flickr:before{content:"\f16e"}.fa-adn:before{content:"\f170"}.fa-bitbucket:before{content:"\f171"}.fa-bitbucket-square:before{content:"\f172"}.fa-tumblr:before{content:"\f173"}.fa-tumblr-square:before{content:"\f174"}.fa-long-arrow-down:before{content:"\f175"}.fa-long-arrow-up:before{content:"\f176"}.fa-long-arrow-left:before{content:"\f177"}.fa-long-arrow-right:before{content:"\f178"}.fa-apple:before{content:"\f179"}.fa-windows:before{content:"\f17a"}.fa-android:before{content:"\f17b"}.fa-linux:before{content:"\f17c"}.fa-dribbble:before{content:"\f17d"}.fa-skype:before{content:"\f17e"}.fa-foursquare:before{content:"\f180"}.fa-trello:before{content:"\f181"}.fa-female:before{content:"\f182"}.fa-male:before{content:"\f183"}.fa-gittip:before{content:"\f184"}.fa-sun-o:before{content:"\f185"}.fa-moon-o:before{content:"\f186"}.fa-archive:before{content:"\f187"}.fa-bug:before{content:"\f188"}.fa-vk:before{content:"\f189"}.fa-weibo:before{content:"\f18a"}.fa-renren:before{content:"\f18b"}.fa-pagelines:before{content:"\f18c"}.fa-stack-exchange:before{content:"\f18d"}.fa-arrow-circle-o-right:before{content:"\f18e"}.fa-arrow-circle-o-left:before{content:"\f190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\f191"}.fa-dot-circle-o:before{content:"\f192"}.fa-wheelchair:before{content:"\f193"}.fa-vimeo-square:before{content:"\f194"}.fa-try:before,.fa-turkish-lira:before{content:"\f195"}.fa-plus-square-o:before{content:"\f196"}.fa-space-shuttle:before{content:"\f197"}.fa-slack:before{content:"\f198"}.fa-envelope-square:before{content:"\f199"}.fa-wordpress:before{content:"\f19a"}.fa-openid:before{content:"\f19b"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\f19c"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\f19d"}.fa-yahoo:before{content:"\f19e"}.fa-google:before{content:"\f1a0"}.fa-reddit:before{content:"\f1a1"}.fa-reddit-square:before{content:"\f1a2"}.fa-stumbleupon-circle:before{content:"\f1a3"}.fa-stumbleupon:before{content:"\f1a4"}.fa-delicious:before{content:"\f1a5"}.fa-digg:before{content:"\f1a6"}.fa-pied-piper:before{content:"\f1a7"}.fa-pied-piper-alt:before{content:"\f1a8"}.fa-drupal:before{content:"\f1a9"}.fa-joomla:before{content:"\f1aa"}.fa-language:before{content:"\f1ab"}.fa-fax:before{content:"\f1ac"}.fa-building:before{content:"\f1ad"}.fa-child:before{content:"\f1ae"}.fa-paw:before{content:"\f1b0"}.fa-spoon:before{content:"\f1b1"}.fa-cube:before{content:"\f1b2"}.fa-cubes:before{content:"\f1b3"}.fa-behance:before{content:"\f1b4"}.fa-behance-square:before{content:"\f1b5"}.fa-steam:before{content:"\f1b6"}.fa-steam-square:before{content:"\f1b7"}.fa-recycle:before{content:"\f1b8"}.fa-automobile:before,.fa-car:before{content:"\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\f1ba"}.fa-tree:before{content:"\f1bb"}.fa-spotify:before{content:"\f1bc"}.fa-deviantart:before{content:"\f1bd"}.fa-soundcloud:before{content:"\f1be"}.fa-database:before{content:"\f1c0"}.fa-file-pdf-o:before{content:"\f1c1"}.fa-file-word-o:before{content:"\f1c2"}.fa-file-excel-o:before{content:"\f1c3"}.fa-file-powerpoint-o:before{content:"\f1c4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\f1c5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\f1c6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\f1c8"}.fa-file-code-o:before{content:"\f1c9"}.fa-vine:before{content:"\f1ca"}.fa-codepen:before{content:"\f1cb"}.fa-jsfiddle:before{content:"\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\f1cd"}.fa-circle-o-notch:before{content:"\f1ce"}.fa-ra:before,.fa-rebel:before{content:"\f1d0"}.fa-empire:before,.fa-ge:before{content:"\f1d1"}.fa-git-square:before{content:"\f1d2"}.fa-git:before{content:"\f1d3"}.fa-hacker-news:before{content:"\f1d4"}.fa-tencent-weibo:before{content:"\f1d5"}.fa-qq:before{content:"\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\f1d7"}.fa-paper-plane:before,.fa-send:before{content:"\f1d8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\f1d9"}.fa-history:before{content:"\f1da"}.fa-circle-thin:before{content:"\f1db"}.fa-header:before{content:"\f1dc"}.fa-paragraph:before{content:"\f1dd"}.fa-sliders:before{content:"\f1de"}.fa-share-alt:before{content:"\f1e0"}.fa-share-alt-square:before{content:"\f1e1"}.fa-bomb:before{content:"\f1e2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\f1e3"}.fa-tty:before{content:"\f1e4"}.fa-binoculars:before{content:"\f1e5"}.fa-plug:before{content:"\f1e6"}.fa-slideshare:before{content:"\f1e7"}.fa-twitch:before{content:"\f1e8"}.fa-yelp:before{content:"\f1e9"}.fa-newspaper-o:before{content:"\f1ea"}.fa-wifi:before{content:"\f1eb"}.fa-calculator:before{content:"\f1ec"}.fa-paypal:before{content:"\f1ed"}.fa-google-wallet:before{content:"\f1ee"}.fa-cc-visa:before{content:"\f1f0"}.fa-cc-mastercard:before{content:"\f1f1"}.fa-cc-discover:before{content:"\f1f2"}.fa-cc-amex:before{content:"\f1f3"}.fa-cc-paypal:before{content:"\f1f4"}.fa-cc-stripe:before{content:"\f1f5"}.fa-bell-slash:before{content:"\f1f6"}.fa-bell-slash-o:before{content:"\f1f7"}.fa-trash:before{content:"\f1f8"}.fa-copyright:before{content:"\f1f9"}.fa-at:before{content:"\f1fa"}.fa-eyedropper:before{content:"\f1fb"}.fa-paint-brush:before{content:"\f1fc"}.fa-birthday-cake:before{content:"\f1fd"}.fa-area-chart:before{content:"\f1fe"}.fa-pie-chart:before{content:"\f200"}.fa-line-chart:before{content:"\f201"}.fa-lastfm:before{content:"\f202"}.fa-lastfm-square:before{content:"\f203"}.fa-toggle-off:before{content:"\f204"}.fa-toggle-on:before{content:"\f205"}.fa-bicycle:before{content:"\f206"}.fa-bus:before{content:"\f207"}.fa-ioxhost:before{content:"\f208"}.fa-angellist:before{content:"\f209"}.fa-cc:before{content:"\f20a"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\f20b"}.fa-meanpath:before{content:"\f20c"}/*!
*
* IPython base
*
*/.modal.fade .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}code{color:#000}pre{font-size:inherit;line-height:inherit}label{font-weight:400}.border-box-sizing{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.corner-all{border-radius:2px}.no-padding{padding:0}.hbox{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}.hbox>*{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none}.vbox{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}.vbox>*{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none}.hbox.reverse,.reverse,.vbox.reverse{-webkit-box-direction:reverse;-moz-box-direction:reverse;box-direction:reverse;flex-direction:row-reverse}.box-flex0,.hbox.box-flex0,.vbox.box-flex0{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none;width:auto}.box-flex1,.hbox.box-flex1,.vbox.box-flex1{-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}.box-flex,.hbox.box-flex,.vbox.box-flex{-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}.box-flex2,.hbox.box-flex2,.vbox.box-flex2{-webkit-box-flex:2;-moz-box-flex:2;box-flex:2;flex:2}.box-group1{-webkit-box-flex-group:1;-moz-box-flex-group:1;box-flex-group:1}.box-group2{-webkit-box-flex-group:2;-moz-box-flex-group:2;box-flex-group:2}.hbox.start,.start,.vbox.start{-webkit-box-pack:start;-moz-box-pack:start;box-pack:start;justify-content:flex-start}.end,.hbox.end,.vbox.end{-webkit-box-pack:end;-moz-box-pack:end;box-pack:end;justify-content:flex-end}.center,.hbox.center,.vbox.center{-webkit-box-pack:center;-moz-box-pack:center;box-pack:center;justify-content:center}.baseline,.hbox.baseline,.vbox.baseline{-webkit-box-pack:baseline;-moz-box-pack:baseline;box-pack:baseline;justify-content:baseline}.hbox.stretch,.stretch,.vbox.stretch{-webkit-box-pack:stretch;-moz-box-pack:stretch;box-pack:stretch;justify-content:stretch}.align-start,.hbox.align-start,.vbox.align-start{-webkit-box-align:start;-moz-box-align:start;box-align:start;align-items:flex-start}.align-end,.hbox.align-end,.vbox.align-end{-webkit-box-align:end;-moz-box-align:end;box-align:end;align-items:flex-end}.align-center,.hbox.align-center,.vbox.align-center{-webkit-box-align:center;-moz-box-align:center;box-align:center;align-items:center}.align-baseline,.hbox.align-baseline,.vbox.align-baseline{-webkit-box-align:baseline;-moz-box-align:baseline;box-align:baseline;align-items:baseline}.align-stretch,.hbox.align-stretch,.vbox.align-stretch{-webkit-box-align:stretch;-moz-box-align:stretch;box-align:stretch;align-items:stretch}div.error{margin:2em;text-align:center}div.error>h1{font-size:500%;line-height:normal}div.error>p{font-size:200%;line-height:normal}div.traceback-wrapper{text-align:left;max-width:800px;margin:auto}body{position:absolute;left:0;right:0;top:0;bottom:0;overflow:visible}#header{display:none;background-color:#fff;position:relative;z-index:100}#header #header-container{padding-bottom:5px;padding-top:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}#header .header-bar{width:100%;height:1px;background:#e7e7e7;margin-bottom:-1px}#header-spacer{width:100%;visibility:hidden}@media print{#header{display:none!important}#header-spacer{display:none}}#ipython_notebook{padding-left:0;padding-top:1px;padding-bottom:1px}@media (max-width:991px){#ipython_notebook{margin-left:10px}}#noscript{width:auto;padding-top:16px;padding-bottom:16px;text-align:center;font-size:22px;color:red;font-weight:700}#ipython_notebook img{height:28px}#site{width:100%;display:none;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;overflow:auto}@media print{#site{height:auto!important}}.ui-button .ui-button-text{padding:.2em .8em;font-size:77%}input.ui-button{padding:.3em .9em}span#login_widget{float:right}#logout,span#login_widget>.button{color:#333;background-color:#fff;border-color:#ccc}#logout.active,#logout.focus,#logout:active,#logout:focus,#logout:hover,.open>.dropdown-toggle#logout,.open>.dropdown-togglespan#login_widget>.button,span#login_widget>.button.active,span#login_widget>.button.focus,span#login_widget>.button:active,span#login_widget>.button:focus,span#login_widget>.button:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}#logout.active,#logout:active,.open>.dropdown-toggle#logout,.open>.dropdown-togglespan#login_widget>.button,span#login_widget>.button.active,span#login_widget>.button:active{background-image:none}#logout.disabled,#logout.disabled.active,#logout.disabled.focus,#logout.disabled:active,#logout.disabled:focus,#logout.disabled:hover,#logout[disabled],#logout[disabled].active,#logout[disabled].focus,#logout[disabled]:active,#logout[disabled]:focus,#logout[disabled]:hover,fieldset[disabled] #logout,fieldset[disabled] #logout.active,fieldset[disabled] #logout.focus,fieldset[disabled] #logout:active,fieldset[disabled] #logout:focus,fieldset[disabled] #logout:hover,fieldset[disabled] span#login_widget>.button,fieldset[disabled] span#login_widget>.button.active,fieldset[disabled] span#login_widget>.button.focus,fieldset[disabled] span#login_widget>.button:active,fieldset[disabled] span#login_widget>.button:focus,fieldset[disabled] span#login_widget>.button:hover,span#login_widget>.button.disabled,span#login_widget>.button.disabled.active,span#login_widget>.button.disabled.focus,span#login_widget>.button.disabled:active,span#login_widget>.button.disabled:focus,span#login_widget>.button.disabled:hover,span#login_widget>.button[disabled],span#login_widget>.button[disabled].active,span#login_widget>.button[disabled].focus,span#login_widget>.button[disabled]:active,span#login_widget>.button[disabled]:focus,span#login_widget>.button[disabled]:hover{background-color:#fff;border-color:#ccc}#logout .badge,span#login_widget>.button .badge{color:#fff;background-color:#333}.nav-header{text-transform:none}#header>span{margin-top:10px}.modal_stretch .modal-dialog{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;min-height:80vh}.modal_stretch .modal-dialog .modal-body{max-height:calc(100vh - 200px);overflow:auto;flex:1}@media (min-width:768px){.modal .modal-dialog{width:700px}select.form-control{margin-left:12px;margin-right:12px}}/*!
*
* IPython auth
*
*/.center-nav{display:inline-block;margin-bottom:-4px}/*!
*
* IPython tree view
*
*/.alternate_upload{background-color:none;display:inline}.alternate_upload.form{padding:0;margin:0}.alternate_upload input.fileinput{text-align:center;vertical-align:middle;display:inline;opacity:0;z-index:2;width:12ex;margin-right:-12ex}.alternate_upload .btn-upload{height:22px}ul#tabs{margin-bottom:4px}ul#tabs a{padding-top:6px;padding-bottom:4px}ul.breadcrumb a:focus,ul.breadcrumb a:hover{text-decoration:none}ul.breadcrumb i.icon-home{font-size:16px;margin-right:4px}ul.breadcrumb span{color:#5e5e5e}.list_toolbar{padding:4px 0;vertical-align:middle}.list_toolbar .tree-buttons{padding-top:1px}.dynamic-buttons{padding-top:3px;display:inline-block}.list_toolbar [class*=span]{min-height:24px}.list_header{font-weight:700;background-color:#eee}.list_placeholder{font-weight:700;padding:4px 7px}.list_container{margin-top:4px;margin-bottom:20px;border:1px solid #ddd;border-radius:2px}.list_container>div{border-bottom:1px solid #ddd}.list_container>div:hover .list-item{background-color:red}.list_container>div:last-child{border:none}.list_item:hover .list_item{background-color:#ddd}.list_item a{text-decoration:none}.list_item:hover{background-color:#fafafa}.action_col{text-align:right}.list_header>div,.list_item>div{line-height:22px;padding:4px 7px}.list_header>div input,.list_item>div input{margin-right:7px;margin-left:14px;vertical-align:baseline;line-height:22px;position:relative;top:-1px}.list_header>div .item_link,.list_item>div .item_link{margin-left:-1px;vertical-align:baseline;line-height:22px}.new-file input[type=checkbox]{visibility:hidden}.item_name{line-height:22px;height:24px}.item_icon{font-size:14px;color:#5e5e5e;margin-right:7px;margin-left:7px;line-height:22px;vertical-align:baseline}.item_buttons{line-height:1em;margin-left:-5px}.item_buttons .btn-group,.item_buttons .input-group{float:left}.item_buttons>.btn,.item_buttons>.btn-group,.item_buttons>.input-group{margin-left:5px}.item_buttons .btn{min-width:13ex}.item_buttons .running-indicator{padding-top:4px;color:#5cb85c}.toolbar_info{height:24px;line-height:24px}input.engine_num_input,input.nbname_input{padding-top:3px;padding-bottom:3px;height:22px;line-height:14px;margin:0}input.engine_num_input{width:60px}.highlight_text{color:#00f}#project_name{display:inline-block;padding-left:7px;margin-left:-2px}#project_name>.breadcrumb{padding:0;margin-bottom:0;background-color:transparent;font-weight:700}#tree-selector{padding-right:0}#button-select-all{min-width:50px}#select-all{margin-left:7px;margin-right:2px}.menu_icon{margin-right:2px}.tab-content .row{margin-left:0;margin-right:0}.folder_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f114"}.folder_icon:before.pull-left{margin-right:.3em}.folder_icon:before.pull-right{margin-left:.3em}.notebook_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f02d";position:relative;top:-1px}.notebook_icon:before.pull-left{margin-right:.3em}.notebook_icon:before.pull-right{margin-left:.3em}.running_notebook_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f02d";position:relative;top:-1px;color:#5cb85c}.running_notebook_icon:before.pull-left{margin-right:.3em}.running_notebook_icon:before.pull-right{margin-left:.3em}.file_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f016";position:relative;top:-2px}.file_icon:before.pull-left{margin-right:.3em}.file_icon:before.pull-right{margin-left:.3em}#notebook_toolbar .pull-right{padding-top:0;margin-right:-1px}ul#new-menu{left:auto;right:0}.kernel-menu-icon{padding-right:12px;width:24px;content:"\f096"}.kernel-menu-icon:before{content:"\f096"}.kernel-menu-icon-current:before{content:"\f00c"}#tab_content{padding-top:20px}#running .panel-group .panel{margin-top:3px;margin-bottom:1em}#running .panel-group .panel .panel-heading{background-color:#eee;line-height:22px;padding:4px 7px}#running .panel-group .panel .panel-heading a:focus,#running .panel-group .panel .panel-heading a:hover{text-decoration:none}#running .panel-group .panel .panel-body{padding:0}#running .panel-group .panel .panel-body .list_container{margin-top:0;margin-bottom:0;border:0;border-radius:0}#running .panel-group .panel .panel-body .list_container .list_item{border-bottom:1px solid #ddd}#running .panel-group .panel .panel-body .list_container .list_item:last-child{border-bottom:0}.delete-button,.duplicate-button,.rename-button,.shutdown-button{display:none}.dynamic-instructions{display:inline-block;padding-top:4px}/*!
*
* IPython text editor webapp
*
*/.selected-keymap i.fa{padding:0 5px}.selected-keymap i.fa:before{content:"\f00c"}#mode-menu{overflow:auto;max-height:20em}.edit_app #header{-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}.edit_app #menubar .navbar{margin-bottom:-1px}.dirty-indicator{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator.pull-left{margin-right:.3em}.dirty-indicator.pull-right{margin-left:.3em}.dirty-indicator-dirty{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator-dirty.pull-left{margin-right:.3em}.dirty-indicator-dirty.pull-right{margin-left:.3em}.dirty-indicator-clean{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator-clean.pull-left{margin-right:.3em}.dirty-indicator-clean.pull-right{margin-left:.3em}.dirty-indicator-clean:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f00c"}.dirty-indicator-clean:before.pull-left{margin-right:.3em}.dirty-indicator-clean:before.pull-right{margin-left:.3em}#filename{font-size:16pt;display:table;padding:0 5px}#current-mode{padding-left:5px;padding-right:5px}#texteditor-backdrop{padding-top:20px;padding-bottom:20px}@media not print{#texteditor-backdrop{background-color:#eee}}@media print{#texteditor-backdrop #texteditor-container .CodeMirror-gutter,#texteditor-backdrop #texteditor-container .CodeMirror-gutters{background-color:#fff}}@media not print{#texteditor-backdrop #texteditor-container .CodeMirror-gutter,#texteditor-backdrop #texteditor-container .CodeMirror-gutters{background-color:#fff}#texteditor-backdrop #texteditor-container{padding:0;background-color:#fff;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}}/*!
*
* IPython notebook
*
*/.ansibold{font-weight:700}.ansiblack{color:#000}.ansired{color:#8b0000}.ansigreen{color:#006400}.ansiyellow{color:#c4a000}.ansiblue{color:#00008b}.ansipurple{color:#9400d3}.ansicyan{color:#4682b4}.ansigray{color:gray}.ansibgblack{background-color:#000}.ansibgred{background-color:red}.ansibggreen{background-color:green}.ansibgyellow{background-color:#ff0}.ansibgblue{background-color:#00f}.ansibgpurple{background-color:#ff00ff}.ansibgcyan{background-color:#0ff}.ansibggray{background-color:gray}div.cell{border:1px solid transparent;display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;border-radius:2px;box-sizing:border-box;-moz-box-sizing:border-box;border-width:thin;border-style:solid;width:100%;padding:5px;margin:0;outline:0}div.cell.selected{border-color:#ababab}@media print{div.cell.selected{border-color:transparent}}.edit_mode div.cell.selected{border-color:green}.prompt{min-width:14ex;padding:.4em;margin:0;font-family:monospace;text-align:right;line-height:1.21429em}div.inner_cell{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}@-moz-document url-prefix(){div.inner_cell{overflow-x:hidden}}div.input_area{border:1px solid #cfcfcf;border-radius:2px;background:#f7f7f7;line-height:1.21429em}div.prompt:empty{padding-top:0;padding-bottom:0}div.unrecognized_cell{padding:5px 5px 5px 0;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}div.unrecognized_cell .inner_cell{border-radius:2px;padding:5px;font-weight:700;color:red;border:1px solid #cfcfcf;background:#eaeaea}div.unrecognized_cell .inner_cell a,div.unrecognized_cell .inner_cell a:hover{color:inherit;text-decoration:none}@media (max-width:540px){.prompt{text-align:left}div.unrecognized_cell>div.prompt{display:none}}div.code_cell{}div.input{page-break-inside:avoid;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}@media (max-width:540px){div.input{-webkit-box-orient:vertical;-moz-box-orient:vertical;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}}div.input_prompt{color:navy;border-top:1px solid transparent}div.input_area>div.highlight{margin:.4em;border:none;padding:0;background-color:transparent}div.input_area>div.highlight>pre{margin:0;border:none;padding:0;background-color:transparent}.CodeMirror{line-height:1.21429em;font-size:14px;height:auto;background:0 0}.CodeMirror-scroll{overflow-y:hidden;overflow-x:auto}.CodeMirror-lines{padding:.4em}.CodeMirror-linenumber{padding:0 8px 0 4px}.CodeMirror-gutters{border-bottom-left-radius:2px;border-top-left-radius:2px}.CodeMirror pre{padding:0;border:0;border-radius:0}.highlight-base,.highlight-variable{color:#000}.highlight-variable-2{color:#1a1a1a}.highlight-variable-3{color:#333}.highlight-string{color:#BA2121}.highlight-comment{color:#408080;font-style:italic}.highlight-number{color:#080}.highlight-atom{color:#88F}.highlight-keyword{color:green;font-weight:700}.highlight-builtin{color:green}.highlight-error{color:red}.highlight-operator{color:#A2F;font-weight:700}.highlight-meta{color:#A2F}.highlight-def{color:#00f}.highlight-string-2{color:#f50}.highlight-qualifier{color:#555}.highlight-bracket{color:#997}.highlight-tag{color:#170}.highlight-attribute{color:#00c}.highlight-header{color:#00f}.highlight-quote{color:#090}.highlight-link{color:#00c}.cm-s-ipython span.cm-keyword{color:green;font-weight:700}.cm-s-ipython span.cm-atom{color:#88F}.cm-s-ipython span.cm-number{color:#080}.cm-s-ipython span.cm-def{color:#00f}.cm-s-ipython span.cm-variable{color:#000}.cm-s-ipython span.cm-operator{color:#A2F;font-weight:700}.cm-s-ipython span.cm-variable-2{color:#1a1a1a}.cm-s-ipython span.cm-variable-3{color:#333}.cm-s-ipython span.cm-comment{color:#408080;font-style:italic}.cm-s-ipython span.cm-string{color:#BA2121}.cm-s-ipython span.cm-string-2{color:#f50}.cm-s-ipython span.cm-meta{color:#A2F}.cm-s-ipython span.cm-qualifier{color:#555}.cm-s-ipython span.cm-builtin{color:green}.cm-s-ipython span.cm-bracket{color:#997}.cm-s-ipython span.cm-tag{color:#170}.cm-s-ipython span.cm-attribute{color:#00c}.cm-s-ipython span.cm-header{color:#00f}.cm-s-ipython span.cm-quote{color:#090}.cm-s-ipython span.cm-link{color:#00c}.cm-s-ipython span.cm-error{color:red}.cm-s-ipython span.cm-tab{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=')right no-repeat}div.output_wrapper{display:-webkit-box;-webkit-box-align:stretch;display:-moz-box;-moz-box-align:stretch;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;z-index:1}div.output_scroll{height:24em;width:100%;overflow:auto;border-radius:2px;-webkit-box-shadow:inset 0 2px 8px rgba(0,0,0,.8);box-shadow:inset 0 2px 8px rgba(0,0,0,.8);display:block}div.output_collapsed{margin:0;padding:0;display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}div.out_prompt_overlay{height:100%;padding:0 .4em;position:absolute;border-radius:2px}div.out_prompt_overlay:hover{-webkit-box-shadow:inset 0 0 1px #000;box-shadow:inset 0 0 1px #000;background:rgba(240,240,240,.5)}div.output_prompt{color:#8b0000}div.output_area{padding:0;page-break-inside:avoid;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}div.output_area .MathJax_Display{text-align:left!important}div.output_area .rendered_html img,div.output_area .rendered_html table{margin-left:0;margin-right:0}div.output_area img,div.output_area svg{max-width:100%;height:auto}div.output_area img.unconfined,div.output_area svg.unconfined{max-width:none}.output{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}@media (max-width:540px){div.output_area{-webkit-box-orient:vertical;-moz-box-orient:vertical;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}}div.output_area pre{margin:0;padding:0;border:0;vertical-align:baseline;color:#000;background-color:transparent;border-radius:0}div.output_subarea{overflow-x:auto;padding:.4em;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1;max-width:calc(100% - 14ex)}div.output_text{text-align:left;color:#000;line-height:1.21429em}div.output_stderr{background:#fdd}div.output_latex{text-align:left}div.output_javascript:empty{padding:0}.js-error{color:#8b0000}div.raw_input_container{font-family:monospace;padding-top:5px}span.raw_input_prompt{}input.raw_input{font-family:inherit;font-size:inherit;color:inherit;width:auto;vertical-align:baseline;padding:0 .25em;margin:0 .25em}input.raw_input:focus{box-shadow:none}p.p-space{margin-bottom:10px}div.output_unrecognized{padding:5px;font-weight:700;color:red}div.output_unrecognized a,div.output_unrecognized a:hover{color:inherit;text-decoration:none}.rendered_html{color:#000}.rendered_html em{font-style:italic}.rendered_html strong{font-weight:700}.rendered_html :link,.rendered_html :visited,.rendered_html u{text-decoration:underline}.rendered_html h1{font-size:185.7%;margin:1.08em 0 0;font-weight:700;line-height:1}.rendered_html h2{font-size:157.1%;margin:1.27em 0 0;font-weight:700;line-height:1}.rendered_html h3{font-size:128.6%;margin:1.55em 0 0;font-weight:700;line-height:1}.rendered_html h4{font-size:100%;margin:2em 0 0;font-weight:700;line-height:1}.rendered_html h5,.rendered_html h6{font-size:100%;margin:2em 0 0;font-weight:700;line-height:1;font-style:italic}.rendered_html h1:first-child{margin-top:.538em}.rendered_html h2:first-child{margin-top:.636em}.rendered_html h3:first-child{margin-top:.777em}.rendered_html h4:first-child,.rendered_html h5:first-child,.rendered_html h6:first-child{margin-top:1em}.rendered_html ul{list-style:disc;margin:0 2em;padding-left:0}.rendered_html ul ul{list-style:square;margin:0 2em}.rendered_html ul ul ul{list-style:circle;margin:0 2em}.rendered_html ol{list-style:decimal;margin:0 2em;padding-left:0}.rendered_html ol ol{list-style:upper-alpha;margin:0 2em}.rendered_html ol ol ol{list-style:lower-alpha;margin:0 2em}.rendered_html ol ol ol ol{list-style:lower-roman;margin:0 2em}.rendered_html ol ol ol ol ol{list-style:decimal;margin:0 2em}.rendered_html *+ol,.rendered_html *+ul{margin-top:1em}.rendered_html hr{color:#000;background-color:#000}.rendered_html pre{margin:1em 2em}.rendered_html code,.rendered_html pre{border:0;background-color:#fff;color:#000;font-size:100%;padding:0}.rendered_html blockquote{margin:1em 2em}.rendered_html table{margin-left:auto;margin-right:auto;border:1px solid #000;border-collapse:collapse}.rendered_html td,.rendered_html th,.rendered_html tr{border:1px solid #000;border-collapse:collapse;margin:1em 2em}.rendered_html td,.rendered_html th{text-align:left;vertical-align:middle;padding:4px}.rendered_html th{font-weight:700}.rendered_html *+table{margin-top:1em}.rendered_html p{text-align:left}.rendered_html *+p{margin-top:1em}.rendered_html img{display:block;margin-left:auto;margin-right:auto}.rendered_html *+img{margin-top:1em}.rendered_html img,.rendered_html svg{max-width:100%;height:auto}.rendered_html img.unconfined,.rendered_html svg.unconfined{max-width:none}div.text_cell{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}@media (max-width:540px){div.text_cell>div.prompt{display:none}}div.text_cell_render{outline:0;resize:none;width:inherit;border-style:none;padding:.5em .5em .5em .4em;color:#000;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}a.anchor-link:link{text-decoration:none;padding:0 20px;visibility:hidden}h1:hover .anchor-link,h2:hover .anchor-link,h3:hover .anchor-link,h4:hover .anchor-link,h5:hover .anchor-link,h6:hover .anchor-link{visibility:visible}.text_cell.rendered .input_area{display:none}.text_cell.rendered .rendered_html{overflow-x:auto}.text_cell.unrendered .text_cell_render{display:none}.cm-header-1,.cm-header-2,.cm-header-3,.cm-header-4,.cm-header-5,.cm-header-6{font-weight:700;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.cm-header-1{font-size:185.7%}.cm-header-2{font-size:157.1%}.cm-header-3{font-size:128.6%}.cm-header-4{font-size:110%}.cm-header-5,.cm-header-6{font-size:100%;font-style:italic}/*!
*
* IPython notebook webapp
*
*/@media (max-width:767px){.notebook_app{padding-left:0;padding-right:0}}#ipython-main-app{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height:100%}div#notebook_panel{margin:0;padding:0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height:100%}#notebook{font-size:14px;line-height:20px;overflow-y:hidden;overflow-x:auto;width:100%;padding-top:20px;margin:0;outline:0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;min-height:100%}@media not print{#notebook-container{padding:15px;background-color:#fff;min-height:0;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}}div.ui-widget-content{border:1px solid #ababab;outline:0}pre.dialog{background-color:#f7f7f7;border:1px solid #ddd;border-radius:2px;padding:.4em .4em .4em 2em}p.dialog{padding:.2em}code,kbd,pre,samp{white-space:pre-wrap}#fonttest{font-family:monospace}p{margin-bottom:0}.end_space{min-height:100px;transition:height .2s ease}.notebook_app #header{-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}@media not print{.notebook_app{background-color:#eee}}.celltoolbar{border:thin solid #CFCFCF;border-bottom:none;background:#EEE;border-radius:2px 2px 0 0;width:100%;height:29px;padding-right:4px;-webkit-box-orient:horizontal;-moz-box-orient:horizontal;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch;-webkit-box-pack:end;-moz-box-pack:end;box-pack:end;justify-content:flex-end;font-size:87%;padding-top:3px}@media print{.edit_mode div.cell.selected{border-color:transparent}div.code_cell{page-break-inside:avoid}#notebook-container{width:100%}.celltoolbar{display:none}}.ctb_hideshow{display:none;vertical-align:bottom}.ctb_global_show .ctb_show.ctb_hideshow{display:block}.ctb_global_show .ctb_show+.input_area,.ctb_global_show .ctb_show+div.text_cell_input,.ctb_global_show .ctb_show~div.text_cell_render{border-top-right-radius:0;border-top-left-radius:0}.ctb_global_show .ctb_show~div.text_cell_render{border:1px solid #cfcfcf}.celltoolbar select{color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;line-height:1.5;border-radius:1px;width:inherit;font-size:inherit;height:22px;padding:0;display:inline-block}.celltoolbar select:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.celltoolbar select::-moz-placeholder{color:#999;opacity:1}.celltoolbar select:-ms-input-placeholder{color:#999}.celltoolbar select::-webkit-input-placeholder{color:#999}.celltoolbar select[disabled],.celltoolbar select[readonly],fieldset[disabled] .celltoolbar select{background-color:#eee;opacity:1}.celltoolbar select[disabled],fieldset[disabled] .celltoolbar select{cursor:not-allowed}textarea.celltoolbar select{height:auto}select.celltoolbar select{height:30px;line-height:30px}select[multiple].celltoolbar select,textarea.celltoolbar select{height:auto}.celltoolbar label{margin-left:5px;margin-right:5px}.completions{position:absolute;z-index:10;overflow:hidden;border:1px solid #ababab;border-radius:2px;-webkit-box-shadow:0 6px 10px -1px #adadad;box-shadow:0 6px 10px -1px #adadad;line-height:1}.completions select{background:#fff;outline:0;border:none;padding:0;margin:0;overflow:auto;font-family:monospace;font-size:110%;color:#000;width:auto}.completions select option.context{color:#286090}#kernel_logo_widget{float:right!important;float:right}#kernel_logo_widget .current_kernel_logo{display:none;margin-top:-1px;margin-bottom:-1px;width:32px;height:32px}#menubar{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;margin-top:1px}#menubar .navbar{border-top:1px;border-radius:0 0 2px 2px;margin-bottom:0}#menubar .navbar-toggle{float:left;padding-top:7px;padding-bottom:7px;border:none}#menubar .navbar-collapse{clear:left}.nav-wrapper{border-bottom:1px solid #e7e7e7}i.menu-icon{padding-top:4px}ul#help_menu li a{overflow:hidden;padding-right:2.2em}ul#help_menu li a i{margin-right:-1.2em}.dropdown-submenu{position:relative}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropdown-submenu>a:after{font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:block;content:"\f0da";float:right;color:#333;margin-top:2px;margin-right:-10px}.dropdown-submenu>a:after.pull-left{margin-right:.3em}.dropdown-submenu>a:after.pull-right{margin-left:.3em}.dropdown-submenu:hover>a:after{color:#262626}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px}#notification_area{float:right!important;float:right;z-index:10}.indicator_area{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto}#kernel_indicator{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto;border-left:1px solid}#kernel_indicator .kernel_indicator_name{padding-left:5px;padding-right:5px}#modal_indicator{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto}#readonly-indicator{float:right!important;float:right;color:#777;z-index:10;text-align:center;width:auto;display:none;margin:2px 0 0}.modal_indicator:before{width:1.28571429em;text-align:center}.edit_mode .modal_indicator:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f040"}.edit_mode .modal_indicator:before.pull-left{margin-right:.3em}.edit_mode .modal_indicator:before.pull-right{margin-left:.3em}.command_mode .modal_indicator:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:' '}.command_mode .modal_indicator:before.pull-left{margin-right:.3em}.command_mode .modal_indicator:before.pull-right{margin-left:.3em}.kernel_idle_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f10c"}.kernel_idle_icon:before.pull-left{margin-right:.3em}.kernel_idle_icon:before.pull-right{margin-left:.3em}.kernel_busy_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f111"}.kernel_busy_icon:before.pull-left{margin-right:.3em}.kernel_busy_icon:before.pull-right{margin-left:.3em}.kernel_dead_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f1e2"}.kernel_dead_icon:before.pull-left{margin-right:.3em}.kernel_dead_icon:before.pull-right{margin-left:.3em}.kernel_disconnected_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f127"}.kernel_disconnected_icon:before.pull-left{margin-right:.3em}.kernel_disconnected_icon:before.pull-right{margin-left:.3em}.notification_widget{z-index:10;background:rgba(240,240,240,.5);margin-right:4px;color:#333;background-color:#fff;border-color:#ccc}.notification_widget.active,.notification_widget.focus,.notification_widget:active,.notification_widget:focus,.notification_widget:hover,.open>.dropdown-toggle.notification_widget{color:#333;background-color:#e6e6e6;border-color:#adadad}.notification_widget.active,.notification_widget:active,.open>.dropdown-toggle.notification_widget{background-image:none}.notification_widget.disabled,.notification_widget.disabled.active,.notification_widget.disabled.focus,.notification_widget.disabled:active,.notification_widget.disabled:focus,.notification_widget.disabled:hover,.notification_widget[disabled],.notification_widget[disabled].active,.notification_widget[disabled].focus,.notification_widget[disabled]:active,.notification_widget[disabled]:focus,.notification_widget[disabled]:hover,fieldset[disabled] .notification_widget,fieldset[disabled] .notification_widget.active,fieldset[disabled] .notification_widget.focus,fieldset[disabled] .notification_widget:active,fieldset[disabled] .notification_widget:focus,fieldset[disabled] .notification_widget:hover{background-color:#fff;border-color:#ccc}.notification_widget .badge{color:#fff;background-color:#333}.notification_widget.warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.notification_widget.warning.active,.notification_widget.warning.focus,.notification_widget.warning:active,.notification_widget.warning:focus,.notification_widget.warning:hover,.open>.dropdown-toggle.notification_widget.warning{color:#fff;background-color:#ec971f;border-color:#d58512}.notification_widget.warning.active,.notification_widget.warning:active,.open>.dropdown-toggle.notification_widget.warning{background-image:none}.notification_widget.warning.disabled,.notification_widget.warning.disabled.active,.notification_widget.warning.disabled.focus,.notification_widget.warning.disabled:active,.notification_widget.warning.disabled:focus,.notification_widget.warning.disabled:hover,.notification_widget.warning[disabled],.notification_widget.warning[disabled].active,.notification_widget.warning[disabled].focus,.notification_widget.warning[disabled]:active,.notification_widget.warning[disabled]:focus,.notification_widget.warning[disabled]:hover,fieldset[disabled] .notification_widget.warning,fieldset[disabled] .notification_widget.warning.active,fieldset[disabled] .notification_widget.warning.focus,fieldset[disabled] .notification_widget.warning:active,fieldset[disabled] .notification_widget.warning:focus,fieldset[disabled] .notification_widget.warning:hover{background-color:#f0ad4e;border-color:#eea236}.notification_widget.warning .badge{color:#f0ad4e;background-color:#fff}.notification_widget.success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.notification_widget.success.active,.notification_widget.success.focus,.notification_widget.success:active,.notification_widget.success:focus,.notification_widget.success:hover,.open>.dropdown-toggle.notification_widget.success{color:#fff;background-color:#449d44;border-color:#398439}.notification_widget.success.active,.notification_widget.success:active,.open>.dropdown-toggle.notification_widget.success{background-image:none}.notification_widget.success.disabled,.notification_widget.success.disabled.active,.notification_widget.success.disabled.focus,.notification_widget.success.disabled:active,.notification_widget.success.disabled:focus,.notification_widget.success.disabled:hover,.notification_widget.success[disabled],.notification_widget.success[disabled].active,.notification_widget.success[disabled].focus,.notification_widget.success[disabled]:active,.notification_widget.success[disabled]:focus,.notification_widget.success[disabled]:hover,fieldset[disabled] .notification_widget.success,fieldset[disabled] .notification_widget.success.active,fieldset[disabled] .notification_widget.success.focus,fieldset[disabled] .notification_widget.success:active,fieldset[disabled] .notification_widget.success:focus,fieldset[disabled] .notification_widget.success:hover{background-color:#5cb85c;border-color:#4cae4c}.notification_widget.success .badge{color:#5cb85c;background-color:#fff}.notification_widget.info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.notification_widget.info.active,.notification_widget.info.focus,.notification_widget.info:active,.notification_widget.info:focus,.notification_widget.info:hover,.open>.dropdown-toggle.notification_widget.info{color:#fff;background-color:#31b0d5;border-color:#269abc}.notification_widget.info.active,.notification_widget.info:active,.open>.dropdown-toggle.notification_widget.info{background-image:none}.notification_widget.info.disabled,.notification_widget.info.disabled.active,.notification_widget.info.disabled.focus,.notification_widget.info.disabled:active,.notification_widget.info.disabled:focus,.notification_widget.info.disabled:hover,.notification_widget.info[disabled],.notification_widget.info[disabled].active,.notification_widget.info[disabled].focus,.notification_widget.info[disabled]:active,.notification_widget.info[disabled]:focus,.notification_widget.info[disabled]:hover,fieldset[disabled] .notification_widget.info,fieldset[disabled] .notification_widget.info.active,fieldset[disabled] .notification_widget.info.focus,fieldset[disabled] .notification_widget.info:active,fieldset[disabled] .notification_widget.info:focus,fieldset[disabled] .notification_widget.info:hover{background-color:#5bc0de;border-color:#46b8da}.notification_widget.info .badge{color:#5bc0de;background-color:#fff}.notification_widget.danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.notification_widget.danger.active,.notification_widget.danger.focus,.notification_widget.danger:active,.notification_widget.danger:focus,.notification_widget.danger:hover,.open>.dropdown-toggle.notification_widget.danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.notification_widget.danger.active,.notification_widget.danger:active,.open>.dropdown-toggle.notification_widget.danger{background-image:none}.notification_widget.danger.disabled,.notification_widget.danger.disabled.active,.notification_widget.danger.disabled.focus,.notification_widget.danger.disabled:active,.notification_widget.danger.disabled:focus,.notification_widget.danger.disabled:hover,.notification_widget.danger[disabled],.notification_widget.danger[disabled].active,.notification_widget.danger[disabled].focus,.notification_widget.danger[disabled]:active,.notification_widget.danger[disabled]:focus,.notification_widget.danger[disabled]:hover,fieldset[disabled] .notification_widget.danger,fieldset[disabled] .notification_widget.danger.active,fieldset[disabled] .notification_widget.danger.focus,fieldset[disabled] .notification_widget.danger:active,fieldset[disabled] .notification_widget.danger:focus,fieldset[disabled] .notification_widget.danger:hover{background-color:#d9534f;border-color:#d43f3a}.notification_widget.danger .badge{color:#d9534f;background-color:#fff}div#pager{background-color:#fff;font-size:14px;line-height:20px;overflow:hidden;display:none;position:fixed;bottom:0;width:100%;max-height:50%;padding-top:8px;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2);z-index:100;top:auto!important}div#pager pre{line-height:1.21429em;color:#000;background-color:#f7f7f7;padding:.4em}div#pager #pager-button-area{position:absolute;top:8px;right:20px}div#pager #pager-contents{position:relative;overflow:auto;width:100%;height:100%}div#pager #pager-contents #pager-container{position:relative;padding:15px 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}div#pager .ui-resizable-handle{top:0;height:8px;background:#f7f7f7;border-top:1px solid #cfcfcf;border-bottom:1px solid #cfcfcf}div#pager .ui-resizable-handle::after{content:'';top:2px;left:50%;height:3px;width:30px;margin-left:-15px;position:absolute;border-top:1px solid #cfcfcf}.quickhelp{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}.shortcut_key{display:inline-block;width:20ex;text-align:right;font-family:monospace}.shortcut_descr{display:inline-block;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}span.save_widget{margin-top:6px}span.save_widget span.filename{height:1em;line-height:1em;padding:3px;margin-left:16px;border:none;font-size:146.5%;border-radius:2px}span.save_widget span.filename:hover{background-color:#e6e6e6}span.autosave_status,span.checkpoint_status{font-size:small}@media (max-width:767px){span.save_widget{font-size:small}span.autosave_status,span.checkpoint_status{display:none}}@media (min-width:768px)and (max-width:991px){span.checkpoint_status{display:none}span.autosave_status{font-size:x-small}}.toolbar{padding:0;margin-left:-5px;margin-top:2px;margin-bottom:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.toolbar label,.toolbar select{width:auto;vertical-align:middle;margin-bottom:0;display:inline;font-size:92%;margin-left:.3em;margin-right:.3em;padding:3px 0 0}.toolbar .btn{padding:2px 8px}.toolbar .btn-group{margin-top:0;margin-left:5px}#maintoolbar{margin-bottom:-3px;margin-top:-8px;border:0;min-height:27px;margin-left:0;padding-top:11px;padding-bottom:3px}#maintoolbar .navbar-text{float:none;vertical-align:middle;text-align:right;margin-left:5px;margin-right:0;margin-top:0}.select-xs{height:24px}@-moz-keyframes fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@-moz-keyframes fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}.bigtooltip{overflow:auto;height:200px;-webkit-transition-property:height;-webkit-transition-duration:500ms;-moz-transition-property:height;-moz-transition-duration:500ms;transition-property:height;transition-duration:500ms}.smalltooltip{-webkit-transition-property:height;-webkit-transition-duration:500ms;-moz-transition-property:height;-moz-transition-duration:500ms;transition-property:height;transition-duration:500ms;text-overflow:ellipsis;overflow:hidden;height:80px}.tooltipbuttons{position:absolute;padding-right:15px;top:0;right:0}.tooltiptext{padding-right:30px}.ipython_tooltip{max-width:700px;animation:fadeOut 400ms;-webkit-animation:fadeIn 400ms;-moz-animation:fadeIn 400ms;animation:fadeIn 400ms;vertical-align:middle;background-color:#f7f7f7;overflow:visible;border:1px solid #ababab;outline:0;padding:3px 3px 3px 7px;padding-left:7px;font-family:monospace;min-height:50px;-moz-box-shadow:0 6px 10px -1px #adadad;-webkit-box-shadow:0 6px 10px -1px #adadad;box-shadow:0 6px 10px -1px #adadad;border-radius:2px;position:absolute;z-index:1000}.ipython_tooltip a{float:right}.ipython_tooltip .tooltiptext pre{border:0;border-radius:0;font-size:100%;background-color:#f7f7f7}.pretooltiparrow{left:0;margin:0;top:-16px;width:40px;height:16px;overflow:hidden;position:absolute}.pretooltiparrow:before{background-color:#f7f7f7;border:1px solid #ababab;z-index:11;content:"";position:absolute;left:15px;top:10px;width:25px;height:25px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg)}.terminal-app{background:#eee}.terminal-app #header{background:#fff;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}.terminal-app .terminal{float:left;font-family:monospace;color:#fff;background:#000;padding:.4em;border-radius:2px;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.4);box-shadow:0 0 12px 1px rgba(87,87,87,.4)}.terminal-app .terminal,.terminal-app .terminal dummy-screen{line-height:1em;font-size:14px}.terminal-app .terminal-cursor{color:#000;background:#fff}.terminal-app #terminado-container{margin-top:20px}
/*# sourceMappingURL=style.min.css.map */
    </style>
<style type="text/css">
    .highlight .hll { background-color: #ffffcc }
.highlight  { background: #f8f8f8; }
.highlight .c { color: #408080; font-style: italic } /* Comment */
.highlight .err { border: 1px solid #FF0000 } /* Error */
.highlight .k { color: #008000; font-weight: bold } /* Keyword */
.highlight .o { color: #666666 } /* Operator */
.highlight .ch { color: #408080; font-style: italic } /* Comment.Hashbang */
.highlight .cm { color: #408080; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #BC7A00 } /* Comment.Preproc */
.highlight .cpf { color: #408080; font-style: italic } /* Comment.PreprocFile */
.highlight .c1 { color: #408080; font-style: italic } /* Comment.Single */
.highlight .cs { color: #408080; font-style: italic } /* Comment.Special */
.highlight .gd { color: #A00000 } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #FF0000 } /* Generic.Error */
.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #00A000 } /* Generic.Inserted */
.highlight .go { color: #888888 } /* Generic.Output */
.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #0044DD } /* Generic.Traceback */
.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #008000 } /* Keyword.Pseudo */
.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #B00040 } /* Keyword.Type */
.highlight .m { color: #666666 } /* Literal.Number */
.highlight .s { color: #BA2121 } /* Literal.String */
.highlight .na { color: #7D9029 } /* Name.Attribute */
.highlight .nb { color: #008000 } /* Name.Builtin */
.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.highlight .no { color: #880000 } /* Name.Constant */
.highlight .nd { color: #AA22FF } /* Name.Decorator */
.highlight .ni { color: #999999; font-weight: bold } /* Name.Entity */
.highlight .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
.highlight .nf { color: #0000FF } /* Name.Function */
.highlight .nl { color: #A0A000 } /* Name.Label */
.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
.highlight .nv { color: #19177C } /* Name.Variable */
.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mb { color: #666666 } /* Literal.Number.Bin */
.highlight .mf { color: #666666 } /* Literal.Number.Float */
.highlight .mh { color: #666666 } /* Literal.Number.Hex */
.highlight .mi { color: #666666 } /* Literal.Number.Integer */
.highlight .mo { color: #666666 } /* Literal.Number.Oct */
.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
.highlight .sc { color: #BA2121 } /* Literal.String.Char */
.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
.highlight .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
.highlight .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
.highlight .sx { color: #008000 } /* Literal.String.Other */
.highlight .sr { color: #BB6688 } /* Literal.String.Regex */
.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
.highlight .ss { color: #19177C } /* Literal.String.Symbol */
.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
.highlight .vc { color: #19177C } /* Name.Variable.Class */
.highlight .vg { color: #19177C } /* Name.Variable.Global */
.highlight .vi { color: #19177C } /* Name.Variable.Instance */
.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
    </style>


<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
body {
  overflow: visible;
  padding: 8px;
}

div#notebook {
  overflow: visible;
  border-top: none;
}

@media print {
  div.cell {
    display: block;
    page-break-inside: avoid;
  } 
  div.output_wrapper { 
    display: block;
    page-break-inside: avoid; 
  }
  div.output { 
    display: block;
    page-break-inside: avoid; 
  }
}
</style>

<!-- Custom stylesheet, it must be in the same directory as the html file -->
<link rel="stylesheet" href="custom.css">

<!-- Loading mathjax macro -->
<!-- Load mathjax -->
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>
    <!-- MathJax configuration -->
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true,
            processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        "HTML-CSS": {
            styles: {'.MathJax_Display': {"margin": 0}},
            linebreaks: { automatic: true }
        }
    });
    </script>
    <!-- End of mathjax configuration --></head>
<body>
  <div tabindex="-1" id="notebook" class="border-box-sizing">
    <div class="container" id="notebook-container">

<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="Extract-time-series-from-a-published-figure">Extract time series from a published figure<a class="anchor-link" href="#Extract-time-series-from-a-published-figure">&#182;</a></h1><p>Scott Cole</p>
<p>29 July 2016</p>
<h2 id="Summary">Summary<a class="anchor-link" href="#Summary">&#182;</a></h2><p>Sometimes we might be interested in obtaining a precise estimate of the results published in a figure. Instead of zooming in a ton on the figure and manually taking notes, here we use some simple image processing to extract the data that we're interested in.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Example-Case">Example Case<a class="anchor-link" href="#Example-Case">&#182;</a></h2><p>We're looking at <a href="http://www.sciencedirect.com/science/article/pii/S0896627315004134">a recent Neuron paper</a> that highlighted a potential top-down projection from motor cortex (M2) to primary somatosensory cortex (S1). This interaction is summarized in the firing rate curves below:
<img src="/assets/paperdata/figure_raw.PNG"></p>
<p>If we were interested in modeling this interaction, then we may want to closely replicate the firing rate dynamics of S1. So in this notebook, we extract this time series from the figure above so that we can use it for future model fitting.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Step-1">Step 1<a class="anchor-link" href="#Step-1">&#182;</a></h2><p>In our favorite image editting software (or simply MS Paint), we can isolate the curve we are interested in as well as the scale bars (separated by whitespace)
<img src="/assets/paperdata/figure_processed.png"></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Step-2:-Convert-image-to-binary">Step 2: Convert image to binary<a class="anchor-link" href="#Step-2:-Convert-image-to-binary">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1"># Load image and libraries</span>
<span class="o">%</span><span class="k">matplotlib</span> inline
<span class="kn">from</span> <span class="nn">matplotlib</span> <span class="kn">import</span> <span class="n">cm</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="kn">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="kn">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">scipy</span> <span class="kn">import</span> <span class="n">misc</span>
<span class="n">input_image</span> <span class="o">=</span> <span class="n">misc</span><span class="o">.</span><span class="n">imread</span><span class="p">(</span><span class="s1">&#39;figure_processed.png&#39;</span><span class="p">)</span>

<span class="c1"># Convert input image from RGBA to binary</span>
<span class="n">input_image</span> <span class="o">=</span> <span class="n">input_image</span> <span class="o">-</span> <span class="mi">255</span>
<span class="n">input_image</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">input_image</span><span class="p">,</span><span class="mi">2</span><span class="p">)</span>
<span class="n">binary_image</span> <span class="o">=</span> <span class="n">input_image</span><span class="p">[::</span><span class="o">-</span><span class="mi">1</span><span class="p">,:]</span>
<span class="n">binary_image</span><span class="p">[</span><span class="n">binary_image</span><span class="o">&gt;</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">Npixels_rate</span><span class="p">,</span><span class="n">Npixels_time</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">shape</span><span class="p">(</span><span class="n">binary_image</span><span class="p">)</span>

<span class="c1"># Visualize binary image</span>
<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">8</span><span class="p">,</span><span class="mi">5</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">pcolor</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">Npixels_time</span><span class="p">),</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">Npixels_rate</span><span class="p">),</span><span class="n">binary_image</span><span class="p">,</span> <span class="n">cmap</span><span class="o">=</span><span class="n">cm</span><span class="o">.</span><span class="n">bone</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">((</span><span class="mi">0</span><span class="p">,</span><span class="n">Npixels_time</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">((</span><span class="mi">0</span><span class="p">,</span><span class="n">Npixels_rate</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Time (pixels)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Firing rate (pixels)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[1]:</div>


<div class="output_text output_subarea output_execute_result">
<pre>&lt;matplotlib.text.Text at 0x743b240&gt;</pre>
</div>

</div>

<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
PVZ3/j5bFblm32D+0TIzawYne1tLv835de3/YWZWdU72Vgh3yjMzK6/GJnvXQpNxdNYzM7PRamyy
d43zaYMm/Mk65bmMzczKodbJ3rXT3vWbmF3GZmblV+tkb4Prlsyd6M3MqsHJ3qY02Xj8ybj53sys
XDypjj2l29z5vdbinejNzMrHNXt7hkGStRO9mVk51T7Z+7xyfv0kbSd6M7Pyqn2yh/znnM1D58zM
6sTn7G0gPiAwMys/J3vraiKZt7aEOMGbmVWLk731xAnezKy6GnHO3szMrMmc7M3MzGrOyd7MzKzm
GpPsPdTOzMyaqjHJ3szMrKmc7DPubW5mZnXlZG9mZlZzjUz2Pn9vZmZN0qhk7yRvZmZN1Khkb2Zm
1kRO9mZmZjXXuGTvpnwzM2uaxiX7TjzszszM6szJ3szMrOZqnex7qbG7Vm9mZnVX2WQv6UBJP5d0
u6Tjxh2PmZlZWamKHdYkPQu4HdgfuAe4Djg0In7ess5TO9ZtH12zNzOzOomItRJbVWv2uwNLI+KO
iHgSOAM4eLKVJ0voTvRmZtYEVU32mwN3tTy+O1s2KUlr3czMzJqgqsnezMzMelTVZL8c2LLl8Zxs
mZmZmbWpage9acBtpA569wLXAu+IiCVjDczMzKyEpo87gH5ExGpJxwAXklonTnaiNzMz66ySNXsz
MzPrXVXP2XfV9Al3JJ0saaWkm1uWzZB0oaTbJF0gacOW5+ZJWippiaQDxhP1aEiaI+kSSbdKukXS
sdnyxpePpHUlXSPppqxsTsiWN75sJkh6lqQbJZ2bPXbZAJKWSfpp9t25NlvmsgEkbSjpu9m+3ipp
j7GUTUTU6kY6gPkv4IXAs4FFwPbjjmvEZbA3sBNwc8uyE4GPZ/ePA/4+u78DcBPplM5WWdlp3Psw
xLKZDeyU3d+A1Pdje5fPU+WzfvZ3GnA1aU4Ll83T5fMR4NvAudljl03a318AM9qWuWzS/n4TeG92
fzqw4TjKpo41+1wT7tRRRFwOPNS2+GBgfnZ/PvCW7P5BwBkRsSoilgFLSWVYSxGxIiIWZfcfBZaQ
RnO4fICIeCy7uy7pBydw2QCpVQj4I+DrLYtdNolYu6W48WUj6fnAPhFxCkC2z48whrKpY7LPPeFO
Q2wSESshJTxgk2x5e3ktpyHlJWkrUgvI1cAsl89TzdQ3ASuAiyLiOlw2E74E/CXpAGiCyyYJ4CJJ
10k6MlvmsoGtgQcknZKd/vmapPUZQ9nUMdlbbxrdM1PSBsBZwIezGn57eTSyfCJiTUTsTGrt2F3S
S3DZIOkeD/7gAAAIo0lEQVSNwMqsVajb9JuNK5vMXhGxC6nl40OS9sHfG0itY7sA/5KVz2+B4xlD
2dQx2XvCnc5WSpoFIGk2cF+2fDmwRct6tS8vSdNJif7UiFiYLXb5tIiIXwOXAgfisgHYCzhI0i+A
04HXSDoVWOGygYi4N/t7P3AOqenZ35vUsnxXRFyfPf4eKfmPvGzqmOyvA7aR9EJJ6wCHAueOOaZx
EM+sgZwLHJHdPxxY2LL8UEnrSNoa2IY0SVGdfQNYHBFfblnW+PKRtPFEr2BJ6wGvI/VpaHzZRMQn
ImLLiHgR6Tflkoh4N3AeDS8bSetnLWVIei5wAHAL/t6QNdXfJekPskX7A7cyjrIZd0/FIfV+PJDU
y3opcPy44xnD/i8gXfr3CeBO4L3ADODirFwuBF7Qsv48Uq/PJcAB445/yGWzF7CaNErjJuDG7Puy
UdPLB/jDrDwWATcDn8yWN75s2sppX57ujd/4siGdl574f7pl4jfXZfPUvr6MVAldBPw7qTf+yMvG
k+qYmZnVXB2b8c3MzKyFk72ZmVnNOdmbmZnVnJO9mZlZzTnZm5mZ1ZyTvZmZWc052ZuVgKRLJa0Z
dxx5SXqvpDWSXj7gdvbNtvOpomLr8X0/nb3vq/p8/UJJ/5XNymhWWk72ZgXKEkee23uylwZQqWSf
zZb2WWBhPD0d6CCC0c+fPuh7foo0qcyxxYRjNhw+GjUr1qc7LPsI8Hzgy8DDbc8tyv6+G1h/eGEN
xYeBWcDfF7Cta4C5wAMFbGtkIuKnks4HPinppIj43bhjMuvEM+iZDZmkX5IuzrR1RNw57niKIOlZ
wC+BxyJi7rjj6ZekE0i181dHxE/63MYhwBnAkRHxjSLjMyuKm/HNSqDTOfvW89iSdpV0vqSHJT0o
6SxJc7L1XiTpDEn3SXpM0iWSdpzkfdaTNE/STZIelfQbSVdKOjRnyK8jXZ3rO5O8z5osjk0lnSpp
ZRbb9ZLe0WH9tc7ZS3prtuxKSdPa1n9ptr27JW3c9tzmkv5Z0n9L+p2kB7Jz6z33K5C0j6TzJN2V
beNeSVdN0qdgIfA74P29bt9s1Jzszcqh27nj3YHLSOf0v0Zq8n4bcJGk7bLHmwHzge+TLtRyoaRn
nBbIrmh3BfA3wCrgZOCbwMbAAkmfyRHva7N4r+iyzgzgSuAlpCsNzied3z5N0semeoOIOBv4Z2BP
Ut+Aif1YDzgTeDZwWEQ80PLcLsBPgT8Dfg58hXQlsX2AyyUdONX7Zuv8GHgl6WIlnwfOJiX0P+8Q
5xPADcBukp431fbNxmLcVwTyzbe630jN3auBLbus82NgdduyfUkJfjVwaNtzX8+e+xVtV3YE/ip7
zf9uW/7NbPnH2pavA/yQdACwY4/7dFW2rRmTPD8R9+lty1+Yxfw7YKsO+/qpDrHdkMV2QLbslGzb
7etOI10t7DFg77bnZpOuLb4ceHbL8hOybb2qZdn3smUv7bBfG02yv1/MXnPguL9vvvnW6eaavVn5
XRYRZ7Qtm5/9fRg4se25bwECdppYIGkj4J3A9RHxhdaVI+L3wHGklr7DeoxpS+DJiHioyzqrgePb
3usOUm372aROiV1lsb2dlMC/lbUIHA78J/DXbau/EXgR8E8RcXnbdlYAnyMl/f2netvs71qd7SLi
wUlesyL7u+UU2zYbC/fGNyu/Gzosuyf7uygi2pv/l2d/57Qs241U842sU1q7dbK/vXa2mwl0S/QA
d2bJvd2lpBr1zr28UUT8l6SjgNOAfwDuJzXft+/3K7K/W02yj9uSDoLmAud3ecvTgLcC10r6DqnV
5YqIWN7lNQ9m2964yzpmY+Nkb1Z+j3RYtmqy5yJitSRItecJM7O/u2W3TgJ4bo8xPQ48Z4p1Vk6y
fKIWvGGP7wVwEfBr4HnAd7OaeruJffyTLtsJYINubxQRZ0t6E/Ax4L3ABwFJugGYFxEXd3jZetnf
x7tt22xc3Ixv1gwTBwVfiohpXW6v7XF79wHPb+8l32bWJMtnt8XUi1NJif4B4IOS9u6wziOkZH7Q
FPvY3vy/loj4YVYWM0jN/l8kdTQ8T9L2HV4yM3vv+3Lsk9nIONmbNcO1pA5w+xS0vZuzv9t1WWdL
SZ3OYb86+3tTL28k6ePA64FvA68htWoskDSjbdWrSU3pfU1920lEPB4Rl0bEXwB/Szrd8YYOq04c
ACzq8JzZ2DnZmzVARNxPOhf9ckl/lU2K8wzZeP2tetzkpaTEumeXdaYBJyo7p5C9x8TUsk+SkndX
kvYkDRW8HTg6Im4lzUg4h6c7KU5YCPw38CFJnRIykvaU1PX0QzbGvlOLxUSLxGMdntsTeCCLz6x0
fM7erDmOAbYB/h/wbkmXk86rb0bqtPZy4B3Ash62tRD4R1KNe7JZ424G9gBukHQhqUn8T0nn6v8y
In7Z7Q0kvQA4naeHHv4WICK+Kml/4E8kfTQivpgtXyXpbaTOd/8h6UpSTfsx0gRAu5HG+W9Kh572
Lb4CbC7pClJZ/B7YldSq8EvSbHmtcf4BqRf+/++2P2bj5GRvNhq9zEvdaZ1uk+3kei4ifiNpX1KH
s8NIE/M8h5TwlwL/h9QRbupAI+6WdB7wZkkbRkSn8+8PkZq8PwccQbo+wK3A5yOi08x77TF/nZRE
PxIR7c3jR5IS8N9K+klkF+KJiFskvQz4KPCm7H3XAPcCNwL/l6nn3/8sqTf+y0nn69cAd5JaGL7c
YV+PyOL+1ym2azY2nhvfzPoi6RWkGfQ+EhFfbntuDXBpRLxmLMGNiKR1gF8At0bE68cdj9lkfM7e
zPoSEVcB3wWOm+o8eI0dTRp1MOX0v2bj5GRvZoP4C9K56q3HHciYPA68PyJ+Nu5AzLpxM76ZFU7S
alIz/lRT05rZCDjZm5mZ1Zyb8c3MzGrOyd7MzKzmnOzNzMxqzsnezMys5pzszczMas7J3szMrOb+
B1EL/zkA+tHoAAAAAElFTkSuQmCC
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Step-3.-Project-2-D-binary-image-to-1-D-time-series">Step 3. Project 2-D binary image to 1-D time series<a class="anchor-link" href="#Step-3.-Project-2-D-binary-image-to-1-D-time-series">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1"># Extract the time series (not the scale bars) by starting in the first column</span>
<span class="n">col_in_time_series</span> <span class="o">=</span> <span class="bp">True</span>
<span class="n">s1rate_pixels</span> <span class="o">=</span> <span class="p">[]</span>
<span class="n">col</span> <span class="o">=</span> <span class="mi">0</span>
<span class="k">while</span> <span class="n">col_in_time_series</span> <span class="o">==</span> <span class="bp">True</span><span class="p">:</span>
    <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">where</span><span class="p">(</span><span class="n">binary_image</span><span class="p">[:,</span><span class="n">col</span><span class="p">]</span><span class="o">==</span><span class="mi">1</span><span class="p">)[</span><span class="mi">0</span><span class="p">]):</span>
        <span class="n">s1rate_pixels</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">where</span><span class="p">(</span><span class="n">binary_image</span><span class="p">[:,</span><span class="n">col</span><span class="p">]</span><span class="o">==</span><span class="mi">1</span><span class="p">)[</span><span class="mi">0</span><span class="p">]))</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="n">col_in_time_series</span> <span class="o">=</span> <span class="bp">False</span>
    <span class="n">col</span> <span class="o">+=</span> <span class="mi">1</span>
<span class="n">s1rate_pixels</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="n">s1rate_pixels</span><span class="p">)</span>

<span class="c1"># Subtract baseline</span>
<span class="n">s1rate_pixels</span> <span class="o">=</span> <span class="n">s1rate_pixels</span> <span class="o">-</span> <span class="n">np</span><span class="o">.</span><span class="n">min</span><span class="p">(</span><span class="n">s1rate_pixels</span><span class="p">)</span>

<span class="c1"># Visualize time series</span>
<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">s1rate_pixels</span><span class="p">,</span><span class="s1">&#39;k&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">3</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Time (pixels)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Firing rate (pixels)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[2]:</div>


<div class="output_text output_subarea output_execute_result">
<pre>&lt;matplotlib.text.Text at 0x2b8e3a90&gt;</pre>
</div>

</div>

<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
3pdhBEh7403HMENFHHnkkUycOJFHH33US6O3fft2Bg8ezJ49e2J230ceecQb53neeefRo0ePmN3L
MPzGjNeM9xBEhAcffJCZM2d66TG///57Bg0axMGDB6N+v8mTJ4e0docOHRr1exhGIpHWxrt7925+
+OEHwInvWisrlG7duvHMM894+xMnTuTxx6s9bDqE4uJifv/733v7gwYNst+DkfKktfEGL3fevHlz
atWq5aOaxOT6668PmVb8l7/8xcvgFg3eeecdli5dCjirZTz33HNRu7ZhJCppbbzB60c1b97cRyWJ
i4jw6KOP0rNnT8DJ/n/99ddHJeSwefNm7r77bm//zjvvtJEMRlqQ1sYb3OJt1qyZj0oSm8zMTEaO
HOl9I1iwYAH33nsv1Zn1qKrceuut/PzzzwC0atXKRjIYaUNaG29wi9eMt2Lat2/Po48+6u0/++yz
/Oc//6ny9e69914++OADb/+VV15JmQVGDaMy0tp4S8d4jYq5++67vZwW4JhnVfJafPrppzz99NPe
/q233hoydtgwUh0zXhdr8VZOZmYm77zzDieccAIAe/bs4fzzzw/55lAZ8+bN85YgArjgggtCVrE1
jHQgrY3XOtcip1atWrz33ns0atQIgIKCAnr06BHWtOLdu3dz3XXXeeknmzdvziuvvJLQa78ZRixI
a+MNbvFab3r4nHDCCYwaNcrbX7t2LZdcckmFM9vmzp1Lr169yMvLA5wUlJ9//rk9dyMtSWvjLSws
9Mp+5Z9NVvr06cMLL7zg7a9cuZKzzz6b119/3TNgVWXq1Kk8/PDD5OTkeMv5ADzzzDN06NAh7roN
IxFI60To2dnZ3jLSP//8s/f12QifkSNH8tvf/jakLjMzk0GDBvHjjz8yZ86ckGM1atTgqaee4q67
7oqnTMOIGtFIhJ62xltSUkJWVpY3FvXgwYMWa6wif/nLX3j44YcrPa9ly5Z8+umn/M///E8cVBlG
bLAVKCrh+uuvZ/v27WUe27lzp2e69evXN9OtBg899BBz5sxh8ODBhxyrWbMml19+Of/85z9ZunSp
ma5hkOItXnDGmj755JOHHF+9erW36GOrVq1Yu3ZtXPWlKhs2bOCLL75AValRowa9e/emRYsWfssy
jKgRjRZvyjfzZsyYUWZ9ILYL0LBhw3jJSXlatGjBtdde67cMw0hoUjrUALBo0aIycwqY8RqG4Rcp
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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Step-4.-Rescale-in-x--and-y--variables">Step 4. Rescale in x- and y- variables<a class="anchor-link" href="#Step-4.-Rescale-in-x--and-y--variables">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1"># Convert rate from pixels to Hz</span>
<span class="n">ratescale_col</span> <span class="o">=</span> <span class="mi">395</span> <span class="c1"># Column in image containing containing rate scale</span>
<span class="n">rate_scale</span> <span class="o">=</span> <span class="mi">50</span> <span class="c1"># Hz, scale in image</span>
<span class="n">ratescale_Npixels</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">(</span><span class="n">binary_image</span><span class="p">[:,</span><span class="n">ratescale_col</span><span class="p">])</span>
<span class="n">pixels_to_rate</span> <span class="o">=</span> <span class="n">rate_scale</span><span class="o">/</span><span class="n">ratescale_Npixels</span>
<span class="n">s1rate</span> <span class="o">=</span> <span class="n">s1rate_pixels</span><span class="o">*</span><span class="n">pixels_to_rate</span>

<span class="c1"># Convert time from pixels to ms</span>
<span class="n">timescale_row</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">argmax</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">binary_image</span><span class="p">[:,</span><span class="mi">400</span><span class="p">:],</span><span class="mi">1</span><span class="p">))</span> <span class="c1"># Row in image containing time scale</span>
<span class="n">time_scale</span> <span class="o">=</span> <span class="mi">100</span> <span class="c1"># ms, scale in image</span>
<span class="n">timescale_Npixels</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">(</span><span class="n">binary_image</span><span class="p">[</span><span class="n">timescale_row</span><span class="p">,</span><span class="mi">400</span><span class="p">:])</span>
<span class="n">pixels_to_time</span> <span class="o">=</span> <span class="n">time_scale</span><span class="o">/</span><span class="n">timescale_Npixels</span>
<span class="n">pixels</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">s1rate_pixels</span><span class="p">))</span>
<span class="n">t</span> <span class="o">=</span> <span class="n">pixels</span><span class="o">*</span><span class="n">pixels_to_time</span>

<span class="c1"># Visualize re-scaled time series</span>
<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">t</span><span class="p">,</span> <span class="n">s1rate</span><span class="p">,</span><span class="s1">&#39;k&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">3</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Time (ms)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Firing rate (Hz)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[3]:</div>


<div class="output_text output_subarea output_execute_result">
<pre>&lt;matplotlib.text.Text at 0x6fcfb38&gt;</pre>
</div>

</div>

<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
p5/mv//9r7sYYH5+PnfccUeRlSDC7YknniAvLw9wfuF5V80wJtEldY13xYoVnHXWWQCkpKSwa9eu
mFsUL5qWLl3Kz372M7fU0KRJExYsWBD2datWrlzJOeec484H8OmnnzJw4MCwvocxkWI13kryDhNO
T09P6qQL8IMf/IDMzEzatGkDwJ49exgyZEhYu5upKrfccoubdPv06ZOUf2mY5JbUmcY7vjxR5meo
rAYNGjBx4kRq1aoFOKP6fvvb34bt+p9//rm7Ika1atX4+9//HtTMVsYkkqROvN4ZyVq0aOFjJLHl
ggsu4B//+Ie7/9xzz4VlteITJ04wbtw4d//666/nBz/4QaWva0y8SerEm5WV5W43b97cx0hizzXX
XMPQoUMBpzxwww03cPTo0Upd86mnnnInValVqxa/+c1vKh2nMfHIEm+AJd6iRISXXnrJ7emwcuVK
Ro4c6c6ZG6oZM2bwyCOPuPuPPPKIrSBskpYl3oDU1FQfI4lNbdq04emnn3b3MzIyeO6550K+zvbt
27nyyivJzc0FoEePHtx9991hi9OYeJO0ibegoKBIjdcSb8l+/vOf8+tf/9rdHzdunDvTWTCOHDnC
6NGj2b9/PwBpaWm88847VKtmE+OZ5JW0/Xh3797NKaecAjhz8BYmBnOy48ePc95557n9exs0aEBG
RgbnnXdeua+95ZZbeOmll9z9zz//PGlGCJrEZP14K8Hqu8GrWbMmGRkZtGrVCnAmvx4wYADLly8v
9TV5eXn86U9/KpJ0//KXv1jSNYYkTrx79uxxt5s2bepjJPGhWbNmvPbaa+7qEMePH2fs2LEsWbLE
HfoLTg+INWvWMGzYMO677z73+OWXX85dd90V9biNiUVJW2g7cOCAu924cWMfI4kfgwYN4osvviA9
PZ3c3Fy++eYbunXrRosWLbj33nupVasWzzzzDKtWrSryuu7du/PKK6/YQAljApK2xeut6TZs2NDH
SOLLueeey7/+9a8iSXTHjh3cdddd/OIXvzgp6d55553MnDnTfrkZ45HQifett96itBts3sTbqFGj
aIWUEK655ho++eQTzj333BKfr1q1Kj179uTf//43Tz/9NHXq1IlyhMbEtoQuNYwZM4bDhw9z4403
nvScJd7KGTx4MIMHD+bLL7/kpZde4vjx4wB069aNX/ziF9bCNaYMCZ14Af73v/+VmHi9NV5LvBXX
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
rkJggg==
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Step-5.-Resample-at-desired-sampling-rate">Step 5. Resample at desired sampling rate<a class="anchor-link" href="#Step-5.-Resample-at-desired-sampling-rate">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1"># Interpolate time series to sample every 1ms</span>
<span class="kn">from</span> <span class="nn">scipy</span> <span class="kn">import</span> <span class="n">interpolate</span>
<span class="n">f</span> <span class="o">=</span> <span class="n">interpolate</span><span class="o">.</span><span class="n">interp1d</span><span class="p">(</span><span class="n">t</span><span class="p">,</span> <span class="n">s1rate</span><span class="p">)</span> <span class="c1"># Set up interpolation</span>
<span class="n">tmax</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">floor</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">])</span>
<span class="n">t_ms</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">tmax</span><span class="p">)</span> <span class="c1"># Desired time series, in ms</span>
<span class="n">s1rate_ms</span> <span class="o">=</span> <span class="n">f</span><span class="p">(</span><span class="n">t_ms</span><span class="p">)</span> <span class="c1"># Perform interpolation</span>

<span class="c1"># Visualize re-scaled time series</span>
<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">t_ms</span><span class="p">,</span> <span class="n">s1rate_ms</span><span class="p">,</span><span class="s1">&#39;k&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">3</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Time (ms)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Firing rate (Hz)&#39;</span><span class="p">,</span><span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>

<span class="c1"># Save final time series</span>
<span class="n">np</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="s1">&#39;extracted_timeseries&#39;</span><span class="p">,</span><span class="n">s1rate_ms</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
    </div>
  </div>
</body>
</html>
