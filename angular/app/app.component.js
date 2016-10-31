/// <reference path="jquery.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.progress = 0;
        //private response: any = {};
        this.response = [];
        this.responses = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.options = {
            url: 'http://localhost:8080/upload'
        };
        var val = 0;
        var $circle = $('#svg #bar');
        if (isNaN(val)) {
            val = 100;
        }
        else {
            var r = +$circle.attr('r');
            var c = Math.PI * (r * 2);
            if (val < 0) {
                val = 0;
            }
            if (val > 100) {
                val = 100;
            }
            var pct = ((100 - val) / 100) * c;
            $circle.css({ strokeDashoffset: pct });
            $('#cont').attr('data-pct', val);
        }
    };
    AppComponent.prototype.handleMultipleUpload = function (data) {
        var _this = this;
        var index = this.response.findIndex(function (x) { return x.id === data.id; });
        if (index === -1) {
            this.response.push(data);
        }
        else {
            var total_1 = 0, uploaded_1 = 0;
            this.response.forEach(function (resp) {
                total_1 += resp.progress.total;
                uploaded_1 += resp.progress.loaded;
            });
            var percent_1 = uploaded_1 / (total_1 / 100) / 100;
            this.zone.run(function () {
                _this.response[index] = data;
                //  console.log(data);
                _this.progress = percent_1;
                var val = _this.progress * 100;
                var $circle = $('#svg #bar');
                if (isNaN(val)) {
                    val = 0;
                }
                else {
                    var r = +$circle.attr('r');
                    var c = Math.PI * (r * 2);
                    if (val < 0) {
                        val = 0;
                    }
                    if (val > 100) {
                        val = 100;
                    }
                    var pct = ((100 - val) / 100) * c;
                    $circle.css({ strokeDashoffset: pct });
                    $('#cont').attr('data-pct', val.toFixed(0));
                }
            });
        }
    };
    AppComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.zone.run(function () {
            _this.response = data;
            _this.progress = data.progress.percent / 100;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: [
                'app.component.css'
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map