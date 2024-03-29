import React from 'react'

export default props => (
  <style jsx="true" {...props}>
    {`
.rc-select {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: 28px;
  width: 100%;
}
.rc-select ul,
.rc-select li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.rc-select > ul > li > a {
  padding: 0;
  background-color: #fff;
}
.rc-select-arrow {
  height: 26px;
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20px;
  outline: none;
}
.rc-select-arrow .rc-select-arrow-icon {
  border-color: #999999 transparent transparent transparent;
  border-style: solid;
  border-width: 5px 4px 0 4px;
  height: 0;
  width: 0;
  margin-left: -4px;
  margin-top: -2px;
  position: absolute;
  top: 50%;
  left: 50%;
}
.rc-select-selection {
  outline: none;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  display: block;
  background-color: #fff;
}
.rc-select-selection__placeholder {
  position: absolute;
  top: 0;
  color: #aaa;
}
.rc-select-selection__clear {
  font-weight: bold;
  position: absolute;
  line-height: 28px;
}
.rc-select-selection__clear-icon {
  font-style: normal;
}
/*.rc-select-focused .rc-select-selection {
  border-color: #23c0fa;
  box-shadow: 0 0 2px rgba(45, 183, 245, 0.8);
}
.rc-select-enabled .rc-select-selection:hover {
  border-color: #23c0fa;
  box-shadow: 0 0 2px rgba(45, 183, 245, 0.8);
}
.rc-select-enabled .rc-select-selection:active {
  border-color: #2db7f5;
}*/
.rc-select-selection--single {
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  position: relative;
}
.rc-select-selection--single .rc-select-selection-selected-value {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
}
.rc-select-selection--single .rc-select-selection__rendered {
  height: 28px;
  position: relative;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 10px;
  line-height: 28px;
}
.rc-select-selection--single .rc-select-selection__clear {
  top: 0;
  right: 20px;
}
.rc-select-disabled {
  color: #ccc;
  cursor: not-allowed;
}
.rc-select-disabled .rc-select-selection--single,
.rc-select-disabled .rc-select-selection__choice__remove {
  cursor: not-allowed;
  color: #ccc;
}
.rc-select-disabled .rc-select-selection--single:hover,
.rc-select-disabled .rc-select-selection__choice__remove:hover {
  cursor: not-allowed;
  color: #ccc;
}
.rc-select-search__field__wrap {
  display: inline-block;
}
.rc-select-search__field__placeholder {
  position: absolute;
  top: 0;
  left: 3px;
  color: #aaa;
}
.rc-select-search--inline {
  width: 100%;
}
.rc-select-search--inline .rc-select-search__field__wrap {
  width: 100%;
}
.rc-select-search--inline .rc-select-search__field {
  border: none;
  font-size: 100%;
  background: transparent;
  outline: 0;
  width: 100%;
}
.rc-select-search--inline .rc-select-search__field::-ms-clear {
  display: none;
}
.rc-select-search--inline .rc-select-search__field__mirror {
  position: absolute;
  top: -999px;
  left: 0;
  white-space: pre;
}
.rc-select-search--inline > i {
  float: right;
}
.rc-select-enabled.rc-select-selection--multiple {
  cursor: text;
}
.rc-select-selection--multiple {
  min-height: 28px;
}
.rc-select-selection--multiple .rc-select-search--inline {
  float: left;
  width: auto;
}
.rc-select-selection--multiple .rc-select-search--inline .rc-select-search__field {
  width: 0.75em;
}
.rc-select-selection--multiple .rc-select-search--inline .rc-select-search__field__wrap {
  width: auto;
}
.rc-select-selection--multiple .rc-select-search__field__placeholder {
  top: 5px;
  left: 8px;
}
.rc-select-selection--multiple .rc-select-selection__rendered {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}
.rc-select-selection--multiple .rc-select-selection__rendered .rc-select-selection__choice {
  margin-top: 4px;
  line-height: 20px;
}
.rc-select-selection--multiple .rc-select-selection__clear {
  top: 1px;
  right: 8px;
}
.rc-select-enabled .rc-select-selection__choice {
  cursor: default;
}
.rc-select-enabled .rc-select-selection__choice:hover .rc-select-selection__choice__remove {
  opacity: 1;
  transform: scale(1);
}
.rc-select-enabled .rc-select-selection__choice:hover .rc-select-selection__choice__content {
  margin-left: -8px;
  margin-right: 8px;
}
.rc-select-enabled .rc-select-selection__choice__disabled {
  cursor: not-allowed;
}
.rc-select-enabled .rc-select-selection__choice__disabled:hover .rc-select-selection__choice__content {
  margin-left: 0;
  margin-right: 0;
}
.rc-select .rc-select-selection__choice {
  background-color: #f3f3f3;
  border-radius: 4px;
  float: left;
  padding: 0 15px;
  margin-right: 4px;
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045), width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
.rc-select .rc-select-selection__choice__content {
  margin-left: 0;
  margin-right: 0;
  transition: margin 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.rc-select .rc-select-selection__choice-zoom-enter,
.rc-select .rc-select-selection__choice-zoom-appear,
.rc-select .rc-select-selection__choice-zoom-leave {
  animation-duration: .3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  opacity: 0;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.rc-select .rc-select-selection__choice-zoom-leave {
  opacity: 1;
  animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
.rc-select .rc-select-selection__choice-zoom-enter.rc-select-selection__choice-zoom-enter-active,
.rc-select .rc-select-selection__choice-zoom-appear.rc-select-selection__choice-zoom-appear-active {
  animation-play-state: running;
  animation-name: rcSelectChoiceZoomIn;
}
.rc-select .rc-select-selection__choice-zoom-leave.rc-select-selection__choice-zoom-leave-active {
  animation-play-state: running;
  animation-name: rcSelectChoiceZoomOut;
}
@keyframes rcSelectChoiceZoomIn {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes rcSelectChoiceZoomOut {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
.rc-select .rc-select-selection__choice__remove {
  color: #919191;
  cursor: pointer;
  font-weight: bold;
  padding: 0 0 0 8px;
  position: absolute;
  opacity: 0;
  transform: scale(0);
  top: 0;
  right: 2px;
  transition: opacity .3s, transform .3s;
}
.rc-select .rc-select-selection__choice__remove-icon {
  font-style: normal;
}
.rc-select .rc-select-selection__choice__remove:hover {
  color: #333;
}
.rc-select-dropdown {
  background-color: white;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0px 4px #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 100;
  left: -9999px;
  top: -9999px;
  position: absolute;
  outline: none;
}
.rc-select-dropdown:empty,
.rc-select-dropdown-hidden {
  display: none;
}
.rc-select-dropdown-menu {
  outline: none;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 9999;

  font-size: 12px;
}
.rc-select-dropdown-menu > li {
  margin: 0;
  padding: 0;
}
.rc-select-dropdown-menu-item-group-list {
  margin: 0;
  padding: 0;
}
.rc-select-dropdown-menu-item-group-list > li.rc-select-menu-item {
  padding-left: 20px;
}
.rc-select-dropdown-menu-item-group-title {
  color: #999;
  line-height: 1.5;
  padding: 8px 10px;
  border-bottom: 1px solid #dedede;
}
li.rc-select-dropdown-menu-item {
  margin: 0;
  position: relative;
  display: block;
  padding: 7px 10px;
  font-weight: normal;
  color: #666;
  white-space: nowrap;
}
li.rc-select-dropdown-menu-item-disabled {
  color: #ccc;
  cursor: not-allowed;
}
li.rc-select-dropdown-menu-item-selected {
  color: #666;
  background-color: #ddd;
}
li.rc-select-dropdown-menu-item-active {
  background-color: #5897fb;
  color: white;
  cursor: pointer;
}
li.rc-select-dropdown-menu-item-divider {
  height: 1px;
  margin: 1px 0;
  overflow: hidden;
  background-color: #e5e5e5;
  line-height: 0;
}

.multiple .rc-select-dropdown-menu {
  padding: 2px;
}

.multiple li.rc-select-dropdown-menu-item {
  display: inline-block;
  margin: 2px;
}

.rc-select-dropdown-slide-up-enter,
.rc-select-dropdown-slide-up-appear {
  animation-duration: .3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.rc-select-dropdown-slide-up-leave {
  animation-duration: .3s;
  animation-fill-mode: both;
  transform-origin: 0 0;
  opacity: 1;
  animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
  animation-play-state: paused;
}
.rc-select-dropdown-slide-up-enter.rc-select-dropdown-slide-up-enter-active.rc-select-dropdown-placement-bottomLeft,
.rc-select-dropdown-slide-up-appear.rc-select-dropdown-slide-up-appear-active.rc-select-dropdown-placement-bottomLeft {
  animation-name: rcSelectDropdownSlideUpIn;
  animation-play-state: running;
}
.rc-select-dropdown-slide-up-leave.rc-select-dropdown-slide-up-leave-active.rc-select-dropdown-placement-bottomLeft {
  animation-name: rcSelectDropdownSlideUpOut;
  animation-play-state: running;
}
.rc-select-dropdown-slide-up-enter.rc-select-dropdown-slide-up-enter-active.rc-select-dropdown-placement-topLeft,
.rc-select-dropdown-slide-up-appear.rc-select-dropdown-slide-up-appear-active.rc-select-dropdown-placement-topLeft {
  animation-name: rcSelectDropdownSlideDownIn;
  animation-play-state: running;
}
.rc-select-dropdown-slide-up-leave.rc-select-dropdown-slide-up-leave-active.rc-select-dropdown-placement-topLeft {
  animation-name: rcSelectDropdownSlideDownOut;
  animation-play-state: running;
}
@keyframes rcSelectDropdownSlideUpIn {
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
}
@keyframes rcSelectDropdownSlideUpOut {
  0% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: scaleY(0);
  }
}
@keyframes rcSelectDropdownSlideDownIn {
  0% {
    opacity: 0;
    transform-origin: 0% 100%;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 100%;
    transform: scaleY(1);
  }
}
@keyframes rcSelectDropdownSlideDownOut {
  0% {
    opacity: 1;
    transform-origin: 0% 100%;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 100%;
    transform: scaleY(0);
  }
}
.rc-select-open .rc-select-arrow b {
  border-color: transparent transparent #888 transparent;
  border-width: 0 4px 5px 4px;
}
`}
  </style>
)
