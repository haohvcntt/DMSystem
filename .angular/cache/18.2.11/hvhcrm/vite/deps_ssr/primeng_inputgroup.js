import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  SharedModule
} from "./chunk-PPME3ETC.js";
import {
  CommonModule,
  NgClass,
  NgStyle
} from "./chunk-VAH4OXJI.js";
import {
  Component,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-UR6PT5GZ.js";
import "./chunk-2H3L6IVL.js";
import "./chunk-NQ4HTGF6.js";

// node_modules/primeng/fesm2022/primeng-inputgroup.mjs
var _c0 = ["*"];
var InputGroup = class _InputGroup {
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  static ɵfac = function InputGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputGroup)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _InputGroup,
    selectors: [["p-inputGroup"]],
    hostAttrs: [1, "p-element", "p-inputgroup"],
    inputs: {
      style: "style",
      styleClass: "styleClass"
    },
    ngContentSelectors: _c0,
    decls: 2,
    vars: 3,
    consts: [[1, "p-inputgroup", 3, "ngClass", "ngStyle"]],
    template: function InputGroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵprojection(1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("ngClass", ctx.styleClass)("ngStyle", ctx.style);
        ɵɵattribute("data-pc-name", "inputgroup");
      }
    },
    dependencies: [NgClass, NgStyle],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroup, [{
    type: Component,
    args: [{
      selector: "p-inputGroup",
      template: `
        <div class="p-inputgroup" [attr.data-pc-name]="'inputgroup'" [ngClass]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
      host: {
        class: "p-element p-inputgroup"
      }
    }]
  }], null, {
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var InputGroupModule = class _InputGroupModule {
  static ɵfac = function InputGroupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputGroupModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputGroupModule,
    declarations: [InputGroup],
    imports: [CommonModule],
    exports: [InputGroup, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [InputGroup, SharedModule],
      declarations: [InputGroup]
    }]
  }], null, null);
})();
export {
  InputGroup,
  InputGroupModule
};
//# sourceMappingURL=primeng_inputgroup.js.map
