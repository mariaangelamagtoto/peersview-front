import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-ads",
    templateUrl: "./ads.component.html",
    styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {

    public items: any;
    public properties: any;

    constructor() {
        this.items = [1, 2, 3, 4, 5, 6, 7, 8];
        this.properties = {
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            onChange: function () {

            }
        };
    }

    ngOnInit() {
        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }

}
