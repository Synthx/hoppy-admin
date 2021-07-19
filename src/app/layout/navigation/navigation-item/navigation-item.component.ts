import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
    @Input()
    icon!: string;

    @Input()
    label!: string;

    @Input()
    link!: string;

    @Input()
    subtitle?: string;

    @Input()
    exact: boolean = false;
}
