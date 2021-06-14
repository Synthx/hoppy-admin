import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation-group',
    templateUrl: './navigation-group.component.html',
    styleUrls: ['./navigation-group.component.scss'],
})
export class NavigationGroupComponent implements OnInit {
    @Input()
    title!: string;

    @Input()
    subtitle?: string;

    constructor() {}

    ngOnInit(): void {}
}
