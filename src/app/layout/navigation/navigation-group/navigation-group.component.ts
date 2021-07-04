import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navigation-group',
    templateUrl: './navigation-group.component.html',
    styleUrls: ['./navigation-group.component.scss'],
})
export class NavigationGroupComponent {
    @Input()
    title!: string;

    @Input()
    subtitle?: string;
}
