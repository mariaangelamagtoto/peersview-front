import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-year-enrollment",
    templateUrl: "./year-enrollment.component.html",
    styleUrls: ["./year-enrollment.component.scss"]
})
export class YearEnrollmentComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }
    share() {

    }

}
