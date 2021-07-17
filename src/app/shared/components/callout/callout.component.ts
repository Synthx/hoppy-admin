import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-callout',
    templateUrl: './callout.component.html',
    styleUrls: ['./callout.component.scss'],
})
export class CalloutComponent {
    @Input()
    icon?: string;

    @Input()
    type!: 'danger' | 'info';
}
